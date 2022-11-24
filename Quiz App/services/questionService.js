import { executeQuery } from "../database/database.js";

const listQuestionsByTopic = async(id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE topic_id = $id;", {id: id});
    return res.rows;
};

const addQuestion = async(user_id, topic_id, text) => {
    await executeQuery("INSERT INTO questions (user_id, topic_id, question_text) VALUES ($user_id, $topic_id, $text);", { 
      user_id: user_id, 
      topic_id: topic_id,
      text: text
    });
};

const deleteQuestion = async(qId) => {
    await executeQuery("DELETE FROM questions WHERE id = $qId;", {qId: qId});
};

const findTopicById = async(id) => {
    const res = await executeQuery("SELECT * FROM topics WHERE id = $id;", {id: id});
    return res.rows[0].name;
};

const addAnswerOption = async(qId, text, is_correct) => {
    await executeQuery("INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($qId, $text, $is_correct);", {
      qId: qId,
      text: text,
      is_correct: is_correct
    });
};

const listAnswerOptions = async(qId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $qId;", {qId: qId});
    return res.rows;
};

const findQuestionById = async(qId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id = $qId;", {qId: qId});
    return res.rows[0];
};
    
const deleteAnswerOption = async(oId) => {
    await executeQuery("DELETE FROM question_answers WHERE question_answer_option_id = $oId;", {oId: oId});
    await executeQuery("DELETE FROM question_answer_options WHERE id = $oId;", {oId: oId});
};

const randomQuestionByTopic = async(tId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE topic_id = $tId ORDER BY RANDOM() LIMIT 1;", {tId: tId});
    return res.rows[0];
};

const addQuestionAnswer = async(uId, qId, oId) => {
    await executeQuery("INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES ($uId, $qId, $oId);", {
      uId: uId,
      qId: qId,
      oId: oId
    });
};

const findOptionById = async(oId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE id = $oId;", {oId: oId});
    return res.rows[0];
};

const findCorrectAnswer = async(qId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $qId AND is_correct = $true", { 
      qId: qId,
      true: true
    });
    return res.rows[0];
};

const showRandomQuestion = async() => {
    const res = await executeQuery("SELECT * FROM questions ORDER BY RANDOM() LIMIT 1;");
    return res.rows[0];
};

const findOptionsByQuestion = async(qId) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $qId;", {qId: qId});
    return res.rows;
};

const findQuestionsByTopic = async(tId) => {
    const res = await executeQuery("SELECT * FROM questions WHERE topic_id = $tId;", {tId: tId});
    return res.rows;
};

export { 
    listQuestionsByTopic, 
    addQuestion,
    deleteQuestion,
    findTopicById, 
    addAnswerOption, 
    listAnswerOptions, 
    findQuestionById,
    deleteAnswerOption,
    randomQuestionByTopic,
    addQuestionAnswer,
    findOptionById,
    findCorrectAnswer,
    showRandomQuestion,
    findOptionsByQuestion,
    findQuestionsByTopic
};