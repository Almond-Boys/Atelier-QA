DROP DATABASE IF EXISTS QA;
CREATE DATABASE QA;

USE QA;

CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 question_body VARCHAR,
 question_date DATE,
 question_asker VARCHAR,
 question_helpfulness INTEGER
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers (
 id BIGSERIAL,
 answer_body VARCHAR,
 answer_date DATE,
 answer_helpfulness INTEGER,
 question_id INTEGER
);


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id BIGSERIAL,
 answer_id INTEGER,
 url VARCHAR
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE photos ADD CONSTRAINT photos_id_fkey FOREIGN KEY (id) REFERENCES answers(id);