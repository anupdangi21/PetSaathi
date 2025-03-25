import express from 'express'

import transporter from "../nodeMailer.js";
import GroomingRating from "../Models/GroomingRate.js"

const groomRate = async(req,res)=>{
    try {
        console.log(req.body)
        const {rating, stars, areaImprovement, userComment}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const rategroom= new GroomingRating({
            rating, stars, areaImprovement, userComment
         })
         console.log("rating hunxa ki nai heram hai ta",rategroom)
         await rategroom.save()
        
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

const getgroomRating = async(req,res)=>{
    try {
        const groomingRating = await GroomingRating.find()
        return res.status(200).json({status:true, data:groomingRating})
    } catch (error) {
        return res.json({status:false, message:error.message})
    }
}

export default {groomRate, getgroomRating}