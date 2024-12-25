import express from "express";
import cors from "cors";
import AllCourseSchema from "../modals/allCoursesSchema.js";

const TeachermanageCourse = express();

TeachermanageCourse.use(cors());
TeachermanageCourse.use(express.json());
TeachermanageCourse.use(express.urlencoded({ extended: true }));

// TeachermanageCourse.post("/add-lecture-video", async (req, res) => {
//   const { courseId, lectureName, lectureURL, questions } = req.body;

//   try {

//     const course = await AllCourseSchema.findById(courseId);

//     if (!course) {
//       return res.status(404).json({ error: "Course not found" });
//     }

//     const newLecture = {
//       lectureName,
//       videoUrl: lectureURL,
//       questions, 
//     };

//     course.lectures.push(newLecture);

//     await course.save();

//     res.status(201).json({ message: "Lecture added successfully!", lecture: newLecture });
//   } catch (error) {
//     console.error("Error while adding lecture:", error);
//     res.status(500).json({ error: "Failed to add lecture. Please try again." });
//   }
// });

TeachermanageCourse.post("/add-lecture-video", async (req, res) => {
  const { courseId, lectureName, lectureURL, questions, mainQuiz } = req.body;

  try {
    const course = await AllCourseSchema.findById(courseId);
    if (!course) return res.status(404).send("Course not found");

    if (lectureName && lectureURL) {
      course.lectures.push({ lectureName, videoUrl: lectureURL, questions });
    }

    if (mainQuiz?.length) {
      course.QuizMain.push(...mainQuiz);
    }

    await course.save();
    res.status(200).send("Content added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


export default TeachermanageCourse;
