const express=require('express')
const { login, loggedInUser, signup } = require('../controllers/auth.controllers')
const authRouter=express.Router()

const authMiddleware=require('../middlewares/auth.middleware')

authRouter.post('/login',login)
authRouter.post('/register',signup)
authRouter.get('/loggedInUser',authMiddleware,loggedInUser)

module.exports=authRouter