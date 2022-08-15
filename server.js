import dotenv from 'dotenv';

dotenv.config()

// console.log("Let's go: Ik vari or.....")
import express from 'express'
import DB_connection from './config/db_Config.js'

//  importing routes:
import userRoute from './routes/user.js'
import driverRoute from './routes/driver.js'
import carRoute from './routes/car.js'

const app = express()

DB_connection()

app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get("/",(req,res)=>{
    try {
        return res.status(200).json({data:"Uber Server start:..",error:false})
    } catch (error) {
        console.log('err: ',error)
        return res.status(500).json({data:"error",error:true})
    }
})

app.use('/api/users', userRoute)
app.use('/api/drivers', driverRoute)
app.use('/api/cars',carRoute)
const port = process.env.PORT || 5500

app.listen(port,()=>{
    console.log(`server is running on port : ${port}`)
})