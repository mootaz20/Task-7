const User = require('../Models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.register = async (req,res) => {
    try {
    const {name,email,age,password} = req.body;
    if(!name || !email || !age || !password){
        return res.status(400).json({message: "Please fill in all fields"})
    }
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof age !== "number" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input type" });
    }
    const textEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!textEmail.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const checkUser = await User.findOne({email});
    if(checkUser){
        return res.status(409).json({message: 'Email already registered'});
    }
    const user = await User.create({
        name,
        email,
        age,
        password
    });
    const token = jwt.sign(
        {id : user._id},
        process.env.JWT_SECRET,
        {
            expiresIn : '1h'
        }
    );
    const userWithoutPassword = await User.findById(user._id).select('-password');
    return res.status(201).json({
        token,
        user: userWithoutPassword
    });
   }catch(err){
    return res.status(500).json({message:err.message})
   }
}