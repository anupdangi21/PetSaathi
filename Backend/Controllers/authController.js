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
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await registerModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new registerModel({ email, username, password: hashedPassword });
        await newUser.save();
        const signinUser = new SigninModel({ email,username,  password: hashedPassword });
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
            }
         });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// Vendor registration
 const vendorRegister = async (req, res) => {
    try {
        const { organizationname, email ,services, username, password } = req.body;

        if ( !organizationname|| !email ||!services || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Checking if the username or email already exists
        const existingVendor = await vendorregisterModel.findOne({ email });
        if (existingVendor) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new vendorregisterModel({
            organizationname, email, services, username, password: hashedPassword
        });

        await newVendor.save();

        // Generate a JWT token
        const token = jwt.sign({ id: newVendor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set the token as a cookie
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
                email: newVendor.email,
            }
         });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
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

        if (!user && !vendor) {
            return res.status(400).json({ message: "User or Vendor not found" });
        }

        let isUserMatch = false;
        let isVendorMatch = false;

        if (user) {
            isUserMatch = await bcrypt.compare(password, user.password);
        }

        if (vendor) {
            isVendorMatch = await bcrypt.compare(password, vendor.password);
        }

        if (!isUserMatch && !isVendorMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        let token;
        if (isUserMatch) {
            token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ role: 'user',
                 token ,

                user:{
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                }
            })
        } else if (isVendorMatch) {
            token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ role: 'vendor',
                 token,
                user:{
                    _id: vendor._id,
                    username: vendor.username,
                    email: vendor.email,
                }
             });
        }
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
// sending the verification otp
const sendVerifyOtp = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log request body for debugging

        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "UserId is required" });
        }

        // Find user by ID
        const user = await vendorregisterModel.findById( userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if account is already verified
        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account is already verified" });
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 1 hour expiry
        await user.save();

        // Send OTP email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            text: `Dear vendor, your OTP is ${otp}. Please verify your account within 1 hour.`,
        };
        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.error("Error:", error.message); // Log error for debugging
        return res.status(500).json({ message: error.message });
    }
};


const verifyEmail = async (req, res)=>{
    const { userId, otp } = req.body;

    if(!userId || !otp){
        return res.json({success: false, message: "Missing email and OTP"})
    }
    try {
        const user = await vendorregisterModel.findById(userId);
        if(!user){
            return res.json({success: false, message: "Missing email and OTP"})

        }
        if(user.verifyOtp === '' || user.verifyOtp!==otp){
            return res.json({success: false, message: "invalid OTP"})

        }
        if(user.verifyOtpExipreAt < Date.now()){
            return res.json({success: false, message: "OTP expired"})

        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExipreAt = 0;
        await user.save()
        return res.json({success: true, message: "Email verified successfully"})

    } catch (error) {
        return res.status(500).json({ message: error.message });
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
export default { register, vendorRegister, signin, logout ,sendVerifyOtp , verifyEmail, isAuthenticated, sendResetOtp, resetPassword };
