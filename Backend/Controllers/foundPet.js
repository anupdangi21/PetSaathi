import express from "express";
import petFound from "../Models/foundPet.js";
import upload from "../multerConfig.js";
import multer from "multer";
import petListModel from "../Models/addPet.js";


const petFoundData = async (req, res) => {
    try {
        const {Category, Description, Color,Age, Location,email,username,findercontact } = req.body; 
        const Image = req.file ? req.file.path.replace(/\\/g, "/") : null; 

        if (!Category || !Image || !Description || !Color || !Age || !Location) {
            return res.status(400).json({ message: "Validation error: Please fill all fields correctly" });
        }

        const foundPet = new petFound({
            Category, Image, Description, Color, Age, Location,email,username,findercontact, status:"Found"
        });

        await foundPet.save();
        res.status(200).json({ success: true, message: "Pet successfully reported" });

    } catch (error) {
        console.error("Error in petFoundData:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


const getPetFound = async(req, res)=>{
    try {
        const petfound = await petFound.find()
        res.status(200).json({status: true, data:petfound})
    } catch (error) {
        return res.status(400).json({message: false, message:error.message})
    }
}

const updateStatus = async (req, res) => {
    try {
        const petId = req.params.id;

        const pet = await petFound.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        pet.status = "Reunited";
        await pet.save();


        return res.status(200).json({ success: true, message: "Pet status updated", pet });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteFoundPet=async(req,res)=>{
    try {
        const {id}=req.params
        const deletepet = await petFound.findByIdAndDelete(id)
        if(!deletepet){
            return res.status(404).json({message:"Pet not found"})
        }
        res.status(200).json({message:"pet deleted successfully"})
    } catch (error) {
       return res.status(400).json({message:error.message}) 
    }
}

export default {petFoundData,getPetFound ,updateStatus,deleteFoundPet}