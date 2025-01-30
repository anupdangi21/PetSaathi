import mongoose from "mongoose"

const lostPetschema = new mongoose.Schema({
    Category: String,
    Color:String,
    Age: String,
    Location: String,
})

const lostPet= mongoose.model('petLost', lostPetschema)

export default lostPet;