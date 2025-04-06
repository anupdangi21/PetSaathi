import mongoose from "mongoose"
import moment from "moment-timezone";

const addItemschema = new mongoose.Schema({
    sellername:String,
    sellercontact:String,
    selleremail:String,
    selleraddress:String,
    itemtype:String,
    category:String,
    condition:String,
    usedtime:String,
    price:String,
    description:String,
    Image:[String],
    status:{type:String, default:"On sell", required:true},
    bookedAt: {
        type: Date,
        default: () => moment().tz("Asia/Kathmandu").toDate(), 
        required: true
    }
})

const additem = mongoose.model("marketplaceitems", addItemschema)
export default additem

