CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
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