import  mongoose from'mongoose'

const signinSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
})

const signinModel = mongoose.model('signin', signinSchema)
export default signinModel