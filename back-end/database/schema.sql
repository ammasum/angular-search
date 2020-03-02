DROP DATABASE test;
CREATE DATABASE test;
use test;

create table users (
	id INT PRIMARy KEY AUTO_INCREMENT,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(50),
	password VARCHAR(200)
);

CREATE TABLE token (
    id INT PRIMARy KEY AUTO_INCREMENT,
    token VARCHAR(100)
);