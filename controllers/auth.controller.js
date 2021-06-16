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
            },process.env.JWT_KEY,{ expiresIn: '1h' }),
            ok: true
        })
    }catch (error){
        return res.status(400).json({
            msg: "Error al autenticar usuario"
        })
    }
}

module.exports = {
    loginController
}
