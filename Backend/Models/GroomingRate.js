import mongoose from 'mongoose';
import moment from 'moment-timezone';

const groomingRateSchema= new mongoose.Schema({
    Image:String,
    rating:String,
    stars:Number,
    areaImprovement:String,
    userComment:String,
    fullname: String,
    email: String,
    ownercontact: String,
    vendoremail:String,
    vendorcontact:String,
    organizationname:String,
    vendorlocation:String,


     ratedAt: {
        type: Date,
        default: () => moment().tz("Asia/Kathmandu").toDate(), 
        required: true
    }
})
const GroomingRatingModel = mongoose.model("GroomingRating",groomingRateSchema)
export default GroomingRatingModel;