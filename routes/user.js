import express from 'express'
import {registerUser,loginFunction,getAllUser,getSingleUser,updateUser,deleteUser} from '../controller/userController.js'
const router = express.Router()

router
    .post('/register',registerUser)
    .post('/login',loginFunction)
    .get('/get',getAllUser)
    .get('/getUser/:id',getSingleUser)
    .put('/update/:id',updateUser)
    .delete('/delete/:id',deleteUser)

export default router