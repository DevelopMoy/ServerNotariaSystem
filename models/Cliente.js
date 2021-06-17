const Connection = require('../models/Connection');

class Cliente {
    constructor(nombre,tipo, telefono = "") {
        this.nombre = nombre;
        this.tipo = tipo;
        this.telefono = telefono;
    }

    static async getAllClients (){
        const con = new Connection();
        const clientes = [];
        const snapshot = await con.db.collection('clients').get();
        snapshot.docs.forEach((cliente)=>{
            clientes.push({
                id: cliente.id,
                data: cliente.data()
            })
        });
        return clientes;
    }

    async saveAsNewClient (){
        const con = new Connection();
        const {nombre, tipo, telefono } = this;
        const newDocument= await con.db.collection('clients').add(
            {
                nombre,tipo,telefono
            }
        );
        return newDocument.id;
    }
}

module.exports = Cliente;
