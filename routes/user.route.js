const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validateErrors, checkRole, checkEmailRepetido} = require('../middlewares/expressValidator');

const userController = require('../controllers/user.controller');

// TO DO: VALIDATE JWT, AUTH METHODS

router.get('',userController.getUsers); // Protected, just for admin
router.post('',[
    check('name','Must contain name value').not().isEmpty(),
    check('email','Must contain email value').not().isEmpty(),
    check('email','Email field must be an email').isEmail(),
    check('phone','Must contain phone value').not().isEmpty(),
    checkRole,
    checkEmailRepetido,
    validateErrors
],userController.addUser);
router.post('/cliente',userController.createClient);

module.exports = router;
