import express from "express"
import BuyItem from "../Models/buyItem.js"
import AddItem from "../Models/addItems.js"
import transporter from "../nodeMailer.js"


const buyItemMarket = async (req, res)=>{
    try {
        console.log(req.body)
        const {itemId, fullname,ownercontact,email, sellername, sellercontact, selleremail, selleraddres, itemtype, category, condition, usedtime, price, description, Image,date, status,paymentStatus, bookedAt}=req.body
        
        const imagePaths = req.files ? req.files.map(file => file.filename) : [];
        
        const newBuyItem = new BuyItem({
             fullname, ownercontact, email, sellername, sellercontact, selleremail, selleraddres, itemtype, category, condition, usedtime, price, description,date, Image: imagePaths,paymentStatus, status, bookedAt
        })
        console.log("buyer ko save hunxa ta", newBuyItem)
        await newBuyItem.save()
        
        const updatedAddItem = await AddItem.findByIdAndUpdate(
            itemId, // Use itemId instead of addItemId
            { status: "Booked" },
            { new: true }
          );
//logic to update status in AddItem (status:booked)
        const mailOptionsUser = {
                    from: process.env.SENDER_EMAIL,
                    to: email, // Owner's email
                    subject: "Pet Adoption Request",
                    text: `Hello ${fullname}, your request on buying a ${itemtype}  has been successfully submitted.
        
                    please note that you have to visit at seller location on ${selleraddres} and your date is ${date}.
                    Please be there on time to avoid any inconvenience. 
        
                    If there will be any delay or change in the date or location then, please contact seller at ${sellercontact}.
        
                    Thank you for choosing our services.`
                };
                
                await transporter.sendMail(mailOptionsUser);
        
                    // Email to Finder
                    const mailOptionsVendor = {
                        from: process.env.SENDER_EMAIL,
                        to: selleremail, // Finder's email
                        subject: "Request for Buying ${category}",
                        text: `Hello ${sellername}, your item post for a ${category} on marketplace has been viewed by  (${fullname}) and also he is interested on buying it. 
                        
        
                        He will be at your organization's location at ${selleraddres} on ${date}
        
                        If there are any changes, you can contact the user at ${ownercontact}.
                        
                        Thank you for choosing our services.`
                    };
        await transporter.sendMail(mailOptionsVendor);

        return res.status(200).json({success:true, message:"Item purchase request send successfully"})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

const getBuyItem = async (req, res)=>{
    try {
        const getItembuydata = await BuyItem.find()
        res.status(200).json({status:true, data:getItembuydata})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

export default {buyItemMarket, getBuyItem}