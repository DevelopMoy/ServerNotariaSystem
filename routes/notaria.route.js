const express = require('express');
const router = express.Router();
const {check}= require('express-validator');
const {validateErrors} = require('../middlewares/expressValidator');
const Tramite = require('../models/Tramite');
const controller = require('../controllers/notaria.controller');
const {validateRole, checkValidToken} = require('../middlewares/authMiddlewares');

router.get('/tramite',[
    checkValidToken
],controller.getAllTramites);

router.get('/tramite/:id',[
    check('id').not().isEmpty(),
    validateErrors
],controller.getTramiteByID);

router.put('/tramite',[
    validateRole("USER"),
    check('idTramite').not().isEmpty(),
    check('status').not().isEmpty(),
    check('ultimoMovimiento').not().isEmpty(),
    validateErrors
],controller.updateTramite);

router.post('/tramite',[
    check('nombreTramite','nombreTramite must be defined').not().isEmpty(),
    check('idCliente','idCliente must be defined').not().isEmpty(),
    check('UIDAbogado','UIDAbogado must be defined').not().isEmpty(),
    validateRole('ADMIN'),
    validateErrors
],controller.createTramite);

router.post('/emailReceiver',[
    check('name','name must be defined').not().isEmpty(),
    check('email','email must be defined').not().isEmpty(),
    check('subject','subject must be defined').not().isEmpty(),
    check('msg','msg must be defined').not().isEmpty(),
    check('email','Invalid email format').isEmail(),
    validateErrors
],controller.sendEmail);

module.exports = router;
