import {Router} from '../common/router'
import * as restify from 'restify'
import {User} from './users.model'

class UsersRouter extends Router {

    applyRoutes(application: restify.Server){
        application.get('/users', (req, resp, next)=>{
            User.find().then(this.render(resp,next))
        })

        application.get('/users/:id', (req, resp, next) => {
            User.findById(req.params.id).then(this.render(resp,next))
        })

        application.post('/users', (req, resp, next)=>{
            let user = new User(req.body)
            user.save().then(this.render(resp,next))
        })

        application.put('/users/:id', (req, resp, next)=>{
        /*
            método update não retorna uma promise, e sim um sumário com os dados do resultado,
            é necessário usar o metodo exe() para retornar uma promise.
            DICA ---> use o método findByIdAndUpdate!!!!
        */
            const options = {overwrite: true}
            User.update({_id:req.params.id}, req.body, options)
                .exec().then(result=>{
                    if(result.n){
                        return User.findById(req.params.id)
                    }else{
                        resp.send(404)
                    }
            }).then(this.render(resp,next))
        })

        application.patch('/users/:id', (req, resp, next)=>{
        /*
            findByIdAndUpdate retorna o documento antigo,
            com o parametro 'new' é retornado o documento com os valores atualizados
        */
            const options = {new: true}
            User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp,next))
        })

        application.del('/users/:id', (req, resp, next)=>{
            User.remove({_id:req.params.id}).exec().then((cmdResult: any) =>{
                if(cmdResult.result.n){
                    resp.send(204)
                }else{
                    resp.send(404)
                }
            })
            return next()
        })
    }
}

export const usersRouter = new UsersRouter()