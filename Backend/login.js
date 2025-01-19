const express = require('express');
const mongoose = require('./Connection');
const cors = require('cors');
const app = express();
const SigninModel = require('./Models/signin');
const registerModel=require("./Models/register");
const vendorregisterModel= require("./Models/vendorregistration")

app.use(express.json());
app.use(cors());

//user registration
app.post('/register', async (req, res) => { 
    registerModel.create(req.body)
    SigninModel.create(req.body)
    .then(register => res.json(register))
    .catch(err => res.status(400).json({ message: err.message }))
});


//vendor registration
app.post('/registration', async (req, res) => {
    try {
        // Check if username already exists
        const existingVendor = await vendorregisterModel.findOne({ username: req.body.username });
        if (existingVendor) {
            return res.status(400).json({ message: "Name already taken" });
        }

        // Create new vendor
        const vendorregister = await vendorregisterModel.create(req.body);
        res.json(vendorregister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
    


app.post('/signin', async (req, res) => {
    const { username, password } = req.body; 
    try{
        if(username && password){

            const user= await registerModel.findOne({username, password}).exec();
            const vendor= await vendorregisterModel.findOne({username, password}).exec();
            if(user){
                return res.status(200).json({ role: 'user', message: 'Login successful' });
            }else if(vendor){
                return res.status(200).json({ role: 'vendor', message: 'Login successful' });
            }
        }else{
            res.json("not existed")
        }
    }catch{

    }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));