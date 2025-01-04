const mongoose= require("mongoose")

const vendorregisterSchema = new mongoose.Schema({
    organizationname: String,
    email: String,
    services: String,
    username : String,
    password: String,
})

const vendorregisterModel = mongoose.model('vendor-registration', vendorregisterSchema)
module.exports=vendorregisterModel