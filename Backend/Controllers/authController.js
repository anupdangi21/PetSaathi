import  mongoose  from '../Connection.js';
import  cors  from 'cors';
import  express from'express';
import  registerModel  from"../Models/register.js";
import  SigninModel  from"../Models/signin.js";
import  vendorregisterModel  from"../Models/vendorregistration.js";
import AdminModel from "../Models/adminAccount.js"
import  bcrypt  from"bcrypt";
import  jwt from'jsonwebtoken';
import transporter from '../nodeMailer.js';

const router = express.Router();
const app = express();
router.use(express.json());
router.use(cors());


//admin register

const admin = async (req, res) => {
    try {
        const {email, username, password, number}=req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new AdminModel({
            email: email,
            username: username,
            password: hashedPassword,
            number: number
        })
        await admin.save();

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000, 
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome Admin',
            text: `Dear admin, your account has been created successfully. Please login to your account using username: ${username}`
        }
        await transporter.sendMail(mailOptions);
        res.status(201).json({ success: true, message: "Admin registered successfully", token,
            user:{
                _id: admin._id,
                username: admin.username,
                email: admin.email,
                number: admin.number
            }
         });

    } catch (error) {
        return res.status(400).json({status:false, message:error.message})
    }
}

//get admin
const getadmin = async (req, res) => {
    try {
        const adminData = await AdminModel.find()
        res.status(200).json({ success: true, data: adminData });
        
    } catch (error) {
        res.status(400).json({success: false, message:"cannot get data cuz endpoint empty"})
    }
}


// User registration
const register = async (req, res)=>{
    try {
        console.log(req.body)
        const { email, username, password, number } = req.body;

        if (!email || !username || !password ||!number) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if(username.length <4){
            return res.status(400).json({message:"Username should be more than 4 letters"})
        }
        if(password.length < 4 ){
            return res.status(400).json({message:"Password should be more than 4 letters"})
        }
        if(number.length < 9 ){
            return res.status(400).json({message:"Number should be more than 9 letters"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new registerModel({ email, username, number,  password: hashedPassword });
        await newUser.save();
        const signinUser = new SigninModel({ email,username,number ,  password: hashedPassword });
        await signinUser.save();
    

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000, 
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'welcome to petsaathi',
            text: `Dear customer, your account has been created successfully. Please login to your account using username: ${username}`
        }
        await transporter.sendMail(mailOptions);

        
        res.status(201).json({ success: true, message: "User registered successfully", token,
            user:{
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                number: newUser.number
            }
         });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

//getting all registers data in a api endpoint
const registerGetData = async (req, res) => {
    try {
        const registerData = await registerModel.find()
        res.status(200).json({ success: true, data: registerData });
        
    } catch (error) {
        res.status(400).json({success: false, message:"cannot get data cuz endpoint empty"})
    }
}

//deleting the registered user

const deleteRegister = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await registerModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting user"
    });
  }
};
//updating the registered user data

const updateRegisterData = async (req, res) => {
    try {
      const { id } = req.params;
      const { username, number, password } = req.body;
  
      // Input validation
      if (!username && !number && !password) {
        return res.status(400).json({
          success: false,
          message: "No fields provided for update"
        });
      }
  
      const user = await registerModel.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Update fields
      if (username) {
        if (username.length < 4) {
          return res.status(400).json({
            success: false,
            message: "Username must be at least 4 characters"
          });
        }
        user.username = username;
      }
  
      if (number) {
        if(number.length<9){
            return res.status(400).json({
                success:false,
                message:"number must be 10 digits"
            })
        }
        user.number = number;
    }
  
      if (password) {
        if (password.length < 4) {
          return res.status(400).json({
            success: false,
            message: "Password must be at least 4 characters"
          });
        }
        user.password = await bcrypt.hash(password, 10);
      }
  
      const updatedUser = await user.save();
  
      // Generate new token
      const newToken = jwt.sign(
        {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          number: updatedUser.number
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Set cookie and response
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        token: newToken,
        user: {
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          number: updatedUser.number
        }
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

// Vendor registration
 const vendorRegister = async (req, res) => {
    try {
        console.log(req.body)
        const { organizationname, email ,services, username,location, password, number,experience } = req.body;

        if ( !organizationname ||!services || !username || !location || !password || !number ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if(username.length <4){
            return res.status(400).json({message:"Username should be more than 4 letters"})
        }
        if(password.length < 4 ){
            return res.status(400).json({message:"Password should be more than 4 letters"})
        }
        if(number.length < 9 ){
            return res.status(400).json({message:"Number should be more than 9 letters"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new vendorregisterModel({
            organizationname, email, services,experience, number, username,location, password: hashedPassword
        });
        await newVendor.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newVendor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000, 
        });
        
        // sending the email using nodemailer
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'welcome to petsaathi',
            text: `Dear vendor, your account has been created successfully. Please login to your account using username: ${username}`
        }
        await transporter.sendMail(mailOptions);
        // Send success response
        res.status(200).json({ success: true, message: "Vendor registered successfully", token,
            user:{
                _id: newVendor._id,
                username: newVendor.username,
                location:newVendor.location,
                email: newVendor.email,
                services: newVendor.services,
                number:newVendor.number,
                experience:newVendor.experience
            }
         });
    } catch (err) {
       return res.status(400).json({ success: false, message: err.message });
    }
};

//getting all Vendor registers data in a api endpoint
const VendorregisterGetData = async (req, res) => {
    try {
        const vendorregisterData = await vendorregisterModel.find()
        res.status(200).json({ success: true, data: vendorregisterData });
        
    } catch (error) {
        res.status(400).json({success: false, message:"cannot get data cuz endpoint empty"})
    }
}

//update vendor profile:
const updateVendorData = async (req, res) => {
    try {
      const { email  } = req.params;
      const { username, number, password, organizationname, experience } = req.body;
  
      // Input validation
      if (!username && !number && !password) {
        return res.status(400).json({
          success: false,
          message: "No fields provided for update"
        });
      }
  
      const user = await vendorregisterModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      // Update fields
      if (username) {
        if (username.length < 4) {
          return res.status(400).json({
            success: false,
            message: "Username must be at least 4 characters"
          });
        }
        user.username = username;
      }
  
      if (number) {
        if(number.length<9){
            return res.status(400).json({
                success:false,
                message:"number must be 10 digits"
            })
        }
        user.number = number;
    }
  
      if (password) {
        if (password.length < 4) {
          return res.status(400).json({
            success: false,
            message: "Password must be at least 4 characters"
          });
        }
        user.password = await bcrypt.hash(password, 10);
      }
      user.organizationname = organizationname
      user.experience = experience
      const updatedUser = await user.save();
  
      // Generate new token
      const newToken = jwt.sign(
        {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          number: updatedUser.number
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Set cookie and response
      res.cookie("token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        token: newToken,
        user: {
          _id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          number: updatedUser.number
        }
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

// Sign in
const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = await registerModel.findOne({ username }).exec();
        const vendor = await vendorregisterModel.findOne({ username }).exec();
        const admin = await AdminModel.findOne({ username }).exec();

        // Fix 1: Check all three possibilities (user, vendor, admin)
        if (!user && !vendor && !admin) {
            return res.status(400).json({ message: "Account not found" });
        }

        let isUserMatch = false;
        let isVendorMatch = false;
        let isAdminMatch = false;
        let vendorData = null;

        // Fix 2: Check admin first since it's a separate role
        if (admin) {
            isAdminMatch = await bcrypt.compare(password, admin.password);
        } else if (user) {
            isUserMatch = await bcrypt.compare(password, user.password);
            // Check if user has associated vendor account
            vendorData = await vendorregisterModel.findOne({ email: user.email }).exec();
        } else if (vendor) {
            isVendorMatch = await bcrypt.compare(password, vendor.password);
        }

        // Fix 3: Include admin in the password check
        if (!isUserMatch && !isVendorMatch && !isAdminMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Fix 4: Cleaner token payload creation
        let tokenPayload = {};
        if (isAdminMatch) {
            tokenPayload = {
                id: admin._id,
                email: admin.email,
                username: admin.username,
                number: admin.number,
                role: 'admin'
            };
        } else if (isUserMatch) {
            tokenPayload = {
                id: user._id,
                email: user.email,
                username: user.username,
                number: user.number,
                role: 'user'
            };
            
            if (vendorData) {
                tokenPayload = {
                    ...tokenPayload,
                    organizationname: vendorData.organizationname,
                    services: vendorData.services,
                    location: vendorData.location,
                    experience: vendorData.experience
                };
            }
        } else if (isVendorMatch) {
            tokenPayload = {
                id: vendor._id,
                email: vendor.email,
                username: vendor.username,
                number: vendor.number,
                organizationname: vendor.organizationname,
                services: vendor.services,
                location: vendor.location,
                experience: vendor.experience,
                role: 'vendor'
            };
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            role: tokenPayload.role,
            token,
            user: tokenPayload
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

 const logout = async (req, res)=>{
    try {
        res.clearCookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            'none':'strict',
        });

        return res.json({success: true, message: "logged Out"})
        
    } catch (error) {
        
    }
}
const isAuthenticated = async(req, res)=>{
    try {
        return res.json({success: true})
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const resetOtpExpireAt = async (email) => {
  try {
    const user = await registerModel.findOne({ email });
    const vendor = await vendorregisterModel.findOne({ email });
    const account = user || vendor;

    if (!account) {
      throw new Error('Account not found');
    }

    account.resetOtp = null;
    account.resetOtpExpireAt = null;
    await account.save();

    return { success: true, message: "OTP and expiration reset successfully" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  try {
      // Check both user and vendor collections
      const user = await registerModel.findOne({ email });
      const vendor = await vendorregisterModel.findOne({ email });
      const account = user || vendor;

      if (!account) return res.status(404).json({ success: false, message: "Email not found" });

      const otp = String(Math.floor(100000 + Math.random() * 900000));
      account.resetOtp = otp;
      account.resetOtpExpireAt = Date.now() + 1800000; // 30 minutes
      await account.save();

      // Send email
      const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: "Password Reset OTP",
          html: `<p>Your password reset OTP is <strong>${otp}</strong>. Valid for 30 minutes.</p>`
      };
      await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "OTP sent to email" });

  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
      // Check both collections
      const user = await registerModel.findOne({ email });
      const vendor = await vendorregisterModel.findOne({ email });
      const account = user || vendor;

      if (!account) return res.status(404).json({ success: false, message: "Invalid request" });

      if (account.resetOtp !== otp) {
          return res.status(400).json({ success: false, message: "Invalid OTP" });
      }

      if (account.resetOtpExpireAt < Date.now()) {
          return res.status(400).json({ success: false, message: "OTP expired" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      account.password = hashedPassword;
      account.resetOtp = null;
      account.resetOtpExpireAt = null;
      await account.save();

      res.json({ success: true, message: "Password reset successful" });

  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};
export default {admin,getadmin,deleteRegister, register,registerGetData,updateRegisterData, vendorRegister, VendorregisterGetData,updateVendorData, signin, logout, isAuthenticated, sendResetOtp, resetPassword };
