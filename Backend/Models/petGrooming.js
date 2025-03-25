import mongoose from "mongoose";
import moment from "moment-timezone";


const petGroomingSchema = new mongoose.Schema({
    image:String,
    date: String,
    organizationname:String,
    selectedpackage: String,
    includedservice:String,
    price:String,
    location:String,
    fullname: String,
    email: String,
    ownercontact: String,
    vendoremail:String,
    vendorcontact:String,
    paymentStatus:String,
    status:{type:String, default:"Booked", required:true},
    rating:{type:String, default:"Not rated", required:true},
    bookedAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        }
})

const PetGroomingModel = mongoose.model('PetGroomBooks', petGroomingSchema);
export default PetGroomingModel;