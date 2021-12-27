INSERT INTO exchange ( 
    id ,
    person_name,
    starting_date,
    ending_date,
    attached_team,
    country_destination,
    country_origin,
    city_destination,
    city_origin
) SELECT 
    round(random()*1000),
    (ARRAY['Jean','Gabriel', 'Pierre', 'Albert', 'Emma', 'Alice', 'Gertrude', 'Frodon', 'Freddy', 'Buffy', 'Xemnas', 'Yoda'])[round(random()*11+1)],
    '' || round(random()*29+1) || '-' || round(random()*11 + 1) || '-201' || round(random()*9), 
    '' || round(random()*29+1) || '-' || round(random()*11 + 1) || '-202' || round(random()*9), 
    (ARRAY['SonsOfAnarchy', 'Illuminati', 'RocketTeam'])[round(random()*2+1)],
    (ARRAY['France', 'Spain', 'Germany', 'Italy', 'Japan'])[round(random()*4+1)],
    (ARRAY['France', 'Spain', 'Germany', 'Italy', 'Japan'])[round(random()*4+1)],
    (ARRAY['Paris', 'Bordeaux', 'Toulouse', 'London', 'Tokyo', 'Berlin', 'Barcelona', 'Roma'])[round(random()*7+1)],
    (ARRAY['Paris', 'Bordeaux', 'Toulouse', 'London', 'Tokyo', 'Berlin', 'Barcelona', 'Roma'])[round(random()*7+1)]
FROM generate_series(1,1000);