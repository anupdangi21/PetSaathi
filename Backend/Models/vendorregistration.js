const mongoose= require("mongoose")

const vendorregisterSchema = new mongoose.Schema({
    nameofowner: String,
    email: String,
    organizationname : String,
    organizationimage: String,
    services: String
})

const vendorregister = mongoose.model('vendor-registration', vendorregisterSchema)
