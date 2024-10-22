const { default: mongoose } = require("mongoose");
const Video = require("../Models/video");
const Course = require("../Models/course");

exports.AddVideo = async (req, res) => {
  try {
    const { title, description, course_id } = req.body;
    if (!title || !description) {
      return res.status(400).json({ messgae: "please fill all the fields" });
    }
    if (typeof title !== "string" || typeof description !== "string") {
      return res.status(400).json({ message: "Invalid input type" });
    }
    const video = new Video({
      title,
      description,
      course_id,
    });
    await video.save();
    const course = await Course.findById(course_id);
    course.videos.push(video);
    await course.save();
    return res.status(201).json({
      status: "success",
      data: video,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.GetAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("course_id");
    if (!videos) {
      return res.status(404).json({ message: "No videos found" });
    }
    return res.status(200).json({
      status: "success",
      data: videos,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.GetVideo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const video = await Video.findById(id).populate("course_id");
    if (!video) {
      return res.status(404).json({ message: "video not found" });
    }
    return res.status(200).json({
      status: "success",
      data: video,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateVideo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const checkVideo = await Video.findById(id);
    if (!checkVideo) {
      return res.status(404).json({ message: "Video Not Found" });
    }
    const { title, description, course_id } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (typeof title !== "string" || typeof description !== "string") {
      return res.status(400).json({ message: "Invalid input type" });
    }
    const video = await Video.findByIdAndUpdate(
      id,
      {
        title,
        description,
        course_id,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: video,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.deleteVideo = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const checkVideo = await Video.findById(id);
    if(!checkVideo){
      return res.status(404).json({ message: "Video Not Found" });
    }
    await Video.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
