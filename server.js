require('dotenv').config()
const express=require('express')
const cors=require('cors')
const app=express()

const connect=require('./database/connect')
const authRouter = require('./routes/authRoute')
const postRouter = require('./routes/postRoute')

app.use(cors())
app.use(express.json())

app.use('/users',authRouter)
app.use('/posts',postRouter)
app.use('*',(req,res)=>{
    res.send({
        "/posts":"First login and get your all posts using this route"
    })
})
const port=Number(process.argv[2])||5001


connect().then(()=>{
    app.listen(port,()=>{
        console.log(`Server listening to http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log('Cant start server due to failed db connection')
})