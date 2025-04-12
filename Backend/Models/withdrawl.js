import mongoose from "mongoose";
import moment from "moment-timezone"

const OnlineWithdrawSchema = new mongoose.Schema({
    fullname: String,
    organizationname:String,
    vendoremail:String,
    vendorcontact:Number,
    location:String,
    bankname:String,
    accountnumber:String,
    bankaccountname:String,
    withdrawalAmount:String,
    overallAmount:String,
    reason:String,
    // remainingAmount:String,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    withdrawlAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        },
})

const OnlineWithdraw = mongoose.model('OnlineWithdraw', OnlineWithdrawSchema);
export default OnlineWithdraw;