import express from 'express'
import transporter from "../nodeMailer.js";
import TrainingRating from "../Models/TrainingRate.js"

const trainingRate = async(req,res)=>{
    try {
        console.log(req.body)
        const {rating, stars, areaImprovement, userComment}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const rateTrain= new TrainingRating({
            rating, stars, areaImprovement, userComment
         })
         console.log("rating hunxa ki nai heram hai ta",rateTrain)
         await rateTrain.save()
        
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

const getrainingRate = async(req,res)=>{
    try {
        const trainingRating = await TrainingRating.find()
        return res.status(200).json({status:true, data:trainingRating})
    } catch (error) {
        return res.json({status:false, message:error.message})
    }
}

export default {trainingRate, getrainingRate}