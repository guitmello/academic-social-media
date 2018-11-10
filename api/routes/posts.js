const Boom = require('boom')
const Posts = require('../models/Posts')
const Joi = require('joi')

module.exports = [
    {
        method: 'POST',
        path: '/posts',
        handler: (request, h) => {

            try {
                const posts = request.payload;
                return Posts.create(posts)
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao tentar inserir a postagem')
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de cadastro de postagem',
            validate: {
                payload: {
                    userId: Joi.string().required(),
                    projectId: Joi.string(),
                    content: Joi.string().required(),
                    createdAt: Joi.date(),
                    likes: Joi.number(),
                    comments: {
                        name: Joi.string(),
                        userId: Joi.string(),
                        createdAt: Joi.date()
                    }
                }
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts',
        handler: (request, response) => {
            const { offset, limit } = request.query
            try {
                return Posts.find()
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit)
            } catch (error) {
                return response(Boom.wrap(error, 400, 'Erro ao buscar as postagens'))
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem de postagens',
            validate: {
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
        handler: (request, response) => {

            try {
                const result = Posts.findById({ _id: request.params.id })

                if (!result)
                    return Boom.notFound()

                return result

            } catch (error) {
                return response(Boom.wrap(err, 400, 'Erro ao buscar a postagem desejada'))
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listage  de postagem especifica por id',
            validate: {
                params: {
                    id: Joi.string().max(50).required(),
                },
            }
        }
    }
    ,
    {
        method: 'PATCH',
        path: '/posts/{id}',
        handler: async (request, response) => {
            try {
                const result = Posts.updateOne({ _id: request.params.id },
                    { $set: request.payload })
                if (result.n === 0) {
                    return Boom.notFound()
                }
                return result
            }
            catch (error) {
                return Boom.wrap(error, 400, 'Erro ao salvar a postagem')
            }
        }
        ,
        config: {
            tags: ['api'],
            description: 'Rota de update de postagem',
            validate: {
                payload: {
                    userId: Joi.string(),
                    projectId: Joi.string(),
                    content: Joi.string(),
                    createdAt: Joi.date(),
                    likes: Joi.number(),
                    comments: {
                        name: Joi.string(),
                        userId: Joi.string(),
                        createdAt: Joi.date()
                    }
                },
                params: {
                    id: Joi.string().max(50).required(),
                },
            }
        }
    }
    ,
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: (request, response) => {

            try {
                const result = Posts.deleteOne({ _id: request.params.id })

                if (result.n === 0) {
                    return Boom.notFound();
                }

                return result
            }
            catch (error) {
                return Boom.wrap(err, 400, 'Erro ao deletar a postagem')
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota para deletar postagem',
            validate: {
                params: {
                    id: Joi.string().max(50).required(),
                },
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/projects/{projectId}',
        handler: (request, response) => {
            const { offset, limit } = request.query;
            try {
                const result = Posts.find({ projectId: request.params.projectId })
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit)

                if (!result) {
                    return Boom.notFound
                }
                return result
            } catch (error) {
                return Boom.wrap(err, 400, 'Erro ao buscar as postagens do projeto')
            }

        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem das postagens referentes a um projeto',
            validate: {
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                },
                params: {
                    projectId: Joi.string().max(50).required(),
                },
            }
        }
    }
    ,
    {

        method: 'GET',
        path: '/posts/users/{userId}',
        handler: (request, response) => {
            try {
                const { offset, limit } = request.query
                const result = Posts.find({ userId: request.params.userId })
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit);

                if (!result)
                    return Boom.notFound

                return result

            } catch (error) {
                return response(Boom.wrap(err, 400, 'Erro ao buscar as postagens do usuário'))
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem das postagens referentes a um usuario',
            validate: {
                query: {
                    offset: Joi.number().integer().min(0).default(0),
                    limit: Joi.number().integer().min(1).default(10)
                },
                params: {
                    userId: Joi.string().max(50).required(),
                },
            }
        }
    }
]