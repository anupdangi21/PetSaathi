import mongoose from "mongoose";

const LostPetOwnerSchema = new mongoose.Schema({
    image: String,
    fullname: String, 
    email: String, 
    petCategory: String,
    petColor: String,
    location: String, 
    ownercontact:String, 
    date: String, 
    finderEmail: String,
    finderContact:String,
    finderUsername:String,
    petLocationFound: String,

})

const petOwnersModel = mongoose.model("lostpetowner", LostPetOwnerSchema)

export default petOwnersModel;