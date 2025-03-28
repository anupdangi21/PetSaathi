import express from "express"
import petHostelModel from "../Models/petHostel.js"
import transporter from "../nodeMailer.js";

const bookHostel = async(req, res)=>{
    try {
        // console.log("aako hostel data", req.body)
        const {fullname,ownercontact,email,image,date,days,price,accommodationType,vendorcontact,vendoremail, vendorlocation,organizationname,food,medicalsupport,petpickup,petdropoff,status,rating,bookedAt,paymentStatus}=req.body
        const petHostel = new petHostelModel({
            fullname,
            ownercontact,
            email,
            image,
            date,
            days,
            price,
            accommodationType,
            vendorcontact,
            vendoremail, 
            vendorlocation,
            organizationname,
            food,
            medicalsupport,
            petpickup,
            petdropoff,
            status,
            rating,
            bookedAt,
            paymentStatus
        })
        // console.log("Save hune hostel data", petHostel)
        await petHostel.save()

        //mailing
        const mailOptionsUser = {
                     from: process.env.SENDER_EMAIL,
                     to: email, // Owner's email
                     subject: "Pet Hostel Service Request",
                     text: `Hello ${fullname}, your request on taking a pet hostel from ${organizationname} for total ${days} has been submitted successfully.
                     
                    Your booking services are: accomodation${accommodationType} , food will be ${food} , medical support ${medicalsupport} , pet pickup ${petpickup} , and oet dropoff${petdropoff}.
         
                     please note that your booked date for check-in is on ${date} and your visit location is ${vendorlocation}. 
                     Please be there on time to avoid any inconvenience. 
         
                     If there will be any delay or change in the date, please contact vendor at ${vendorcontact}.
         
                     Thank you for choosing our services.`
                 };
                 
                 await transporter.sendMail(mailOptionsUser);
         
                     // Email to Finder
                     const mailOptionsVendor = {
                         from: process.env.SENDER_EMAIL,
                         to: vendoremail, // Finder's email
                         subject: "Request for Pet hostel Service",
                         text: `Hello ${organizationname}, your service for hosteling pet with package has been  viewed by  (${fullname}) for ${days}and also he is interested on taking the service for their pet. 
                         
                         He will be at your organization's location at ${vendorlocation} on ${date}
         
                         If there are any changes, you can contact the user at ${ownercontact}.
                         
                         Thank you for choosing our services.`
                     };
         
         await transporter.sendMail(mailOptionsVendor);
             } catch (error) {
                 return res.status(400).json({status: false, message:error.message})
             }  
}


const getHostelBook = async (req, res)=>{
    try {
        const getHostel = await petHostelModel.find()
        res.status(200).json({status:true, data:getHostel})
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

const getHostelBookUser = async (req, res)=>{
    try {
        const getHostel = await petHostelModel.find()
        res.status(200).json({status:true, data:getHostel})
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}
const updateHostelStatus = async (req, res) => {
    try {
        console.log(req.body)
        const petId = req.params.id;

        const pet = await petHostelModel.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        pet.status = "Completed";
        await pet.save();


        return res.status(200).json({ success: true, message: "Pet status updated", pet });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const updateRateStatus = async (req, res) => {
    try {
        console.log(req.body)
        const petId = req.params.id;

        const pet = await petHostelModel.findById(petId);

        if (!pet) {
            return res.status(404).json({ message: "Pet not found" });
        }

        pet.rating = "Rated";
        await pet.save();

        return res.status(200).json({ success: true, message: "Pet status updated", pet });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const cancelHostelBook = async (req,res)=>{
    try {
        const CanId = req.params.id;
 
         const hostel = await petHostelModel.findById(CanId);
 
         if (!hostel) {
             return res.status(404).json({ message: "hostel record not found" });
         }

         const {fullname,email,image,date,Price,vendorcontact,vendoremail, vendorlocation,organizationname,food,medicalsupport,petpickup,petdropoff}= hostel;
         await petHostelModel.findByIdAndDelete(CanId);
         const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Adopter's email
            subject: "Pet hostel Service Canceled",
            text: `Hello ${fullname}, Your request to take hostel service has been canceled.
            If this was a mistake or if you want to adopt another pet, please contact us.${vendorcontact}
            Thank you for using our service.`
        };

        await transporter.sendMail(mailOptionsUser);

        const mailOptionsVendor = {
            from: process.env.SENDER_EMAIL,
            to: vendoremail, 
            subject: "Pet hostel Service Canceled",
            text: `Hello vendor, The request about pet hostel by ${fullname} has been canceled.
            You can make the pet available for adoption again if needed.\n\n
            If you need further assistance, feel free to reach out.\n\n
            Thank you!`
        };

        await transporter.sendMail(mailOptionsVendor);

        res.status(200).json({ message: "Hostel service deleted successfully and emails sent" });
    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

export default {bookHostel, getHostelBook,getHostelBookUser,updateHostelStatus,updateRateStatus,cancelHostelBook}