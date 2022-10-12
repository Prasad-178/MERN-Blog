const User = require('../model/User')
import { Request, Response, NextFunction } from "express"

const signup = async (req: Request, res: Response, next: NextFunction) => {

    const {name, email, password} = req.body

    let existingUser;
    try {
        existingUser = await User.findOne({email: email})
    } catch (err) {
        console.log(err)
    }
    if (existingUser) {
        return res.status(400).json({message: "User already exists! Login instead."})
    }

    const user = new User({
        name,    // name: req.body.name,
        email,
        password
    })

    try {
        await user.save()
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json({message: user})
}

export default signup