const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressws = require("express-ws")(app);
const PORT = process.env.PORT || 3000;
const { Client } = require("pg");
const {
  login,
  system_event,
  retrieve_events
} = require("./Database/functions");
let ApplicationSockets = [];
let DeviceSockets = [];

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

const cleanupSockets = setInterval(() => {
  // console.log(Math.random(), deviceSockets);
  if (DeviceSockets.length > 0) {
    let aliveSockets = DeviceSockets.filter(device => device.isAlive === true);
    if (aliveSockets.length > 0) {
      aliveSockets.map(socket => {
        socket.isAlive = false;
        if (socket.ws.readyState === 1) {
          socket.ws.ping();
        }
      });
    }
    DeviceSockets = [...aliveSockets];
  }
  setTimeout(() => {
    if (ApplicationSockets.length > 0) {
      let Sockets = [];
      if (DeviceSockets.length > 0) {
        DeviceSockets.map(device => {
          Sockets.push({
            name: device.name,
            type: device.type,
            mac: device.mac,
            status: device.status
          });
        });
      }
      ApplicationSockets.map(application => {
        if (application.ws.readyState === 1) {
          application.ws.send(
            JSON.stringify({ event: "updated_devices", devices: Sockets })
          );
        }
      });
    }
  }, 1000);
  console.log(DeviceSockets);
}, 10000);

app.post("/login", function(req, res) {
  const callback = data => {
    res.send(data);
  };
  login(connection, req.body.username, req.body.userPass, callback);
});

app.get("/events", (req, res) => {
  const callback = data => {
    res.send(data);
  };
  retrieve_events(connection, callback);
});

const wsInstance = expressws.getWss("/ws");

app.ws("/ws", (ws, req) => {
  ws.on("message", msg => {
    let data = JSON.parse(msg);
    console.log(data);
    switch (data.event) {
      case "add_application":
        ApplicationSockets.push({ token: data.token, ws: ws });
        console.log(data);
        break;
      case "retrieve_devices":
        let Sockets = [];
        if (DeviceSockets.length > 0) {
          DeviceSockets.map(device => {
            Sockets.push({
              name: device.name,
              type: device.type,
              mac: device.mac,
              status: device.status
            });
          });
        }
        ws.send(JSON.stringify({ event: "updated_devices", devices: Sockets }));
        break;
      case "add_device":
        let skip = false;
        if (DeviceSockets.length > 0) {
          DeviceSockets.map(device => {
            if (data.mac === device.mac) {
              device.ws = ws;
              skip = true;
              setTimeout(() => {
                sendUpdates();
              }, 1000);
            }
          });
        }
        if (!skip) {
          console.log(data);
          DeviceSockets.push({
            name: data.name,
            type: data.type,
            mac: data.mac,
            status: data.status,
            ws: ws,
            isAlive: true
          });
          setTimeout(() => {
            sendUpdates();
          }, 1000);
        }
        break;
      case "device_status":
        if (DeviceSockets.length > 0) {
          DeviceSockets.map(device => {
            if (device.mac === data.mac) {
              device.status = data.status;
              device.ws.send(data.status ? "on" : "off");
            }
          });
          setTimeout(() => {
            sendUpdates();
          }, 1000);
        }
        console.log(data);
        break;
      case "device_event":
        console.log(data);
        system_event(connection, data.name, data.type, data.mac, data.message);
      case "ping_response":
        if (DeviceSockets.length > 0) {
          DeviceSockets.map(device => {
            if (device.mac === data.mac) {
              device.isAlive = true;
            }
          });
        }
      default:
        break;
    }
  });
});

const sendUpdates = () => {
  if (ApplicationSockets.length > 0) {
    let Sockets = [];
    if (DeviceSockets.length > 0) {
      DeviceSockets.map(device => {
        Sockets.push({
          name: device.name,
          type: device.type,
          mac: device.mac,
          status: device.status
        });
      });
    }
    ApplicationSockets.map(application => {
      if (application.ws.readyState === 1) {
        application.ws.send(
          JSON.stringify({ event: "updated_devices", devices: Sockets })
        );
      }
    });
  }
};

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
