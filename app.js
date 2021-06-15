const Server = require('./models/Server');
require('dotenv').config();

new Server(process.env.PORT);



