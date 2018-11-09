const projetos = require('./projetos')
const usuarios = require('./usuarios')
const posts = require('./posts')

module.exports = [
    ...projetos,
    ...usuarios,
    ...posts
]