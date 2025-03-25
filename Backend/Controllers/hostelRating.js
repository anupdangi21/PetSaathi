import exporess from "express"

import transporter from "../nodeMailer.js";
import HostelRating from "../Models/HostelRate.js"

const hostelRate = async(req,res)=>{
    try {
        console.log(req.body)
        const {rating, stars, areaImprovement, userComment}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const ratehostel= new HostelRating({
            rating, stars, areaImprovement, userComment
         })
         console.log("rating hunxa ki nai heram hai ta",ratehostel)
         await ratehostel.save()
        
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

const gethostelRate = async(req,res)=>{
    try {
        const hostelRating = await HostelRating.find()
        return res.status(200).json({status:true, data:hostelRating})
    } catch (error) {
        return res.json({status:false, message:error.message})
    }
}

export default {hostelRate, gethostelRate}