const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {loginController,getRoleController} = require('../controllers/auth.controller');
const {validateIfEnabledByUID} = require('../middlewares/authMiddlewares');

router.post('/login',[
    validateIfEnabledByUID
],loginController);

router.get('/role',getRoleController);

module.exports = router;
