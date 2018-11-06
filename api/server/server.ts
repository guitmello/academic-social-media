import * as restify from 'restify'
import * as mongoose from 'mongoose'

import {environment} from '../common/environment'
import {Router} from '../common/router'

export class Server {

    application: restify.Server

    initializeDb(): mongoose.MongooseThenable{
        //metodo connect retorna uma promise padrão.
        //Promise do mongoose esta depreciada, por isso estou atribuindo a promise padrão do Node.js
        (<any>mongoose.Promise) = global.Promise
        return mongoose.connect(environment.db.url,{
            useMongoClient: true
        })
    }

    initRoutes(routers: Router[]): Promise<any>{
        return new Promise((resolve, reject)=>{
            try{
                this.application = restify.createServer({
                    name: 'social-media-api',
                    version: '1.0.0'
                })
                
                //Aplica middlewares
                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())

                // Rotas
                for(let router of routers) {
                    router.applyRoutes(this.application)
                }
                    
                this.application.listen(environment.server.port,()=>{
                    resolve(this.application)
                })
            }catch(error){
                reject(error)
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server>{
        return this.initializeDb().then(()=>this.initRoutes(routers).then(()=> this))
    }
}