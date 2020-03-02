const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressws = require('express-ws')(app);
const mqtt = require('mqtt');
const PORT = process.env.PORT || 3000;
const { Client } = require('pg');
const {
  login,
  system_event,
  retrieve_events
} = require('./Database/functions');
let ApplicationSockets = [];
let DeviceSockets = [];

const getServerMessage = message => {
  return `<${new Date().toLocaleString()}> ${message}`;
};

const connection = new Client({
  host: 'localhost',
  port: 5432,
  database: 'guardpi',
  user: 'guardpi_user',
  password: 'XeqLLSLkl3IcgsYp'
});

const client = mqtt.connect('mqtts://postman.cloudmqtt.com:25145', {
  username: 'yrahqccv',
  password: 'IJBjDBMUekyr'
});

client.on('connect', function() {
  console.log(`${getServerMessage('CloudMQTT connected.')}`);
});

client.subscribe('/sensorEvents', () => {
  client.on('message', (topic, msg, pkt) => {
    console.log(topic, msg.toString('utf8'), pkt);
  });
});

client.subscribe('/systemEvents', () => {
  client.on('message', (topic, msg, pkt) => {
    console.log(topic, msg.toString('utf8'), pkt);
  });
});

client.subscribe('/connectionEvents', () => {
  client.on('message', (topic, msg, pkt) => {
    console.log(topic, msg.toString('utf8'), pkt);
  });
});

connection.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log(`${getServerMessage('Database connected.')}`);
  }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/login', function(req, res) {
  const callback = data => {
    res.send(data);
  };
  login(connection, req.body.username, req.body.userPass, callback);
});

app.get('/events', (req, res) => {
  const callback = data => {
    res.send(data);
  };
  retrieve_events(connection, callback);
});

app.listen(PORT, () => {
  console.log(`${getServerMessage(`Server up on PORT ${PORT}.`)}`);
});
