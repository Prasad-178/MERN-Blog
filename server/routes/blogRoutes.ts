export {}

import express from "express"
import multer from "multer"
import getAllPosts from "../controllers/blogControllers/getAllBlogs"
import createBlog, { singleFileUpload } from "../controllers/createBlogController"
import getMyBlogs from "../controllers/blogControllers/getMyBlogs"
import { verifyToken } from "../middleware/verifyJWTLogin"
import getBlogById from "../controllers/blogControllers/getBlogById"
import deleteBlog from "../controllers/blogControllers/deleteBlogById"
import updateBlogById from "../controllers/blogControllers/updateBlogById"
import getLastFourPosts from "../controllers/blogControllers/getLastFourBlogs"

const router = express.Router()

router.get('/allposts', getAllPosts)

router.get('/latestfourposts', getLastFourPosts)

router.get('/blog/:id', getBlogById)

router.use(verifyToken)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads")
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        callback(null, fileName)
    }
})

export const upload = multer({
    storage: storage
})

router.post('/newblog', createBlog)

router.post('/myblogs', getMyBlogs)

router.put('/editblog/:id', updateBlogById)

router.delete('/deleteblog/:id', deleteBlog)

export default router
