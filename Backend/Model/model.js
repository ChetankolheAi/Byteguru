import mongoose from 'mongoose';
const LoginInfo = new mongoose.Schema({

    firstname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String,required:true}
})
const ChatbotHistory = new mongoose.Schema({
    userid:{type:String,required:true},
    history:{type:Array,required:true}
})
const Login_details = mongoose.model('Login_details', LoginInfo);
const Chatbothistory_Details = mongoose.model('Chatbot_history',ChatbotHistory);
export{Login_details , Chatbothistory_Details};