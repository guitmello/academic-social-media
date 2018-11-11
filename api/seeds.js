const Mongoose = require('mongoose');
const environment = require('./common/environment')

const Users = require('./models/Users')
const Projects = require('./models/Projects')
const Posts = require('./models/Posts')
const Followers = require('./models/Followers')
const Following = require('./models/Following')

Mongoose.connect(environment.db.url, { useNewUrlParser: true });
const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Erro de conexão'));
db.once('open', async function callback() {
    console.log('Conexão com o banco de dados ativa - seeds tests');
    await this.dropDatabase();
    console.log('Base de dados limpa. Seeds starting!')
    setupInc()
});


async function setupInc() {
    console.time('seeds')
    const samples = []
    for (let i = 0; i < 10; i++) {
        const userInc = {
            name: "Usuário número " + i,
            email: "user_" + i + "_test@asgard.com",
            photo: '/img/default-user.jpg',
            password: "Oi12345",
            createdAt: new Date(),
            area: "DevOps / Tests",
            phone: "00000",
            cpf: "000000",
            gender: "m",
            birthDate: "1997-01-31"

        }
        const resultUser = await Users.create(userInc)
        userInc._id = resultUser._id

        const projInc = {
            name: "Projeto número" + i,
            createdAt: new Date(),
            description: "O projeto número" + i + " é mais um teste gerado pelo loop!",
            userId: userInc._id,
            loading: 0,
            likes: Math.floor(Math.random() * 100000) + 1,
            photo: '/img/default-project.PNG'
        }
        const resultProj = await Projects.create(projInc)
        projInc._id = resultProj._id

        const samplePosts = []
        for (let y = 0; y < 10; y++) {
            const postInc = {
                user: userInc,
                projectId: projInc._id,
                createdAt: new Date(),
                content: "Post de teste número " + y,
                likes: Math.floor(Math.random() * 20) + 1,
                comments: []
            }
            const resultPost = await Posts.create(postInc)
            postInc._id = resultPost._id

            samplePosts.push(postInc)
        }

        samples.push({ usuario: userInc, projeto: projInc, posts: samplePosts })
    }

    //comentarios do post
    for (sample of samples) {
        Posts.update({ _id: sample.posts[Math.floor(Math.random() * 9) + 1]._id },
            {
                $push: {
                    comments: {
                        user: sample.usuario,
                        content: 'Comentário aleatório em uma postagem aleatória!'
                    }
                }
            },
            (err, doc) => { })

    }

    Following.create({
        _id: samples[0].usuario._id,
        following: [samples[1].usuario._id]
    },
        (error, doc) => {
            console.log('ID do que está seguindo (test timeline)', doc)
        })

    Followers.create({
        _id: samples[1].usuario._id,
        followers: [samples[0].usuario._id]
    })


    console.timeEnd('seeds')
}