import Blog from "../models/Blog"
import multer from "multer"
import { Response } from "express"

const createBlog = async (req: any, res: Response) => {

    // try {
    //     upload.single("blogImage")
    // } catch (err) {
    //     console.log(err)
    // }
    // console.log("image uploaded successfully!")
    
    const { author, title, content, twitter, instagram, tags, image } = req.body

    let date: string | Date = new Date(Date.now())
    date.toDateString();
    date = String(date).split("GMT")[0]

    const blog = new Blog({
        author: author,
        title: title,
        content: content,
        image: image,
        date: date,
        tags: tags,
        twitter: twitter,
        instagram: instagram
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