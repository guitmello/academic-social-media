const projects = require('./projects')
const users = require('./users')
const posts = require('./posts')
const images = require('./images')
const followers = require('./followers')
const following = require('./following')

module.exports = [
    ...projects,
    ...users,
    ...posts,
    ...images,
    ...followers,
    ...following
]