import mongoose from 'mongoose';
const LoginInfo = new mongoose.Schema({

    firstname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true}
})

const Login_details = mongoose.model('Login_details', LoginInfo);

export{Login_details};