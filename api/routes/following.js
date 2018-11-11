const Boom = require('boom')
const Following = require('../models/Following')
const Posts = require('../models/Posts')
const Joi = require('joi')
const validateHeader = require('../util/validateHeader')

module.exports = [
    {
        method: 'POST',
        path: '/following/{userId}',
        handler: (request, response) => {
            try {
                const { userId } = request.params
                const follow = request.payload

                Following.findOneAndUpdate({ _id: userId },
                    {
                        $addToSet: { following: follow }
                    },
                    { upsert: true }, (error, doc) => {
                        if (error)
                            return response(Boom.wrap(error, 400, 'Erro ao seguir'))

                        return doc
                    })
            }
            catch (error) {
                console.error(error)
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
            catch (error) {
                console.error(error)
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