import User from "../../models/User"
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password} = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        console.log(err)
    }
    if (existingUser) {
        return res
        .status(400)
        .json({message: "User already exists! Login instead."})
    }
    const hashedPassword = bcrypt.hashSync(password, 5)

    const user = new User({
        name,    // name: req.body.name,
        email,
        password: hashedPassword,
        verified: false
    })

    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lummaoiscringe@gmail.com",
            pass: "xwhfjdhuduankjpc"
        }
    })

    let mailOptions = {
        from: "lummaoiscringe@gmail.com",
        to: email,
        subject: "Verify your Blogify account",
        text: "Click this link to verify your blogify account",
        html: `<p>Click this link to verify your blogify account : '<a href="http://localhost:3000/accountVerification">link</a>'   </p>`
    }

    transporter.sendMail(mailOptions, (err: any, success: any) => {
        if (err) {
            console.log("Mail not sent.", err)
        }
        else {
            console.log("Success, email has been sent.", success)
        }
    })

    return res
            .status(201)
            .json({message: user})
}

export default signup