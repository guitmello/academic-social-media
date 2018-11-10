const Boom = require('boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { promisify } = require('util')
const createToken = require('../util/token')
const Users = require('../models/users')
const { validCreateUser, verifyCredentials } = require('../util/userFunctions')
const validateHeader = require('../util/validateHeader')

const bcryptAsPromise = promisify(bcrypt.hash)

module.exports = [
    {
        path: '/login',
        method: 'POST',
        handler: async (req, h) => {
            try {
                const { email, password } = req.payload
                const result = await verifyCredentials(email, password)

                if (result.isBoom) {
                    return result.output.payload.message
                }

                const token = await createToken(result)

                return { user: result, token }
            } catch (error) {
                console.log('errou aqui', error)
                return Boom.internal(error)
            }
        },
        config: {
            auth: false,
            tags: ['api'],
            description: 'Gerar token para o usuário',
            validate: {
                payload: {
                    email: Joi.string().max(50).required(),
                    password: Joi.string().max(100).required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
            try {
                const { offset, limit } = request.query
                return Users.find()
                    .skip(offset)
                    .limit(limit)

            } catch (error) {
                return Boom.internal(error)
            }
        },
        config: {
            tags: ['api'],
            description: 'Retorna listagem de usuários',
            validate: {
                headers: validateHeader(),
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                },
            }
        }
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: async (request, h) => {
            try {
                return Users.findOne({ _id: request.params.id })
            } catch (error) {
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Retorna usuário específico',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: async (request, h) => {
            try {
                const user = request.payload;
                user.password = await bcryptAsPromise(user.password, 10)
                return Users.create(user)
            } catch (error) {
                return Boom.internal()
            }
        },
        config: {
            auth: false,
            tags: ['api'],
            description: 'Criar Usuário',
            validate: {
                payload: validCreateUser
            }
        }
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: async (request, h) => {
            try {
                const user = request.payload;

                if (user.password)
                    user.password = await bcryptAsPromise(user.password, 10);

                return Users.updateOne({ _id: request.params.id }, { $set: user })

            } catch (error) {
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Atualizar Usuário',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    name: Joi.string().min(2).max(50)
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: async (request, h) => {
            try {
                return Users.deleteOne({ _id: request.params.id })
            } catch (error) {
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Deletar Usuário',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required()
                }
            }
        }
    }
]