import mongoose from "mongoose";

const OnlineWithdrawSchema = new mongoose.Schema({
    vendoremail:String,
    vendorcontact:Number,
    vendorlocation:String,
    fullname:String,
    organizationname:String,
    withdrawlAmount:String,
    overallAmount:String,
    // remainingAmount:String,
    status:{ type: String, default: "Pending" ,required: true },
    withdrawlAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        },
})

const OnlineWithdraw = mongoose.model('OnlineWithdraw', OnlineWithdrawSchema);
export default OnlineWithdraw;