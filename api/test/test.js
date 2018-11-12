const assert = require('assert')
const app = require('../server')

let server = {}
let MOCHA_TOKEN = ''
let ID_USER = ''
let ID_PROJECT = ''
let ID_POST = ''
let ID_FOLLOWER = ''

describe.only("APi testing suite", () => {

    before(async () => server = await app)

    //USER
    describe("User testing suite", () => {

        it("Login", async () => {
            const { result } = await server.inject({
                url: '/login',
                method: 'POST',
                payload: JSON.stringify({
                    email: 'krauser3d@gmail.com',
                    password: 'rlisb159',
                })
            })
            ID_USER = result._id
            MOCHA_TOKEN = result.token
            assert.ok(result.token)
        })

        it("Get user", async () => {
            const { result } = await server.inject({
                url: '/users',
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("Get specific user", async () => {
            const { result } = await server.inject({
                url: `/users/${ID_USER}`,
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("Post user", async () => {
            const { result } = await server.inject({
                url: '/users',
                method: 'POST',
                payload: {
                    name: 'userTest',
                    email: 'test@test.com',
                    area: 'sistema',
                    password: 'teste123456',
                    photo: '',
                    phone: '11911111111',
                    cpf: '537.567.020-81', //cpf -> www.4devs.com.br
                    gender: 'masc',
                    birthDate: '10/05/1994'
                }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("Update user", async () => {
            const { result } = await server.inject({
                url: `/users/${ID_USER}`,
                method: 'PATCH',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    name: 'updat test'
                }
            })
            assert.ok(result.statusCode !== 401)
        })
    })

    //PROJECTS
    describe("Projects testing suite", () => {

        it("Get projects", async () => {
            const { result } = await server.inject({
                url: '/projects',
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("POST project", async () => {
            const { result } = await server.inject({
                url: '/projects',
                method: 'POST',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    "name": "string",
                    "description": "string",
                    "createdAt": "2018-11-12",
                    "userId": ID_USER,
                    "loading": 0,
                    "likes": 0,
                    "photo": ""
                }
            })
            ID_PROJECT = result._id
            assert.ok(result.statusCode !== 401)
        })

        it("Get specific project", async () => {
            const { result } = await server.inject({
                url: `/projects/${ID_PROJECT}`,
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("Update project", async () => {
            const { result } = await server.inject({
                url: `/projects/${ID_PROJECT}`,
                method: 'PATCH',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    "name": "name test",
                    "description": "test",
                    "createdAt": "2018-11-12",
                    "userId": ID_USER,
                    "loading": 0,
                    "likes": 0,
                    "photo": ""
                }
            })
            assert.ok(result.statusCode !== 401)
        })
    })

    //POSTS
    describe("Posts testing suite", () => {

        it("Get posts", async () => {
            const { result } = await server.inject({
                url: '/posts',
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("Post", async () => {
            const { result } = await server.inject({
                url: '/posts',
                method: 'POST',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    "user": {
                        "_id": ID_USER,
                        "name": "test",
                        "photo": ""
                    },
                    "projectId": ID_PROJECT,
                    "content": "string",
                    "createdAt": "2018-11-12",
                    "likes": 0,
                    "photo": ""
                }
            })
            ID_POST = result._id
            assert.ok(result.statusCode !== 401)
        })

        it("Get specific post", async () => {
            const { result } = await server.inject({
                url: `/posts/${ID_POST}`,
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("Update post", async () => {
            const { result } = await server.inject({
                url: `/posts`,
                method: 'PATCH',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    "content": "test",
                    "likes": 0,
                    "photo": "string",
                    "comments": {
                        "content": "string"
                    }
                }
            })
            assert.ok(result.statusCode !== 401)
        })
    })

    //Followers
    describe("Followers testing suite", () => {
        it("Post Followers", async () => {
            const { result } = await server.inject({
                url: "/followers",
                method: 'POST',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    "_id": ID_USER
                }
            })

            ID_FOLLOWER = result._id

            assert.ok(result.statusCode !== 401)
        })
    })

    //Following
    describe("Following testing suite", () => {
        it("Post Following", async () => {
            const { result } = await server.inject({
                url: "/following",
                method: 'POST',
                headers: { Authorization: MOCHA_TOKEN },
                payload: {
                    "_id": ID_USER
                }
            })
            assert.ok(result.statusCode !== 401)
        })

        it("GET Following", async () => {
            const { result } = await server.inject({
                url: `/following/${ID_FOLLOWER}/posts`,
                method: 'GET',
                headers: { Authorization: MOCHA_TOKEN },
            })
            assert.ok(result.statusCode !== 401)
        })
    })
})