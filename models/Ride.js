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
        type:String,
    },
    Rate:{
        type:String
    },
    PickupLocation:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    },
    DropLocation:{
        lat:{
            type:Number
        },
        lng:{
            type:Number
        }
    },
    Amount:Number
})

export default mongoose.model('rides',rideSchema)