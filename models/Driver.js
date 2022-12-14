import mongoose from 'mongoose'

const driverSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Contact:String,
    CNIC:String,
    Picture:String,
    Address:String,
    CreatedTime:{
        type:String,
        default: new Date().toDateString()
    }
})

export default mongoose.model('driver',driverSchema)