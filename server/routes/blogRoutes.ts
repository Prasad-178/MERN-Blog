export {}

import express from "express"
import multer from "multer"
import getAllBlogs from "../controllers/getAllBlogs"
import createBlog from "../controllers/createBlogController"
import getMyBlogs from "../controllers/getMyBlogs"
import { verifyToken } from "../middleware/verifyJWTLogin"

const router = express.Router()

router.get('/allblogs', getAllBlogs)

router.use(verifyToken)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/")
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        callback(null, fileName)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true)
        }
        else {
            callback(null, false)
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
})

router.post('/newblog' , upload.single("image"), createBlog)

router.get('/myblogs', getMyBlogs)

export default router
