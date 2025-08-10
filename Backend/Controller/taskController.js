import {Login_details} from '../Model/model.js'; 
import bcrypt from "bcryptjs";

import jwt from 'jsonwebtoken';



const saltRounds = 10;
const signup = async (req,res)=>{
    
        const existingUser =  await Login_details.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false,message: "User already exists. Please login." });
        }
        
        console.log(req.body);
       

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new Login_details({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ success: true, message: "User registered successfully" });
}

const Login = async (req, res) => {
    try {
        const user = await Login_details.findOne({ email: req.body.email });
      
        
        if (!user) {
            console.log("userWrong")
            return res.status(403).json({ message: "Invalid email ", success: false });
        }

        console.log(typeof(user.password));
        console.log(typeof(req.body.password));
        const isPassEqual = await bcrypt.compare(req.body.password, user.password);
        if (!isPassEqual) {
            console.log("passwrong")
            return res.status(403).json({ message: "Invalid password", success: false });
        }

 
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

      
        res.status(200).json({
            message: "Login Success",
            success: true,
            jwtToken:jwtToken,
            email: user.email,
            _id:user._id,
            username: user.username
        });
    } catch (err) {
        console.error("Error during login:", err); 
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export {signup , Login }