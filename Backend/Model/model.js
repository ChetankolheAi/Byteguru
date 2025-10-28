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

const TestScoreSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  scores: { type: [Number], required: true }, // Example: [3, 4, 5, 2, 4]
});

const Login_details = mongoose.model('Login_details', LoginInfo);
const Chatbothistory_Details = mongoose.model('Chatbot_history', ChatbotHistory);
const TestScore_Details = mongoose.model('Test_Score', TestScoreSchema);

export { Login_details, Chatbothistory_Details, TestScore_Details };