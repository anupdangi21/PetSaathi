import express from "express"
import petOwnersModel from "../Models/lostPetOwner.js"
import transporter from "../nodeMailer.js";

const petOwner = async (req, res)=>{
    try {
        console.log(req.body)
        const {fullname, date, location, ownercontact, email } = req.body;

        if(!fullname || !date || !location || !ownercontact){
            return res.status(400).json({message: "please fill all fields"})
        }
        const petOwn = new petOwnersModel({
            fullname,date,location,ownercontact,email
        })

        await petOwn.save();
        res.status(200).json({status: true , message: "pet ownership request submitted successfully"})


        //mailing the owner about the date booked for reuniting

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Pet Reuniting Date and location",
             text: `Hello ${fullname}, your pet will be reunited with you on ${date} at ${location}. Please be there on time to avoid any inconvenience. Thank you for choosing our services`
        }

        await transporter.sendMail(mailOptions)
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