const { default: mongoose } = require("mongoose");
const Comment = require("../Models/comment");

const checkComments = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(commentId)){
        return res.status(400).json({ message: "Invalid ID" });
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to modify this comment" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = checkComments;
