const express = require('express')
const app = express()
const { uuid } = require('uuidv4')
const bodyParser = require('body-parser')
const mqtt = require('mqtt')
const PORT = process.env.PORT || 3000
const server_uuid = uuid()
const { Client } = require('pg')
const {
  login,
  system_event,
  retrieve_events,
  getServerMessage,
} = require('./Database/functions')

const subscribeTopics = ['/sensorEvents', '/systemEvents', '/connectionEvents']

const connectedDevices = new Map()
const db = new Client({
  host: 'localhost',
  port: 5432,
  database: 'guardpi',
  user: 'guardpi_user',
  password: 'XeqLLSLkl3IcgsYp',
})

const client = mqtt.connect('mqtts://postman.cloudmqtt.com:25145', {
  username: 'yrahqccv',
  password: 'IJBjDBMUekyr',
})

const messageHandler = (topic, data) => {
  const { type, state, deviceName, mac } = JSON.parse(data)
  switch (topic) {
    case '/systemEvents':
      // console.log(JSON.parse(data));
      // system_event(db, name, type, mac, message);
      break
    case '/connectionEvents':
      connectedDevices.set(mac, {
        state,
        deviceName,
        type,
        mac,
      })
      console.log(mac)
      getServerMessage(`${deviceName} connected.`)
      break
    default:
      break
  }
}

const subscribeToTopic = (topic) => {
  return new Promise((resolve, reject) => {
    client.subscribe(topic, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(getServerMessage(`MQTT subscribed to ${topic}.`))
      }
    })
  })
}

const switchSensor = (mac, state) => {
  switch (state) {
    case 0:
      client.publish(
        '/sensorEvents',
        JSON.stringify({
          cmd: 'DISARM',
          mac: '2C:F4:32:49:CA:BC',
        })
      )
      break
    case 1:
      client.publish(
        '/sensorEvents',
        JSON.stringify({
          cmd: 'ARM',
          mac: mac,
        })
      )
      break
  }
}

client.on('connect', function () {
  getServerMessage('CloudMQTT connected.')
  subscribeTopics.map((topic) => {
    subscribeToTopic(topic)
  })
})

client.on('message', (topic, data, pkt) => {
  // console.log(topic, msg.toString('utf8'), pkt);
  messageHandler(topic, data.toString('utf8'))
})

db.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    getServerMessage('Database connected.')
  }
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/login', function (req, res) {
  const callback = (data) => {
    res.send(data)
  }
  login(connection, req.body.username, req.body.userPass, callback)
})

app.get('/events', (req, res) => {
  const callback = (data) => {
    res.send(data)
  }
  retrieve_events(connection, callback)
})

app.get('/status', (req, res) => {
  const events = []
  const data = {
    events,
    devices: Array.from(connectedDevices, ([key, value]) => value),
  }
  res.send(data)
})

app.get('/switchOnline', (req, res) => {
  const state = Number(req.query.state)
  const mac = req.query.mac
  console.log(mac)
  console.log(state)
  const devices = Array.from(connectedDevices, ([key, value]) => value)
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].mac === mac) {
      state === 0 ? (devices[i].state = 1) : (devices[i].state = 0)
      switchSensor(mac, devices[i].state)
      console.log(devices[i])
      break
    }
  }
  // devices.map((device) => {
  //   if (device.mac === mac) {
  //     console.log(device)
  //     device.state = state === 0 ? 1 : 0
  //   }
  //   connectedDevices.add(device)
  // })
  res.send(Array.from(connectedDevices, ([key, value]) => value))
})

app.get('/switchAllOnline', (req, res) => {
  const state = req.query.state
  const devices = Array.from(connectedDevices, ([key, value]) => value)
  for (let i = 0; i < devices.length; i++) {
    state === 'ON' ? (devices[i].state = 1) : (devices[i].state = 0)
  }
  res.send(Array.from(connectedDevices, ([key, value]) => value))
})

app.listen(PORT, () => {
  getServerMessage(`Server up on PORT ${PORT}.`)
})
