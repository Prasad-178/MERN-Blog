import Blog from "../models/Blog"
import { Response } from "express"

export const singleFileUpload = async (req: any, res: Response) => {
    // console.log("inside single file upload")
    try {
        const file = req.file
        return res.
        status(201)
        .send('File uploaded successfully!')
    } catch (err: any) {
        return res
        .status(400)
        .send(err.message)
    }
}

const createBlog = async (req: any, res: Response) => {
    
    const { author, title, content, twitter, instagram, tags, image, email } = req.body

    let date: string | Date = new Date(Date.now())
    date.toDateString();
    date = String(date).split("GMT")[0]
// 
    // console.log("c is : ", content)
    // console.log("c len is : ", content.length)
    
    if (!author || !title || content.length < 1 || content.length === 8 || !twitter || !instagram || tags.length < 1 || !image || !email) {
        return res
            .status(400)
            .json({ message: "Failed to create blog" })
    }

    const blog = new Blog({
        author: author,
        title: title,
        content: content,
        image: image,
        date: date,
        tags: tags,
        twitter: twitter,
        instagram: instagram,
        email: email
    })


    try {
        await blog.save()
    } catch (err) {
        // console.log(err)
    }

    return res
            .status(201)
            .json({ message: blog })
}

export default createBlog