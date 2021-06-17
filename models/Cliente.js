const Connection = require('../models/Connection');

class Cliente {
    constructor(nombre,tipo, telefono = "") {
        this.nombre = nombre;
        this.tipo = tipo;
        this.telefono = telefono;
    }

    async saveAsNewClient (){
        const con = new Connection();
        const {nombre, tipo, telefono } = this;
        return await con.db.collection('clients').doc().set({
            nombre,tipo,telefono
        });
    }
}

module.exports = Cliente;
