import vendorregisterModel from "../Models/vendorregistration.js"
import  jwt from'jsonwebtoken';

const addService = async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);
      const { email, services } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "User email is required" });
      }
  
      if (!services) {
        return res.status(400).json({ message: "Please select a service" });
      }
  
      // Convert services to an array if it's a single string
      const servicesToAdd = Array.isArray(services) ? services : [services];
  
      // Find the vendor by email
      const vendor = await vendorregisterModel.findOne({ email });
      if (!vendor) {
        return res.status(404).json({ message: "Vendor not found" });
      }
  
      // Check for existing services
      const existingServices = vendor.services.filter(service => 
        servicesToAdd.includes(service)
      );
  
      if (existingServices.length > 0) {
        return res.status(400).json({ 
          message: "Service(s) already exist",
          existingServices 
        });
      }
  
      // Update the vendor's services
      const updatedService = await vendorregisterModel.findOneAndUpdate(
        { email: email },
        {
          $push: {
            services: { $each: servicesToAdd }
          }
        },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Service(s) added successfully",
        service: updatedService.services
      });

      const token = jwt.sign({ id: newVendor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
              res.cookie('token', token, {
                  httpOnly: true,
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                  maxAge: 24 * 60 * 60 * 1000, 
              });

              res.status(200).json({ success: true, message: "service extended successfully", token,
                user:{
                    _id: newVendor._id,
                    username: newVendor.username,
                    email: newVendor.email,
                    services: newVendor.services,
                    number:newVendor.number
                }
             });

              
  
    } catch (error) {
      console.error("Error in addService:", error);
      res.status(500).json({
        message: "Error updating service",
        error: error.message
      });
    }
  };


export default {addService};