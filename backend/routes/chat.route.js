const express = require('express')
const router = express.Router();
const { welcome, auth, pdfchat } = require('../controllers/chat.controller')
const multer = require('multer');

const upload = multer({dest: 'temp/'})

router.get("/", welcome)

router.post("/auth", auth);

router.post("/pdfchat", upload.single('file'), pdfchat);

module.exports = router