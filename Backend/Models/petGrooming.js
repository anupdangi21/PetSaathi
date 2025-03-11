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
    status: String,
})

const PetGroomingModel = mongoose.model('PetGroom', petGroomingSchema);
export default PetGroomingModel;