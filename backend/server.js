require('dotenv').config()
const express = require('express')
const cors = require('cors')
const chatRoute = require('./routes/chat.route')

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
