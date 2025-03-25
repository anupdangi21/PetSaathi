import exporess from "express"

import transporter from "../nodeMailer.js";
import HostelRating from "../Models/HostelRate.js"

const hostelRate = async(req,res)=>{
    try {
        console.log(req.body)
        const {stars, areaImprovement, userComment,fullname,ownercontact,email,image,date,days,price,accommodationType,vendorcontact,vendoremail, vendorlocation,organizationname,food,medicalsupport,petpickup,petdropoff,status,bookedAt}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const ratehostel= new HostelRating({
            stars, areaImprovement, userComment,fullname,ownercontact,email,image,date,days,price,accommodationType,vendorcontact,vendoremail, vendorlocation,organizationname,food,medicalsupport,petpickup,petdropoff,status,bookedAt
         })
         console.log("rating hunxa ki nai heram hai ta",ratehostel)
         await ratehostel.save()
         res.status(200).json({status:true, message:"Service rated successfully"})
          //mailing
          const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Owner's email
            subject: "Pet Hostel Service Rating",
            text: `Hello ${fullname}, your rating request for grooming service from ${organizationname} has been successfully submitted. 

            You have rated: ${stars} and your improvement area was ${areaImprovement} with comment ${userComment}

            Thank you for your response.`
        };

        await transporter.sendMail(mailOptionsUser);

            // Email to vendor
            const mailOptionsVendor = {
                from: process.env.SENDER_EMAIL,
                to: vendoremail, // vendor's email
                subject: "Rating from customer for your service",
                text: `Hello vendor, Your recent customer ${fullname} has rated your service a ${stars} stars.

               His/Her area for improvement was ${areaImprovement} and also suggested as: ${userComment}

                Thank you for choosing petsaathi.`
            };
        await transporter.sendMail(mailOptionsVendor);
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

const gethostelRate = async(req,res)=>{
    try {
        const hostelRating = await HostelRating.find()
        return res.status(200).json({status:true, data:hostelRating})
    } catch (error) {
        return res.json({status:false, message:error.message})
    }
}

export default {hostelRate, gethostelRate}