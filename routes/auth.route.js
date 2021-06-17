const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {loginController,getRoleController} = require('../controllers/auth.controller');

router.post('/login',loginController);
router.get('/role',getRoleController);

module.exports = router;
