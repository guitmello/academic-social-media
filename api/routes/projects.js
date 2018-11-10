const Boom = require('boom')
const Projects = require('../models/Projects')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = [
    {
        method: 'GET',
        path: '/projects',
        handler: (request, h) => {
            try {
                const { offset, limit } = request.query;
                return Projects.find()
                    .sort({ createdAt: 'asc' })
                    .skip(offset)
                    .limit(limit)
            }
            catch (err) {
                return response(Boom.wrap(err, 400, 'Erro ao buscar os projetos'))
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem de projetos',
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
        path: '/projects/{id}',
        handler: async (request, h) => {
            try {
                const result = await Projects.findOne({ _id: request.params.id })
                if (!result)
                    return Boom.notFound()

                return result
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao buscar projeto desejado')
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem de um projeto especifica por id',
            validate: {
                params: {
                    id: Joi.objectId().required(),
                },
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/projects/toprated',
        handler: (request, h) => {
            try {
                const { offset, limit } = request.query;
                return Projects.find()
                    .sort({ likes: 'desc' })
                    .skip(offset)
                    .limit(limit)
            }
            catch (err) {
                return Boom.wrap(err, 400, "Erro ao buscar os 'Top Rated Projects'" )
            }
        },
        config: {
            tags: ['api'],
            description: "Rota de busca e listagem de projetos 'Top Rated'",
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
        path: '/projects/user/{userId}',
        handler: (request, h) => {
            try {
                const { userId } = request.params
                return Projects.find({ userId: userId })
                    .sort({ dtcriacao: 'asc' })
                    .limit(1)
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao buscar o projeto de um usuario especifico')
            }
        },
        config: {
            validate: {
                params: {
                    userId: Joi.objectId().required()
                }
            }
        }
    }
    ,
    {
        method: 'POST',
        path: '/projects',
        handler: async (request, h) => {
            try {
                const project = request.payload;
                return Projects.create(project)
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao buscar projeto')
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de cadastro de projeto',
            validate: {
                payload: {
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    createdAt: Joi.date(),
                    userId: Joi.objectId().required(),
                    loading: Joi.number(),
                    likes: Joi.number(),
                }
            }
        }
    }
    ,
    {
        method: 'PATCH',
        path: '/projects/{id}',
        handler: async (request, h) => {
            try {
                const result = await Projects.update({ _id: request.params.id },
                    { $set: request.payload })

                if (result.n === 0)
                    return Boom.notFound()

                return result
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao buscar projeto')
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de cadastro de projeto',
            validate: {
                payload: {
                    name: Joi.string(),
                    description: Joi.string(),
                    createdAt: Joi.date(),
                    userId: Joi.objectId().required(),
                    loading: Joi.number(),
                    likes: Joi.number(),
                },
                params: {
                    id: Joi.string().max(50).required(),
                }
            }
        }
        
    }
    ,
    {
        method: 'DELETE',
        path: '/projects/{id}',
        handler: async (request, h) => {
            try {
                const result = await Projects.remove({
                    _id: request.params.id
                });

                if (result.n === 0)
                    return Boom.notFound()

                return result
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao buscar projeto')
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota para deletar projeto',
            validate: {
                params: {
                    id: Joi.string().max(50).required(),
                },
            }
        }
    }
]