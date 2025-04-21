import mongoose from 'mongoose'
import moment from 'moment-timezone'

const buyItemSchema= new mongoose.Schema({
    fullname: String,
    ownercontact:String,
    email: String,
    Image:[String],
    sellername:String,
    sellercontact:String,
    selleremail:String,
    selleraddress:String,
    itemtype:String,
    category:String,
    condition:String,
    usedtime:String,
    price:String,
    date:String,
    description:String,
    paymentStatus:String,
    status:{type:String, default:"Booked", required:true},

    bookedAt: {
                type: Date,
                default: () => moment().tz("Asia/Kathmandu").toDate(), 
                required: true
            }
})

const BuyItem = mongoose.model('BuyItem', buyItemSchema);
export default BuyItem;