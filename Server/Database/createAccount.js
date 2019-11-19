const sql = require("mysql");
const uuidv4 = require("uuid/v4");
const accountUserName = "guardPi_user";
const accountPassword = "test123";
const saltRounds = 10;
const bcrypt = require("bcrypt");

const connection = sql.createConnection({
  // FUCKING USE 8080 NOT 3306 OR 80.
  host: "localhost",
  user: "guardPi_user",
  password: "XeqLLSLkl3IcgsYp",
  database: "guardPi"
});

connection.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

bcrypt.hash(accountPassword, saltRounds).then(function(hash) {
  // Store hash in your password DB.
  connection.query(
    "INSERT INTO userAccounts SET ?",
    {
      id: uuidv4(),
      username: accountUserName,
      userPass: hash,
      token: uuidv4()
    },
    (err, res) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(res);
    }
  );
});
