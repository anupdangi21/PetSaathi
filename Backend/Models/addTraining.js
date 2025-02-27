import mongoose from "mongoose";

const petTrainingschema = new mongoose.Schema({
    organizationname: String,
    vendoremail: String,
    vendorcontact: String,
    vendorlocation: String,
    trainingtype: String,
    timing: String,
    duration: String,
    eligibility: String,
    description: String,
    Image:String,
    status: {type: String, default:"Available", required:true}

})

const petTrainingModel = mongoose.model("pet-training",petTrainingschema)
export default petTrainingModel;