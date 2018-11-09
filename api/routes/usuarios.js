const Boom = require('boom')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { promisify } = require('util')
const Users = require('../models/users')

const bcryptAsPromise = promisify(bcrypt.hash)

module.exports = [
    {
        method: 'GET',
        path: '/users',
        handler: (request, response) => {
            Users.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar usuários'))

                response(docs)
            }).limit(20)
        }
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: (request, response) => {
            Users.findOne({ _id: request.params.id },
                (err, doc) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao buscar usuário'))

                    if (!doc)
                        return response(Boom.notFound())

                    response(doc)

                })
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: async (request, response) => {
            const usuario = request.payload;
            if (!usuario.dtcriacao)
                usuario.dtcriacao = new Date();

            if (usuario.password)
                usuario.password = await bcryptAsPromise(usuario.password, 10);

            Users.create(usuario, (err, doc) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao criar usuário'))

                return response(doc)
            })
        }
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: async (request, response) => {
            const usuario = request.payload;

            if (usuario.password)
                usuario.password = await bcryptAsPromise(usuario.password, 10);

            Users.updateOne({ _id: request.params.id },
                { $set: usuario },
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