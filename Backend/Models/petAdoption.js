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
    date: Date,
    firstPet:String,
    enoughSpace:String,
    status:String


})

const petAdoptModel = mongoose.model("PetAdopt", petAdoptSchema)
export default petAdoptModel;