const Logs = require('../util/logs')

module.exports = [
    {
        method: 'GET',
        path: '/img/{filename}',
        config: {
            auth: false,
            handler: (req, h) => {
                try {
                    const { filename } = req.params
                    return h.file('./img/' + filename);
                }
                catch (err) {
                    const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                    Logs.logError(item.path, { ...item, err })
                    return Boom.internal()
                }
            },
            tags: ['api'],
            description: 'Rota para obter imagens cadastradas'
        }
    }]