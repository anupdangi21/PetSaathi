import mongoose from 'mongoose';
import moment from 'moment-timezone';

const groomingRateSchema= new mongoose.Schema({
    image:String,
    rating:String,
    stars:Number,
    areaImprovement:String,
    userComment:String,
    organizationname:String,
    bookedAt:String,
    vendoremail:String,
    vendorcontact:String,
    selectedpackage:String,
    price:String,
    location:String,
    username:String,
    email:String,
    ownercontact:String,
    seen: { type: Boolean, default: false, required:true },
     ratedAt: {
        type: Date,
        default: () => moment().tz("Asia/Kathmandu").toDate(), 
        required: true
    },
    status:{type:String, default:"Rated", required:true},
})
const GroomingRatingModel = mongoose.model("GroomingRating",groomingRateSchema)
export default GroomingRatingModel;