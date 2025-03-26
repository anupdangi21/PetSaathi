import  mongoose  from '../Connection.js';
import  cors  from 'cors';
import  express from'express';
import  registerModel  from"../Models/register.js";
import  SigninModel  from"../Models/signin.js";
import  vendorregisterModel  from"../Models/vendorregistration.js";
import  bcrypt  from"bcrypt";
import  jwt from'jsonwebtoken';
import transporter from '../nodeMailer.js';

const router = express.Router();
const app = express();
router.use(express.json());
router.use(cors());

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
        res.status(500).json({ success: false, message: error.message });
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
        if (username.length < 3) {
          return res.status(400).json({
            success: false,
            message: "Username must be at least 3 characters"
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

        if ( !organizationname ||!services || !username || !location || !password) {
            return res.status(400).json({ message: "All fields are required" });
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
        res.status(500).json({ success: false, message: err.message });
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


// Sign in
const signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = await registerModel.findOne({ username }).exec();
        const vendor = await vendorregisterModel.findOne({ username }).exec();
        
        if (!user && !vendor) {
            return res.status(400).json({ message: "User or Vendor not found" });
        }

        let isUserMatch = false;
        let isVendorMatch = false;
        let vendorData = null;

        if (user) {
            isUserMatch = await bcrypt.compare(password, user.password);
            // Check if the same email exists in vendor database
            vendorData = await vendorregisterModel.findOne({ email: user.email }).exec();
        }
        if (vendor) {
            isVendorMatch = await bcrypt.compare(password, vendor.password);
        }

        if (!isUserMatch && !isVendorMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        let tokenPayload = { id: (isUserMatch ? user._id : vendor._id) };

        // If the user also has a vendor account, add vendor details to the token
        if (vendorData) {
            tokenPayload.organizationname = vendorData.organizationname;
            tokenPayload.services = vendorData.services;
            tokenPayload.location = vendorData.location;
            tokenPayload.experience = vendorData.experience
        }

        // If logging in as a vendor, include vendor details in the token
        if (isVendorMatch) {
            tokenPayload.organizationname = vendor.organizationname;
            tokenPayload.services = vendor.services;
            tokenPayload.experience = vendorData.experience
            tokenPayload.location = vendorData ? vendorData.location : vendor.location;
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            role: isUserMatch ? 'user' : 'vendor',
            token,
            user: {
                _id: isUserMatch ? user._id : vendor._id,
                username: isUserMatch ? user.username : vendor.username,
                email: isUserMatch ? user.email : vendor.email,
                number: isUserMatch ? user.number : vendor.number,
                ...(vendorData || isVendorMatch ? { organizationname: (vendorData || vendor).organizationname, services: (vendorData || vendor).services ,experience: (vendorData || vendor).experience, location: (vendorData || vendor).location} : {})
            }
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

const sendResetOtp = async(req,res)=>{
    const {email}= req.body;

    if(!email){
        return res.json({success: false, message: "Missing email"});

    }
    try {
        const user = await vendorregisterModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "Email not found"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 60 * 60 * 1000; // 1 hour expiry
        await user.save();

        // Send OTP email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Dear vendor, your reset OTP is ${otp}. Please verify your account within 1 hour.`,
        };
        await transporter.sendMail(mailOptions);
        return res.json({success: true, message:"OTP sent to your email"})

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const resetPassword = async (req, res)=>{
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({success: false, message: "Email , otp  found"})
    }
    try {
        const user = await vendorregisterModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "Email not found"})
        }
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return res.json({success: false, messagge:"invalid otp"});

        }
        if(user.resetOtpExipreAt<Date.now()){
            return res.json({success: false, message: "OTP expired"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;

        await user.save();
        return res.json({success: true, message: "password reset successfully"})

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export default { register,registerGetData,updateRegisterData, vendorRegister, VendorregisterGetData, signin, logout, isAuthenticated, sendResetOtp, resetPassword };
