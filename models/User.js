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
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model('users',userSchema)