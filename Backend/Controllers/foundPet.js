import express from "express";
import petFound from "../Models/foundPet.js";
import upload from "../multerConfig.js";
import multer from "multer";


const petFoundData = async (req, res) => {
    try {
        const {Category, Description, Color,Age, Location,email,username } = req.body; 
        const Image = req.file ? req.file.path.replace(/\\/g, "/") : null; 

        if (!Category || !Image || !Description || !Color || !Age || !Location) {
            return res.status(400).json({ message: "Validation error: Please fill all fields correctly" });
        }

        const foundPet = new petFound({
            Category, Image, Description, Color, Age, Location,email,username
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

        // const matchingPets = await FoundPet.find({
        //     category: new RegExp(category, "i"), // Case-insensitive
        //     color: new RegExp(color, "i") // Case-insensitive
        //   });
    } catch (error) {
        return res.status(400).json({message: false, message:error.message})
    }
}

export default {petFoundData,getPetFound }