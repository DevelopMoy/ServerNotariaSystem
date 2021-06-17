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
        const collectionUsers = connection.db.collection('users').get();
        (await collectionUsers).forEach((doc)=>{
            const user =doc.data();
            array.push(user);
        })
        return array;
    }

    static async veriffyEnabled (UID){
        const connection = new Connection();
        const userCollection = connection.db.collection('users');
        const snapshot = await userCollection.where('UID','==',UID).get();
        if (snapshot.empty){
            throw new Error('EL usuario no existe');
        }else{
            return snapshot.docs[0].data().enabled;
        }
    }

    static async getRole (UID){
        const connection = new Connection();
        const userCollection = connection.db.collection('users');
        const snapshot = await userCollection.where('UID','==',UID).get();
        if (snapshot.empty){
            throw new Error('EL usuario no existe');
        }else{
            return snapshot.docs[0].data().role;
        }
    }

    static async changeUserState (UID,state){
        const connection = new Connection();
        const snapshot = await connection.db.collection('users').where('UID','==',UID).get();
        if (snapshot.empty){
            throw new Error('EL usuario no existe');
        }else{
            const docId=snapshot.docs[0].id;
            return connection.db.collection('users').doc(docId).update({enabled:state});
        }
    }

    async saveAsNewUser (){
        const connection = new Connection();
        const {nombre:name, email, rol: role, celular:phone, UID} = this;
        return connection.db.collection('users').doc().set({
            name,email,role,phone,UID, enabled: true
        });
    }

    async updateUser (){
        const connection = new Connection();
        const snapshot = await connection.db.collection('users').where('UID','==',this.UID).get();
        if (snapshot.empty){
            throw new Error('EL usuario no existe');
        }else{
            const docId=snapshot.docs[0].id;
            return connection.db.collection('users').doc(docId).update({
                name: this.nombre,
                phone: this.celular
            });
        }
    }
}

module.exports = Usuario;
