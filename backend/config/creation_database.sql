sudo -u postgres psql

CREATE DATABASE erasmus;

CREATE TABLE exchange (
    id int(11) NOT NULL PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    starting_date VARCHAR(255) NOT NULL ,
    ending_date VARCHAR(255) NOT NULL,
    attached_team VARCHAR(255), NOT NULL,
    country_destination VARCHAR(255) NOT NULL,
    country_origin VARCHAR(255) NOT NULL,
    city_destination VARCHAR(255) NOT NULL,
    city_origin VARCHAR(255) NOT NULL
);

CREATE TABLE account (
    id int(11) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);