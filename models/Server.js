const express = require ('express');
const usersRoutes = require('../routes/user.route');
const authRoutes = require('../routes/auth.route');
const cors = require('cors');

class Server {
    usersEndPoint = '/api/user';
    authEndPoint = '/auth';

    constructor(port) {
        this.app = express();
        this.addMiddlewares();
        this.assignRoutes();
        this.app.listen(process.env.PORT);
    }

    addMiddlewares (){
        this.app.use(express.json());
        this.app.use(cors());
    }

    assignRoutes (){
        this.app.use(this.usersEndPoint,usersRoutes);
        this.app.use(this.authEndPoint,authRoutes);
    }

}

module.exports = Server;
