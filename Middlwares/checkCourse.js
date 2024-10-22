const { default: mongoose } = require("mongoose");
const Course = require("../Models/course");


const checkCourse = async (req,res,next) => {
    try{
        const { course_id } = req.body;
        if(!course_id){
            return res
              .status(400)
              .json({ message: "please fill all the fields" });
        }
        if(!mongoose.Types.ObjectId.isValid(course_id)){
            return res.status(404).json({message : 'Invalid Course_id'});
        }
        const course = await Course.findById(course_id); 
        if(!course){
            return res.status(404).json({message : 'Course not found'})
        }
        if(req.user._id.toString() !== course.user_id.toString()){
            return res.status(403).json({message : 'You are not the owner of this course'})
        }
        next();
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

module.exports = checkCourse