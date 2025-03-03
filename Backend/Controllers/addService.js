import vendorregisterModel from "../Models/vendorregistration.js"
import  jwt from'jsonwebtoken';

const addService = async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);
      const { email, services } = req.body;
      const experience = req.body.experience
  
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
          },
          experience:experience
        },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Service(s) added successfully",
        service: updatedService.services,
        experience:updatedService.experience
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