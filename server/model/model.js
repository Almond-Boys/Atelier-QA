const db = require('../../database/index.js');

// questionsGet query
const sendQuestions = (callback, request) => {
  const count = request.query.count;
  const product_id = request.query.product_id;
  const questionQuery = `SELECT
                      product_id,
                      json_agg(
                        json_build_object(
                          'question_id', q.id, 'question_body', q.question_body,
                          'question_date', q.question_date, 'asker_name', q.question_asker,
                          'question_helpfulness', q.question_helpfulness,
                          'reported', q.question_reported,
                          'answers', (
                            SELECT coalesce(answers, '{}')
                            FROM (
                              SELECT
                                json_object_agg(
                                  id,
                                  json_build_object(
                                    'id', id, 'body', answer_body, 'date', answer_date,
                                    'answerer_name', answerer_name, 'helpfulness', answer_helpfulness,
                                    'photos', (
                                      SELECT coalesce(photos, '[]')
                                      FROM (
                                        SELECT json_agg(url) as photos
                                        FROM photos p
                                        WHERE p.id = a.id
                                      ) as photos
                                    )
                                  )
                                ) as answers
                              FROM answers a
                              WHERE a.question_id = q.id
                            ) as answers
                          )
                        )
                      ) as results
                    FROM (
                      SELECT *
                      FROM questions
                      WHERE product_id = ${product_id}
                        AND question_reported = false
                    ) as q
                    GROUP BY 1`;

  db.query(questionQuery, (err, results, fields) => {
    callback(err, results.rows);
  });
};

const sendAnswers = (callback, request) => {
  const count = request.query.count;
  const question_id = request.params.question_id;

  const answerString = `SELECT
  json_agg(
    json_build_object(
      'answer_id', answers.id,
      'body', answers.answer_body,
      'date', answers.answer_date,
      'answerer_name', answers.answerer_name,
      'helpfulness', answers.answer_helpfulness,
      'photos', (
        SELECT coalesce(photos, '[]')
        FROM (
          SELECT json_agg(url) as photos
          FROM photos
          WHERE photos.id = answers.id
        ) as photos
      )
    )
  )  as results
  FROM answers
  WHERE question_id = ${question_id}`;

  db.query(answerString, (error, results, fields) => {
    callback(error, {
      question: question_id,
      page: 0,
      count: count,
      results: results.rows[0].results,
    });
  });
};
// json build object

const createQuestion = (callback, request) => {
  const textBody = request.body.body;
  const user = request.body.name;
  const email = request.body.email;
  const product_id = request.body.product_id;

  const questionString = `INSERT INTO questions(
    product_id, question_body, question_date, question_asker,
    question_asker_email, question_helpfulness, question_reported)
    VALUES (${product_id}, '${textBody}', NOW(), '${user}', '${email}', 0, FALSE)`;

  db.query(questionString, (error, results, fields) => {
    callback(error, 'STATUS: 201 OK');
  });
};

const createAnswer = (callback, request) => {
  console.log('PARAMS', request.params);
  console.log('BODY', request.body);
  const textBody = request.body.body;
  const user = request.body.name;
  const email = request.body.email;
  const question_id = request.params.question_id;
  const photos = request.body.photos;
  const answerString = `INSERT INTO answers(
    answer_body, answer_date, answerer_name, answerer_email, answer_helpfulness, question_id, answer_reported)
    VALUES ('${textBody}', NOW(),
    '${user}', '${email}', 0, ${question_id}, FALSE);`;

  db.query(answerString, (error, results, fields) => {
    callback(error, 'STATUS: 201 OK');
  });
};

const markQuestionHelpful = (callback, request) => {
  const id = request.params.question_id;
  const helpfulString = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE id = ${id}`;

  db.query(helpfulString, (error, results, fields) => {
    callback(error, 'STATUS: 201 OK');
  });
};

const reportQuestion = (callback, request) => {
  const id = request.params.question_id;

  const reportString = `UPDATE questions SET question_reported = TRUE WHERE id = ${id}`;

  db.query(reportString, (error, results, fields) => {
    callback(error, 'STATUS: 204 NO CONTENT');
  });
};

const markAnswerHelpful = (callback, request) => {
  const id = request.params.answer_id;
  const helpfulString = `UPDATE answers SET answer_helpfulness = answer_helpfulness + 1 WHERE id = ${id}`;

  db.query(helpfulString, (error, results, fields) => {
    callback(error, 'STATUS: 201 OK');
  });
};

const reportAnswer = (req, res) => {
  const id = request.params.answer_id;
  const reportString = `UPDATE answers
  SET answer_reported = TRUE WHERE id = ${id}`;

  db.query(reportString, (error, results, fields) => {
    callback(error, 'STATUS: 204 NO CONTENT');
  });
};

module.exports = {
  sendQuestions: sendQuestions,
  sendAnswers: sendAnswers,
  createQuestion: createQuestion,
  createAnswer: createAnswer,
  markQuestionHelpful: markQuestionHelpful,
  markAnswerHelpful: markAnswerHelpful,
  reportQuestion: reportQuestion,
  reportAnswer: reportAnswer,
};

/*
GOALS TODAY:
benchmark for query
stress testing
day and a half to deploy left
deploy by midday thursday

*/
