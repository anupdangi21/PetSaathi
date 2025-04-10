import express from "express"

import withdrawl from "../Models/withdrawl.js"

const vendorWithdraw = async (req, res)=>{
    try {
        console.log("uta bata akao", req.body)
        const {vendoremail, vendorcontact, vendorlocation, fullname, organizationname, withdrawlAmount, overallAmount, status, withdrawlAt, }=req.body
        if(!withdrawlAmount || !overallAmount){
            return res.status(400).json({message: "Please fill all the fields."})
        }
        if(withdrawlAmount > overallAmount){
            return res.status(400).json({message: "Withdrawl amount higher than overall amount."})
        }
        const newWithdrawl = new withdrawl({
            vendoremail, vendorcontact, vendorlocation, fullname, organizationname, withdrawlAmount,overallAmount, status, withdrawlAt
        })
        await newWithdrawl.save()
        res.status(200).json({message: "Withdrawl created successfully."})
        if(withdrawlAmount<10000){
            return res.status(400).json({message: "Withdrawl amount should be greater than 10 thousands" })
        }
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

const getWithdrawldata = async(req, res)=>{
    try {
        const getWithdraw = await withdrawl.find()
        return res.status(200).json({success:true, data:getWithdraw})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

export default {vendorWithdraw,getWithdrawldata }