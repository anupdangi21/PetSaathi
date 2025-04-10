import mongoose from "mongoose";
import moment from "moment-timezone";

const bankingSchema = new mongoose.Schema({
    fullname: String,
    organizationname:String,
    vendoremail:String,
    vendorcontact:Number,
    location:String,
    bankname:String,
    accountnumber:String,
    bankaccountname:String,
    enteredAt: {
            type: Date,
            default: () => moment().tz("Asia/Kathmandu").toDate(), 
            required: true
        },
})
const Banking = mongoose.model('Banking', bankingSchema);
export default Banking;