import mongoose from "mongoose";
import moment from 'moment-timezone';

const trainingRateSchema= new mongoose.Schema({
    rating:String,
    stars:Number,
    areaImprovement:String,
    userComment:String,
    image:String,
    date: String,
    organizationname:String,
    selectedpackage: String,
    includedservice:String,
    price:String,
    Restrictions: String,
    Duration:String,
    SelectedTiming: String,
    location:String,
    fullname: String,
    email: String,
    ownercontact: String,
    vendoremail:String,
    vendorcontact:String,
    ratedAt: {
        type: Date,
        default: () => moment().tz("Asia/Kathmandu").toDate(), 
        required: true
    },
    status:{type:String, default:"Rated", required:true},
})

const TrainingRatingModel= mongoose.model("TrainingRating", trainingRateSchema)
export default TrainingRatingModel;