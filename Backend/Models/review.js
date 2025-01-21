const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    username: String,
    areaforimprovement: String,
    suggestion: String
})

const reviewModel = mongoose.model('reviews', reviewSchema)
module.exports = reviewModel