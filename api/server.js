'use strict';

const environment = require('./common/environment')
const Hapi = require('hapi')
const glob = require('glob')
const path = require('path')
const db = require('./database/database.js').db
const routes = require('./routes/routes.js')
const secret = require('./config')

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: environment.server.port
})

server.register(require('hapi-auth-jwt'), (err) => {

    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        verifyOptions: { algorithms: ['HS256'] }
    })

    // glob.sync('./routes/*.js', {
    //     root: __dirname
    // }).forEach(file => {
    //     const route = require(path.join(__dirname, file))
    //     server.route(route)
    // })
})

server.app.db = db
server.route(routes)

async function start() {
    try {
        await server.start()
        console.log(`Servidor rodando em ${server.info.uri}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()