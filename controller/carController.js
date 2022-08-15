import  Car from '../models/Car.js'

export const addCar = async(req,res)=>{
    try {
        const {CarId,DriverId,Name,Color,CarPapers,Active,Verified,CreatedTime} = req.body

        const isCarAlreadyRegistered = await Car.findOne({CarId})
        if(isCarAlreadyRegistered){
            return res.status(400).json({data:'car with this carId is already registered',error:true})
        }

        let newCar = new Car({
            CarId,
            DriverId,
            Name,
            Color,
            CarPapers,
            Active,
            Verified,
            CreatedTime
        })

        const addResp= await newCar.save()
        return res.status(201).json({data:addResp,error:false})
    } catch (error) {
        console.log('car add err: ',error)
        return res.status(500).json({data:error,error:true})
    }
}


export const getAllCars = async(req,res)=>{
    try {
        const resp = await Car.find()
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get all cars error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getCarById = async (req,res) => {
    try {
        const resp = await Car.findByIdAndUpdate(req.params.id)
        if(!resp){
            return res.status(400).json({data:"No Car with this _id",error:true})
        }
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get each car error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const updcar = async(req,res)=>{
    try {
        const {CarId,DriverId,...others} = req.body
        let isCarTheir = await Car.findById(req.params.id)
        
        if(!isCarTheir){
            return res.status(400).json({data:'invalid car _id',error:true})
        }
        let updCar = await Car.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(204).jaon({data:updCar,error:false})
    } catch (error) {
        console.log('upd car err: ',error)
        return res.status(200).json({data:error,error:true})
    }
}

export const deleteCar = async(req,res)=>{
    try {
        let isCarTheir = await Car.findById(req.params.id)
        
        if(!isCarTheir){
            return res.status(400).json({data:'invalid car _id',error:true})
        }
        let deleteResp = await Car.findByIdAndRemove(req.params.id)

        return res.status(200).json({data:deleteResp,error:false})
    } catch (error) {
        console.log('delete car erro: ',error)
        return res.status(500).json({data:error,error:true})
    }
}