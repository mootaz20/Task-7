const User = require('../Models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please enter both email and password"})
        }
         if (
           typeof email !== "string" ||
           typeof password !== "string"
         ) {
           return res.status(400).json({ message: "Invalid input type" });
         }
         const textEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if (!textEmail.test(email)) {
           return res.status(400).json({ message: "Invalid email" });
         }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const verifyPassword = await user.comparePassword(password);
        if(!verifyPassword){
            return res.status(401).json({message:"Invalid password"});
        }
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {
                expiresIn : '1h'
            }
        );
        const userwithoutId = await User.findById(user._id).select('-password')
        return res.status(200).json({
            status : 'login Success',
            token,
            user : userwithoutId
        })

    }catch(err){
       return res.status(500).json({ message: err.message }); 
    }
}