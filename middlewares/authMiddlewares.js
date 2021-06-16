const User = require('../models/Usuario');
const jwt=require('jsonwebtoken');

const validateRole =(rol)=>{
    return async (req,res,next)=>{
        const clientToken = req.header('authToken');
        if (!clientToken){
            return res.status(403).json({
                msg: 'Error al autenticar, token invalido'
            });
        }
        try{
            const payload = jwt.verify(clientToken,process.env.JWT_KEY);
            if (await User.getRole(payload.UID)==rol){
                next();
            }else{
                throw new Error();
            }
        }catch (error){
            return res.status(403).json({
                msg: 'Error al autenticar, token invalido'
            });
        }
    }
}

module.exports = {
    validateRole
}