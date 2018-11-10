'use strict';

const environment = require('./common/environment')
const Hapi = require('hapi')
const db = require('./database/database.js').db
const routes = require('./routes/routes.js')
const secret = require('./config')
const HapiJwt = require('hapi-auth-jwt2')

//Doc
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

const swaggerConfig = {
    info: {
        version: '1.0'
    },
    lang: 'pt'
}

async function start() {
    try {
        const server = new Hapi.Server({
            host: 'localhost',
            port: environment.server.port
        })

        await server.register([
            HapiJwt,
            Vision,
            Inert,
            {
                plugin: HapiSwagger,
                options: swaggerConfig
            }
        ])

        server.auth.strategy('jwt', 'jwt', {
            key: secret,
            verifyOptions: {
                algorithms: ['HS256']
            },
            validate: (data, request, callback) => {
                return {
                    isValid: true
                }
            }
        })

        server.auth.default('jwt')

        server.app.db = db
        server.route(routes)

        await server.start()
        console.log(`Server running in ${server.info.uri}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

start()