const User = require('../model/User')
import { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const JWT_SECRET_KEY = 'iloveprocrastinating'

var existingUser: any
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        return (err)
    }

    if (!existingUser) {
        return res
        .status(400)
        .json({ message: "User does not exist. You should sign up instead." })
    }
    
    const passwordCompare = await bcrypt.compare(password, existingUser.password)
    if (!passwordCompare) {
        return res
        .status(400)
        .json({ message: "Password is wrong" })
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
        expiresIn: "28800000"
    })

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000*3600*8),
        httpOnly: true,
        sameSite: 'lax'
    })

    return res
    .status(201)
    .json({ message: "Logged in successfully", user: existingUser, token })
}

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie
    console.log("cookie is : ", cookies)
    const token = cookies.split('=')[1]
    console.log("token is : ", token)
    
    if (!token) {
        res
        .status(404)
        .json({ message: "No token found" })
    }

    jwt.verify(token!, JWT_SECRET_KEY, (err: any, user: any = existingUser) => {
        if (err) {
            console.log("user is : ", existingUser)
            return res
            .status(400)
            .json({ "message": "Error, token cannot be verified" })
        }
        console.log("user id is : ", user.id)
        req.id = user.id
    })
    next()
}

export const getUser = async (req: any, res: Response, next: NextFunction) => {
    const userId = req.id
    let userDetails
    try {
        userDetails = await User.findById(userId, "-password")
    } catch (err) {
        return (err)
    }

    if (!userDetails) {
        return res
        .status(404)
        .json({ "message": "User not found" })
    }

    return res
    .status(200)
    .json({ userDetails })
}

export default login
