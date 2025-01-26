import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, }, 
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifyOtpExipreAt: { type: Date, default: null },  
    isAccountVerified: { type: Boolean, default: false }, 
    resetOtp: { type: String, default: "" },
    resetOtpExipreAt: { type: Date, default: null }, 
})

const registerModel = mongoose.model('register', registerSchema)
export default registerModel
