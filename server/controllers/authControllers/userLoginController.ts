import User from "../../models/User"
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import express from "express"
const app = express()

const login = async (req: any, res: Response, next: NextFunction) => {
    
    const { email, password } = req.body
    var existingUser: any
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return (err)
    }

    if (!existingUser) {
        return res
        .status(404)
        .json({ message: "User does not exist. You should sign up instead." })
    }
    
    const passwordCompare = await bcrypt.compare(password, existingUser.password)
    if (!passwordCompare) {
        return res
        .status(400)
        .json({ message: "Password is wrong" })
    }

    const token = jwt.sign({ id: existingUser._id }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: "3h"
    })

    res.cookie('JWT_HTTPONLY_Cookie', token, {
        path: '/',
        expires: new Date(Date.now() + 1000*60*60*3),
        httpOnly: true,
        sameSite: 'lax'
    })
    console.log("Logged in successfully!!")

    return res
    .status(201)
    .json({ message: "Logged in successfully", user: existingUser, token })
}

export default login
