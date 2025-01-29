import mongoose from "../Connection.js";
import cors from "cors";
import express from "express";
import petListModel from "../Models/addPet.js";

const router = express.Router();
const app = express();
router.use(express.json())
router.use(cors());

const petList = async(req,res)=>{
    try {
        const {petname, Categories, Description, Age, Location } = req.body;
        if(!petname || !Categories || !Description || !Age || !Location){
            return res.status(400).json({message: "please fill all the empty fields"})
            }
            const pet = new petListModel({
                petname, Categories, Description, Age, Location
            });
            await pet.save();

            res.status(200).json({ success: true, message: "Pet Uploaded successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

const getPetlist = async(req, res)=>{
    try {
        const getPetData= await petListModel.find();
        res.status(200).json({success: true, data: getPetData})
    } catch (error) {
    res.json(400).json({success: false, message:"cannot find the pets in the database"})
    }
}
export default {petList, getPetlist };