import express from "express"
import path from "path"
import signup from "../controllers/userSignupController"
import login, { getUser, verifyToken } from "../controllers/userLoginController"
import { Request, Response } from "express"

const app = express()
const verifiedRouter = express.Router()

verifiedRouter.get('/user', verifyToken, getUser)

// verifiedRouter.get('/refresh', refreshToken, verifyToken, getUser)

verifiedRouter.get('*', (req: Request, res: Response) => {
    console.log("hi", path.join(__dirname, '..', '/client/build/index.html'))
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

export default verifiedRouter
