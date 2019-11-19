const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressws = require("express-ws")(app);
const PORT = process.env.PORT || 3000;
const sql = require("mysql");
const { login_func } = require("./Database/functions");

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
  console.log("Database connected.");
  console.log("Connected as id " + connection.threadId);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.get("/", function(req, res, next) {
//   console.log("get route", req.testing);
//   res.end();
// });

app.post("/login", function(req, res) {
  const callback = data => {
    res.send(data);
  };
  login_func(connection, req.body.username, req.body.userPass, callback);
});

app.ws("/", function(ws, req) {
  ws.on("message", function(msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
