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
        return res.status(200).json({data:resp,error:false})
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