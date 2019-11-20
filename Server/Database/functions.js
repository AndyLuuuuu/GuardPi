const bcrypt = require("bcrypt");

module.exports = {
  login_func: (db_conn, username, password, callback) => {
    db_conn.query(
      "SELECT userPass, token FROM userAccounts WHERE username=$1",
      [username],
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        let rows = result.rows;
        if (rows.length > 0) {
          bcrypt.compare(password, rows[0].userpass, (err, res) => {
            if (err) {
              callback({
                error: true,
                message: err
              });
            }
            if (res) {
              let token = rows[0].token;
              console.log(token);
              callback({
                auth: res,
                token: token
              });
            } else {
              callback({
                auth: res
              });
            }
          });
        } else {
          callback({
            auth: false
          });
        }
      }
    );
  }
};
