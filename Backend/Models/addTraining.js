import mongoose from "mongoose";

const petTrainingschema = new mongoose.Schema({
    organizationname: String,
    vendoremail: String,
    vendorcontact: String,
    vendorlocation: String,
    serviceoffering: {
        type: String,
        required: true,
        enum: ["Basic", "Standard"],
      },
      includedOfferings: {
        type: [String], 
        required: true,
      },
    timing: String,
    duration: String,
    eligibility: String,
    description: String,
    Image:String,
    price:String,
    experience:String,
    status: {type: String, default:"Available", required:true}

})

const petTrainingModel = mongoose.model("pet-training",petTrainingschema)
export default petTrainingModel;