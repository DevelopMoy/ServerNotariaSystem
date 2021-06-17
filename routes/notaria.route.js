const express = require('express');
const router = express.Router();
const {check}= require('express-validator');
const {validateErrors} = require('../middlewares/expressValidator');
const Tramite = require('../models/Tramite');
const controller = require('../controllers/notaria.controller');
const {validateRole} = require('../middlewares/authMiddlewares');

router.get('/tramite',(req,res)=>{
    res.json({
        msg: 'hello'
    })
});

router.post('/tramite',[
    check('nombreTramite','nombreTramite must be defined').not().isEmpty(),
    check('idCliente','idCliente must be defined').not().isEmpty(),
    check('UIDAbogado','UIDAbogado must be defined').not().isEmpty(),
    validateRole('ADMIN'),
    validateErrors
],controller.createTramite);

module.exports = router;
