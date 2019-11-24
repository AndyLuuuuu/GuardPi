DROP DATABASE guardPi;
CREATE DATABASE guardPi;

DROP TABLE IF EXISTS userAccounts;
DROP TABLE IF EXISTS devices;
DROP TABLE IF EXISTS systemEvents;

CREATE TABLE userAccounts (
    id VARCHAR(255) NOT NULL UNIQUE,
    username CHAR(50) NOT NULL,
    userPass VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    PRIMARY KEY (token)
);

CREATE TABLE devices (
    deviceID VARCHAR(255) NOT NULL,
    mac CHAR(20) NOT NULL,
    deviceName VARCHAR(255) NOT NULL,
    isConnected BOOLEAN DEFAULT FALSE,
    userToken VARCHAR(255) NOT NULL,
    PRIMARY KEY (deviceID),
    FOREIGN KEY (userToken)
        REFERENCES userAccounts (token)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE systemEvents(
    id SERIAL,
    eventTime TIMESTAMP NOT NULL,
    deviceID VARCHAR(255) NOT NULL,
    eventMessage VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (deviceID)
        REFERENCES devices (deviceID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO userAccounts (id, username, userPass, token) VALUES ('ee83d499-f19f-4101-9b55-b50d0311b768', 'guardPi_user', '$2b$10$OhrmA9r0N62rH4J5.KAj5OBfw2xLoiTBiPCfLsULj.UjvxovuMRUO', '7689e12f-6498-4b63-804f-94cd463d0d4f');

-- omit creating a user if user account below has already been created
CREATE USER guardPi_user WITH PASSWORD 'XeqLLSLkl3IcgsYp';

GRANT SELECT, UPDATE, INSERT, UPDATE ON useraccounts TO guardPi_user;
GRANT SELECT, UPDATE, INSERT, UPDATE ON devices TO guardPi_user;
GRANT SELECT, UPDATE, INSERT, UPDATE ON systemevents TO guardPi_user;