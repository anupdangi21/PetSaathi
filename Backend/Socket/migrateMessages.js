// migrateMessages.js
import mongoose from 'mongoose';
import Message from './models/messageChat.js'; 

mongoose.connect('mongodb+srv://anupdangi28:anupdangi123@petsaathi.erpzk.mongodb.net/Login')
  .then(async () => {
    console.log(' Connected to MongoDB');

    try {
      const result = await Message.updateMany(
        { read: { $exists: false } },
        { $set: { read: false } }
      );

      console.log(` Updated ${result.modifiedCount} messages`);

      const remaining = await Message.countDocuments({ read: { $exists: false } });
      console.log(remaining === 0 
        ? ' Migration successful - all messages have "read" field'
        : ` ${remaining} messages still missing "read" field`);

    } catch (err) {
      console.error(' Migration failed:', err);
    } finally {
      await mongoose.disconnect();
      process.exit();
    }
  })
  .catch(err => {
    console.error(' Connection failed:', err);
    process.exit(1);
  });