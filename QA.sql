CREATE TABLE questions (
 id BIGSERIAL,
 product_id INTEGER,
 question_body VARCHAR(255),
 question_date BIGINT,
 question_asker VARCHAR(100),
 question_helpfulness INTEGER DEFAULT 0,
 CHECK (question_helpfulness > 0),
 question_reported BOOLEAN DEFAULT 'FALSE'
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers (
 id BIGSERIAL,
 answer_body VARCHAR(255),
 answer_date BIGINT,
 answer_helpfulness INTEGER DEFAULT 0,
 CHECK (answer_helpfulness > 0),
 question_id INTEGER
);


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id BIGSERIAL,
 answer_id INTEGER,
 url VARCHAR(255)
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE photos ADD CONSTRAINT photos_id_fkey FOREIGN KEY (id) REFERENCES answers(id);