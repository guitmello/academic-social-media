'use strict';

const environment = require('./common/environment')
const Hapi = require('hapi')
const db = require('./database/database.js').db
const routes = require('./routes/routes.js')
const secret = require('./config')
const HapiJwt = require('hapi-auth-jwt2')


// await app.register([
//     HapiJwt,
//     Vision,
//     Inert,
//     {
//         plugin: HapiSwagger,
//         options: swaggerConfig
//     }
// ])

// server.register(require('hapi-auth-jwt2'), (err) => {

//     server.auth.strategy('jwt', 'jwt', {
//         key: secret,
//         verifyOptions: { algorithms: ['HS256'] }
//     })
// })

async function start() {
    try {
        const server = new Hapi.Server({
            host: 'localhost',
            port: environment.server.port
        })

        await server.register([HapiJwt])

        server.app.db = db
        server.route(routes)

        await server.start()
        console.log(`Servidor rodando em ${server.info.uri}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()