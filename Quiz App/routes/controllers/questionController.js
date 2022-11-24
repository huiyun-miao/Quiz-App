import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    text: [validasaur.required, validasaur.minLength(1)],
};

const listQuestionsByTopic = async({ params, render }) => {
    const data = {
        topicName: await questionService.findTopicById(params.id),
        topicId: params.id,
        questions: await questionService.listQuestionsByTopic(params.id)
    };
    render("questions.eta", data);
};

const getQuestionData = async({ params, request }) => {
    const body = request.body({ type: "form" });
    const p = await body.value;
    return {
        text: p.get("question_text"),
        topicName: await questionService.findTopicById(params.id),
        topicId: params.id,
        questions: await questionService.listQuestionsByTopic(params.id),
    };
};

const addQuestion = async ({ params, request, response, render, user }) => {
    const questionData = await getQuestionData({ params, request });

    const [passes, errors] = await validasaur.validate(questionData, questionValidationRules);

    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        render("questions.eta", questionData);
    } else {
        await questionService.addQuestion(user.id, params.id, questionData.text);
        response.redirect(`/topics/${params.id}`);
    }
};

const deleteQuestion = async({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.tId}`);
};

const answerOptionValidationRules = {
    text: [validasaur.required, validasaur.minLength(1)],
};

const listAnswerOptions = async({ params, render }) => {
    const data = {
        tId: params.id,
        qId: params.qId,
        qText: (await questionService.findQuestionById(params.qId)).question_text,
        answerOptions: await questionService.listAnswerOptions(params.qId)
    };
    render("question.eta", data);
};

const getAnswerOptionData = async({ params, request }) => {
    const body = request.body({ type: "form" });
    const p = await body.value;

    let correctness = false;
    if (p.has("is_correct")) {
        correctness = true;
    }

    return {
        tId: params.id,
        qId: params.qId,
        text: p.get("option_text"),
        is_correct: correctness,
        qText: (await questionService.findQuestionById(params.qId)).question_text,
        answerOptions: await questionService.listAnswerOptions(params.qId)
    };
};

const addAnswerOption = async ({ params, request, response, render }) => {
    const answerOptionData = await getAnswerOptionData({ params, request });

    const [passes, errors] = await validasaur.validate(answerOptionData, answerOptionValidationRules);

    if (!passes) {
        console.log(errors);
        answerOptionData.validationErrors = errors;
        render("question.eta", answerOptionData);
    } else {
        await questionService.addAnswerOption(params.qId, answerOptionData.text, answerOptionData.is_correct);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

const deleteAnswerOption = async({ params, response }) => {
    await questionService.deleteAnswerOption(params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

export { 
    listQuestionsByTopic, 
    addQuestion, 
    deleteQuestion,
    listAnswerOptions, 
    addAnswerOption,
    deleteAnswerOption
};