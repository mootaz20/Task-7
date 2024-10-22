const { default: mongoose } = require("mongoose");
const Comment = require("../Models/comment");
const Video = require("../Models/video");

exports.AddComment = async (req, res) => {
  try {
    const { text, video_id } = req.body;
    if (!text || !video_id) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
     if (typeof text !== "string") {
       return res.status(400).json({ message: "Invalid input type" });
     }
     if (!mongoose.Types.ObjectId.isValid(video_id)) {
       return res.status(400).json({ message: "Invalid input type" });
     }
     const isVideoExist = await Video.findById(video_id);
     if (!isVideoExist) {
      return res.status(404).json({ message: "Video not found" });
      }
    const comment = new Comment({
      text,
      video_id,
      user_id : req.user._id
    });
    await comment.save();
    return res.status(201).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.GetAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("video_id").populate("user_id","-password");
    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    }
    return res.status(200).json({
      status: "success",
      data: comments,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.GetComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const comment = await Comment.findById(id).populate("video_id");
    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }
    return res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const { text, video_id } = req.body;
    if (!text || !video_id) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
     if (
       typeof text !== "string" ||
       !mongoose.Types.ObjectId.isValid(video_id)
     ) {
       return res.status(400).json({ message: "Invalid input type" });
     }
     const checkComment = await Comment.findById(id);
     if (!checkComment) {
       return res.status(404).json({ message: "Comment not found" });
     }
     const isVideoExist = await Video.findById(video_id);
     if(!isVideoExist){
      return res.status(404).json({ message: "Video not found" });  
     }
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        text,
        video_id,
        user_id : req.user._id
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: comment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid ID" });
    }
    const checkComment = await Comment.findById(id);
    if(!checkComment){
      return res.status(404).json({ message: "Comment not found" });
    }
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
