import mongoose from "mongoose";

const petGroomingschema = new mongoose.Schema({
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
      Image:String,
    price: String,
    description: String,
    status:{ type: String, default: "Available" ,required: true },
})

const petGroomingModel = mongoose.model("pet-grooming", petGroomingschema);
export default petGroomingModel;
