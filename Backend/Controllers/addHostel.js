import petHostelModel from "../Models/addHostel.js"
import upload from "../multerConfig.js"


const petHostel = async(req,res)=>{
    try {
        // console.log(req.body)
        // || !petpickup || !petdropoff
        const {organizationname, vendorcontact, vendoremail, vendorlocation, accomodation, food, playtime,description, medicalsupport, petpickup, petdropoff, status}=req.body
        const Image = req.file ? req.file.path.replace(/\\/g, "/") : null;
        if(!accomodation || !food || !playtime || !medicalsupport ){
            return res.status(201).json({message: "please fill all empty feilds"})
        }
        
        const hostel = new petHostelModel({
                Image,
                organizationname,
                vendorcontact,
                vendoremail,
                vendorlocation,
                accomodation,
                // numberofdays,
                // pettype,
                food, 
                playtime,
                medicalsupport,
                description,
                // totalnumberofseats,
                petpickup,
                petdropoff,
                status,
        })
        // console.log(hostel)
        await hostel.save()
        res.status(200).json({message: "Hostel Added Successfully"})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

const getHostel = async(req, res)=>{
    try {
        const getHoteldata = await petHostelModel.find()
        res.status(200).json({success:true, message:"List of hsotel services displayed successfully", data:getHoteldata})
    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}

const updateHostel = async (req, res)=>{
    try {
        const {accomodation,numberofdays,pettype,food,playtime,medicalsupport,totalnumberofseats,petpickup,description,petdropoff }= req.body
         const petId = req.params.id;

         const pet = await petHostelModel.findById(petId)

         if(!pet){
            return res.status(400).json({success:false , message:error.message})
         }

         pet.accomodation= accomodation || pet.accomodation
         pet.numberofdays = numberofdays || pet.numberofdays
         pet.pettype = pettype || pet.pettype
         pet.food = food || pet.food
         pet.playtime = playtime || pet.playtime
         pet.description = description || pet.description
         pet.medicalsupport = medicalsupport || pet.medicalsupport
         pet.totalnumberofseats = totalnumberofseats || pet.totalnumberofseats
         pet.petpickup = petpickup || pet.petpickup
         pet.petdropoff = petdropoff || pet.petdropoff

         if(req.file){
            pet.Image = req.file.path.replace(/\\/g, "/");
         }
         await pet.save()
         res.status(200).json({success:true, message:"Hostel service updated successfully"})

    } catch (error) {
        res.status(400).json({success:false, message:error.message})
    }
}


const deleteHostel = async (req, res) => {
    try {

        const {_id} = req.params;  
        const deletedPet = await petHostelModel.findByIdAndDelete(_id);
        if (!deletedPet) {
            return res.status(404).json({ success: false, message: "Pet not found" });
        }

        res.status(200).json({ success: true, message: "Pet deleted successfully" });
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export default {petHostel,getHostel, updateHostel,deleteHostel }