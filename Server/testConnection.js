const mqtt = require('mqtt');
// const connection = new Client({
//   host: 'localhost',
//   port: 5432,
//   database: 'guardpi',
//   user: 'guardpi_user',
//   password: 'XeqLLSLkl3IcgsYp'
// });

const getServerMessage = message => {
  console.log(`<${new Date().toLocaleString()}> ${message}`);
};

const client = mqtt.connect('mqtts://postman.cloudmqtt.com:25145', {
  username: 'yrahqccv',
  password: 'IJBjDBMUekyr'
});

const publish = (topic, message) => {
  return new Promise((resolve, reject) => {
    client.publish(topic, message);
    resolve({ topic, message });
  });
};

publish(
  '/connectionEvents',
  JSON.stringify(
    (data = {
      name: 'Hallway laser',
      type: 'Laser',
      mac: '50:9d:e6:91:58:1e',
      message: 'Device connected'
    })
  )
).then(({ topic, message }) => {
  getServerMessage(`Connection event published to ${topic}`);
});

publish(
  '/systemEvents',
  JSON.stringify(
    (data = {
      name: 'Hallway laser',
      type: 'Laser',
      mac: '50:9d:e6:91:58:1e',
      message: 'Laser triggered'
    })
  )
).then(({ topic, message }) => {
  getServerMessage(`Connection event published to ${topic}`);
});
