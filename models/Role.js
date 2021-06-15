const Connection = require('../models/Connection');

class Role {
    static async getRoles (){
        const connection = new Connection();
        const array = [];
        const collection = connection.db.collection('roles').get();
        (await collection).forEach((doc)=>{
            array.push(doc.data());
        })
        return array;
    }
}

module.exports = Role;
