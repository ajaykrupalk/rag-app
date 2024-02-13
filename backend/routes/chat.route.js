const express = require('express')
const router = express.Router();
const { welcome, auth, pdfchat } = require('../controllers/chat.controller')

router.get("/", welcome)

router.post("/auth", auth);

router.post("/pdfchat", pdfchat);

module.exports = router