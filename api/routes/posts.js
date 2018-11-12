const Boom = require('boom')
const Posts = require('../models/Posts')
const validateHeader = require('../util/validateHeader')
const Joi = require('joi')
const imgFunctions = require('../util/imgFunctions')
const Logs = require('../util/logs')

module.exports = [
    {
        method: 'POST',
        path: '/posts',
        handler: async (request, h) => {

            try {
                const posts = request.payload;
                if (posts.photo) {
                    const data = imgFunctions.base64ToPNG(posts.photo) //formata o base64 
                    const pathPhoto = imgFunctions.generateFileName() //gera uma string pra usar como nome da foto
                    await imgFunctions.savePNGToDisk(data, `${__dirname}/..${pathPhoto}`) //salva o base64 em disco com o novo nome da foto
                    posts.photo = pathPhoto //bota o path no objeto de usuario para guardar no banco e o front end poder utilizar depois        
                }

                return await Posts.create(posts)
            }
            catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao tentar inserir a postagem')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de cadastro de postagem',
            validate: {
                headers: validateHeader(),
                payload: {
                    user: Joi.object().keys({
                        _id: Joi.string().required(),
                        name: Joi.string().required(),
                        photo: Joi.string().required()
                    }),
                    projectId: Joi.string(),
                    content: Joi.string().required(),
                    createdAt: Joi.date(),
                    likes: Joi.number(),
                    photo: Joi.string(),
                    comments: [{
                        user: Joi.object().keys(
                            {
                                name: Joi.string(),
                                _id: Joi.string(),
                                photo: Joi.string()
                            }),
                        createdAt: Joi.date(),
                        content: Joi.string(),

                    }]
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts',
        handler: async (request, h) => {
            const { offset, limit } = request.query
            try {
                return await Posts.find()
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit)
            } catch (err) {
                // return Boom.wrap(error, 400, 'Erro ao buscar as postagens')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem de postagens',
            validate: {
                headers: validateHeader(),
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/{id}',
        handler: async (request, h) => {

            try {
                const result = await Posts.findById({ _id: request.params.id })

                if (!result)
                    return Boom.notFound()

                return result

            } catch (err) {
                // return response(Boom.wrap(err, 400, 'Erro ao buscar a postagem desejada'))
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listage  de postagem especifica por id',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required(),
                },
            }
        }
    }
    ,
    {
        method: 'PATCH',
        path: '/posts/{id}',
        handler: async (request, h) => {
            try {
                const result = await Posts.updateOne({ _id: request.params.id },
                    { $set: request.payload })
                if (result.n === 0) {
                    return Boom.notFound()
                }
                return result
            }
            catch (err) {
                // return Boom.wrap(error, 400, 'Erro ao salvar a postagem')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        }
        ,
        config: {
            tags: ['api'],
            description: 'Rota de update de postagem',
            validate: {
                headers: validateHeader(),
                payload: {
                    content: Joi.string(),
                    likes: Joi.number(),
                    photo: Joi.string(),
                    comments: {
                        content: Joi.string()
                    }
                },
                params: {
                    id: Joi.string().required(),
                },
            }
        }
    }
    ,
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: async (request, h) => {

            try {
                const result = await Posts.deleteOne({ _id: request.params.id })

                if (result.n === 0) {
                    return Boom.notFound();
                }

                return result
            }
            catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao deletar a postagem')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota para deletar postagem',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required(),
                },
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/projects/{projectId}',
        handler: async (request, h) => {
            const { offset, limit } = request.query;
            try {
                const result = await Posts.find({ projectId: request.params.projectId })
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit)

                if (!result) {
                    return Boom.notFound
                }
                return result

            } catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao buscar as postagens do projeto')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem das postagens referentes a um projeto',
            validate: {
                headers: validateHeader(),
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                },
                params: {
                    projectId: Joi.string().required(),
                },
            }
        }
    }
    ,
    {

        method: 'GET',
        path: '/posts/users/{userId}',
        handler: async (request, h) => {
            try {
                const { offset, limit } = request.query
                const result = await Posts.find({ 'user._id': request.params.userId })
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit);

                if (!result)
                    return Boom.notFound

                return result

            } catch (err) {
                // return response(Boom.wrap(err, 400, 'Erro ao buscar as postagens do usuário'))
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem das postagens referentes a um usuario',
            validate: {
                headers: validateHeader(),
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                },
                params: {
                    userId: Joi.string().required(),
                },
            }
        }
    }
    ,
    {
        method: 'POST',
        path: '/posts/{id}/comentarios',
        handler: async (request, h) => {

            try {
                const result = await Posts.updateOne({ _id: request.params.id }, { $push: { comments: request.payload } })

                if (result.n === 0)
                    return Boom.notFound()

                return result
            } catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao salvar comentário da postagem')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota para cadastrar comentarios em uma postagem',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required()
                },
                payload: {
                    content: Joi.string().required(),
                    user: Joi.object().keys({
                        userId: Joi.string().required(),
                        name: Joi.string().required(),
                        photo: Joi.string().required()
                    }),
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/{id}/comentarios',
        handler: async (request, h) => {
            try {
                const { offset, limit } = request.query
                const doc = await Posts.findOne({ _id: request.params.id }).sort({ createdAt: 'asc' })

                if (doc.comments[0]) {
                    const comentarios = doc.comments.splice(offset, limit)
                    return comentarios
                }
                else {
                    return Boom.notFound()
                }
            } catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao buscar os comentarios da postagem')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota para buscar e listar todos os comentarios de uma postagem',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().required()
                },
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                }
            }
        }
    }
]