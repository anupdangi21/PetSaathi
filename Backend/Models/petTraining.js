import mongoose from "mongoose"

const petTrainingSchema = new mongoose.Schema({
    image:String,
    date: String,
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
    status: String,
})

const PetTrainingModel = mongoose.model("PetTrainingbooks", petTrainingSchema);
export default PetTrainingModel;