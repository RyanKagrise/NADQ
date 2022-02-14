

CREATE TABLE Users (
    id SERIAL PRIMARY KEY NOT NULL,
    username varchar(25) UNIQUE NOT NULL,
    email varchar(50) NOT NULL,
    hashedPassword varchar(50) NOT NULL
);

CREATE TABLE Questions (
    id SERIAL PRIMARY KEY NOT NULL,
    content varchar(255) NOT NULL,
    topicId integer NOT NULL REFERENCES Topics(id),
    userId integer NOT NULL REFERENCES Users(id)
);

CREATE TABLE Answers (
    id SERIAL PRIMARY KEY NOT NULL,
    content varchar(500) NOT NULL,
    questionId INTEGER NOT NULL REFERENCES Questions(id),
    userId INTEGER NOT NULL REFERENCES Users(id)
);

CREATE TABLE Topics (
    id SERIAL PRIMARY KEY NOT NULL,
    name varchar(50) NOT NULL
);

CREATE TABLE Comments (
    id SERIAL PRIMARY KEY NOT NULL,
    content varchar(500) NOT NULL,
    answerId INTEGER NOT NULL REFERENCES Answers(id),
    userId INTEGER NOT NULL REFERENCES Users(id)
);
