-- psql -U postgres

--\l lists all databases in postgres
--\c into washdown_stations
--\dt - shows tables in database
-- DROP DATABASE <Datbase name>

CREATE DATABASE washdown_stations;

CREATE TABLE ranger (
    ID SERIAL PRIMARY KEY,
    RangerName VARCHAR(40),
    UserName VARCHAR(40) UNIQUE,
    AdminPassword VARCHAR(40)
);

CREATE TABLE station (
    ID SERIAL PRIMARY KEY,
    Longitude VARCHAR(40) NOT NULL,
    Latitude VARCHAR(40) NOT NULL,
    Information VARCHAR(200),
    Operating BOOLEAN
);

CREATE DOMAIN Water_Quality AS VARCHAR(20)
DEFAULT 'Excellent'
CHECK (VALUE IN ('Excellent', 'Very Good', 'Good', 'Fair', 'Marginal', 'Poor'));

CREATE TABLE station_check (
    ID SERIAL PRIMARY KEY,
    WaterLevel INTEGER,
    WaterQuality Water_Quality,
    StationID INTEGER,
    RangerID INTEGER,
    FOREIGN KEY (StationID) REFERENCES station(ID)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (RangerID) REFERENCES ranger(ID),
    CheckDate TIMESTAMP
);

CREATE TABLE report (
    ID SERIAL PRIMARY KEY,
    RangerID INTEGER,
    FOREIGN KEY (RangerID) REFERENCES ranger(ID),
    Issue VARCHAR(200),
    Cleared BOOLEAN
);



