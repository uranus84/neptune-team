-- DROP DATABASE  infomapptips;  /* <= for testing COMMENT THIS OUT FOR FIRST DATABASE CREATION */
-- CREATE DATABASE infomapptips;

USE xzrctothavjrrohs;

CREATE TABLE IF NOT EXISTS tipstable (
  ID            INT             NOT NULL          AUTO_INCREMENT,
  city          VARCHAR(60),
  state         VARCHAR(20),
  name          VARCHAR(30),
  tiptext       VARCHAR(200),
  datecreated   TIMESTAMP       NOT NULL DEFAULT  CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS admin (
  ID            INT             NOT NULL          AUTO_INCREMENT,
  user_id       VARCHAR(20),
  PRIMARY KEY (ID) 
);

-- INSERT INTO tipstable (city, state, name, tiptext) VALUES ('san francisco', 'california', 'James Dean', 'Be sure to see the Golden Gate park');
-- INSERT INTO tipstable (city, state, name, tiptext) VALUES ('san francisco', 'california', 'Rita Hayworth', 'Go see a good movie at the new Drafthouse.');
-- INSERT INTO tipstable (city, state, name, tiptext, datecreated) VALUES ('san francisco', 'california', 'Andy Kufmann', 'The BART is the nicest subway I have ever seen.', '2017-11-18 09:09:09');
-- INSERT INTO tipstable (city, state, name, tiptext, datecreated) VALUES ('san francisco', 'california', 'Marlon Brando', 'Be sure to see the Golden Gate park', '2017-11-12 10:10:10');
-- INSERT INTO tipstable (city, state, name, tiptext, datecreated) VALUES ('san francisco', 'california', 'Molly Ringwald', 'I love the Exploratorium, go there!', '2016-10-22 11:11:11');
-- INSERT INTO tipstable (city, state, name, tiptext, datecreated) VALUES ('san francisco', 'california', 'Connor MacLeod', 'There can be only one.', '2016-10-22 10:18:02');
-- INSERT INTO tipstable (city, state, name, tiptext) VALUES ('austin', 'texas', 'Bette Davis', 'It can get a bit hot in the summer.');
-- INSERT INTO tipstable (city, state, name, tiptext) VALUES ('austin', 'texas', 'James Stewart', 'Franklin\'s BBQ is the best!');
-- INSERT INTO tipstable (city, state, name, tiptext, datecreated) VALUES ('austin', 'texas', 'Clark Gable', 'Town Lake is a great place to start a hike.', '2017-11-21 11:09:10');
-- INSERT INTO tipstable (city, state, name, tiptext, datecreated) VALUES ('austin', 'texas', 'Cary Grant', 'Taco Deli are the best tacos on the planet.', '2017-11-21 08:08:08');







