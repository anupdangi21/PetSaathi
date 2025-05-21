import express from 'express';
import PetTrainingModel from "../Models/petTraining.js";

import transporter from '../nodeMailer.js';

const AddpetTrain = async (req, res)=>{
    try {
        // console.log("aako train data", req.body)
        const {image,date,days,organizationname, selectedpackage , includedservice,price,Restrictions,Duration,SelectedTiming, location,fullname,email,ownercontact,vendorcontact,vendoremail,status,bookedAt,paymentStatus}=req.body;
        if(!date ){
            return res.status(400).json({message:"please select date for booking an appointment for getting the pet"})
        }
        
        const pethostel = new PetTrainingModel({
            image,date,days,organizationname, selectedpackage, includedservice,price,Restrictions,Duration,SelectedTiming,location,fullname,email,ownercontact,vendorcontact,vendoremail,status,bookedAt,paymentStatus
        })
        // console.log("save hune data",pethostel)
        await pethostel.save()


        const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Owner's email
            subject: "Pet Training Service Request",
            text: `Hello ${fullname}, your request on taking a pet training service with choosen package type ${selectedpackage}, with included services ${includedservice} for ${days} has been successfully submitted. 

            please note that you have selected your shift on ${SelectedTiming} and your booked date for check-in is on ${date} also note that your visit location is ${location}. 
            Please be there on time to avoid any inconvenience. 

            If there will be any delay or change in the date, please contact vendor at ${vendorcontact}.

            Thank you for choosing our services.`
        };
        
        await transporter.sendMail(mailOptionsUser);

            // Email to vendor
            const mailOptionsVendor = {
                from: process.env.SENDER_EMAIL,
                to: vendoremail, // vendor's email
                subject: "Request for Pet Training Service",
                text: `Hello vendor, your service for training pet with package ${selectedpackage} with offering ${includedservice} for ${days} has been  viewed by  (${fullname}) and also he is interested on taking the service for their pet on shift ${SelectedTiming}. 
        

                He will be at your organization's location at ${location} on ${date}

                If there are any changes, you can contact the user at ${ownercontact}.
                
                Thank you for choosing our services.`
            };

await transporter.sendMail(mailOptionsVendor);
res.status(200).json({ success: true, message: "Service Booked successfully"});
    } catch (error) {
        return res.status(400).json({status: false, message:error.message})
    }
}

const AddgetpetTrain = async (req, res)=>{
    try {
       const getPet= await PetTrainingModel.find()
       res.status(200).json({status:true, data:getPet})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const AddgetpetTrainUser = async (req, res)=>{
    try {
       const getPet= await PetTrainingModel.find()
       res.status(200).json({status:true, data:getPet})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const updateTrainStatus = async (req, res) => {
    try {
        console.log(req.body)
        const petId = req.params.id;

        const pet = await PetTrainingModel.findById(petId);

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

const updateTrainingRateStatus = async (req, res) => {
    try {
        console.log(req.body)
        const petId = req.params.id;

        const pet = await PetTrainingModel.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        pet.rating = "Rated";
        await pet.save();

        return res.status(200).json({ success: true, message: "Pet status updated", pet });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const cancelTraining = async (req, res) => {
    try {
        const CanId = req.params.id;

        const adoption = await PetTrainingModel.findById(CanId);

        if (!adoption) {
            return res.status(404).json({ message: "Adoption record not found" });
        }
        const { image,date, selectedpackage , includedservice,price,location,fullname,email,ownercontact,vendorcontact,vendoremail,status } = adoption;
        await PetTrainingModel.findByIdAndDelete(CanId);

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

const TrainingmarkAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await PetTrainingModel.findByIdAndUpdate(
      id,
      { seen: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const TrainingmarkBatchAsSeen = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await PetTrainingModel.updateMany(
      { _id: { $in: ids } },
      { $set: { seen: true } }
    );
    res.status(200).json({ 
      success: true,
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {AddpetTrain, AddgetpetTrain,AddgetpetTrainUser,updateTrainStatus,updateTrainingRateStatus,cancelTraining, TrainingmarkAsSeen, TrainingmarkBatchAsSeen}