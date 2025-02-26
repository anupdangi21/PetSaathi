import mongoose from "mongoose";

const petHostelschema = new mongoose.Schema({
    organizationname: String,
    vendorcontact: String,
    vendoremail: String,
    vendorlocation: String,
    accomodation: { type: Array, required: true }, // Array of objects: [{ type: String, count: Number }]    pettype: String,
    food:String,
    playtime: String,
    medicalsupport: String,
    description: String,
    totalnumberofseats: String,
    petpickup: String,
    petdropoff: String,
    Image: String,
    createdAt: { type: String, default: Date.now },
    status: {type: String, default:"Available", required:true}
})

const petHostelModel = mongoose.model("pet-hostel", petHostelschema);
export default petHostelModel;