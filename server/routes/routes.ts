export {}

import express from "express"
import signup from "../controllers/authControllers/userSignupController"
import login from "../controllers/authControllers/userLoginController"
import { verifyToken } from "../middleware/verifyJWTLogin"
import { verifyEmail } from "../controllers/authControllers/VerifyEmail"
import userDetails from "../controllers/authControllers/userDetails"
import logout from "../controllers/authControllers/userLogoutController"
import checkemailverification from "../middleware/checkUserVerification"

const router = express.Router()

router.get('/emailverification', checkemailverification)
router.post('/register', signup)
router.post('/login', login)
router.post('/verifyemail', verifyEmail)

router.get('/userdetails', userDetails)

router.use(verifyToken)

router.get('/logout', logout)
router.get('/checkemailverification')

export default router
