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

    static async getAllTramites (){
        const connection = new Connection();
        const tramites = await connection.db.collection('tramites').get();
        const arreglo = [];
        tramites.forEach((tramite)=>{
            arreglo.push({
                id: tramite.id,
                data: tramite.data()
            });
        })
        return arreglo;
    }

    static async getTramite (tramiteId){
        const connection = new Connection();
        const tramite = await connection.db.collection('tramites').doc(tramiteId).get();
        return tramite ? tramite.data(): null;
    }

    static async updateTramite (tramiteId,ultimoMovimiento,status){
        const connection = new Connection();
        return connection.db.collection('tramites').doc(tramiteId).update({
            ultimoMovimiento,
            status
        });
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
