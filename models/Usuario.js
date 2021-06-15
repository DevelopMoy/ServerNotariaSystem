const Connection = require('../models/Connection');

class Usuario {
    constructor(email, nombre, rol, celular="",firebaseAuth=false, UID = "") {
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
        this.celular = celular;
        this.firebaseAuth = firebaseAuth;
    }

    static async getAllUsers (){
        const connection = new Connection();
        const array = [];
        const collection = connection.db.collection('users').get();
        (await collection).forEach((doc)=>{
            const user =doc.data();
            array.push(user);
        })
        return array;
    }

    async saveAsNewUser (){
        const connection = new Connection();
        const {nombre:name, email, rol: role, celular:phone, firebaseAuth} = this;
        return connection.db.collection('users').doc().set({
            name,email,role,phone,firebaseAuth, enabled: true
        });
    }
}

module.exports = Usuario;
