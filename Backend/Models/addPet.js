import mongoose from "mongoose";

const petListschema= new mongoose.Schema({
    petname: String,
    Category: String,
    Description: String,
    Age: String,
    Location:String,
    Image: String,
    email: String,
    organizationname: String,
    status:{ type: String, default: "open" ,required: true },

})

const petListModel = mongoose.model('Pet-List', petListschema)
export default petListModel;