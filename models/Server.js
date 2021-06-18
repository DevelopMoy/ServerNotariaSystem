const express = require ('express');
const usersRoutes = require('../routes/user.route');
const authRoutes = require('../routes/auth.route');
const notariaRoutes = require('../routes/notaria.route');
const cors = require('cors');

class Server {
    usersEndPoint = '/api/user';
    authEndPoint = '/auth';
    notariaEndPoint = "/api/notaria"

    constructor(port) {
        this.app = express();
        this.addMiddlewares();
        this.assignRoutes();
        this.app.all("/*", function(req, res, next) {
            res.sendfile("public/index.html", { root: __dirname + "/app" });
        });
        this.app.listen(process.env.PORT);
    }

    addMiddlewares (){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.static('public'));
    }

    assignRoutes (){
        this.app.use(this.usersEndPoint,usersRoutes);
        this.app.use(this.authEndPoint,authRoutes);
        this.app.use(this.notariaEndPoint,notariaRoutes);
    }

}

module.exports = Server;
