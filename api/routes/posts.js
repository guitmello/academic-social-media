const Boom = require('boom')
const Posts = require('../models/Posts')
const validateHeader = require('../util/validateHeader')
const Joi = require('joi')
const imgFunctions = require('../util/imgFunctions')

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
        handler: (request, response) => {
            const { offset, limit } = request.query
            try {
                return Posts.find()
                    .sort({ createdAt: 'desc' })
                    .skip(offset)
                    .limit(limit)
            } catch (error) {
                return Boom.wrap(error, 400, 'Erro ao buscar as postagens')
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
        handler: (request, response) => {

            try {
                const result = Posts.updateOne({ _id: request.params.id }, { $push: { comments: request.payload } })
                console.log('entrou aqui', result)
                if (result.n === 0)
                    return Boom.notFound()

                return result
            } catch (error) {
                return Boom.wrap(err, 400, 'Erro ao salvar comentário da postagem')
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
        handler: async (request, response) => {
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
                return Boom.wrap(err, 400, 'Erro ao buscar os comentarios da postagem')
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