const db = require('../db');

//All inputs to mysql are sanitized to prevent sql injection
//This is done by using prepared statements
//The mysql2 library supports prepared statements

// This function is used to get all the posts from the database
module.exports.getAllPosts = async () => {
    const [rows] = await db.query('SELECT * FROM posts')
    return rows;
}

// This function is used to get a post by its id
module.exports.getPostById = async(id) => {
    const [[rows]] = await db.query('SELECT * FROM posts WHERE id = ?',[id]); 
    return rows;
}

// This function is used to delete a post by its id
module.exports.deletePost = async(id) => {
    const [{affectedRows}] = await db.query('DELETE FROM posts WHERE id = ?',[id]);
    return affectedRows;
}

// This function is used to add or edit a post
module.exports.addOrEditPost = async(obj, id = 0) => {
    const [[[{affectedRows}]]] = await db.query('CALL add_or_edit(?,?,?,?)',[id, obj.name_string, obj.message, obj.post_timestamp]);
    return affectedRows;
}