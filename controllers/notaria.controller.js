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

const getAllTramites = async (req,res)=>{
    const tramites = await Tramite.getAllTramites();
    return res.status(200).json(tramites);
}

const getTramiteByID = async (req,res)=>{
    const {id} = req.params;
    console.log(req.params);
    const tramite = await Tramite.getTramite(id);
    return tramite ? res.status(200).json(tramite): res.status(400).json({msg: 'Error al validar id del tramite'});
}

const updateTramite = async (req,res)=>{
    const {idTramite, status, ultimoMovimiento} = req.body;
    try{
        await Tramite.updateTramite(idTramite,ultimoMovimiento,status);
        return res.status(200).json ({
            idTramite,
            msg: 'Registro actualizado con exito'
        })
    }catch (error){
        return res.status(400).json({msg: 'Error al validar actualizacion del tramite'});
    }
}

module.exports = {
    createTramite,
    getAllTramites,
    getTramiteByID,
    updateTramite
}
