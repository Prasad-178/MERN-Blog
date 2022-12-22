export {}

import { Response, NextFunction } from "express"
import User from "../../models/User"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

export const verifyEmail = async (req: any, res: Response, next: NextFunction) => {

    const { email, password } = req.body
    var existingUser: any
    try {
        existingUser = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (existingUser.verified === true) {
        return res
        .status(400)
        .json({ message: "User's email is already verified!!" })
    }

    if (!existingUser) {
        console.log("No such user exists!!")
        return res
        .status(404)
        .json({ message: "No such user exists!!" })
    }

    const passwordCompare = await bcrypt.compare(password, existingUser.password)
    if (!passwordCompare) {
        console.log("Wrong password!!")
        return res
        .status(401)
        .json({ message: "Wrong password!!" })
    }

    existingUser.verified = true
    try {
        await existingUser.save()
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
        subject: "Verified!!",
        text: "Congratulations!! Your blogify account has been verified!!",
    }

    transporter.sendMail(mailOptions, (err: any, success: any) => {
        if (err) {
            console.log("Mail not sent.", err)
        }
        else {
            console.log("Success, email has been sent, and your account has been verified!!", success)
        }
    })

    return res
    .status(200)
    .json({ message: "Email verified!!" })

}