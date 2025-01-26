import mongoose from "mongoose";

const petListschema= new mongoose.Schema({
    petname: String,
    Categories: String,
    Description: String,
    Age: Number,
    Location:String,

})

const petListModel = mongoose.model('Pet-List', petListschema)
export default petListModel;