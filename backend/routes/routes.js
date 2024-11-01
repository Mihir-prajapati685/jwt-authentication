const express = require('express');
const router = express.Router();
const authencon = require('../controller/Authentication');
const authmiddleware = require('../Middleware');

router
    .post('/register', authencon.registerpost)
    .post('/login', authencon.loginpost)
    .get('/user',authmiddleware,(req,res) => {
        res.status(200).json({ message: 'completed', success: true });
    })

module.exports = router;
