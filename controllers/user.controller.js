const Cliente = require('../models/Cliente');
const Usuario = require('../models/Usuario');

const getUsers = async (req,res)=>{
    const usuarios =await Usuario.getAllUsers();

    res.status(200).json({
        users: usuarios
    });
}

const addUser = async (req,res)=> {
    console.log("AGREGANDO USUARIO");
    const {name, email, role, phone, UID} = req.body;
    const newUser = new Usuario(email,name,role,phone,UID);
    await newUser.saveAsNewUser();
    return res.status(200).json({
        ok: true,
        user: UID
    })
}

const deleteUser = async (req,res)=>{
    const {UID} = req.body;
    try{
        await Usuario.changeUserState(UID,false);
        return res.status(202).json({
            ok: true,
            UID
        });
    }catch (error){
        return res.status(400).json({
            msg: 'Error al eliminar usuario'
        })
    }
}

const updateUser = async (req,res)=>{
    const {UID, phone,name} = req.body;
    try{
        const user = new Usuario("",name,"",phone,UID);
        await user.updateUser();
        return res.status(200).json({
            msg: 'Usuario actualizado!',
            UID
        })
    }catch (err){
        return res.status(500).json({
            msg: 'Internal server error'
        })
    }
}

const createClient = async (req,res)=>{
    res.status(200).json({
        msg: "perpeprep"
    })
}

module.exports = {
    getUsers,
    addUser,
    createClient,
    deleteUser,
    updateUser
}
