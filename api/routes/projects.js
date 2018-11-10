const Boom = require('boom')
const Projects = require('../models/Projects')
const Joi = require('joi')

module.exports = [
    {
        method: 'GET',
        path: '/projects',
        handler: (request, h) => {
            try {
                return Projects.find()
                    .sort({ createdAt: 'asc' })
                    .limit(1)
            }
            catch (err) {
                return response(Boom.wrap(err, 400, 'Erro ao buscar projetos'))
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
                return Boom.wrap(err, 400, 'Erro ao buscar projeto')
            }
        }
    }
    ,
    {
        method: 'GET',
        path: '/projects/toprated',
        handler: (request, h) => {
            try {
                return Projects.find()
                    .sort({ likes: 'desc' })
                    .limit(10)
            }
            catch (err) {
                return Boom.wrap(err, 400, 'Erro ao buscar projeto')
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
                return Boom.wrap(err, 400, 'Erro ao buscar projeto')
            }
        },
        config: {
            validate: {
                params: {
                    userId: Joi.string().required()
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
        }
    }
]