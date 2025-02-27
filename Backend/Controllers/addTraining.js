import petTrainingModel from "../Models/addTraining.js"
import upload from "../multerConfig.js"


const petTraining = async (req, res)=>{
    try {
        console.log(req.body)
        const {Image, organizationname, vendoremail, vendorcontact, vendorlocation,trainingtype,timing, duration, eligibility,description,status }=req.body
        if(!trainingtype || !timing || !duration || !eligibility || !description){
            return res.status(201).json({message:"Please fill all the fields"})
        }
        const newTraining = new petTrainingModel({
            Image,
            organizationname,
            vendoremail,
            vendorcontact,
            vendorlocation,
            trainingtype,
            timing,
            duration,
            eligibility,
            description,
            status

        })
        console.log(newTraining)
        await newTraining.save()
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

const getPetTraining = async (req, res) => {
    try {
        const petTraining = await petTrainingModel.find()
        res.status(200).json({message:"List of training services are successfully fetched", data:petTraining})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }

}


const updatePetTraining = async (req, res) => {
    try {
        const {trainingtype, timing, duration, eligibility, description} = req.body
        const petId = req.params.id
        const pet = await petTrainingModel.findById(petId)

        if(!pet){
            return res.status(404).json({message:"Pet not found"})
        }

        pet.trainingtype = trainingtype || pet.trainingtype
        pet.timing = timing || pet.timing
        pet.duration = duration || pet.duration
        pet.eligibility = eligibility || pet.eligibility
        pet.description = description || pet.description
        if(req.file){
            pet.Image = req.file.path.replace(/\\/g, "/");
         }
         await pet.save()
         res.status(200).json({message:"Pet training updated successfully", data:pet})
    } catch (error) {
        res.status(400).json({message:false, message:error.message})
    }

}


const deletePetTraining = async (req, res) => {
    try {
        const {_id}= req.params;
        const deletepet = await petTrainingModel.findByIdAndDelete(_id);

        if(!deletepet){
            return res.status(400).json({message:"Pet details not found"})
        }
        res.status(200).json({message:"Pet training deleted successfully", data:deletepet})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }

}

export default {petTraining, getPetTraining, updatePetTraining, deletePetTraining}