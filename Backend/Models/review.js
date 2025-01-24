import  mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    username: String,
    areaforimprovement: String,
    suggestion: String
})

const reviewModel = mongoose.model('reviews', reviewSchema)
export default reviewModel