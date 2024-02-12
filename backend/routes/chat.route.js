const express = require('express')
const router = express.Router();
const { welcome, auth } = require('../controllers/chat.controller')

router.get("/", welcome)

router.post("/auth", auth);

module.exports = router