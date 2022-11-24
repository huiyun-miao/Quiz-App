import * as statisticsService from "../../services/statisticsService.js";

const showMain = async({ render }) => {
  const data = {
    countTopics: await statisticsService.countTopics(),
    countQuestions: await statisticsService.countQuestions(),
    countAnswers: await statisticsService.countAnswers(),
  };

  render("main.eta", data);
};

export { showMain };
