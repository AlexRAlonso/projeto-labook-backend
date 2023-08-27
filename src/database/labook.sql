-- Active: 1692979773167@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime'))
);

CREATE TABLE posts (
    id TEXT NOT NULL PRIMARY KEY UNIQUE,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER,
    dislikes INTEGER,
    created_at TEXT DEFAULT(DATETIME('now', 'localtime')),
    updated_at TEXT DEFAULT(DATETIME('now', 'localtime')),
    Foreign Key (creator_id) REFERENCES users (id)
);

CREATE TABLE likes_dislikes (
    user_id TEXT NOT NULL UNIQUE,
    post_id TEXT NOT NULL UNIQUE,
    like INTEGER,
    Foreign Key (user_id) REFERENCES users (id),
    Foreign Key (post_id) REFERENCES posts (id)
);

INSERT INTO users (id, name, email, password, role)
VALUES
("u001", "Augustus", "augustus@email.com", "aug123", "NORMAL"),
("u002", "Tiberius", "tiberius@email.com", "tib123", "NORMAL"),
("u003", "Caligula", "gaius@email.com", "gai123", "NORMAL"),
("u004", "Claudius", "claudius@email.com", "cla123", "NORMAL");

INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
("p001", "u001", "I found Rome a city of bricks and left it a city of marble.", "120", "0"),
("p002", "u002", "Let them hate me, provided they respect my conduct.", "3", "26"),
("p003", "u003", "Do neither good nor ill to the man whom I have sent you", "10", "12"),
("p004", "u004", "To do no evil is good, to intend none is better.", "20", "5");

drop table users;

drop table posts;