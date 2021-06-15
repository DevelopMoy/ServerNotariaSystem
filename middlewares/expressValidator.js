const {validationResult} = require('express-validator');
const Role = require('../models/Role');
const Usuario = require('../models/Usuario');

const validateErrors =async (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json(
            errors
        )
    }else{
        next();
    }
}

const checkRole = async  (req,res,next)=>{
    const roles =await Role.getRoles();
    if (!req.body.role||((roles.filter(rol=>rol.rol===req.body.role)).length===0)){
        return res.status(400).json({
            msg: 'Invalid role'
        })
    }
    next();
}

const checkEmailRepetido = async  (req,res,next)=>{
    const usuarios = await Usuario.getAllUsers();
    if ((usuarios.filter(user=>user.email===req.body.email)).length!==0){
        return res.status(400).json({
            msg: 'Email ya registrado en el sistema'
        })
    }
    next();
}

module.exports = {
    validateErrors,
    checkRole,
    checkEmailRepetido
}
