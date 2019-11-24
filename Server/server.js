const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressws = require("express-ws")(app);
const PORT = process.env.PORT || 3000;
const { Client } = require("pg");
const {
  login,
  retrieve_devices,
  device_connect
} = require("./Database/functions");
let mobileAppSocket = [];
let deviceSockets = [];

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
  login(connection, req.body.username, req.body.userPass, callback);
});

const wsInstance = expressws.getWss("/ws");

app.ws("/ws", (ws, req) => {
  ws.on("message", msg => {
    let data = JSON.parse(msg);
    console.log(data);
    switch (data.type) {
      case "application":
        mobileAppSocket.push(ws);
        break;
      case "device":
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        // Check sockets
        if (!deviceSockets.includes({ mac: data.mac, socket: ws })) {
          device_connect(connection, data.mac);
          deviceSockets.push({ mac: data.mac, socket: ws });
        }
        break;
      default:
        break;
    }
  });
});

const checkConnection = setInterval(() => {
  // console.log(Math.random(), deviceSockets);
  if (deviceSockets.length > 0) {
    deviceSockets.forEach(device => {
      let socket = device.socket;
      socket.ping("ping");
    });
  }
}, 10000);

const compare = () => {};

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
