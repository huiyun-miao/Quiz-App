import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";

const listTopics = async({ render }) => {
    render("quizTopic.eta", {topics: await topicService.listTopics()});
};

const randomQuestionByTopic = async({ params, render, response }) => {
    const questionData = await questionService.randomQuestionByTopic(params.tId);
    if (questionData) {
        const qId = questionData.id;
        response.redirect(`/quiz/${params.tId}/questions/${qId}`);
    } else {
        render("quizQuestion.eta");
    }
};

const showQuestion = async({ params, render }) => {
    const questionData = {
        tId: params.tId,
        qId: params.qId,
        question: await questionService.findQuestionById(params.qId),
        answerOptions: await questionService.listAnswerOptions(params.qId)
    }
    render("quizQuestion.eta", questionData);
};

const addQuestionAnswer = async({ params, user, response }) => {
    await questionService.addQuestionAnswer(user.id, params.qId, params.oId);
    const op = await questionService.findOptionById(params.oId);
    if (op.is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`);
    }
};

const correctAnswer = ({ render, params }) => {
    render("correctAnswer.eta", {tId: params.tId});
};

const incorrectAnswer = async({ params, render }) => {
    const data = {
        tId: params.tId,
        correctOption: (await questionService.findCorrectAnswer(params.qId)).option_text
    };
    render("incorrectAnswer.eta", data);
};

export { listTopics, randomQuestionByTopic, showQuestion, addQuestionAnswer, correctAnswer, incorrectAnswer };