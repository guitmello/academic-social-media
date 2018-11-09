const projects = require('./projects')
const users = require('./users')
const posts = require('./posts')

module.exports = [
    ...projects,
    ...users,
    ...posts
]