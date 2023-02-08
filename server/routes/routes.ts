export {}

import express from "express"
import signup from "../controllers/authControllers/userSignupController"
import login from "../controllers/authControllers/userLoginController"
import { verifyToken } from "../middleware/verifyJWTLogin"
import { verifyEmail } from "../controllers/authControllers/VerifyEmail"
import userDetails from "../controllers/authControllers/userDetails"
import logout from "../controllers/authControllers/userLogoutController"
import checkemailverification from "../middleware/checkUserVerification"
import resetPasswordEmail from "../controllers/authControllers/resetPasswordEmail"
import setNewPassword from "../controllers/authControllers/setNewPassword"
import editAccountDetails from "../controllers/authControllers/editAccountDetails"
import deleteAccountController from "../controllers/authControllers/deleteAccountController"

const router = express.Router()

router.get('/emailverification', checkemailverification)
router.post('/register', signup)
router.post('/login', login)
router.post('/verifyemail', verifyEmail)
router.post('/resetpasswordemail', resetPasswordEmail)
router.post('/setnewpassword', setNewPassword)

router.get('/userdetails', userDetails)

router.use(verifyToken)

router.get('/logout', logout)
router.get('/checkemailverification')
router.post('/editaccount', editAccountDetails)
router.post('/deleteaccount', deleteAccountController)

export default router
