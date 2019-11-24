const { Client } = require("pg");
const uuidv4 = require("uuid/v4");

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

connection.query(
  "INSERT INTO devices (deviceID, mac, deviceName, userToken) VALUES ($1, $2, $3, $4)",
  [
    uuidv4(),
    "EC:FA:BC:53:DB:36",
    "PIR Sensor",
    "7689e12f-6498-4b63-804f-94cd463d0d4f"
  ],
  (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result);
    }
  }
);

connection.query(
  "INSERT INTO devices (deviceID, mac, deviceName, userToken) VALUES ($1, $2, $3, $4)",
  [
    uuidv4(),
    "2C:F4:32:49:CA:BC",
    "Doorway Laser",
    "7689e12f-6498-4b63-804f-94cd463d0d4f"
  ],
  (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result);
    }
  }
);

connection.query(
  "INSERT INTO devices (deviceID, mac, deviceName, userToken) VALUES ($1, $2, $3, $4)",
  [
    uuidv4(),
    "DC:A6:32:1C:4B:6B",
    "Hallway Camera",
    "7689e12f-6498-4b63-804f-94cd463d0d4f"
  ],
  (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log(result);
    }
  }
);
