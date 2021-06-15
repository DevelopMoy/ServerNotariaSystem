const Connection = require('../models/Connection');

class Cliente {

    constructor(nombre,tipo,representanteLegal = [], telefono = "", asesores = "") {
        this.nombre = nombre;
        this.tipo = tipo;
        this.representanteLegal = representanteLegal;
        this.telefono = telefono;
        this.asesores = asesores;
    }

    async saveAsNewClient (){
        const con = new Connection();
        const {nombre, tipo, representanteLegal:repr, telefono, asesores } = this;
        return await con.db.collection('clients').doc().set({
            nombre,tipo,repr,telefono,asesores
        });
    }
}

module.exports = Cliente;
