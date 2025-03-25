import express from 'express'
import transporter from "../nodeMailer.js";
import GroomingRating from "../Models/GroomingRate.js"

const groomRate = async(req,res)=>{
    try {
        console.log(req.body)
        const {rating, stars, areaImprovement, userComment,ratedAt, image,organizationname,bookedAt,vendoremail,vendorcontact,price,selectedpackage,location,username,email,ownercontact,status}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const rategroom= new GroomingRating({
            rating, stars, areaImprovement, userComment,ratedAt, image,organizationname,bookedAt,vendoremail,vendorcontact,price,selectedpackage,location,username,email,ownercontact,status
         })
         console.log("rating hunxa ki nai heram hai ta",rategroom)
         await rategroom.save()
         res.status(200).json({status:true, message:"Service rated successfully"})

         //mailing
         const mailOptionsUser = {
             from: process.env.SENDER_EMAIL,
             to: email, // Owner's email
             subject: "Pet Grooming Service Rating",
             text: `Hello ${username}, your rating request for grooming service from ${organizationname} has been successfully submitted. 

             You have rated: ${stars} and your improvement area was ${areaImprovement} with comment ${userComment}

             Thank you for your response.`
         };

         await transporter.sendMail(mailOptionsUser);

             // Email to vendor
             const mailOptionsVendor = {
                 from: process.env.SENDER_EMAIL,
                 to: vendoremail, // vendor's email
                 subject: "Rating from customer for your service",
                 text: `Hello vendor, Your recent customer ${username} has rated your service a ${stars} stars.

                His/Her area for improvement was ${areaImprovement} and also suggested as: ${userComment}

                 Thank you for choosing petsaathi.`
             };
         await transporter.sendMail(mailOptionsVendor);
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

const getgroomRating = async(req,res)=>{
    try {
        const groomingRating = await GroomingRating.find()
        return res.status(200).json({status:true, data:groomingRating})
    } catch (error) {
        return res.json({status:false, message:error.message})
    }
}

export default {groomRate, getgroomRating}