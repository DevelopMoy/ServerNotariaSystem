const Connection = require('../models/Connection');

class Tramite {
    constructor(name,clientId,UIDAbogado,ultimoMovimiento) {
        this.name=name;
        this.clientId = clientId;
        this.UIDAbogado = UIDAbogado;
        this.status = true;
        this.ultimoMovimiento=ultimoMovimiento;
        this.fechaCreacion = (new Date()).toDateString();
    }

    async createNewTramite (){
        const connection = new Connection();
        const tramiteNuevo = await connection.db.collection('tramites').add({
            name: this.name,
            clientId: this.clientId,
            abogadoUID: this.UIDAbogado,
            status: this.status,
            ultimoMovimiento: this.ultimoMovimiento,
            initDate: this.fechaCreacion
        });
        return tramiteNuevo.id;
    }
}

module.exports = Tramite;
