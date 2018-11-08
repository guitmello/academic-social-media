const Boom = require('boom')
const bcrypt = require('bcrypt');
const { promisify } = require('util')
const Usuarios = require('../models/Usuarios')

const bcryptAsPromise = promisify(bcrypt.hash)

module.exports = [
    {
        method : 'GET',
        path  : '/usuarios',
        handler : (request, response) => {
            Usuarios.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar usuário'))
    
                response(docs)
            })
        }
    }
,    
    {
        method : 'GET',
        path  : '/usuarios/{id}',
        handler : (request, response) => {
            Usuarios.findOne({_id : request.params.id},
                (err, doc) => {
                    if (err) 
                        return response(Boom.wrap(err, 400, 'Erro ao buscar usuário'))
    
                    if (!doc)
                        return response(Boom.notFound())
                    
                    response(doc)
    
                })
                .limit(20)
        }
    }
 ,   
    {
        method : 'POST',
        path : '/usuarios',
        handler : async (request, response) => {
            const usuario = request.payload;
            if (!usuario.dtcriacao) 
                usuario.dtcriacao = new Date();
            
            if (usuario.password) 
                usuario.password = await bcryptAsPromise(usuario.password, 10);
    
            Usuarios.create(usuario, (err, doc) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao criar usuário'))
                
                return response(doc)
            })
        }
    }
,
    {
        method : 'PATCH',
        path : '/usuarios/{id}',
        handler : async (request, response) => {
            const usuario = request.payload;

            if (usuario.password) 
                usuario.password = await bcryptAsPromise(usuario.password, 10);

            Usuarios.updateOne({_id : request.params.id},
                {$set : usuario},
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 'Erro ao salvar usuário'))
                    
                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    }
]