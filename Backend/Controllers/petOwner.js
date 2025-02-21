import express from "express"
import petOwnersModel from "../Models/lostPetOwner.js"
import transporter from "../nodeMailer.js";

const petOwner = async (req, res)=>{
    try {
        const {fullname, date, location, ownercontact, email,petCategory,petColor,petLocationFound,finderUsername,finderEmail,finderContact,petImage } = req.body;

        if(!date || !location){
            return res.status(400).json({message: "please fill all fields"})
        }
        const petOwn = new petOwnersModel({
            fullname,date,location,ownercontact,email,petCategory,petColor,petLocationFound,finderUsername,finderEmail,finderContact,petImage
        })
        await petOwn.save();
        res.status(200).json({status: true , message: "pet ownership request submitted successfully"})


        //mailing the owner about the date booked for reuniting

        const mailOptionsOwner = {
            from: process.env.SENDER_EMAIL,
            to: email, // Owner's email
            subject: "Pet Reuniting Date and Location",
            text: `Hello ${fullname}, your pet will be reunited with you on ${date} at ${location}. 
            Please be there on time to avoid any inconvenience. 
        
            Thank you for choosing our services.
        
            If there will be any delay or change in the date, please contact at ${finderContact}.`
        };
        
        await transporter.sendMail(mailOptionsOwner);
// Email to Finder
            const mailOptionsFinder = {
                from: process.env.SENDER_EMAIL,
                to: finderEmail, // Finder's email
                subject: "Pet Reuniting Confirmation",
                text: `Hello ${finderUsername}, you have reported a found pet. The owner (${fullname}) will meet you on ${date} at ${location}. 

                Please be available to complete the reunification.

                If there are any changes, you can contact the owner at ${ownercontact}.`
            };

await transporter.sendMail(mailOptionsFinder);
    } catch (error) {
        res.status(400).json({success: false, message:error.message})
    }
}

const getpetOwner = async (req,res)=>{
    try {
        const getPetOwner = await petOwnersModel.find()
        res.status(200).json({status: true, data: getPetOwner})
    } catch (error) {
        return res.status.json({success: false, message:error.message})
    }
}

export default {petOwner,getpetOwner };