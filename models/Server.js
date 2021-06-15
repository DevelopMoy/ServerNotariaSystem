const express = require ('express');
const usersRoutes = require('../routes/user.route');

class Server {
    usersEndPoint = '/api/user';

    constructor(port) {
        this.app = express();
        this.addMiddlewares();
        this.assignRoutes();
        this.app.listen(process.env.PORT);
    }

    addMiddlewares (){
        this.app.use(express.json());
    }

    assignRoutes (){
        this.app.use(this.usersEndPoint,usersRoutes);
    }

}

module.exports = Server;
