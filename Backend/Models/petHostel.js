import mongoose from "mongoose"

const petHostelSchema = new mongoose.Schema({
    fullname: String,
    ownercontact:String,
    email: String,
    image: String,
    date:String,
    price:String,
    accommodationType:String,
    vendorcontact:String,
    vendoremail:String,
    vendorlocation:String,
    organizationname:String,
    // hosteltime:String,
    food:String,
    medicalsupport:String,
    petpickup:String,
    petdropoff:String,
    status:{type:String, default:"Booked", required:true}
})

const petHostelModel = mongoose.model("PetHostelBooks", petHostelSchema)
export default petHostelModel;