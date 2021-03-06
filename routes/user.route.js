const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validateErrors, checkRole, checkEmailRepetido, checkUIDRepetido} = require('../middlewares/expressValidator');
const {validateRole, checkValidToken} = require('../middlewares/authMiddlewares');
const userController = require('../controllers/user.controller');

// TO DO: VALIDATE JWT, AUTH METHODS

router.get('',[
    checkValidToken
],userController.getUsers);

router.post('',[
    check('name','Must contain name value').not().isEmpty(),
    check('email','Must contain email value').not().isEmpty(),
    check('email','Email field must be an email').isEmail(),
    check('UID','UID Param required').not().isEmpty(),
    check('phone','Must contain phone value').not().isEmpty(),
    checkRole,
    checkEmailRepetido,
    checkUIDRepetido,
    validateErrors
],userController.addUser);

router.delete('',[
    check('UID','UID Param required').not().isEmpty(),
    validateRole("ADMIN"),
    validateErrors
],userController.deleteUser);

router.put('',[
    check('UID','UID Param required').not().isEmpty(),
    check('name','Name Param required').not().isEmpty(),
    check('phone','Phone Param required').not().isEmpty(),
    validateRole("USER"),
    validateErrors
],userController.updateUser);

router.post('/cliente',[
    check('nombre','Nombre no definido').not().isEmpty(),
    check('tipo','Tipo no definido').not().isEmpty(),
    check('telefono','Telefono no definido').not().isEmpty(),
    validateRole("ADMIN"),
    validateErrors
],userController.createClient);

router.get('/cliente',[
    validateRole("ADMIN")
],userController.getClients);

module.exports = router;
