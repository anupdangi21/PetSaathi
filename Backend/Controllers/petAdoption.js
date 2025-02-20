import express from 'express';
import petAdoptModel from "../Models/petAdoption.js"
import transporter from "../nodeMailer.js";


const petAdopt = async (req, res)=>{
    try {
        console.log(req.body)
        const {image, email,petname,Category,fullname, ownercontact, location,vendoremail, vendorcontact,date, firstPet,enoughSpace,status}=req.body;
        if(!date ){
            return res.status(400).json({message:"please select date for booking an appointment for getting the pet"})
        }
        const petadopt = new petAdoptModel({
            image, email,petname,Category,fullname, ownercontact, location,vendoremail, vendorcontact, date, firstPet, enoughSpace, status
        })
        await petadopt.save()
        console.log("aako ho",petadopt)

        //mailing the owner about the date booked for reuniting

        const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Owner's email
            subject: "Pet Adoption Request",
            text: `Hello ${fullname}, your request on adopting a ${Category} named ${petname} has been successfully submitted.

            please note that your booked date is on  ${date} at your visit location is ${location}. 
            Please be there on time to avoid any inconvenience. 

            If there will be any delay or change in the date, please contact vendor at ${vendorcontact}.

            Thank you for choosing our services.`
        };
        
        await transporter.sendMail(mailOptionsUser);

            // Email to Finder
            const mailOptionsVendor = {
                from: process.env.SENDER_EMAIL,
                to: vendoremail, // Finder's email
                subject: "Request for Pet Adoption",
                text: `Hello organizationame, your pet post for a ${Category} named ${petname} on adoption has been viewed by  (${fullname}) and also he is interested on adopting it. 
                

                He will be at your organization's location at ${location} on ${date}

                If there are any changes, you can contact the user at ${ownercontact}.
                
                Thank you for choosing our services.`
            };

await transporter.sendMail(mailOptionsVendor);
    } catch (error) {
        return res.status(400).json({status: false, message:error.message})
    }
}

const getpetAdopt = async (req, res)=>{
    try {
       const getPet= await petAdoptModel.find()
       res.status(200).json({status:true, data:getPet})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

export default {petAdopt, getpetAdopt}