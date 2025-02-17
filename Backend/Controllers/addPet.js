import mongoose from "../Connection.js";
import cors from "cors";
import express from "express";
import multer from "multer";
import petListModel from "../Models/addPet.js";
import upload from "../multerConfig.js"



const petList = async(req,res)=>{
    try {
        console.log(req.body)
        const {petname, Category, Description, Age, Location, email, organizationname } = req.body;
        const Image = req.file ? req.file.path.replace(/\\/g, "/") : null;
        if(!petname || !Category || !Description || !Age || !Location || !Image){
            return res.status(400).json({message: "please fill all the empty fields"})
            }
            const pet = new petListModel({
                petname, Category, Description, Age, Location, Image, email, organizationname
            });
            await pet.save();

            res.status(200).json({ success: true, message: "Pet Uploaded successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const getPetlist = async(req, res)=>{
    try {
        const getPetData= await petListModel.find()
        res.status(200).json({success: true, data: getPetData})
    } catch (error) {
    res.json(400).json({success: false, message:"cannot find the pets in the database"})
    }
}


const updatePet = async (req, res) => {
    try {
        const { petname, Category, Description, Age, Location } = req.body;
        const petId = req.params.id;  

        const pet = await petListModel.findById(petId);

        if (!pet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        pet.petname = petname || pet.petname;
        pet.Category = Category || pet.Category;
        pet.Description = Description || pet.Description;
        pet.Age = Age || pet.Age;
        pet.Location = Location || pet.Location;

        if (req.file) {
            pet.Image = req.file.path.replace(/\\/g, "/");
        }
        await pet.save();
        res.status(200).json({ success: true, message: "Pet updated successfully", data: pet });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deletePet = async (req, res) => {
    try {

        const {_id} = req.params;  
        const deletedPet = await petListModel.findByIdAndDelete(_id);
        if (!deletedPet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        res.status(200).json({ success: true, message: "Pet deleted successfully" });
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default {petList, getPetlist, updatePet, deletePet};