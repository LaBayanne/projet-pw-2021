CREATE TEMP TABLE countryCities (  -- table also registers row type
  country text,
  cities text ARRAY
);

DO
$$
DECLARE 
    countries TEXT ARRAY  DEFAULT  ARRAY['France', 'Spain', 'Germany', 'Italy', 'Japan', 'Australia', 'Brazil', 'Denmark', 'Egypt', 'Madagascar',
                                            'Mexico', 'South Africa', 'United States of America'];
    countryDestination TEXT := (countries)[round(random()*(array_length(countries, 1)-1) + 1)];
    countryOrigin TEXT := (countries)[round(random()*(array_length(countries, 1)-1) + 1)];
    citiesOrigin TEXT ARRAY;
    cityOrigin TEXT;
    citiesDestination TEXT ARRAY;
    cityDestination TEXT;

BEGIN
    INSERT INTO countryCities VALUES ('France', '{"Toulouse", "Bordeaux", "Paris"}'), 
                                     ('Spain', '{"Barcelona", "Madrid"}'), 
                                     ('Germany', '{"Berlin", "Hamburg"}'), 
                                     ('Italy', '{"Rome", "Milan", "Naples"}'),
                                     ('Japan', '{"Osaka", "Tokyo"}'),
                                     ('Italy', '{"Rome", "Milan", "Naples"}'),
                                     ('Australia', '{"Sydney", "Melbourne"}'),
                                     ('Brazil', '{"Rio de Janeiro"}'),
                                     ('Denmark', '{"Copenhagen", "Odense"}'),
                                     ('Egypt', '{"Cairo", "Alexandria"}'),
                                     ('Madagascar', '{"Ambalavao", "Ambanja"}'),
                                     ('Mexico', '{"Mexico City", "Tijuana"}'),
                                     ('South Africa', '{"Alice", "Butterworth"}'),
                                     ('United States of America', '{"New York", "Chicago", "Los Angeles"}');


    FOR i IN 1..5000 LOOP

        countryOrigin := (countries)[round(random()*(array_length(countries, 1)-1) + 1)];

        WHILE countryDestination = countryOrigin LOOP
            countryDestination := (countries)[round(random()*(array_length(countries, 1)-1) + 1)];
        END LOOP;

        SELECT cities INTO citiesOrigin FROM countryCities WHERE country = countryOrigin;
        cityOrigin := (citiesOrigin)[round(random()*(array_length(citiesOrigin, 1)-1) + 1)];
        SELECT cities INTO citiesDestination FROM countryCities WHERE country = countryDestination;
        cityDestination := (citiesDestination)[round(random()*(array_length(citiesDestination, 1)-1) + 1)];

        INSERT INTO exchange ( 
            id ,
            person_name,
            starting_date,
            ending_date,
            attached_team,
            country_destination,
            country_origin,
            city_destination,
            city_origin) 
        SELECT 
            round(random()*1000),
            (ARRAY['Jean','Gabriel', 'Pierre', 'Albert', 'Emma', 'Alice', 'Gertrude', 'Frodon', 'Freddy', 'Buffy', 'Xemnas', 'Yoda'])[round(random()*11+1)],
            '' || round(random()*29+1) || '-' || round(random()*11 + 1) || '-201' || round(random()*9), 
            '' || round(random()*29+1) || '-' || round(random()*11 + 1) || '-202' || round(random()*9), 
            (ARRAY['SonsOfAnarchy', 'Illuminati', 'RocketTeam'])[round(random()*2+1)],
            countryDestination,
            countryOrigin,
            cityDestination,
            cityOrigin;
   END LOOP;

END
$$