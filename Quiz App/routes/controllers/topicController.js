import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1)],
};

const listTopics = async({ render, user }) => {
    if (user.admin === true) {
        render("topicsAdmin.eta", {topics: await topicService.listTopics()});
    } else {
        render("topics.eta", {topics: await topicService.listTopics()});
    }
};

const getTopicData = async(request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        name: params.get("name"),
        topics: await topicService.listTopics()
    };
};

const addTopic = async ({ request, response, render, user }) => {
    const topicData = await getTopicData(request);

    const [passes, errors] = await validasaur.validate(topicData, topicValidationRules);

    if (!passes) {
        console.log(errors);
        topicData.validationErrors = errors;
        render("topicsAdmin.eta", topicData);
    } else {
        await topicService.addTopic(user.id, topicData.name);
        response.redirect("/topics");
    }
};

const deleteTopic = async({ params, response, user }) => {
    if (user.admin === true) {
      const tId = params.id;
      const allQuestions = await questionService.findQuestionsByTopic(tId);

      for (const question of allQuestions) {
        const allOptions = await questionService.findOptionsByQuestion(question.id);
        for (const option of allOptions) {
            await questionService.deleteAnswerOption(option.id);
        }
        await questionService.deleteQuestion(question.id);
      }

      await topicService.deleteTopic(tId);
    }
    response.redirect("/topics");
};

export { listTopics, addTopic, deleteTopic };