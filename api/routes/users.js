const Boom = require('boom')
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')
const secret = require('../config')
const Joi = require('joi')
const { promisify } = require('util')
const Users = require('../models/users')
const validCreateUser = require('../util/userFunctions').validCreateUser

const bcryptAsPromise = promisify(bcrypt.hash)

module.exports = [
    {
        path: '/login',
        method: 'POST',
        handler: async (req, h) => {
            const { username, senha } = req.payload

            if (username.toLowerCase() !== USUARIO.username.toLowerCase() || senha !== USUARIO.senha) {
                return Boom.unauthorized('Não vai acessar, bonitão')
            }

            const dadosToken = {
                username,
                company: 'globo.com'
            }
            const token = Jwt.sign(dadosToken, secret)

            return {
                token
            }
        },
        config: {
            auth: false,
            tags: ['api'],
            description: 'Deve gera um token para o usuário',
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
                return Users.find().limit(20)
            } catch (error) {
                return Boom.internal()
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
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: async (request, response) => {
            try {
                const user = request.payload;
                user.password = await bcryptAsPromise(user.password, 10);
                Users.create(user, (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao criar usuário'))

                    return response(doc)
                })
            } catch (error) {
                return Boom.internal()
            }
        },
        config: {
            validate: {
                payload: validCreateUser
            }
        }
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: async (request, response) => {
            const user = request.payload;

            if (user.password)
                user.password = await bcryptAsPromise(user.password, 10);

            Users.updateOne({ _id: request.params.id },
                { $set: user },
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 'Erro ao atualizar usuário'))

                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: async (request, response) => {
            Users.deleteOne({ _id: request.params.id },
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 'Erro ao deletar usuário'))

                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    }
]