import mongoose from "mongoose"

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
    status:String


})

const petAdoptModel = mongoose.model("PetAdoptionbook", petAdoptSchema)
export default petAdoptModel;