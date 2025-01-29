import express from "express";
import petFound from "../Models/foundPet.js";
import upload from "../multerConfig.js";

const app = express();

const petFoundData = async(req, res)=>{
    try {
        const {Category, Image, Description, Color, Age, Location} = req.body;
        if(!Category || !Image || !Description || !Color || !Age || !Location){
            return res.status(400).json({message:"validation error please fill all fields"})
        }
        const foundPet = new petFound({
            Category, Image, Description, Color, Age, Location
        })
        await foundPet.save();
        res.status(200).json({success: true, message: "Pet successfully reported"})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

const getPetFound = async(req, res)=>{
    try {
        const petFound = await petFound.find()
        res.status(200).json({status: ture, message: "Pet successfuly found"})
    } catch (error) {
        return res.status(400).json({message: false, message:error.message})
    }
}

export default {petFoundData,getPetFound }