const express = require('express')
    router = express.Router();

const service = require('../services/post.service')

//http://localhost:3000/api/posts
router.get('/', async (req, res) => {
    const posts = await service.getAllPosts();
    res.send(posts)
});

//http://localhost:3000/api/posts/id
router.get('/:id', async (req, res) => {
    const post = await service.getPostById(req.params.id);
    if (post == undefined){
        res.status(404).json('No records found with id: ' + req.params.id);
    }
    else{
    res.send(post);
    }
});

//http://localhost:3000/api/posts/id
router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deletePost(req.params.id);
    console.log('Affected Rows: ' + affectedRows)
    if (affectedRows == 0){
        res.status(404).json('No records found with id: ' + req.params.id);
    }
    else{
    res.send('Successfully Removed');
    }
});

//http://localhost:3000/api/posts/id
router.post('/', async (req, res) => {
    const affectedRows = await service.addOrEditPost(req.body);
    res.status(201).send('Created Successfully');
});

//http://localhost:3000/api/posts/id
router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditPost(req.body, req.params.id);
    console.log('Affected Rows: ' + affectedRows)
    if (affectedRows == 0){
        res.status(404).json('No records found with id: ' + req.params.id);
    }
    else{
    res.send('Updated Successfully');
    }
});
module.exports = router;


