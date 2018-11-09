const Boom = require('boom')
const Projects = require('../models/Projects')
const { promisify } = require('util')

module.exports = [
    {
        method : 'GET',
        path  : '/projects',
        handler : (request, response) => {
            Projects.find((err, docs) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao buscar projetos'))
    
                response(docs)
            })
            .sort({createdAt : 'asc'})
            .limit(1)
        }
    }
,    
    {
        method : 'GET',
        path  : '/projects/{id}',
        handler : (request, response) => {
            Projects.findOne({_id : request.params.id},
                (err, doc) => {
                    if (err) 
                        return response(Boom.wrap(err, 400, 'Erro ao buscar projeto'))
    
                    if (!doc)
                        return response(Boom.notFound())
                    
                    response(doc)
    
                })
        }
    }
 ,   
    {
        method : 'POST',
        path : '/projects',
        handler : async (request, response) => {
            const project = request.payload;
            if (!project.createdAt) 
            project.createdAt = new Date();
    
            Projects.create(project, (err, doc) => {
                if (err)
                    return response(Boom.wrap(err, 400, 'Erro ao salvar projeto'));
                
                return response(doc)
            })
        }
    }
,
    {
        method : 'PATCH',
        path : '/projects/{id}',
        handler : (request, response) => {
            Projects.update({_id : request.params.id},
                {$set : request.payload},
                (err, result) => {
                    if (err)
                        return response(Boom.wrap(err, 400, 'Erro ao salvar projeto'))
                    
                    if (result.n === 0)
                        return response(Boom.notFound())

                    response().code(204);
                })
        }
    }
,
    {  
        method: 'DELETE',
        path: '/projects/{id}',
        handler: (request, response) => {
    
            Projects.remove({
                _id: request.params.id
            }, (err, result) => {
    
                if (err) {
                    return reply(Boom.wrap(err, 400, 'Erro ao deletar projeto'));
                }
    
                if (result.n === 0) {
                    return reply(Boom.notFound());
                }
    
                response().code(204);
            });
        }
    }
]