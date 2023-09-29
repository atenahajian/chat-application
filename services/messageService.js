import { sql } from "../database/database.js";


const add = async (sender, mess) => {
    await sql`INSERT INTO messages (sender, message)
    VALUES (${ sender }, ${ mess })`;
};


const findAll = async () => {
    return await sql`SELECT * FROM messages`;
};

const findLastFive = async () => {
    return await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 5;`;
};

export { add, findAll, findLastFive };