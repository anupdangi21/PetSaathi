import mongoose from "mongoose"
import moment from "moment-timezone";


const petHostelSchema = new mongoose.Schema({
    fullname: String,
    ownercontact:String,
    email: String,
    image: String,
    date:String,
    days:String,
    price:String,
    accommodationType:String,
    accomodationCount:{type:Number, default:1, required:true},
    vendorcontact:String,
    vendoremail:String,
    vendorlocation:String,
    organizationname:String,
    // hosteltime:String,
    food:String,
    medicalsupport:String,
    petpickup:String,
    petdropoff:String,
    paymentStatus:String,
    status:{type:String, default:"Booked", required:true},
    rating:{type:String, default:"Not rated", required:true},
    bookedAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        }
})

const petHostelModel = mongoose.model("PetHostelBooks", petHostelSchema)
export default petHostelModel;