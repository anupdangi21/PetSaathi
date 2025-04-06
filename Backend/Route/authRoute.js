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
import petTrain from "../Controllers/petTraining.js"
import petHosteling from "../Controllers/petHostel.js"
import groomRating from "../Controllers/groomingRating.js"
import trainRating from "../Controllers/trainingRating.js"
import hostelRating from "../Controllers/hostelRating.js"
import Itemmarket from "../Controllers/addItems.js"

const {admin,getadmin, register,registerGetData,updateRegisterData,VendorregisterGetData,updateVendorData, vendorRegister, signin,logout, isAuthenticated,sendResetOtp, resetPassword } = authController;
const {petList, getPetlist, updatePet, deletePet,changeStatus,getPetliststatus}= petController;
const {petFoundData,getPetFound,updateStatus,deleteFoundPet }= found;
const {petLostData, getLostPetData}= lost;
const {petOwner, getpetOwner}=petOwn;
const {addService}=addServic;
const {petAdopt, getpetAdopt,updateAdoptionStatus,cancelAdoption}=petAdoption;
const  {petHostel,getHostel, updateHostel,deleteHostel }= Hostel;
const {petTraining, getPetTraining, updatePetTraining, deletePetTraining}=Training
const {petGroom,getpetGroom, updatepetGroom,deletepetGroom}=Groom;
const {AddpetGroom, AddgetpetGroom,AddgetpetGroomUser,updateGroomStatus,cancelGrooming,updateGroomingRateStatus}=petGrooming;
const {AddpetTrain, AddgetpetTrain,AddgetpetTrainUser,updateTrainStatus,updateTrainingRateStatus,cancelTraining} = petTrain
const {bookHostel, getHostelBook,getHostelBookUser,updateHostelStatus,updateRateStatus,cancelHostelBook}= petHosteling;
const {groomRate, getgroomRating,updateGroomingRating}=groomRating
const {trainingRate, getrainingRate,updateTrainingRating}=trainRating
const {hostelRate, gethostelRate,updateHostelRating}=hostelRating
// const {verifyPayment}=GroomingVerifyPayment
const {itemAdd,getItem, updateMarketitem, deleteMarketItem,getitemliststatus, changeitemStatus}=Itemmarket



//routes for posting the data and getting the data
const authRouter = express.Router();
authRouter.post("/admin", admin);
authRouter.get("/admin", getadmin);
authRouter.post("/register", register);
authRouter.get("/register", registerGetData);
authRouter.put("/register/:id", updateRegisterData);
authRouter.post("/registration", vendorRegister);
authRouter.get("/registration", VendorregisterGetData)
authRouter.put("/registration/:id", updateVendorData)
authRouter.post("/signin", signin);
authRouter.post("/logout", logout);
authRouter.get("/is-auth",userAuth, isAuthenticated);
authRouter.post("/sendresetotp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

// authRouter.post("/logout", logout);
authRouter.post("/petlisting",upload.single("Image"), petList)
authRouter.get("/petlisting", getPetlist)
authRouter.get("/petlisting/status", getPetliststatus)
authRouter.put("/petlisting/:id", upload.single("Image"), updatePet);
authRouter.put("/petlisting/status/:id", changeStatus)
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
authRouter.put("/adoption/:id",upload.single("Image"),updateAdoptionStatus)
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
authRouter.get("/bookgroom/user",AddgetpetGroomUser)
authRouter.put("/bookgroom/:id",upload.single("Image"), updateGroomStatus)
authRouter.put("/bookgroom/user/:id",upload.single("Image"), updateGroomingRateStatus)
authRouter.delete("/bookgroom/:id",cancelGrooming)

//router for posting the booked date for training and cancelling the booking
authRouter.post("/booktrain",upload.single("Image"), AddpetTrain)
authRouter.get("/booktrain",AddgetpetTrain)
authRouter.get("/booktrain/user", AddgetpetTrainUser)
authRouter.put("/booktrain/user/:id", upload.single("Image"),updateTrainingRateStatus)
authRouter.put("/booktrain/:id", upload.single("Image"),updateTrainStatus)
authRouter.delete("/booktrain/:id", cancelTraining)


//router for posting the booked date for hostel and cancelling the booking
authRouter.post("/bookhostel",upload.single("Image"), bookHostel)
authRouter.get("/bookhostel", getHostelBook)
authRouter.get("/bookhostel/user", getHostelBookUser)
authRouter.put("/bookhostel/user/:id",upload.single("Image"), updateRateStatus)
authRouter.put("/bookhostel/:id",upload.single("Image"), updateHostelStatus)
authRouter.delete("/bookhostel/:id", cancelHostelBook) 

//router for saving the services review
authRouter.post("/groomingreview",upload.single("Image"),groomRate)
authRouter.post("/trainingreview",upload.single("Image"),trainingRate)
authRouter.post("/hostelreview",upload.single("Image"),hostelRate)
//router for getting the services review
authRouter.get("/groomingreview",getgroomRating)
authRouter.get("/trainingreview",getrainingRate)
authRouter.get("/hostelreview",gethostelRate)

//router for updating the status of rating
authRouter.put("/trainingreview/:id",upload.single("Image"), updateTrainingRating)
authRouter.put("/hostelreview/:id",upload.single("Image"), updateHostelRating)
authRouter.put("/groomingreview/:id",upload.single("Image"), updateGroomingRating)
//router for posting the new services 
authRouter.post("/addservice", addService)

//router for posting the details of lost petowner and getting its data
authRouter.post("/petreunite", petOwner)
authRouter.get("/petreunite", getpetOwner)

//router for posting the marketplace items 
authRouter.post("/marketplacelisting", upload.array("Image", 5), itemAdd);
authRouter.get("/marketplacelisting", getItem)
authRouter.put("marketplacelisting", upload.single("Image"), updateMarketitem)
authRouter.delete("/marketplacelisting/:_id", deleteMarketItem)
//router for verifying payment

export default authRouter;
