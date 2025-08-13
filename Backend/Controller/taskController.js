import {Login_details ,Chatbothistory_Details} from '../Model/model.js'; 
import bcrypt from "bcryptjs";

import jwt from 'jsonwebtoken';



const saltRounds = 10;
const signup = async (req,res)=>{
    
        const existingUser =  await Login_details.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false,message: "User already exists. Please login." });
        }
        
    
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new Login_details({
            firstname: req.body.firstname,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully" });
    }
    
    const Login = async (req, res) => {
        try {
            const user = await Login_details.findOne({ email: req.body.email });
            
            console.log("Login API hit");
            console.log("Request body:", req.body);

            if (!user) {
                console.log("userWrong")
                return res.status(403).json({ message: "Invalid email ", success: false });
            }
            
            
            const isPassEqual = await bcrypt.compare(req.body.password, user.password);
            if (!isPassEqual) {
                console.log("passwrong")
                return res.status(403).json({ message: "Invalid password", success: false });
        }    
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id ,firstname:user.firstname},
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        
        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken:jwtToken,
        });
    } catch (err) {
        
        console.error("Error during login:", err); 
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

    const SaveHistory = async(req,res)=>{
        try{
            const userHistory = await Chatbothistory_Details.findOne({ userid: req.body.userid });
            const date = req.body.date;
            if(userHistory){

                const isDatePresent  = userHistory.history.find(h => h.date === date);
                
                if(isDatePresent && isDatePresent.date==date){
                    isDatePresent.Datehistory.push(...req.body.history);
                    userHistory.markModified('history'); // Tell Mongoose nested field changed
                    await userHistory.save();
                }
                else{
                    userHistory.history.push({
                        date: date,
                        Datehistory: req.body.history
                    });
                }
    
                await userHistory.save();
                return res.status(200).json({ success: true, message: "History Updated" });


            }
            else{
                const userId= req.body.userid;
                const history = req.body.history;
                const newHistory ={
                    date:date,
                    Datehistory:history
                }
                const HistorySaver = new Chatbothistory_Details({
                    userid:userId,
                    history:newHistory,
                });
                await HistorySaver.save();
                return res.status(201).json({ success: true, message: "History Saved" });
            }
            
        }
        catch(err){
            console.log(err);

        }
    }

 const GetHistory = async (req, res) => {
  try {
    const { userid } = req.body; // since POST
    const userHistory = await Chatbothistory_Details.findOne({ userid });

    if (!userHistory) {
      return res.json({ history: [] });
    }

    // Send history array directly
    res.json({ history: userHistory.history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const verify = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Hitted")
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    console.log("ok")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return res.status(200).json({ success: true, user: decoded });
  } catch (err) {
    return res.status(403).json({ error: "Authentication Failed" });
  }
};




export {signup , Login , SaveHistory,GetHistory ,verify}