const Winston = require('winston')

const log = Winston.createLogger({
    // format: Winston.format.simple(),
    transports: [
        new Winston.transports.Console(),
        new Winston.transports.File({ filename: 'logs.json', level: 'info' }),
        new Winston.transports.File({ filename: 'error.json', level: 'error' })
    ]
})

const info = log.info
const error = log.error
const logRequest = (url, params) => info(`A URL acessada foi ${url} com os parâmetros ${JSON.stringify(params)}`)
const logError = (url, params) => error(`Erro em: ${url} com os parâmetros ${JSON.stringify(params)}`)

const obterDadoRequest = (request, username = '') => {
    const {
        path,
        query,
        payload,
        params,
        headers: { host }
    } = request

    const item = {
        path,
        query,
        payload,
        params,
        host,
        username: username,
        at: new Date()
    }
    return item
}

module.exports = {
    logRequest,
    logError,
    obterDadoRequest,
    info,
    error
}