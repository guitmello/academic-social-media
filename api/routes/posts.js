const Boom = require('boom')
const Posts = require('../models/Posts')
const Joi = require('joi')

module.exports = [
    {
        method: 'POST',
        path: '/posts',
        handler: (request, h) => {

            const post = request.payload

            Posts.create(post, (error, docs) => {

                if (error) {
                    return Boom.wrap(error, 400, 'Erro ao salvar a postagem');
                }

                return docs;

            })
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts',
        handler: (request, response) => {
            const { offset, limit } = request.query

            Posts.find((err, posts) => {
                if (err) {
                    return response(Boom.wrap(error, 400, 'Erro ao buscar as postagens'));
                }
                response(posts);
            })
                .sort({ createdAt: 'desc' })
                .skip(offset)
                .limit(limit)
        },
        config: {
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
            Posts.findById({ _id: request.params.id },
                (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao buscar a postagem desejada'))

                    if (!doc)
                        return response(Boom.notFound())

                    response(doc)

                })
        }
    }
    ,
    {
        method: 'PATCH',
        path: '/posts/{id}',
        handler: (request, response) => {
            Posts.updateOne({ _id: request.params.id },
                { $set: request.payload },
                (err, result) => {
                    if (err) {
                        return response(Boom.wrap(err, 400, 'Erro ao salvar a postagem'))
                    }

                    if (result.n === 0) {
                        return response(Boom.notFound())
                    }

                    response(result);
                })
        }
    }
    ,
    {
        method: 'DELETE',
        path: '/posts/{id}',
        handler: (request, response) => {

            Posts.deleteOne({
                _id: request.params.id
            }, (err, result) => {

                if (err) {
                    return response(Boom.wrap(err, 400, 'Erro ao deletar a postagem'));
                }

                if (result.n === 0) {
                    return response(Boom.notFound());
                }

                response(result);
            });
        }
    }
    ,
    {
        method: 'GET',
        path: '/posts/projects/{id}',
        handler: (request, response) => {

            Posts.find({ projectId: request.params.id },
                (err, posts) => {
                    if (err) {
                        return response(Boom.wrap(err, 500, 'Erro ao buscar as postagens do projeto'));
                    }

                    response(posts);
                })
                .sort({ createdAt: 'desc' })
        }
    }
]