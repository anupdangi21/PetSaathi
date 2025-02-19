import express from 'express';
import authController from '../Controllers/authController.js';
import petController from '../Controllers/addPet.js';
import userAuth from '../Middleware/userAuth.js';
import found from "../Controllers/foundPet.js"
import upload from "../multerConfig.js";
import lost from "../Controllers/lostPet.js"
import petOwn from "../Controllers/petOwner.js"

const { register,registerGetData,VendorregisterGetData, vendorRegister, signin, sendVerifyOtp, verifyEmail,logout, isAuthenticated,sendResetOtp, resetPassword } = authController;
const {petList, getPetlist, updatePet, deletePet}= petController;
const {petFoundData,getPetFound,updateStatus,deleteFoundPet }= found;
const {petLostData, getLostPetData}= lost;
const {petOwner, getpetOwner}=petOwn;


//routes for posting the data and getting the data
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
authRouter.post("/petlisting",upload.single("Image"), petList)
authRouter.get("/petlisting", getPetlist)
authRouter.put("/petlisting/:id", upload.single("Image"), updatePet);
authRouter.delete("/petlisting/:_id", deletePet);

//router for posting the found pet
authRouter.post("/petfound",upload.single("Image"), petFoundData)
authRouter.get("/petfound", getPetFound)
authRouter.put("/petfound/:id",updateStatus)
authRouter.delete("/petfound/:id",deleteFoundPet)

//router for posting the lost pet and getting the lost pet
authRouter.post("/lostpet", petLostData)
authRouter.get("/lostpet", getLostPetData)

//router for posting the details of lost petowner and getting its data
authRouter.post("/petreunite", petOwner)
authRouter.get("/petreunite", getpetOwner)
export default authRouter;
