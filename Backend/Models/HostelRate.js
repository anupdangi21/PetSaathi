import mongoose from "mongoose"
import moment from 'moment-timezone';

const hostelRateSchema= new mongoose.Schema({
    rating:String,
    stars:Number,
    areaImprovement:String,
    userComment:String,
    ratedAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        }
})

const HostelRatingModel = mongoose.model("HostelRating", hostelRateSchema)
export default HostelRatingModel;