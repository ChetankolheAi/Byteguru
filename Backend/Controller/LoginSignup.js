import {Login_details} from '../Model/model.js'; 
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
const verify = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return res.status(200).json({ success: true, user: decoded });
  } catch (err) {
    return res.status(403).json({ error: "Authentication Failed" });
  }
};

export {signup , Login ,verify }