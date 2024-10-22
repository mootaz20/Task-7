const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
   title : {
        type : String,
        required : [true, 'Title is required']
   },
   description : {
        type : String,
        required : [true, 'Description is required']
    },
    course_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    } 
},{timestamps : true});


const Video = new mongoose.model('Video',videoSchema);

module.exports = Video;