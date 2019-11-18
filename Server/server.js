// const express = require('express');
// const app = express();
// const expressws = require('express-ws')(app)

// app.use(function (req, res, next) {
//     console.log('middleware');
//     req.testing = 'testing';
//     return next();
//   });

//   app.get('/', function(req, res, next){
//     console.log('get route', req.testing);
//     res.end();
//   });

//   app.ws('/', function(ws, req) {
//     ws.on('message', function(msg) {
//       console.log(msg);
//     });
//     console.log('socket', req.testing);
//   });

//   app.listen(3000);

const sql = require("mysql");

const connection = sql.createConnection({
  // FUCKING USE 8080 NOT 3306 OR 80.
  port: 8080,
  host: "localhost",
  user: "guardPi_user",
  password: "XeqLLSLkl3IcgsYp",
  database: "guardPi"
});

connection.connect();

connection.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});

connection.end();
