import mongoose from "../Connection.js";
import lostPet from "../Models/lostPet.js"

const petLostData = async (req, res)=>{
    try {
        const {Category,Color,Age, Location}= req.body;
        const petLost = new lostPet({
            Category,
            Color,
            Age,
            Location
        });
        await petLost.save();
        res.status(200).json({message: "Pet Lost Data Added Successfully"});

    } catch (error) {
         res.status(400).json({success: false, message: error.message})
    }
}

const getLostPetData = async (req, res)=>{
    try {
        const LostPet = await lostPet.find()
        res.status(200).json({success: true, data: LostPet})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

const deleteLostPet=async(req,res)=>{
    try {
        const {id}=req.params
        const deletepet = await lostPet.findByIdAndDelete(id)
        if(!deletepet){
            return res.status(404).json({message:"Pet not found"})
        }
        res.status(200).json({message:"pet deleted successfully"})
    } catch (error) {
       return res.status(400).json({message:error.message}) 
    }
}
export default{petLostData,getLostPetData,deleteLostPet }