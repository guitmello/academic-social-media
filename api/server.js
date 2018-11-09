'use strict';

const Hapi = require('hapi')
const db = require('./database/database.js').db;
const routes = require('./routes/routes.js')

const server = new Hapi.Server();
server.connection({
    host : 'localhost',
    port : 8081
});

server.app.db = db;
server.route(routes);

server.start(err => {
    if (err)
        throw err;

    console.log(`Servidor rodando em ${server.info.uri}`)
})
