import express from "express"
import transporter from "../nodeMailer.js";

import withdrawl from "../Models/withdrawl.js"

const vendorWithdraw = async (req, res)=>{
    try {
        console.log("uta bata akao", req.body)
        const {fullname, organizationname, vendoremail, vendorcontact, location, bankname, accountnumber,bankaccountname, withdrawalAmount, overallAmount,from, status, withdrawlAt }=req.body
        if(!bankname || !accountnumber){
            return res.status(400).json({message: "Bank name and  account number are required"})
        }
        if(!withdrawalAmount || !overallAmount){
            return res.status(400).json({message: "Please fill all the fields."})
        }
        if(withdrawalAmount > overallAmount){
            return res.status(400).json({message: "Withdrawl amount higher than overall amount."})
        }
        if(withdrawalAmount < 100){
            return res.status(400).json({message: "Withdrawl amount should be greater than 100" })
        }        
        const newWithdrawl = new withdrawl({
            fullname, organizationname, vendoremail, vendorcontact, location, bankname, accountnumber,bankaccountname, withdrawalAmount, overallAmount,from, status, withdrawlAt
        })
        await newWithdrawl.save()
        const mailOptionsOwner = {
            from: process.env.SENDER_EMAIL,
            to: vendoremail, 
            subject: "Online earning withdrawal response",
            text: `Hello ${fullname}, your withdrawal request has been successfully processed. Your withdrawal amount is ${withdrawalAmount} and overall amount is ${overallAmount}
            
            Please wait untill admin approves your withdrawal request.

            Thank you for choosing our services.`
        };
        
        await transporter.sendMail(mailOptionsOwner);
// Email to Finder
            const mailOptionsFinder = {
                from: process.env.SENDER_EMAIL,
                to: "anupdangi92@gmail.com", 
                subject: "Online earning withdrawal response",
                text: `Hello Admin, ${fullname} has requested for online earings withdrawal from ${from}.
                Please check the withdrawal request and approve it if it is correct.`
            };

await transporter.sendMail(mailOptionsFinder);
        res.status(200).json({message: "Withdrawl created successfully."})
        
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}


//for marketplace
const marketWithdraw = async (req, res)=>{
    try {
        console.log("uta bata akao", req.body)
        const {fullname, organizationname, vendoremail, vendorcontact, location, bankname, accountnumber,bankaccountname, withdrawalAmount, overallAmount,from, status, withdrawlAt }=req.body
        if(!bankname || !accountnumber){
            return res.status(400).json({message: "Bank name and  account number are required"})
        }
        if(!withdrawalAmount || !overallAmount){
            return res.status(400).json({message: "Please fill all the fields."})
        }
        if(withdrawalAmount > overallAmount){
            return res.status(400).json({message: "Withdrawl amount higher than overall amount."})
        }
        if(withdrawalAmount < 100){
            return res.status(400).json({message: "Withdrawl amount should be greater than 100" })
        }        
        const newWithdrawl = new withdrawl({
            fullname, organizationname, vendoremail, vendorcontact, location, bankname, accountnumber,bankaccountname, withdrawalAmount, overallAmount,from, status, withdrawlAt
        })
        await newWithdrawl.save()
        const mailOptionsOwner = {
            from: process.env.SENDER_EMAIL,
            to: vendoremail, 
            subject: "Online earning withdrawal response",
            text: `Hello ${fullname}, your withdrawal request has been successfully processed. Your withdrawal amount is ${withdrawalAmount} and overall amount is ${overallAmount}
            
            Please wait untill admin approves your withdrawal request.

            Thank you for choosing our services.`
        };
        
        await transporter.sendMail(mailOptionsOwner);
// Email to Finder
            const mailOptionsFinder = {
                from: process.env.SENDER_EMAIL,
                to: "anupdangi92@gmail.com", 
                subject: "Online earning withdrawal response",
                text: `Hello Admin, ${fullname} has requested for online earings withdrawal from ${from}.
                Please check the withdrawal request and approve it if it is correct.`
            };

await transporter.sendMail(mailOptionsFinder);
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
const getWithdrawldataMarket = async(req, res)=>{
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
        const withdrawal = await withdrawl.findById(id);
        const commission = withdrawal.withdrawalAmount * 0.02;
        const updatedWithdrawal = await withdrawl.findByIdAndUpdate(
            id,
            {
                status: "Approved",
                processedAt: new Date(),
                commissionEarned: commission,
                netAmount: withdrawal.withdrawalAmount - commission,
            },
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
export default {vendorWithdraw,marketWithdraw,getWithdrawldataMarket, getWithdrawldata,approveWithdrawal,rejectWithdrawal,getWithdrawldataApprove ,getWithdrawldataReject}