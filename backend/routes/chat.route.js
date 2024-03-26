import express from 'express'
const router = express.Router();
import { welcome, auth, pdfchat } from '../controllers/chat.controller.js'
import multer from 'multer';

const upload = multer({dest: 'temp/'})

router.get("/", welcome)

router.post("/auth", auth);

router.post("/pdfchat", upload.single('file'), pdfchat);

export default router;