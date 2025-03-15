    import express from 'express';
 import PetGroomingModel from "../Models/petGrooming.js"
 import transporter from "../nodeMailer.js";
 
 
 const AddpetGroom = async (req, res)=>{
     try {
         // console.log("aako groom data", req.body)
         const {image,date, selectedpackage , includedservice,price,location,fullname,email,ownercontact,vendorcontact,vendoremail,status}=req.body;
         if(!date ){
             return res.status(400).json({message:"please select date for booking an appointment for getting the pet"})
         }
         const petgroom = new PetGroomingModel({
             image,date, selectedpackage , includedservice,price,location,fullname,email,ownercontact,vendorcontact,vendoremail,status
         })
         // console.log("save hune data",petgroom)
         await petgroom.save()
 
 
         const mailOptionsUser = {
             from: process.env.SENDER_EMAIL,
             to: email, // Owner's email
             subject: "Pet Grooming Service Request",
             text: `Hello ${fullname}, your request on taking a pet grooming service with choosen package type ${selectedpackage}, with included services ${includedservice} has been successfully submitted. 
 
             please note that your booked date for check-in is on ${date} and your visit location is ${location}. 
             Please be there on time to avoid any inconvenience. 
 
             If there will be any delay or change in the date, please contact vendor at ${vendorcontact}.
 
             Thank you for choosing our services.`
         };
         
         await transporter.sendMail(mailOptionsUser);
 
             // Email to Finder
             const mailOptionsVendor = {
                 from: process.env.SENDER_EMAIL,
                 to: vendoremail, // Finder's email
                 subject: "Request for Pet Grooming Service",
                 text: `Hello vendor, your service for grooming pet with package ${selectedpackage} with offering ${includedservice} has been  viewed by  (${fullname}) and also he is interested on taking the service for their pet. 
                 
 
                 He will be at your organization's location at ${location} on ${date}
 
                 If there are any changes, you can contact the user at ${ownercontact}.
                 
                 Thank you for choosing our services.`
             };
 
 await transporter.sendMail(mailOptionsVendor);
     } catch (error) {
         return res.status(400).json({status: false, message:error.message})
     }
 }
 
 const AddgetpetGroom = async (req, res)=>{
     try {
        const getPet= await PetGroomingModel.find()
        res.status(200).json({status:true, data:getPet})
     } catch (error) {
         return res.status(400).json({message:error.message})
     }
 }
 
 const updateGroomStatus = async (req, res) => {
     try {
         console.log(req.body)
         const petId = req.params.id;
 
         const pet = await PetGroomingModel.findById(petId);
 
         if (!pet) {
             return res.status(404).json({ message: "Pet not found" });
         }
 
         pet.status = "Completed";
         await pet.save();
 
 
         return res.status(200).json({ success: true, message: "Pet status updated", pet });
 
     } catch (error) {
         return res.status(500).json({ success: false, message: error.message });
     }
 };
 
 const cancelGrooming = async (req, res) => {
     try {
         const CanId = req.params.id;
 
         const adoption = await PetGroomingModel.findById(CanId);
 
         if (!adoption) {
             return res.status(404).json({ message: "Adoption record not found" });
         }
         const { image,date, selectedpackage , includedservice,price,location,fullname,email,ownercontact,vendorcontact,vendoremail,status } = adoption;
         await PetGroomingModel.findByIdAndDelete(CanId);
 
         const mailOptionsUser = {
             from: process.env.SENDER_EMAIL,
             to: email, // Adopter's email
             subject: "Pet Grooming Service Canceled",
             text: `Hello ${fullname}, Your request to take grooming service has been canceled.
             If this was a mistake or if you want to adopt another pet, please contact us.${vendorcontact}
             Thank you for using our service.`
         };
 
         await transporter.sendMail(mailOptionsUser);
 
         const mailOptionsVendor = {
             from: process.env.SENDER_EMAIL,
             to: vendoremail, 
             subject: "Pet Grooming Service Canceled",
             text: `Hello vendor, The request about pet grooming by ${fullname} has been canceled.
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
 
 export default {AddpetGroom, AddgetpetGroom,updateGroomStatus,cancelGrooming}