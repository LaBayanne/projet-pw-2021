sudo -u postgres psql

CREATE DATABASE erasmus;

CREATE TABLE exchange (
<<<<<<< HEAD
    id int(11) NOT NULL PRIMARY KEY,
=======
    id VARCHAR(255) NOT NULL PRIMARY KEY,
>>>>>>> 061f6e3660a1f41e618be9866edc2fab9512b9ab
    person_name VARCHAR(255) NOT NULL,
    starting_date VARCHAR(255) NOT NULL ,
    ending_date VARCHAR(255) NOT NULL,
    attached_team VARCHAR(255),
    country_destination VARCHAR(255) NOT NULL,
<<<<<<< HEAD
=======
    city_destination VARCHAR(255) NOT NULL,
>>>>>>> 061f6e3660a1f41e618be9866edc2fab9512b9ab
    country_origin VARCHAR(255) NOT NULL,
    city_destination VARCHAR(255) NOT NULL,
    city_origin VARCHAR(255) NOT NULL
);

CREATE TABLE account (
<<<<<<< HEAD
    id int(11) NOT NULL PRIMARY KEY,
=======
    id VARCHAR(255) NOT NULL PRIMARY KEY,
>>>>>>> 061f6e3660a1f41e618be9866edc2fab9512b9ab
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);