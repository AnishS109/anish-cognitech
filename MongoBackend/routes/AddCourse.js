import express from 'express';
import cors from 'cors';
import AllCourseSchema from '../modals/allCoursesSchema.js';

const AddCourse = express();

// Middlewares
AddCourse.use(express.json()); // to parse JSON bodies
AddCourse.use(cors()); // to allow cross-origin requests

AddCourse.post('/courses-add', async (req, res) => {
  const courseData = req.body;

  try {
    // Create a new course entry using the course schema
    const newCourse = new AllCourseSchema(courseData);

    // Save to database
    await newCourse.save();

    // Send success response
    res.status(201).json({ message: "Course created successfully", data: newCourse });
  } catch (error) {
    console.error("Error saving course data:", error);
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
});

export default AddCourse

