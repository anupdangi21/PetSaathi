import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, },
    number: { type: String }, 
    password: { type: String, required: true },
    resetOtp: { type: String, default: "" },
    resetOtpExipreAt: { type: Date, default: null }, 
})

const registerModel = mongoose.model('register', registerSchema)
export default registerModel
