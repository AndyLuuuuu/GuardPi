const bcrypt = require("bcrypt");

module.exports = {
  login_func: (sqlConn, username, password, callback) => {
    sqlConn.query(
      "SELECT userPass, token FROM userAccounts WHERE ?",
      {
        username
      },
      (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }
        if (result.length > 0) {
          bcrypt.compare(password, result[0].userPass, (err, res) => {
            if (err) {
              callback({
                error: true,
                message: err
              });
            }
            if (res) {
              let token = result[0].token;
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
