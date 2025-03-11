import express from 'express';
import petAdoptModel from "../Models/petAdoption.js"
import petListModel from "../Models/addPet.js";
import transporter from "../nodeMailer.js";


const petAdopt = async (req, res)=>{
    try {
        const {image, email,petname,Category,fullname, ownercontact, location,vendoremail, vendorcontact,date, firstPet,enoughSpace,status}=req.body;
        if(!date ){
            return res.status(400).json({message:"please select date for booking an appointment for getting the pet"})
        }
        const petadopt = new petAdoptModel({
            image, email,petname,Category,fullname, ownercontact, location,vendoremail, vendorcontact, date, firstPet, enoughSpace, status
        })
        await petadopt.save()


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
                text: `Hello vendor, your pet post for a ${Category} named ${petname} on adoption has been viewed by  (${fullname}) and also he is interested on adopting it. 
                

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

const updateAdoptionStatus = async (req, res) => {
    try {
        console.log(req.body)
        const petId = req.params.id;

        const pet = await petAdoptModel.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        pet.status = "Confirmed";
        await pet.save();


        return res.status(200).json({ success: true, message: "Pet status updated", pet });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const cancelAdoption = async (req, res) => {
    try {
        const CanId = req.params.id;

        // Find the adoption record before deleting
        const adoption = await petAdoptModel.findById(CanId);

        if (!adoption) {
            return res.status(404).json({ message: "Adoption record not found" });
        }
        const { email, fullname, petname, Category, vendoremail, ownercontact, vendorcontact, location, date } = adoption;
        await petAdoptModel.findByIdAndDelete(CanId);

        const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Adopter's email
            subject: "Pet Adoption Canceled",
            text: `Hello ${fullname}, Your request to adopt a ${Category} named ${petname} has been canceled.
            If this was a mistake or if you want to adopt another pet, please contact us.${vendorcontact}
            Thank you for using our service.`
        };

        await transporter.sendMail(mailOptionsUser);

        const mailOptionsVendor = {
            from: process.env.SENDER_EMAIL,
            to: vendoremail, 
            subject: "Pet Adoption Request Canceled",
            text: `Hello, The adoption request for your pet (${Category} - ${petname}) by ${fullname} has been canceled.
            You can make the pet available for adoption again if needed.\n\n
            If you need further assistance, feel free to reach out.\n\n
            Thank you!`
        };

        await transporter.sendMail(mailOptionsVendor);

        res.status(200).json({ message: "Adoption deleted successfully and emails sent" });

    } catch (error) {
        console.error("Error deleting adoption:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default {petAdopt, getpetAdopt,updateAdoptionStatus,cancelAdoption}