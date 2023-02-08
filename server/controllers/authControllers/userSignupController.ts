import User from "../../models/User"
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"

const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1>Welcome to Blogify</h1>
    <p>Kindly verify your blogify account email by clicking the link below : </p>
    <button> <a href="http://localhost:3000/accountVerification"> Verify Email </a> </button>
`

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password} = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        // console.log(err)
    }
    if (existingUser) {
        return res
        .status(400)
        .json({message: "User already exists! Login instead."})
    }
    const hashedPassword = bcrypt.hashSync(password, 5)

    const user = new User({
        name,   
        email,
        password: hashedPassword,
        verified: false
    })

    try {
        await user.save()
    } catch (err) {
        // console.log(err)
    }

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "blogify253@gmail.com",
            pass: "oshjipijfcacciyx"
        }
    })

    let mailOptions = {
        from: "blogify253@gmail.com",
        to: email,
        subject: "Verify your Blogify Account Email",
        html: html
    }

    transporter.sendMail(mailOptions, (err: any, success: any) => {
        if (err) {
            // console.log("Mail not sent.", err)
        }
        else {
            // console.log("Success, ema/il has been sent.", success)
        }
    })

    return res
            .status(201)
            .json({message: user})
}

export default signup