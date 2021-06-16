const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {loginController} = require('../controllers/auth.controller');

router.post('/login',loginController);

module.exports = router;
