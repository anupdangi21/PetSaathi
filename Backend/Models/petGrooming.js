import mongoose from "mongoose";

const petGroomingSchema = new mongoose.Schema({
    image:String,
    date: String,
    selectedpackage: String,
    includedservice:String,
    price:String,
    location:String,
    fullname: String,
    email: String,
    ownercontact: String,
    vendoremail:String,
    vendorcontact:String,
    status:{type:String, default:"Booked", required:true},
    rating:{type:String, default:"Not rated", required:true}
})

const PetGroomingModel = mongoose.model('PetGroomBooks', petGroomingSchema);
export default PetGroomingModel;