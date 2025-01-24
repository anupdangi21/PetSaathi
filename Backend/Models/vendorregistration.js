import  mongoose from "mongoose"

const vendorregisterSchema = new mongoose.Schema({
    organizationname: { type: String }, 
    email: { type: String, required: true , unique: true },
    services: { type: String},
    username: { type: String, unique: true }, 
    password: { type: String  },
    verifyOtp: { type: String, default: "" },
    verifyOtpExipreAt: { type: Date, default: null },  
    isAccountVerified: { type: Boolean, default: false }, 
    resetOtp: { type: String, default: "" },
    resetOtpExipreAt: { type: Date, default: null }, 
});

const vendorregisterModel = mongoose.model('vendor-registration', vendorregisterSchema)
export default vendorregisterModel