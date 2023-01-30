const express=require('express')
const { getPostsByUserID, createPost, updatePost, deletePost } = require('../controllers/post.controllers')
const postRouter=express.Router()

const authMiddleware=require('../middlewares/auth.middleware')

postRouter.get('/:userId',authMiddleware,getPostsByUserID)
postRouter.post('/create',authMiddleware,createPost)
postRouter.patch('/update/:postId',authMiddleware,updatePost)
postRouter.delete('/delete/:postId',authMiddleware,deletePost)


module.exports=postRouter