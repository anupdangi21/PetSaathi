import express from "express"
import vendorBank from "../Models/vendorBankings.js"
import transporter from "../nodeMailer.js"

const addBankDetails = async (req, res)=>{
    try {
    console.log(req.body)
    const {fullname, number, organizationname, vendoremail, vendorcontact, organizationaddress, takenservices, bankname, accountnumber, bankaccountname,enteredAt }=req.body
    if(!bankname || !accountnumber || !bankaccountname){
        return res.status(400).json({success:false, message:"PLease fill all the fields"})
    }
    if(accountnumber < 10){
        return res.status(400).json({success:false, message:"Bank account number should be 16 digit"})
    }
    const newVendorBank = new vendorBank({
        fullname, number, organizationname, vendoremail, vendorcontact, organizationaddress, takenservices, bankname, accountnumber, bankaccountname,enteredAt
    })
    await newVendorBank.save()
    res.status(200).json({message: "Bank details created successfully."})

    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}

const getBankdetails = async (req, res)=>{
    try {
        const getBank = await vendorBank.find()
        return res.status(200).json({success:true, data:getBank})
    } catch (error) {
        return res.status(400).json({success:false, message:error.message})
    }
}


export default {addBankDetails, getBankdetails}



