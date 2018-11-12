const Boom = require('boom')
const Projects = require('../models/Projects')
const validateHeader = require('../util/validateHeader')
const Joi = require('joi')
const imgFunctions = require('../util/imgFunctions')
const Logs = require('../util/logs')

module.exports = [
    {
        method: 'GET',
        path: '/projects',
        handler: async (request, h) => {
            try {
                const { offset, limit } = request.query;
                const resultProjects = await Projects.find()
                    .sort({ createdAt: 'asc' })
                    .skip(offset)
                    .limit(limit)
                return resultProjects
            }
            catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao buscar os projetos')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem de projetos',
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
        path: '/projects/{id}',
        handler: async (request, h) => {
            try {
                const result = await Projects.findOne({ _id: request.params.id })
                if (!result)
                    return Boom.notFound()

                return result
            }
            catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao buscar projeto desejado')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem de um projeto especifica por id',
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
        path: '/projects/toprated',
        handler: async (request, h) => {
            try {
                const { offset, limit } = request.query;
                const resultTopRated = await Projects.find()
                    .sort({ likes: 'desc' })
                    .skip(offset)
                    .limit(limit)

                return resultTopRated
            }
            catch (err) {
                // return Boom.wrap(err, 400, "+Erro ao buscar os 'Top Rated Projects'")
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: "Rota de busca e listagem de projetos 'Top Rated'",
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
        path: '/projects/user/{userId}',
        handler: async (request, h) => {
            try {
                const { userId } = request.params
                const resultProjects = await Projects.find({ userId: userId })
                    .sort({ dtcriacao: 'asc' })
                    .limit(1)
                return resultProjects
            }
            catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao buscar o projeto de um usuario especifico')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de busca e listagem do projeto pelo userId',
            validate: {
                headers: validateHeader(),
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
                if (project.photo) {
                    const data = imgFunctions.base64ToPNG(project.photo) //formata o base64 
                    const pathPhoto = imgFunctions.generateFileName() //gera uma string pra usar como nome da foto
                    await imgFunctions.savePNGToDisk(data, `${__dirname}/..${pathPhoto}`) //salva o base64 em disco com o novo nome da foto
                    project.photo = pathPhoto //bota o path no objeto de usuario para guardar no banco e o front end poder utilizar depois        
                }

                return await Projects.create(project)
            }
            catch (err) {
                // return Boom.wrap(err, 400, 'Erro ao buscar projeto')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de cadastro de projeto',
            validate: {
                headers: validateHeader(),
                payload: {
                    name: Joi.string().required(),
                    description: Joi.string().required(),
                    createdAt: Joi.date(),
                    userId: Joi.string().required(),
                    loading: Joi.number(),
                    likes: Joi.number(),
                    photo: Joi.string(),
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
                // return Boom.wrap(err, 400, 'Erro ao buscar projeto')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota de cadastro de projeto',
            validate: {
                headers: validateHeader(),
                payload: {
                    name: Joi.string(),
                    description: Joi.string(),
                    createdAt: Joi.date(),
                    userId: Joi.string().required(),
                    loading: Joi.number(),
                    likes: Joi.number(),
                    photo: Joi.string(),
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
                // return Boom.wrap(err, 400, 'Erro ao buscar projeto')
                const item = Logs.obterDadoRequest(request, request.auth.credentials.username)
                Logs.logError(item.path, { ...item, err })
                return Boom.internal()
            }
        },
        config: {
            tags: ['api'],
            description: 'Rota para deletar projeto',
            validate: {
                headers: validateHeader(),
                params: {
                    id: Joi.string().max(50).required(),
                },
            }
        }
    }
]