import { Request, Response } from "express";
import Otp from "../../models/Otp";
import User from "../../models/User";
import bcrypt from 'bcryptjs'

const setNewPassword = async (req: Request, res: Response) => {

    let user: any
    let otp: any

    const { email, password, enteredOtp } = req.body
    console.log(enteredOtp)

    try {
        otp = await Otp.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    console.log(otp.otp)
    if (otp.otp !== enteredOtp) {
        return res
            .status(400)
            .json({ message: "Wrong otp entered!" })
    }

    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }
    const hashedPassword = bcrypt.hashSync(password, 5)

    user.password = hashedPassword

    try {
        user.save()
    } catch (err) {
        console.log(err)
    }

    try {
        otp = await Otp.deleteOne({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    return res
    .status(200)
    .json(user)
    
}

export default setNewPassword