const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');
const Tramite = require('../models/Tramite');

const createTramite = async (req,res)=>{
    const {nombreTramite,idCliente,UIDAbogado} = req.body;
    try{
        console.log("validando");
        const tramite = new Tramite(nombreTramite,idCliente,UIDAbogado,"Tramite Iniciado");
        Promise.all([Cliente.isClient(idCliente),Usuario.getRole(UIDAbogado)]).then((responses)=>{
            if (responses[0]&&responses[1]==="USER"){ // VALID CLIENT AND ABOGADO IDS
                tramite.createNewTramite().then((idTramite)=>{
                    return res.status(200).json({
                        msg:'todo valido',
                        idTramite
                    })
                });

           }else{
               throw new Error();
           }
        }).catch((error)=>{
            return res.status(400).json({
                msg: 'Error, verificar ID de cliente y abogado'
            });
        });
    }catch (error){
        return res.status(400).json({
            msg: 'Error, verificar ID de cliente y abogado'
        });
    }
}

module.exports = {
    createTramite
}
