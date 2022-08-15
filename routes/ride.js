import express from 'express'
import {addRide,getAllRides,getRidesById,updRide,deleteRide} from '../controller/rideController.js'
let router = express.Router()

router
    .post('/add',addRide)
    .get('/getAll',getAllRides)
    .get('/getRide/:id',getRidesById)
    .put('/update/:id',updRide)
    .delete('/delete/:id',deleteRide)


export default router