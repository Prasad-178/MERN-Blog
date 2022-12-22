import { Response } from "express";
import User from "../models/User";

const userDetails = async (req: any, res: Response) => {

    const id = req.id
    let currentUser: any
    try {
        currentUser = await User.findOne({ id: id }).exec()
    } catch (err) {
        console.log(err)
    }

    return res
    .status(200)
    .json(currentUser)
}

export default userDetails