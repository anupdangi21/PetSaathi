const express = require('express');
const mongoose = require('./Connection');
const cors = require('cors');
const app = express();
const SigninModel = require('../Backend/Models/signin');
const registerModel=require("../Backend/Models/register")

app.use(express.json());
app.use(cors());


app.post('/register', async (req, res) => { 
    console.log("regis")
    registerModel.create(req.body)
    .then(register => res.json(register))
    .catch(err => res.status(400).json({ message: err.message }))
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body; 

    try {
        if (username && password) {
            
            const user = await registerModel.findOne({ username, password }).exec();
            if (user) {
                return res.status(200).json({ message: 'Login success' }); // Success message
            } else {
                return res.status(401).json({ message: 'Username or password did not match' }); 
            }
        } else {
            return res.status(400).json({ message: 'Missing username or password' }); 
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' }); // Internal server error
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));