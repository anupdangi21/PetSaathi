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

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000, 
        });

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'welcome to petsaathi',
            text: `Dear customer, your account has been created successfully. Please login to your account using username: ${username}`
        }
        await transporter.sendMail(mailOptions);

        
        res.status(201).json({ success: true, message: "User registered successfully", token });
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
        const token = jwt.sign({ id: newVendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        
        // sending the email using nodemailer
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: "anupdangi92@gmail.com",
            subject: 'welcome to petsaathi',
            text: `Dear vendor, your account has been created successfully. Please login to your account using username: ${username}`
        }
        await transporter.sendMail(mailOptions);
        // Send success response
        res.status(200).json({ success: true, message: "Vendor registered successfully", token });
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
            return res.json({ role: 'user', token });
        } else if (isVendorMatch) {
            token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ role: 'vendor', token });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



//  const logout = async (req, res)=>{
//     try {
//         res.clearCookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//             'none':'strict',
//         });

//         return res.json({success: true, message: "logged Out"})
        
//     } catch (error) {
        
//     }
// }
// sending the verification otp
const sendVerifyOtp = async (req, res)=> {
    try {
        const { email } = req.body;
        const user = await vendorregisterModel.findById(email);
        if(user.isAccountVerified){
            return res.json({success: false, message: "Account is already verified"})
        }
       const otp = String(Math.floor(100000 + Math.random()*900000))
       user.verifyOtp=otp;
       user.verifyOtpExipreAt = Date.now() + 60 * 60 * 1000;
       await user.save()

       const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Account verification OTP',
        text: `Dear vendor, your OTP is ${otp}, please verify your account within 1 hour`,
    }
    await transporter.sendMail(mailOptions);
    return res.json({success: true, message: "OTP sent to your email"})
    } catch (error) {
        
    }
}
export default { register, vendorRegister, signin, sendVerifyOtp };
