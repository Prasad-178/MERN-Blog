const app = require('./app')
// import { app } from "./app"
const dotenv = require('dotenv')
// import dotenv from "dotenv"

dotenv.config({path:"server/src/config/config.env"})
app.listen(process.env.PORT, () => {
    console.log("Server is running on localhost " + process.env.PORT)
})

console.log(process.env.PORT)