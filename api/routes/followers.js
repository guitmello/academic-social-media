const Boom = require('boom')
const Followers = require('../models/Followers')
const validateHeader = require('../util/validateHeader')
const Joi = require('joi')

module.exports = [
    {
        method: 'POST',
        path: '/followers/{userId}',
        handler: (request, response) => {
            try {
                const { userId } = request.params
                const follower = request.payload

                Followers.findOneAndUpdate({ _id: userId },
                    {
                        $addToSet: { followers: follower }
                    },
                    { upsert: true }, (error, doc) => {
                        if (error)
                            return response(Boom.wrap(error, 400, 'Erro ao adicionar seguidor'))

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