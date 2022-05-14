DROP EXTENSION IF EXISTS pgcrypto;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS meals CASCADE;
DROP TABLE IF EXISTS students_meals CASCADE;
DROP TABLE IF EXISTS students_books CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
CREATE EXTENSION pgcrypto;


CREATE FUNCTION make_uid(tablename TEXT) RETURNS text AS $$
DECLARE
    new_uid text;
    done bool;
BEGIN
    done := false;
    WHILE NOT done LOOP
        new_uid := md5(''||now()::text||random()::text);
        EXECUTE format('SELECT 1 FROM %s WHERE id = %L;', tablename,  new_uid )
        INTO done;
    END LOOP;
    RETURN new_uid;
END;
$$ LANGUAGE PLPGSQL VOLATILE;


CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT make_uid('users'),
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(512) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(100) NOT NULL,
    picture TEXT NOT NULL,
    extra JSON NOT NULL
);


CREATE TABLE books (
    id TEXT PRIMARY KEY DEFAULT make_uid('books'),
    title VARCHAR(255) NOT NULL,
    description TEXT DEFAULT 'N/A',
    cover TEXT NOT NULL
);

CREATE TABLE students_books (
    id TEXT PRIMARY KEY DEFAULT make_uid('students_books'),
    student_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    book_id TEXT UNIQUE REFERENCES books(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL
);

CREATE TABLE settings (
    id TEXT PRIMARY KEY DEFAULT make_uid('settings'),
    label VARCHAR(255) NOT NULL,
    value JSON NOT NULL
);

CREATE TABLE meals (
    id TEXT PRIMARY KEY DEFAULT make_uid('meals'),
    label TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    end_at BIGINT NOT NULL
);

CREATE TABLE students_meals (
    id TEXT PRIMARY KEY DEFAULT make_uid('students_meals'),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    meal_id TEXT REFERENCES meals(id) ON DELETE CASCADE
);


INSERT INTO users (username, email, firstname, lastname, password, role, picture, extra)
VALUES
('sami', 'sami@gmail.com', 'Sami', 'Dahia', CRYPT('123456789', gen_salt('bf')), 'admin', '', '{}');

INSERT INTO
settings
(label, value)
VALUES
('breakfast',  '{"starts": "06:00", "stops": "08:00"}'),
('lunch',  '{"starts": "12:00", "stops": "14:00"}'),
('dinar',  '{"starts": "21:00", "stops": "23:00"}');
