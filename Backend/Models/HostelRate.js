import mongoose from "mongoose"
import moment from 'moment-timezone';

const hostelRateSchema= new mongoose.Schema({
    stars:Number,
    areaImprovement:String,
    userComment:String,
    fullname: String,
    ownercontact:String,
    email: String,
    image: String,
    date:String,
    days:String,
    price:String,
    accommodationType:String,
    vendorcontact:String,
    vendoremail:String,
    vendorlocation:String,
    organizationname:String,
    // hosteltime:String,
    food:String,
    medicalsupport:String,
    petpickup:String,
    petdropoff:String,
     ratedAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        },
    status:{type:String, default:"Rated", required:true},
})

const HostelRatingModel = mongoose.model("HostelRating", hostelRateSchema)
export default HostelRatingModel;