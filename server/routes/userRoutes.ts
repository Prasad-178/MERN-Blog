import express from "express"
import signup from "../controllers/userSignupController"
import login, { getUser } from "../controllers/userLoginController"
import { Request, Response } from "express"
import { verifyToken } from "../controllers/userLoginController"

const router = express.Router()

router.get('/signup', (req: Request, res: Response) => {
    res.send("Hello signup")
})

router.get('/login', (req: Request, res: Response) => {
    res.send("Hello login")
})

router.post('/signup', signup)
router.post('/login', login)
router.get('/', verifyToken, getUser)

export default router
