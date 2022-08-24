import Ride from '../models/Ride.js'

export const addRide = async(req,res)=>{
    try {
        const {DriverId,UserId,PickupTime,DropTime,Distance,Rate,PickupLocation,DropLocation,Amount} = req.body


        let newRide = new Ride({
            DriverId,
            UserId,
            PickupTime,
            DropTime,
            Distance,
            Rate,
            PickupLocation,
            DropLocation,
            Amount
        })

        const addResp= await newRide.save()
        return res.status(201).json({data:addResp,error:false})
    } catch (error) {
        console.log('ride add err: ',error)
        return res.status(500).json({data:error,error:true})
    }
}


export const getAllRides = async(req,res)=>{
    try {
        const resp = await Ride.find()
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get all rides error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getRidesById = async (req,res) => {
    try {
        const resp = await Ride.findByIdAndUpdate(req.params.id)
        if(!resp){
            return res.status(400).json({data:"No Car with this _id",error:true})
        }
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get each ride error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const updRide = async(req,res)=>{
    try {
        const {DriverId,UserId,PickupTime,PickupLocation,...others} = req.body
        let isRideTheir = await Ride.findById(req.params.id)
        
        if(!isRideTheir){
            return res.status(400).json({data:'invalid car _id',error:true})
        }
        let updCar = await Ride.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(204).json({data:updCar,error:false})
    } catch (error) {
        console.log('upd ride err: ',error)
        return res.status(200).json({data:error,error:true})
    }
}

export const deleteRide = async(req,res)=>{
    try {
        let isRideTheir = await Ride.findById(req.params.id)
        
        if(!isRideTheir){
            return res.status(400).json({data:'invalid ride _id',error:true})
        }
        let deleteResp = await Ride.findByIdAndRemove(req.params.id)

        return res.status(200).json({data:deleteResp,error:false})
    } catch (error) {
        console.log('delete ride error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getEachRiderRide = async(req,res)=>{
    try {
        const resp = await Ride.find({DriverId:req.params.id})
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get driver rides: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getEachRiderStatus = async(req,res)=>{
    try {
        console.log(req.query.startTime)
        // console.log('et: ',req.query.endTime)
        const resp = await Ride.find({RiderId:req.params.id})
        let filteredResp = resp.filter(eachRide=>{
            console.log(new Date(eachRide.PickupTime).getTime())
           return req.query.endTime==undefined?new Date(eachRide.PickupTime).getTime() > req.query.startTime:new Date(eachRide.PickupTime).getTime() > req.query.startTime && new Date(eachRide.PickupTime).getTime() < req.query.endTime
        })
        return res.status(201).json({data:filteredResp,error:false})
    } catch (error) {
        console.log('get driver rides by time: ',error)
        return res.status(500).json({data:error,error:true})
    }
}
