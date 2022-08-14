import express from 'express'
import {registerUser,loginFunction} from '../controller/userController.js'
const router = express.Router()

router
    .post('/register',registerUser)
    .post('/login',loginFunction)

export default router