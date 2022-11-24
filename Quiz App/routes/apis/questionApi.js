import * as questionService from "../../services/questionService.js";

const showRandomQuestion = async ({ response }) => {
    const question = await questionService.showRandomQuestion();
    const options = await questionService.findOptionsByQuestion(question.id);
    const data = {
        questionId: question.id,
        questionText: question.question_text,
        answerOptions: []
    }
    options.forEach(op => {
        const opData = {
            optionId: op.id,
            optionText: op.option_text
        };
        data.answerOptions.push(opData);
    })
    response.body = data;
};

const validateAnswer = async({ request, response }) => {
    const body = request.body({ type: "json" });
    const params = await body.value;
    const qId = params.questionId;
    const oId = params.optionId;
    const correctAnswer = await questionService.findCorrectAnswer(qId);
    if (oId === correctAnswer.id) {
        response.body = {"correct": true};
    } else {
        response.body = {"correct": false};
    }
};

export { showRandomQuestion, validateAnswer };