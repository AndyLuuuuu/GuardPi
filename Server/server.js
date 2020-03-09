const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const PORT = process.env.PORT || 3000;
const { Client } = require('pg');
const {
  login,
  system_event,
  retrieve_events,
  getServerMessage
} = require('./Database/functions');

const subscribeTopics = ['/sensorEvents', '/systemEvents', '/connectionEvents'];

const connectedDevices = new Map();

const db = new Client({
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

const messageHandler = (topic, data) => {
  const { name, type, mac, message } = JSON.parse(data);
  switch (topic) {
    case '/systemEvents':
      // console.log(JSON.parse(data));
      system_event(db, name, type, mac, message);
      break;
    case '/connectionEvents':
      connectedDevices.set(connectedDevices.size, {
        name,
        type,
        mac,
        message
      });
      getServerMessage(
        `Device connected: Name: ${name}, type: ${type}, mac: ${mac}`
      );
      console.log(connectedDevices);
      break;
    default:
      break;
  }
};

const subscribeToTopic = topic => {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, err => {
      if (err) {
        reject(err);
      } else {
        resolve(getServerMessage(`MQTT subscribed to ${topic}.`));
      }
    });
  });
};

client.on('connect', function() {
  getServerMessage('CloudMQTT connected.');
  subscribeTopics.map(topic => {
    subscribeToTopic(topic);
  });
});

client.on('message', (topic, data, pkt) => {
  // console.log(topic, msg.toString('utf8'), pkt);
  messageHandler(topic, data.toString('utf8'));
});

db.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    getServerMessage('Database connected.');
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
  getServerMessage(`Server up on PORT ${PORT}.`);
});
