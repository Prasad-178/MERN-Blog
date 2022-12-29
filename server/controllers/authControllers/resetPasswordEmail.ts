import { Request, Response } from "express";
import User from "../../models/User";
import nodemailer from "nodemailer"
import { randomUUID } from "crypto";
import Otp from "../../models/Otp";

const uuid: string = randomUUID()
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1Reset your Blogify Password</h1>
    <p>Your OTP is : ` + uuid + ` </p>
    <p>Kindly click this link to reset your blogify password : </p>
    <button> <a href="http://localhost:3000/setnewpassword"> Verify Email </a> </button>
    <p>Kindly ignore this message if this was not you.</p>
`

const resetPasswordEmail = async (req: Request, res: Response) => {
    
    const { email } = req.body
    let user: any
    try {
        user = User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    if (user) {

        const otp = new Otp({
            email: email,
            otp: uuid
        })

        try {
            otp.save()
        } catch (err) {
            console.log(err)
        }

        console.log("otp saved in database!!")

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
            subject: "Instructions to Reset Blogify Password",
            html: html
        }
    
        transporter.sendMail(mailOptions, (err: any, success: any) => {
            if (err) {
                console.log("Mail not sent.", err)
            }
            else {
                console.log("Success, email has been sent.", success)
            }
        })
    }

    return res
        .status(200)
        .json({ message: user })

}

export default resetPasswordEmail