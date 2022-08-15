import mongoose from 'mongoose'

const rideSchema = new mongoose.Schema({
    DriverId:{
        type:String,
        required:true
    },
    UserId:{
        type:String,
        required:true
    },
    PickupTime:{
        type:String,
    },
    DropTime:{
        type:String
    },
    Distance:{
        type:Number,
    },
    Rate:{
        type:String
    },
    PickupLocation:{
        type: String
    },
    DropLocation:{
        type:String
    },
    Amount:Number
})

export default mongoose.model('rides',rideSchema)