CREATE TABLE reservations (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    desk_id integer NOT NULL,
    date_from text NOT NULL,
    date_to text NOT NULL,
    user_id varchar(255) NOT NULL,
    user_name varchar(255) NOT NULL
);