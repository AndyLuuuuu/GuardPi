const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressws = require("express-ws")(app);
const PORT = process.env.PORT || 3000;
const { Client } = require("pg");
const { login_func } = require("./Database/functions");

const connection = new Client({
  host: "localhost",
  port: 5432,
  database: "guardpi",
  user: "guardpi_user",
  password: "XeqLLSLkl3IcgsYp"
});

connection.connect(err => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Database connected.");
  }
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
