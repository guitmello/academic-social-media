const Boom = require('boom')
const Following = require('../models/Following')
const Posts = require('../models/Posts')
const Joi = require('joi')
const validateHeader = require('../util/validateHeader')

module.exports = [
    {
        method: 'POST',
        path: '/following/{userId}',
        handler: async (request, h) => {
            try {
                const { userId } = request.params
                const follow = request.payload

                const result = await Following.findOneAndUpdate({ _id: userId },
                    { $addToSet: { following: follow } },
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
            description: 'Rota para informar que um usuário está seguindo outro usuário',
            validate: {
                headers: validateHeader(),
                payload: {
                    _id: Joi.string().required()
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/following/{id}/posts',
        handler: async (request, response) => {
            try {
                const { offset, limit } = request.query
                const { id } = request.params

                const following = await Following.find({ _id: id })

                const timeline = await Posts.find({ 'user._id': { $in: following } })
                    .skip(offset)
                    .limit(limit)

                return timeline
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
            validate: {
                headers: validateHeader(),
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                }
            },
            tags: ['api'],
            description: 'Rota para listar os posts dos usuários seguidos (timeline)',
        }
    }
]