"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            users_model_1.User.find().then(this.render(resp, next));
        });
        application.get('/users/:id', (req, resp, next) => {
            users_model_1.User.findById(req.params.id).then(this.render(resp, next));
        });
        application.post('/users', (req, resp, next) => {
            let user = new users_model_1.User(req.body);
            user.save().then(this.render(resp, next));
        });
        application.put('/users/:id', (req, resp, next) => {
            /*
                método update não retorna uma promise, e sim um sumário com os dados do resultado,
                é necessário usar o metodo exe() para retornar uma promise.
                DICA ---> use o método findByIdAndUpdate!!!!
            */
            const options = { overwrite: true };
            users_model_1.User.update({ _id: req.params.id }, req.body, options)
                .exec().then(result => {
                if (result.n) {
                    return users_model_1.User.findById(req.params.id);
                }
                else {
                    resp.send(404);
                }
            }).then(this.render(resp, next));
        });
        application.patch('/users/:id', (req, resp, next) => {
            /*
                findByIdAndUpdate retorna o documento antigo,
                com o parametro 'new' é retornado o documento com os valores atualizados
            */
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options)
                .then(this.render(resp, next));
        });
        application.del('/users/:id', (req, resp, next) => {
            users_model_1.User.remove({ _id: req.params.id }).exec().then((cmdResult) => {
                if (cmdResult.result.n) {
                    resp.send(204);
                }
                else {
                    resp.send(404);
                }
            });
            return next();
        });
    }
}
exports.usersRouter = new UsersRouter();
