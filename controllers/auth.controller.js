const Usuario = require('../models/Usuario');
const jwt=require('jsonwebtoken');

const loginController = async (req,res)=>{
    const {UID} = req.body;
    try{
        const role = await Usuario.getRole(UID);
        return res.status(200).json({
            role,
            token: jwt.sign({
                UID
            },process.env.JWT_KEY,{ expiresIn: '3h' }),
            ok: true
        })
    }catch (error){
        return res.status(400).json({
            msg: "Error al autenticar usuario"
        })
    }
}

const getRoleController = async (req,res)=>{
    const token = req.header('authToken');
    if (!token){
        return res.status(403).json({
            msg: 'Token requerido'
        });
    }
    try{
        const UID = jwt.verify(token,process.env.JWT_KEY).UID;
        const role = await Usuario.getRole(UID);
        return res.status(200).json({
            role
        })
    }catch (error){
        return res.status(403).json({
            msg: 'Token invalido'
        })
    }
}

module.exports = {
    loginController,
    getRoleController
}
