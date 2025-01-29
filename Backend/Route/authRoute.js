import express from 'express';
import authController from '../Controllers/authController.js';
import petController from '../Controllers/addPet.js';
import userAuth from '../Middleware/userAuth.js';
import found from "../Controllers/foundPet.js"


const { register,registerGetData,VendorregisterGetData, vendorRegister, signin, sendVerifyOtp, verifyEmail,logout, isAuthenticated,sendResetOtp, resetPassword } = authController;
const {petList, getPetlist}= petController;
const {petFoundData,getPetFound }= found;

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.get("/register", registerGetData)
authRouter.post("/registration", vendorRegister);
authRouter.get("/registration", VendorregisterGetData)
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account",userAuth, verifyEmail);
authRouter.get("/is-auth",userAuth, isAuthenticated);
authRouter.post("/sendresetotp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

// authRouter.post("/logout", logout);
authRouter.post("/petlisting", petList)
authRouter.get("/petlisting", getPetlist)

//router for posting the found pet
authRouter.post("petfound", petFoundData)
authRouter.get("/petfound", getPetFound)

export default authRouter;
