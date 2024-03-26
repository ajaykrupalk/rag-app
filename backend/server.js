import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
import chatRoute from './routes/chat.route.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("",chatRoute)

app.listen(3000, () => {
    console.log("Listening to Requests...")
})
