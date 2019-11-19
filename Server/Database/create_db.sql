DROP DATABASE IF EXISTS guardPi;
CREATE DATABASE guardPi;
USE guardPi;

DROP TABLE IF EXISTS userAccounts;
CREATE TABLE userAccounts (
    id VARCHAR(255) NOT NULL UNIQUE,
    username CHAR(50) NOT NULL,
    userPass VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    PRIMARY KEY (token)
);

DROP TABLE IF EXISTS devices;
CREATE TABLE devices (
    deviceID VARCHAR(255) NOT NULL,
    mac CHAR(20) NOT NULL,
    deviceName VARCHAR(255) NOT NULL,
    PRIMARY KEY (deviceID)
);

DROP TABLE IF EXISTS systemEvents;
CREATE TABLE systemEvents(
    id INT AUTO_INCREMENT NOT NULL,
    eventTime TIMESTAMP NOT NULL,
    deviceID VARCHAR(255) NOT NULL,
    eventMessage VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (deviceID)
        REFERENCES devices (deviceID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO userAccounts SET id = "ee83d499-f19f-4101-9b55-b50d0311b768", username="guardPi_user", userPass="$2b$10$OhrmA9r0N62rH4J5.KAj5OBfw2xLoiTBiPCfLsULj.UjvxovuMRUO", token="7689e12f-6498-4b63-804f-94cd463d0d4f";

-- omit creating a user if user account below has already been created
CREATE USER 'guardPi_user'@'localhost' IDENTIFIED BY 'XeqLLSLkl3IcgsYp';
GRANT SELECT, DELETE, INSERT, UPDATE ON guardPi.* TO 'guardPi_user'@'localhost';