const mongoose = require('mongoose')

const signinSchema = new mongoose.Schema({
    name: String,
    password: String
})

const signinModel = mongoose.model('signin', signinSchema)
module.exports = signinModel