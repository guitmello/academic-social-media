const projects = require('./projects')
const users = require('./users')
const posts = require('./posts')
const images = require('./images')

module.exports = [
    ...projects,
    ...users,
    ...posts,
    ...images
]