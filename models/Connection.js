const admin = require('firebase-admin');
const privateKey = require('../keys/proyectonotaria-firebase-adminsdk-q769b-4d9f92a901.json');

class Connection {
    constructor() {
        if (admin.apps.length===0){
            admin.initializeApp({
                credential: admin.credential.cert(privateKey)
            });
        }
        this.db = admin.firestore();
    }
}

module.exports = Connection;
