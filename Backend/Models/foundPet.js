import mongoose from "mongoose"

const foundPetschema = new mongoose.Schema({
    Category: String,
    Image: String,
    Description: String,
    Color:String,
    Age: String,
    Location: String,
})

const petFound= mongoose.model('petFound', foundPetschema)

export default petFound;