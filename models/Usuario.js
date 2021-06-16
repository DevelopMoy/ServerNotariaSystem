const Connection = require('../models/Connection');

class Usuario {
    constructor(email, nombre, rol, celular="", UID) {
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
        this.celular = celular;
        this.UID = UID;
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
        const {nombre:name, email, rol: role, celular:phone, UID} = this;
        return connection.db.collection('users').doc().set({
            name,email,role,phone,UID, enabled: true
        });
    }
}

module.exports = Usuario;
