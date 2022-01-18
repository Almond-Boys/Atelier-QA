
\c postgres;

DROP DATABASE IF EXISTS QA;

CREATE DATABASE QA;

\c qa;



CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 question_body VARCHAR,
 question_date BIGINT,
 question_asker VARCHAR,
 question_asker_email VARCHAR,
 question_helpfulness INTEGER DEFAULT 0,
 CHECK (question_helpfulness > -1),
 question_reported BOOLEAN DEFAULT 'FALSE'
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers (
 id BIGSERIAL,
 answer_body VARCHAR,
 answer_date BIGINT,
 answerer_name VARCHAR,
 answerer_email VARCHAR,
 answer_helpfulness INTEGER DEFAULT 0,
 CHECK (answer_helpfulness > -1),
 question_id INTEGER,
 answer_reported BOOLEAN DEFAULT 'FALSE'
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



COPY questions(id, product_id, question_body, question_date, question_asker, question_asker_email, question_reported, question_helpfulness)
FROM '/Users/michael/Downloads/Master/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, answer_body, answer_date, answerer_name, answerer_email, answer_reported, answer_helpfulness)
FROM '/Users/michael/Downloads/Master/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/michael/Downloads/Master/answers_photos.csv'
DELIMITER ','
CSV HEADER;

alter table questions alter column question_date set data type timestamp with time zone using to_timestamp(question_date/1000);
alter table answers alter column answer_date set data type timestamp with time zone using to_timestamp(answer_date/1000);

SELECT setval(pg_get_serial_sequence('questions', 'id'), coalesce(max(id), 0)+1 , false) FROM questions;

INSERT INTO questions(
	product_id, question_body, question_date, question_asker, question_asker_email, question_helpfulness, question_reported)
	VALUES (2, 'hello world', NOW(), 'michael', 'vmichael.wu@gmail.com', 1, FALSE);

SELECT setval(pg_get_serial_sequence('answers', 'id'), coalesce(max(id), 0)+1 , false) FROM answers;