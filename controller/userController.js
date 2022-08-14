// 
import User from '../models/User.js'
// register User 
import jwt from 'jsonwebtoken'

export const registerUser = async (req,res)=>{
    try {
        const {Name,Email,ContactInfo} = req.body

        let isUserTheir = User.findOne({Email})
        if(isUserTheir){
            return res.status(400).json({data:"User already registered with this email",error:true})
        }

        const newUser = new User({
            Name,
            Email,
            ContactInfo
        })

        const resp = await newUser.save()
        return res.status(201).json({data:resp,error:false})
    } catch (error) {
        console.log('register user err: ',error)
        return res.status(500).json({data:"register user error",error:true})
    }
}

export const loginFunction = async (req,res) => {try {
    const {Email} = req.body
    let isUserTheir =await User.findOne({Email})
    if(!isUserTheir){
        return res.status(400).json({data:"User is not registered with this email",error:true})
    }
    let token = jwt.sign({
        id:isUserTheir._id,
        Name:isUserTheir.Name
    }, 'secret')

    let {_doc,...other} = isUserTheir

    return res.status(200).json({data:{..._doc,token},error:false})

} catch (error) {
    console.log('login error: ',error)
    return res.status(500).json({data:"user login error: ",error:true})
}}

export const getAllUser = async(req,res) => {
    try {
        const resp = await User.find()
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get users error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const getSingleUser = async(req,res)=>{
    try {
        const resp = await User.findById(req.params.id)
        return res.status(200).json({data:resp,error:false})
    } catch (error) {
        console.log('get single user error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const  updateUser = async(req,res) => {
    try {
        const {Email,...others} = req.body
        let updResp = await User.findByIdAndUpdate(req.params.id,{$set:others},{new:true})
        return res.status(204).json({data:updResp,error:false})
    } catch (error) {
        console.log('upd users error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}

export const deleteUser = async(req,res)=>{
    try {
        const deleteresp= await User.findByIdAndDelete(req.params.id)
        return res.status(204).json({data:deleteresp,error:false})
    } catch (error) {
        console.log('delete users error: ',error)
        return res.status(500).json({data:error,error:true})
    }
}