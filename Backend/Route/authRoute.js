import express from 'express';
import authController from '../Controllers/authController.js';
import petList from '../Controllers/addPet.js';
import userAuth from '../Middleware/userAuth.js';

const { register, vendorRegister, signin, sendVerifyOtp, verifyEmail,logout, isAuthenticated,sendResetOtp, resetPassword } = authController;


const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/registration", vendorRegister);
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account",userAuth, verifyEmail);
authRouter.get("/is-auth",userAuth, isAuthenticated);
authRouter.post("/sendresetotp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);




// authRouter.post("/logout", logout);
authRouter.post("/petlisting", petList)

export default authRouter;
