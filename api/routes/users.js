const Boom = require('boom')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const { promisify } = require('util')
const createToken = require('../util/token')
const Users = require('../models/users')
const { validCreateUser, verifyCredentials } = require('../util/userFunctions')
const validateHeader = require('../util/validateHeader')
const imgFunctions = require('../util/imgFunctions')
const Logs = require('../util/logs')

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

                const { _id, name, createdAt, area, photo, gender, birthDate, cpf } = result

                return { name, _id, email, createdAt, area, photo, gender, birthDate, cpf, token }
            } catch (err) {
                // return Boom.internal(error)
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
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
                return await Users.find()
                    .select("-password")
                    .skip(offset)
                    .limit(limit)
            } catch (err) {
                // return Boom.internal(error)
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
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
                return await Users.findOne({ _id: request.params.id }).select("-password")
            } catch (err) {
                // return Boom.internal()
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
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
                const verifyEmail = Users.findOne({ email: user.email })
                if (verifyEmail) {

                    return ('Email ja cadastrado')
                }
                user.password = await bcryptAsPromise(user.password, 10)
                if (user.photo) {
                    const data = imgFunctions.base64ToPNG(user.photo) //formata o base64 
                    const pathPhoto = imgFunctions.generateFileName() //gera uma string pra usar como nome da foto
                    await imgFunctions.savePNGToDisk(data, `${__dirname}/..${pathPhoto}`) //salva o base64 em disco com o novo nome da foto
                    user.photo = pathPhoto //bota o path no objeto de usuario para guardar no banco e o front end poder utilizar depois        
                }

                return await Users.create(user)
            } catch (err) {
                // console.error('Erro em: ', error)
                // return Boom.internal()
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
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

                if (user.photo) {
                    const data = imgFunctions.base64ToPNG(user.photo) //formata o base64 
                    const pathPhoto = imgFunctions.generateFileName() //gera uma string pra usar como nome da foto
                    await imgFunctions.savePNGToDisk(data, `${__dirname}/..${pathPhoto}`) //salva o base64 em disco com o novo nome da foto
                    user.photo = pathPhoto //bota o path no objeto de usuario para guardar no banco e o front end poder utilizar depois        
                }

                return await Users.updateOne({ _id: request.params.id }, { $set: user })

            } catch (err) {
                // return Boom.internal()
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
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
                payload: validCreateUser
            }
        }
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: async (request, h) => {
            try {
                return await Users.deleteOne({ _id: request.params.id })
            } catch (err) {
                // return Boom.internal()
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
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