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
  "INSERT INTO devices (deviceID, deviceType, deviceName, mac, userToken) VALUES ($1, $2, $3, $4, $5)",
  [
    uuidv4(),
    "motion",
    "PIR Sensor",
    "EC:FA:BC:53:DB:36",
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
  "INSERT INTO devices (deviceID, deviceType, deviceName, mac, userToken) VALUES ($1, $2, $3, $4, $5)",
  [
    uuidv4(),
    "laser",
    "Doorway Laser",
    "2C:F4:32:49:CA:BC",
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
  "INSERT INTO devices (deviceID, deviceType, deviceName, mac, userToken) VALUES ($1, $2, $3, $4, $5)",
  [
    uuidv4(),
    "camera",
    "Hallway Camera",
    "DC:A6:32:1C:4B:6B",
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
