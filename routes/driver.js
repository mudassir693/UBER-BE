import express from 'express'
import {registerDriver,loginDriver,getAllDrivers,getSingleDriver,updateDriver,deleteDriver } from '../controller/driverController.js'

const router = express.Router()

router
    .post('/register', registerDriver)
    .post('/login', loginDriver)
    .get('/getAllDrivers',getAllDrivers)
    .get('/driver/:id',getSingleDriver)
    .put('/update/:id',updateDriver)
    .delete('/delete/:id',deleteDriver)

export default router