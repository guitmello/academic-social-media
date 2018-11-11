const Boom = require('boom')
const Followers = require('../models/Followers')
const validateHeader = require('../util/validateHeader')
const Joi = require('joi')
const Logs = require('../util/logs')

module.exports = [
    {
        method: 'POST',
        path: '/followers/{userId}',
        handler: async (request, h) => {
            try {
                const { userId } = request.params
                const follower = request.payload

                const result = await Followers.findOneAndUpdate({ _id: userId },
                    { $addToSet: { followers: follower } },
                    { upsert: true })

                return result
            }
            catch (err) {
                // console.error(error)
                // return Boom.internal()
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota para informar que um usuário adquiriu outro usuário como seguidor',
            validate: {
                headers: validateHeader(),
                payload: {
                    _id: Joi.string().required()
                }
            }

        }
    }
]