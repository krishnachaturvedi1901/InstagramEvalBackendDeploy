const {faker} = require('@faker-js/faker')
require('dotenv').config()

const crypto = require('crypto');
const connect = require('../database/connect');
const { PostModel } = require('../models/postModel');
const { UserModel } = require('../models/userModel');

const genders = ['male', 'female', 'other'];
const devices=['mobile','pc','laptop','tablet']

async function generateFakeUserData(count = 100) {

    const users = [];

    for(let i = 0; i < count; i++) {

        const gender = genders[crypto.randomInt(0, 3)];

        const user = {
            name: faker.name.fullName({
                sex: gender
            }),
            gender:gender,
            email: faker.internet.email(),
            image: faker.internet.avatar(),
            password: faker.internet.password(),
        }

        users.push(user);
    }

    UserModel.insertMany(users);

}

async function generateFakePostData(count = 600) {
    
    const users = await UserModel.find();
    const posts = [];

    for (let i = 0; i < count; i++) {
        const user = users[crypto.randomInt(0, users.length)];
        const device = devices[crypto.randomInt(0, devices.length)];

        const post = {
            title: faker.hacker.phrase(),
            body: faker.lorem.paragraphs(crypto.randomInt(5, 10)),
            userId: user._id,
            name: user.name,
            userImage: user.image,
            device:device
        }

        posts.push(post);
    }

    await PostModel.insertMany(posts);

    console.log('Added all posts')

}

// async function generateFakeCommentData(count = 30000) {
//     const users = await User.find();

//     const posts = await Post.find(); // [1, 2, 3, 4]

//     const comments = [];

//     for(let i = 0; i < count; i++) {

//         const user = users[crypto.randomInt(0, users.length)];
//         const post = posts[crypto.randomInt(0, posts.length)]; // [0, 3]

//         const comment = {
//             content: faker.lorem.paragraph(),
//             user: {
//                 userId: user._id,
//                 name: user.name,
//                 image: user.image,
//             },
//             post: {
//                 postId: post._id,
//                 title: post.title
//             }
//         }
        
//         comments.push(comment);
//     }

//     await Comment.insertMany(comments);

//     console.log('Added data for comments')
// }

connect()
.then(() => generateFakePostData(600))
