import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    CarId:{
        type:String,
        required:true
    },
    DriverId:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        unique:true
    },
    Color:{
        type:String,
    },
    CarPapers:{
        type:String
    },
    Active:{
        type:Boolean,
        default:false
    },
    Verified:{
        type:Boolean,
        default:false
    },
    CreatedTime:{
        type:String,
        default: new Date().toDateString()
    }

})

export default mongoose.model("cars",carSchema)