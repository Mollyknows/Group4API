const express = require('express');
    router = express.Router();

const service = require('../services/auth.service')


    // POST /auth/register
    router.post('/auth/register', async (req, res) => {
        const registerUser = await service.registerUser(req, res);
        res.send(registerUser);
    });
    
    // POST /auth/login
    router.get('/auth/login', async (req, res) => {
        const loginUser = await service.loginUser(req, res);
        res.send(loginUser);
    });
    
    // POST /auth/logout
    router.get('/auth/logout', async (req, res) => {
        const logoutUser = await service.logoutUser(req, res);
        res.send(logoutUser);
    });

    // DELETE /auth/delete
    router.delete('/auth/delete', async (req, res) => {
        const deleteUser = await service.deleteUser(req, res);
        res.send(deleteUser);
    });