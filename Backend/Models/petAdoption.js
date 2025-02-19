import mongoose from "mongoose"

const petAdoptSchema = new mongoose.Schema({
    
    email: String,
    petName: String,
    petType: String,
    image: String,
    fullname: String,

})

const petAdopt = mongoose.model("PetAdopt", petAdoptSchema)
export default petAdopt;