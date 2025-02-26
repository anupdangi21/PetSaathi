import  registerModel  from"../Models/register.js";
import  SigninModel  from"../Models/signin.js";
import  vendorregisterModel  from"../Models/vendorregistration.js";

const getUserData =async ()=>{
    try {
        const {userId}= req.body
        const user = await vendorregisterModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json({
            success:true,
            userData:{
                name:user.name,
                Email:user.email,
                services:user.services,
                location:user.location,
                organizationname:user.organizationname
            }
        })
    } catch (error) {
        return res.json({success: false, message:"error fetching data"})
    }
}
export default getUserData;