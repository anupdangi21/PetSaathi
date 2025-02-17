import mongoose from "mongoose";

const LostPetOwnerSchema = new mongoose.Schema({
    image: String,
    fullname: String,
    email: String,
    category: String,
    color: String,
    location: String,
    ownercontact:String,
    date: String,
    finderemail: String,
    finderusername:String,
    foundlocation: String,

})

const petOwnersModel = mongoose.model("lostpetowner", LostPetOwnerSchema)

export default petOwnersModel;