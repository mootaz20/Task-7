const { default: mongoose } = require("mongoose");
const Course = require("../Models/course");


const checkUser = async (req,res,next) => {
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message : 'Invalid ID'});
        }
        const course = await Course.findById(id);
        if(!course){
            return res.status(404).json({message : 'Course Not Found'});
        }
        if(course.user_id.toString() !== req.user._id.toString()){
            return res.status(401).json({message : 'You are not authorized to access this course'})
        }
        next();
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = checkUser;