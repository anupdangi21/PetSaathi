import  mongoose from 'mongoose'
import moment from "moment-timezone"

const reviewSchema = new mongoose.Schema({
    username: String,
    email:String,
    areaforimprovement: String,
    suggestion: String,
    reviewAt: {
                type: Date,
                default: () => moment().tz("Asia/Kathmandu").toDate(), 
                required: true
            },

})

const reviewModel = mongoose.model('reviews', reviewSchema)
export default reviewModel