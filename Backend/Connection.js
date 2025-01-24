import  mongoose from 'mongoose';

mongoose.connect('mongodb+srv://anupdangi28:anupdangi123@petsaathi.erpzk.mongodb.net/Login')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


export default mongoose;
