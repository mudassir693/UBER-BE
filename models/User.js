import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    ContactInfo:{
        type:String
    },
    CreatedTime:{
        type:String,
        default: new Date().toDateString()
    }
},{
    timestamps:true
})

export default mongoose.model('users',userSchema)