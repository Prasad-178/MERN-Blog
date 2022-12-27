import { Response } from "express";
import Blog from "../../models/Blog";

const updateBlogById = async (req: any, res: Response) => {
    
    const id = req.params.id

    let blog: any
    try {
        blog = await Blog.findOne({ _id: id }).exec()
    } catch (err) {
        console.log(err)
    }

    const { author, title, content, twitter, instagram, tags, image, email } = req.body
    let date: string | Date = new Date(Date.now())
    date.toDateString();
    date = String(date).split("GMT")[0]

    var k = 0
    if (content.length === 8) {
        k = 1
    }

    if (author) blog.author = author
    if (title) blog.title = title
    if (email) blog.email = email
    if (k === 0) {
        blog.content = content
    }
    else {
        blog.content = blog.content
    }
    if (twitter) blog.twitter = twitter
    if (instagram) blog.instagram = instagram
    if (tags) blog.tags = tags
    if (image) blog.image = image
    blog.date = date

    try {
        await blog.save()
    } catch (err) {
        console.log(err)
    }

    return res
        .status(201)
        .json({ message: blog })

}

export default updateBlogById