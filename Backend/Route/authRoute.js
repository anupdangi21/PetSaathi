import express from 'express';
import authController from '../Controllers/authController.js';

const { register, vendorRegister, signin } = authController;


const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/registration", vendorRegister);
authRouter.post("/signin", signin);
// authRouter.post("/logout", logout);

export default authRouter;
