import express from "express"

import withdrawl from "../Models/withdrawl.js"

const vendorWithdraw = async (req, res)=>{
    try {
        console.log("uta bata akao", req.body)
        const {fullname, organizationname, vendoremail, vendorcontact, location, bankname, accountnumber,bankaccountname, withdrawalAmount, overallAmount, status, withdrawlAt }=req.body
        if(!withdrawalAmount || !overallAmount){
            return res.status(400).json({message: "Please fill all the fields."})
        }
        if(withdrawalAmount > overallAmount){
            return res.status(400).json({message: "Withdrawl amount higher than overall amount."})
        }
        if(withdrawalAmount < 100){
            return res.status(400).json({message: "Withdrawl amount should be greater than 10 thousands" })
        }
        const newWithdrawl = new withdrawl({
            fullname, organizationname, vendoremail, vendorcontact, location, bankname, accountnumber,bankaccountname, withdrawalAmount, overallAmount, status, withdrawlAt
        })
        await newWithdrawl.save()
        res.status(200).json({message: "Withdrawl created successfully."})
        
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

const getWithdrawldataApprove = async(req, res)=>{
    try {
        const getWithdraw = await withdrawl.find()
        return res.status(200).json({success:true, data:getWithdraw})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}
const getWithdrawldataReject = async(req, res)=>{
    try {
        const getWithdraw = await withdrawl.find()
        return res.status(200).json({success:true, data:getWithdraw})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}
const approveWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedWithdrawal = await withdrawl.findByIdAndUpdate(
            id,
            { status: "Approved", processedAt: new Date() },
            { new: true }
        );

        if (!updatedWithdrawal) {
            return res.status(404).json({ message: "Withdrawal request not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Withdrawal approved successfully",
            data: updatedWithdrawal
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


const rejectWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const updatedWithdrawal = await withdrawl.findByIdAndUpdate(
            id,
            { 
                status: "Rejected", 
                processedAt: new Date(),
                rejectionReason: reason 
            },
            { new: true }
        );

        if (!updatedWithdrawal) {
            return res.status(404).json({ message: "Withdrawal request not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Withdrawal rejected successfully",
            data: updatedWithdrawal
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export default {vendorWithdraw,getWithdrawldata,approveWithdrawal,rejectWithdrawal,getWithdrawldataApprove ,getWithdrawldataReject}