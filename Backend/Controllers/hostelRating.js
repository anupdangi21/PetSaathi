import exporess from "express"
import transporter from "../nodeMailer.js"
import HostelRating from "../Models/HostelRate.js"

const hostelRate = async(req,res)=>{
    try {
        // console.log(req.body)
        const {stars, areaImprovement, userComment,fullname,ownercontact,email,image,date,days,price,accommodationType,vendorcontact,vendoremail, vendorlocation,organizationname,food,medicalsupport,petpickup,petdropoff,seen,status,bookedAt}=req.body
         if(!stars || !areaImprovement || !userComment){
            return res.status(400).json({message:"Please fill all fields"})

         }
         const ratehostel= new HostelRating({
            stars, areaImprovement, userComment,fullname,ownercontact,email,image,date,days,price,accommodationType,vendorcontact,vendoremail, vendorlocation,organizationname,food,medicalsupport,petpickup,petdropoff,seen,status,bookedAt
         })
        //  console.log("rating hunxa ki nai heram hai ta",ratehostel)
         await ratehostel.save()
         res.status(200).json({status:true, message:"Service rated successfully"})
          //mailing
          const mailOptionsUser = {
            from: process.env.SENDER_EMAIL,
            to: email, // Owner's email
            subject: "Pet Hostel Service Rating",
            text: `Hello ${fullname}, your rating request for grooming service from ${organizationname} has been successfully submitted. 

            You have rated: ${stars} and your improvement area was ${areaImprovement} with comment ${userComment}

            Thank you for your response.`
        };

        await transporter.sendMail(mailOptionsUser);

            // Email to vendor
            const mailOptionsVendor = {
                from: process.env.SENDER_EMAIL,
                to: vendoremail, // vendor's email
                subject: "Rating from customer for your service",
                text: `Hello vendor, Your recent customer ${fullname} has rated your service a ${stars} stars.

               His/Her area for improvement was ${areaImprovement} and also suggested as: ${userComment}

                Thank you for choosing petsaathi.`
            };
        await transporter.sendMail(mailOptionsVendor);
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

    const updateHostelRating = async(req,res)=>{
        try {
            // console.log(req.body)
            const { email, fullname, vendoremail, organizationname } = req.body;
            const petId = req.params.id;
            const pet = await HostelRating.findById(petId)
    
            if (!pet) {
                return res.status(404).json({ message: "Pet not found" });
            }
            pet.status="Rated, read by vendor"
            await pet.save()
    
            
            const mailOptionsUser = {
                 from: process.env.SENDER_EMAIL,
                 to: email, // Owner's email
                 subject: "Pet Hostel Service Rating Response",
                 text: `Hello ${fullname}, your rating request for grooming service from ${organizationname} has been successfully read by vendor. 
    
                Thank you for your response.`
             };
    
             await transporter.sendMail(mailOptionsUser);
    
             const mailOptionsVendor = {
                from: process.env.SENDER_EMAIL,
                to: vendoremail, // vendor's email
                subject: "Pet Hostel Service Rating Response",
                text: `Hello ${organizationname}, you have marked the rating response from ${fullname} to read. 
    
                Thank you for choosing PetSaathi.`
            };
        await transporter.sendMail(mailOptionsVendor);
    
             return res.status(200).json({ success: true, message: "Pet status updated", pet });
    
        } catch (error) {
            return res.status(400).json({status:false, message:error.message})
        }
    }

const hostelratemarkAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await HostelRating.findByIdAndUpdate(
      id,
      { seen: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const hostelratemarkBatchAsSeen = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await HostelRating.updateMany(
      { _id: { $in: ids } },
      { $set: { seen: true } }
    );
    res.status(200).json({ 
      success: true,
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {hostelRate, gethostelRate,updateHostelRating, hostelratemarkAsSeen, hostelratemarkBatchAsSeen}