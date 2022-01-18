const express = require('express');
const app = express();
const port = 3001;
const controllers = require('./controllers');
app.use(express.json());
// question test route

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/qa/questions', controllers.sendQuestions);
app.get('/qa/questions/:question_id/answers', controllers.sendAnswers);
app.post('/qa/questions/', controllers.createQuestion);
app.post('/qa/questions/:question_id/answers', controllers.createAnswer);
app.put('/qa/questions/:question_id/helpful', controllers.markQuestionHelpful);
app.put('/qa/questions/:question_id/report', controllers.reportQuestion);
app.put('/qa/answers/:answer_id/helpful', controllers.markAnswerHelpful);
app.put('/qa/answers/:answer_id/report', controllers.reportAnswer);
