import Driver from '../models/Driver.js'
import jwt from 'jsonwebtoken'

export const registerDriver = async(req,res)=>{
    try {
        const {Name,Email,Contact,CNIC,Picture,Address,CreatedTime} = req.body

        const isDriverTheir = await Driver.findOne({$or :[{Email},{CNIC},{Contact}]})

        if(isDriverTheir){
            return res.status(400).json({data:"Either Email, CNIC or Contact is already registered",error:true})
        }

        const newDriver = new Driver({
            Name,Email,Contact,CNIC,Picture,Address,CreatedTime
        })

        const resp = await newDriver.save()

        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('driver add error: ',error)
        return res.status(200).json({data:error,error:true})
    }
}


export const loginDriver = async(req,res)=>{
    try {
        const {Email, Contact} = req.body
        const respDriver = await Driver.findOne({$or :[{Email},{Contact}]})
        if(!respDriver){
            return res.status(400).json({data:"this email, CNIC or Contact is not registered",error:true})
        }

        const token = jwt.sign({
            id: respDriver._id,
            Name:respDriver.Name,
            Email:respDriver.Email
        },'secret')

        const {_doc,...others} = respDriver

        return res.status(200).json({data:{..._doc,token} ,error:false})

    } catch (error) {
        console.log('Login driver error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getAllDrivers = async(req,res) => {
    try {
        const resp = await Driver.find()
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get drivers error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getSingleDriver = async(req,res)=>{
    try {
        const resp = await Driver.findById(req.params.id)
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get single driver error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const updateDriver = async(req,res) => {
    try {
        const {Email,Contact,CNIC,...others} = req.body
        let updResp = await Driver.findByIdAndUpdate(req.params.id,{$set: others},{new:true})
        return res.status(204).json({data:updResp,error:false})
    } catch (error) {
        console.log('upd driver error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const deleteDriver = async(req,res)=>{
    try {
        const deleteresp= await Driver.findByIdAndDelete(req.params.id)
        return res.status(204).json({data:deleteresp,error:false})
    } catch (error) {
        console.log('delete drivers error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}