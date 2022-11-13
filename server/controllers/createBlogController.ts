import Blog from "../models/Blog"
import multer from "multer"
import { Request, Response, NextFunction } from "express"

const createBlog = async (req: Request, res: Response, next: NextFunction) => {

    const { author, title, content, tags, twitter } = req.body

    // const Storage = multer.diskStorage({
    //     // destination: 'uploads',
    //     destination: function (req, file, callback) {
    //         callback(null, '../uploads')
    //     },

    //     filename: (req, file, cb) => {
    //         cb(null, Date.now() + file.originalname)
    //     }
    // })

    // const upload = multer({
    //     storage: Storage,
    //     limits: {
    //         fieldSize: 1024 * 1024 * 3
    //     }
    // })
    // .single("testImage")

    const date = new Date()
    const blog = new Blog({
        author: author,
        title: title,
        content: content,
        // images: {
        //     contentType: 'image/png',
        //     data: req.file?.filename
        // },
        date: date,
        tags: tags,
        twitter: twitter
    })

    try {
        await blog.save()
    } catch (err) {
        console.log(err)
    }

    return res
            .status(201)
            .json({ message: blog })
}

export default createBlog