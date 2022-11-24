import { executeQuery } from "../database/database.js";

const listTopics = async() => {
    const res = await executeQuery("SELECT * FROM topics ORDER BY name ASC;");
    return res.rows;
};

const addTopic = async(user_id, name) => {
    await executeQuery("INSERT INTO topics (user_id, name) VALUES ($user_id, $name);", {
        user_id: user_id, 
        name: name
    });
}

const deleteTopic = async(id) => {
    await executeQuery("DELETE FROM topics WHERE id = $id;", {id: id});
}

export { listTopics, addTopic, deleteTopic };