import mongoose from "mongoose";

// Define Question Schema
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  time: {
    type: Number, // Time in seconds for when the question should appear
    required: true,
  },
});

// Define Lecture Schema
const lectureSchema = new mongoose.Schema({
  lectureName: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  questions: [questionSchema], // Array of questions for the lecture
  popMessage: {
    type: String,
  },
  messageTime: {
    type: Number, // Time in seconds for the pop-up message to appear
  },
});

const QuizMainQuestion = new mongoose.Schema({
   question:{
    type:String,
    required:true
   },
   options:{
    type:[String],
    required:true
   },
   correctAnswer: {
    type: String,
    required: true,
  },
  time:{
    type:String
  }
})

// Define All Courses Schema
const allCoursesSchema = mongoose.Schema(
  {
    course_name: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
    lectures: [lectureSchema], // Array of lectures, each containing questions

    QuizMain:[QuizMainQuestion],

    lectureNumber:{
      type:String
    },
    
    QuizNumber:{
      type:String
    }
  },
  { timestamps: true }
);

const AllCourseSchema = mongoose.model("allcourses", allCoursesSchema);

export default AllCourseSchema;
