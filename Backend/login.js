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
        const vendorregister = await vendorregisterModel.create(req.body);
        console.log('anup');
        res.json(vendorregister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
    


app.post('/signin', async (req, res) => {
    const { username, password } = req.body; 
    registerModel.findOne({username: username})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json("login success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("not existed")
        }
    })
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));