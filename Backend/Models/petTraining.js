import mongoose from "mongoose"
import moment from "moment-timezone";

const petTrainingSchema = new mongoose.Schema({
    image:String,
    date: String,
    organizationname:String,
    selectedpackage: String,
    includedservice:String,
    price:String,
    Restrictions: String,
    Duration:String,
    SelectedTiming: String,
    location:String,
    fullname: String,
    email: String,
    ownercontact: String,
    vendoremail:String,
    vendorcontact:String,
    days:String,
    paymentStatus:String,
    status:{type:String, default:"Booked", required:true},
    rating:{type:String, default:"Not rated", required:true},
    bookedAt: {
        type: Date,
        default: () => moment().tz("Asia/Kathmandu").toDate(), 
        required: true
    }
})

const PetTrainingModel = mongoose.model("PetTrainingbooks", petTrainingSchema);
export default PetTrainingModel;