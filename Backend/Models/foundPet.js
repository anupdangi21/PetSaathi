import mongoose from "mongoose"

const foundPetschema = new mongoose.Schema({
    email: String,
    username: String,
    Category: String,
    Image: String,
    Description: String,
    Color:String,
    Age: String,
    Location: String,
    findercontact:String,
    status:{ type: String, default: "found" ,required: true },
})

const petFound= mongoose.model('petFound', foundPetschema)

export default petFound;