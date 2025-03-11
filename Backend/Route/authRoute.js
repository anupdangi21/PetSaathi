import express from 'express';
import authController from '../Controllers/authController.js';
import petController from '../Controllers/addPet.js';
import userAuth from '../Middleware/userAuth.js';
import found from "../Controllers/foundPet.js"
import upload from "../multerConfig.js";
import lost from "../Controllers/lostPet.js"
import petOwn from "../Controllers/petOwner.js"
import petAdoption from '../Controllers/petAdoption.js';
import addServic from "../Controllers/addService.js"
import Hostel from "../Controllers/addHostel.js"
import Training from "../Controllers/addTraining.js"
import Groom from "../Controllers/addGrooming.js"
import petGrooming from "../Controllers/petGrooming.js"


const { register,registerGetData,VendorregisterGetData, vendorRegister, signin, sendVerifyOtp, verifyEmail,logout, isAuthenticated,sendResetOtp, resetPassword } = authController;
const {petList, getPetlist, updatePet, deletePet,changeStatus}= petController;
const {petFoundData,getPetFound,updateStatus,deleteFoundPet }= found;
const {petLostData, getLostPetData}= lost;
const {petOwner, getpetOwner}=petOwn;
const {addService}=addServic;
const {petAdopt, getpetAdopt,updateAdoptionStatus,cancelAdoption}=petAdoption;
const  {petHostel,getHostel, updateHostel,deleteHostel }= Hostel;
const {petTraining, getPetTraining, updatePetTraining, deletePetTraining}=Training
const {petGroom,getpetGroom, updatepetGroom,deletepetGroom}=Groom;
const {AddpetGroom, AddgetpetGroom,updateGroomStatus,cancelGrooming}=petGrooming;

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
authRouter.put("/petlisting/:id/status",changeStatus)
authRouter.delete("/petlisting/:_id", deletePet);

//router for posting the found pet
authRouter.post("/petfound",upload.single("Image"), petFoundData)
authRouter.get("/petfound", getPetFound)
authRouter.put("/petfound/:id",updateStatus)
authRouter.delete("/petfound/:id",deleteFoundPet)

//router for posting the lost pet and getting the lost pet
authRouter.post("/lostpet", petLostData)
authRouter.get("/lostpet", getLostPetData)

//router for posting the data of the pet adoption and getting the data
authRouter.post("/adoption", petAdopt)
authRouter.get("/adoption", getpetAdopt)
authRouter.put("/adoption/:id",updateAdoptionStatus)
authRouter.delete ("/adoption/:id",cancelAdoption)

// router for posting the pet hostel and update delete
authRouter.post("/pethostel",upload.single("Image"), petHostel)
authRouter.get("/pethostel", getHostel)
authRouter.put("/pethostel/:id", upload.single("Image"), updateHostel)
authRouter.delete("/pethostel/:_id", deleteHostel)

//router for posting the pet training service and geting, updating, deleting the service also
authRouter.post("/training",upload.single("Image"),petTraining)
authRouter.get("/training", getPetTraining)
authRouter.put("/training/:id",upload.single("Image"), updatePetTraining)
authRouter.delete("/training/:_id", deletePetTraining)

//router for posting the pet grooming service and getting the data, updating and deleting the data also
authRouter.post("/petgrooming",upload.single("Image"), petGroom)
authRouter.get("/petgrooming", getpetGroom)
authRouter.put("/petgrooming/:id",upload.single("Image"), updatepetGroom)
authRouter.delete("/petgrooming/:_id", deletepetGroom)

//router for posting the booked date for grooming service and canceling the booking
authRouter.post("/bookgroom",upload.single("Image"), AddpetGroom)
authRouter.get("/bookgroom",AddgetpetGroom)
authRouter.put("/bookgroom/:id",upload.single("Image"), updateGroomStatus)
authRouter.delete("/bookgroom/:id",cancelGrooming)

//router for posting the new services 
authRouter.post("/addservice", addService)

//router for posting the details of lost petowner and getting its data
authRouter.post("/petreunite", petOwner)
authRouter.get("/petreunite", getpetOwner)
export default authRouter;
