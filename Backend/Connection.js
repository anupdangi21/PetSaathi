const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://anupdangi28:anupdangi123@petsaathi.erpzk.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = mongoose;
