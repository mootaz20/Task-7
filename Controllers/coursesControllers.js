const mongoose = require("mongoose");
const Course = require("../Models/course");

exports.AddCourse = async (req, res) => {
  try {
    const { title, description, Course_Duration } = req.body;
    if (!title || !description || !Course_Duration) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof Course_Duration !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input type" });
    }
    const newCourse = new Course({
      title: title,
      description: description,
      Course_Duration: Course_Duration,
      user_id: req.user._id,
    });
    await newCourse.save();
    return res.status(201).json({
      status: "success",
      data: newCourse,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.GetAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("user_id", "-password")
      .populate("videos");
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    return res.status(200).json({
      status: "success",
      data: courses,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.GetCourse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const course = await Course.findById(id).populate("user_id", "-password");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, Course_Duration } = req.body;
    if (!title || !description || !Course_Duration) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof Course_Duration !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input type" });
    }
    const checkCourse = await Course.findById(id);
    if (!checkCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    const course = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        Course_Duration,
        user_id: req.user._id,
        videos : checkCourse.videos,
      },
      { new: true }
    );
    return res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Course.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
