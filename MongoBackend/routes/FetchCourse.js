import express from "express"
import Course from "../modals/allCoursesSchema.js" 
import cors from "cors"

const router = express.Router();

router.use(cors())

// Fetch all course details by course ID
router.get('/course/:course_id', async (req, res) => {
  const { course_id } = req.params;
  
  try {
    const course = await Course.findById(course_id).exec();
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch the quiz questions for a specific lecture in a course
// router.get('/lecture/:lecture_id/questions', async (req, res) => {
//   const { lecture_id } = req.params;
  
//   try {
//     const course = await Course.findOne({ 'lectures._id': lecture_id }, { 'lectures.$': 1 }).exec();
//     if (!course) {
//       return res.status(404).json({ error: 'Lecture not found' });
//     }
    
//     const lecture = course.lectures[0];
//     res.json(lecture.questions);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Submit the quiz answers (you can add scoring or validation logic here)
// router.post('/quiz/submit', async (req, res) => {
//   const { answers, lecture_id } = req.body;
  
//   try {
//     // This is where you'd add logic to validate answers, score, etc.
//     // For now, we simply log the answers and return a success message.
//     console.log(`Answers for lecture ${lecture_id}:`, answers);
    
//     res.json({ message: 'Quiz submitted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }


// });

export default router