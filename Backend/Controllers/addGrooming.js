import petGroomingModel from "../Models/addGrooming.js"
import upload from "../multerConfig.js"

const petGroom = async(req,res)=>{
    try {
        console.log(req.body)
        const{organizationname, vendorcontact, vendoremail, vendorlocation,serviceoffering, includedOfferings, price,status,description}=req.body
        const Image = req.file ? req.file.path.replace(/\\/g, "/") : null;
        if(!serviceoffering ||!includedOfferings ){
            return res.status(400).json({success:false, message:"please fill all the forms"})

        }
        const newGroom = new petGroomingModel({
            organizationname,
            vendorcontact, 
            vendoremail, 
            vendorlocation,
            Image,
            serviceoffering,
            includedOfferings,
            price,
            description,
            status
        })
        console.log(newGroom)
        await newGroom.save()
        res.status(200).json({success:true, message:"Pet Grooming Added Successfully"})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

const getpetGroom = async (req,res)=>{
    try {
        const getpetGroomdata = await petGroomingModel.find()
        res.status(200).json({success:true, data:getpetGroomdata})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

const updatepetGroom = async (req,res)=>{
    try {
        const {serviceoffering, includedOfferings,price,description} = req.body
        const petId = req.params.id;
        const pet = await petGroomingModel.findById(petId)

        if(!pet){
            return res.status(400).json({success:false, message:error.message})
        }
        pet.serviceoffering = serviceoffering || pet.serviceoffering
        pet.includedOfferings = includedOfferings || pet.includedOfferings
        pet.price = price || pet.price
        pet.description = description || pet.description
        if(req.file){
            pet.Image = req.file.path.replace(/\\/g, "/");
         }
         await pet.save()
         res.status(200).json({success:true, message:"Service updated successfully"})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

const deletepetGroom = async (req,res)=>{
    try {
        const {_id} = req.params;  
        const deletedPet = await petGroomingModel.findByIdAndDelete(_id);
        if (!deletedPet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        res.status(200).json({ success: true, message: "Pet deleted successfully" });
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

export default {petGroom,getpetGroom, updatepetGroom,deletepetGroom}