import mongoose from "mongoose"
import moment from "moment-timezone";

const petAdoptSchema = new mongoose.Schema({
    image: String,
    email: String,
    petname: String,
    Category: String,
    fullname: String,
    ownercontact:String,
    location:String,
    vendoremail:String,
    vendorcontact:String,
    date: String,
    firstPet:String,
    enoughSpace:String,
    status:{type:String, default:"Booked", required:true},
    bookedAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        }


})

const petAdoptModel = mongoose.model("PetAdoptionbook", petAdoptSchema)
export default petAdoptModel;