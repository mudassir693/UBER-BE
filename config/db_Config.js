import mongoose from 'mongoose'

export default async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('database connected')
        // process.exit(1)
    } catch (error) {
        console.log('db error: ',error)
        // process.exit(0)
    }
}