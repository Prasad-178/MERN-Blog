export {}

import express from "express"
import multer from "multer"
import getAllBlogs from "../controllers/blogControllers/getAllBlogs"
import createBlog, { singleFileUpload } from "../controllers/blogControllers/createBlogController"
import getMyBlogs from "../controllers/blogControllers/getMyBlogs"
import { verifyToken } from "../middleware/verifyJWTLogin"
import getBlogById from "../controllers/blogControllers/getBlogById"

const router = express.Router()

router.get('/allblogs', getAllBlogs)

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

export default router
