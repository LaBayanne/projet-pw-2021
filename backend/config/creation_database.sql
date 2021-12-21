sudo -u postgres psql

CREATE DATABASE PostFlex;

CREATE TABLE echange (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    person_name VARCHAR(255) NOT NULL,
    starting_date VARCHAR(255) NOT NULL ,
    ending date VARCHAR(255) NOT NULL,
    attached_team VARCHAR(255),
    country_destination VARCHAR(255) NOT NULL,
    city_destination VARCHAR(255) NOT NULL,
    country_destination VARCHAR(255) NOT NULL,
    city_destination VARCHAR(255) NOT NULL,
    country_origin VARCHAR(255) NOT NULL,
    city_origin VARCHAR(255) NOT NULL
);

CREATE_TABLE user (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
);