CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_activated BOOLEAN DEFAULT false,
    activation_link TEXT
)

CREATE TABLE token(
    id SERIAL PRIMARY KEY,
    refresh_token TEXT NOT NULL,
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id) 
)

CREATE TABLE room (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
)

CREATE TABLE room_member (
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id),
    room_id VARCHAR(255),
    FOREIGN KEY (room_id) REFERENCES room (id) 
)

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    room_id VARCHAR(255),
    FOREIGN KEY (room_id) REFERENCES room (id),
    person_id INTEGER,
    FOREIGN KEY (person_id) REFERENCES person (id),
    content TEXT NOT NULL
)