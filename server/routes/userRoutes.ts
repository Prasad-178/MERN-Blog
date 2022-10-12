import express from "express"
import signup from "../controllers/userController"

const router = express.Router()

router.get('/signup', (req, res) => {
    res.send("Hello signup")
})

router.post('/signup', signup)

export default router
