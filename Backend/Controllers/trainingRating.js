import express from 'express'
import transporter from "../nodeMailer.js";
import TrainingRating from "../Models/TrainingRate.js"

const trainingRate = async(req,res)=>{
    try {
        // console.log(req.body)
        const {image, rating, stars, areaImprovement, userComment,organizationname, selectedpackage , includedservice,price,Restrictions,Duration,SelectedTiming, location,fullname,email,ownercontact,vendorcontact,vendoremail,status,bookedAt}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const rateTrain= new TrainingRating({
           image, rating, stars, areaImprovement, userComment,organizationname, selectedpackage , includedservice,price,Restrictions,Duration,SelectedTiming, location,fullname,email,ownercontact,vendorcontact,vendoremail,status,bookedAt
         })
        //  console.log("rating hunxa ki nai heram hai ta",rateTrain)
         await rateTrain.save()
         res.status(200).json({status:true, message:"Service rated successfully"})

         //mailing
         const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Owner's email
            subject: "Pet Grooming Service Rating",
            text: `Hello ${fullname}, your rating request for grooming service from ${organizationname} has been successfully submitted. 

            You have rated: ${stars} for ${areaImprovement} with comment ${userComment}

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

const getrainingRate = async(req,res)=>{
    try {
        const trainingRating = await TrainingRating.find()
        return res.status(200).json({status:true, data:trainingRating})
    } catch (error) {
        return res.json({status:false, message:error.message})
    }
}

export default {trainingRate, getrainingRate}