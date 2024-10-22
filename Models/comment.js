const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "content is required"],
    },
    video_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
  },
  { timestamps: true }
);

const Comment = new mongoose.model("Comment", commentSchema);

module.exports = Comment;
