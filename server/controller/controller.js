const model = require('../model/model.js');

const getQuestions = (req, res) => {
  model.sendQuestions((err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data[0]);
    }
  }, req);
};

const getAnswers = (req, res) => {
  model.sendAnswers((err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  }, req);
};

const postQuestion = (req, res) => {
  model.createQuestion((err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(201).send(data);
    }
  }, req);
};

const postAnswer = (req, res) => {
  model.createAnswer((err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(201).send(data);
    }
  }, req);
};

const putQuestionHelpful = (req, res) => {
  model.markQuestionHelpful((err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(201).send('STATUS: 201 OK');
    }
  }, req);
};

const putQuestionReport = (req, res) => {
  model.markQuestionHelpful((err, string) => {
    if (err) {
      throw err;
    } else {
      res.status(204).send(string);
    }
  }, req);
};

const putAnswerHelpful = (req, res) => {
  model.markAnswerHelpful((err, data) => {
    if (err) {
      throw err;
    } else {
      res.status(201).send('STATUS: 201 OK');
    }
  }, req);
};

const putAnswerReport = (req, res) => {
  model.reportAnswer((err, string) => {
    if (err) {
      throw err;
    } else {
      res.status(204).send(string);
    }
  }, req);
};

module.exports = {
  getQuestions: getQuestions,
  getAnswers: getAnswers,
  postQuestion: postQuestion,
  postAnswer: postAnswer,
  putQuestionHelpful: putQuestionHelpful,
  putQuestionReport: putQuestionReport,
  putAnswerHelpful: putAnswerHelpful,
  putAnswerReport: putAnswerReport,
};
