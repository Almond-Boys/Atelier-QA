require('newrelic');
const express = require('express');
const app = express();
const port = 3001;
const controller = require('./controller/controller.js');

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/qa/questions', controller.getQuestions);
app.get('/qa/questions/:question_id/answers', controller.getAnswers);
app.post('/qa/questions/', controller.postQuestion);
app.post('/qa/questions/:question_id/answers', controller.postAnswer);
app.put('/qa/questions/:question_id/helpful', controller.putQuestionHelpful);
app.put('/qa/questions/:question_id/report', controller.putQuestionReport);
app.put('/qa/answers/:answer_id/helpful', controller.putAnswerHelpful);
app.put('/qa/answers/:answer_id/report', controller.putAnswerReport);
