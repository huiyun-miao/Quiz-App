import { executeQuery } from "../database/database.js";

const countTopics = async () => {
    const res = await executeQuery(
      "SELECT COUNT(id) FROM topics AS count;"
    );

    return res.rows[0].count;
};

const countQuestions = async () => {
    const res = await executeQuery(
      "SELECT COUNT(id) FROM questions AS count;"
    );

    return res.rows[0].count;
};

const countAnswers = async () => {
    const res = await executeQuery(
      "SELECT COUNT(id) FROM question_answers AS count;"
    );
  
    return res.rows[0].count;
};

export { countTopics, countQuestions, countAnswers };