import express from 'express'
import {addCar,getAllCars,getCarById,updcar,deleteCar} from '../controller/carController.js'

const router = express.Router()

router
    .post('/add',addCar)
    .get('/getAll',getAllCars)
    .get('/getCar/:id',getCarById)
    .put('/update/:id',updcar)
    .delete('/delete/:id',deleteCar)

export default router