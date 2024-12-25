import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import AdminLayout from './LAYOUT/AdminLayout';
import { useNavigate } from 'react-router-dom';

function AddCourse() {
  const [courseData, setCourseData] = useState({
    course_name: '',
    description: '',
    QuizMain: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        time: ''
      }
    ],
    lectures: [
      {
        lectureName: '',
        videoUrl: '',
        questions: [
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
            time: ''
          }
        ],
        popMessage: '',
        messageTime: '',
        lectureNumber: 1, // Default lecture number (total number of lectures)
        QuizNumber: 1 // Default to quiz number (total number of quizzes)
      }
    ]
  });

  const navigate = useNavigate()

  // Handle changes in the course details
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  // Handle changes in QuizMain questions
  const handleQuizMainChange = (index, e) => {
    const { name, value } = e.target;
    setCourseData(prev => {
      const updatedQuizMain = [...prev.QuizMain];
      updatedQuizMain[index][name] = value;
      return { ...prev, QuizMain: updatedQuizMain };
    });
  };

  // Add a new question to QuizMain
  const addQuizMainQuestion = () => {
    const newQuiz = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      time: ''
    };
    setCourseData(prev => ({
      ...prev,
      QuizMain: [...prev.QuizMain, newQuiz]
    }));
  };

  // Handle changes in lecture details
  const handleLectureChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...courseData.lectures];
    updatedLectures[index][name] = value;
    setCourseData(prev => ({ ...prev, lectures: updatedLectures }));
  };

  // Handle changes in questions for each lecture
  const handleQuestionChange = (lectureIndex, questionIndex, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...courseData.lectures];
    updatedLectures[lectureIndex].questions[questionIndex][name] = value;
    setCourseData(prev => ({ ...prev, lectures: updatedLectures }));
  };

  // Add a new question to a lecture
  const addLectureQuestion = (lectureIndex) => {
    const newQuestion = {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      time: ''
    };
    const updatedLectures = [...courseData.lectures];
    updatedLectures[lectureIndex].questions.push(newQuestion);
    setCourseData(prev => ({ ...prev, lectures: updatedLectures }));
  };

  // Add a new lecture
  const addLecture = () => {
    const newLecture = {
      lectureName: '',
      videoUrl: '',
      questions: [
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: '',
          time: ''
        }
      ],
      popMessage: '',
      messageTime: '',
      lectureNumber: courseData.lectures.length + courseData.QuizMain.length, // Total number of lectures and quizzes
      QuizNumber: courseData.QuizMain.length // Total number of quizzes
    };
    setCourseData(prev => ({ ...prev, lectures: [...prev.lectures, newLecture] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(courseData);
    
    try {
      const response = await fetch("https://anish-cognitech.onrender.com/api/add-course/courses-add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData), // Correctly stringifying the body
      });
  
      if (response.ok) {
        const result = await response.json();
        // console.log("Course created successfully:", result);
        setTimeout(() => {
          navigate("/admin-course-manage")
        },1500)
      } else {
        const error = await response.json();
        console.error("Error creating course:", error.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <AdminLayout>
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Course
      </Typography>

      {/* Course Information */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Course Name"
            variant="outlined"
            fullWidth
            value={courseData.course_name}
            name="course_name"
            onChange={handleCourseChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Course Description"
            variant="outlined"
            fullWidth
            value={courseData.description}
            name="description"
            onChange={handleCourseChange}
            multiline
            rows={4}
          />
        </Grid>
      </Grid>

      {/* QuizMain Section */}
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Course Quiz (QuizMain)
      </Typography>
      {courseData.QuizMain.map((quiz, index) => (
        <Box key={index} sx={{ marginBottom: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Question"
                variant="outlined"
                fullWidth
                value={quiz.question}
                name="question"
                onChange={(e) => handleQuizMainChange(index, e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Options (comma-separated)"
                variant="outlined"
                fullWidth
                value={quiz.options.join(', ')}
                name="options"
                onChange={(e) => {
                  const options = e.target.value.split(',').map(opt => opt.trim());
                  const updatedQuizMain = [...courseData.QuizMain];
                  updatedQuizMain[index].options = options;
                  setCourseData(prev => ({ ...prev, QuizMain: updatedQuizMain }));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correct Answer"
                variant="outlined"
                fullWidth
                value={quiz.correctAnswer}
                name="correctAnswer"
                onChange={(e) => handleQuizMainChange(index, e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Time (in seconds)"
                variant="outlined"
                fullWidth
                value={quiz.time}
                name="time"
                onChange={(e) => handleQuizMainChange(index, e)}
                type="number"
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="outlined" onClick={addQuizMainQuestion} sx={{ mt: 2 }}>
        Add Question to Course Quiz
      </Button>

      {/* Lectures Section */}
      <Typography variant="h6" sx={{ marginTop: 4 }}>
        Lectures
      </Typography>
      {courseData.lectures.map((lecture, lectureIndex) => (
        <Box key={lectureIndex} sx={{ marginBottom: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lecture Name"
                variant="outlined"
                fullWidth
                value={lecture.lectureName}
                name="lectureName"
                onChange={(e) => handleLectureChange(lectureIndex, e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Video URL"
                variant="outlined"
                fullWidth
                value={lecture.videoUrl}
                name="videoUrl"
                onChange={(e) => handleLectureChange(lectureIndex, e)}
              />
            </Grid>
            {/* New fields for lectureNumber and QuizNumber */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Lecture Number"
                variant="outlined"
                fullWidth
                value={lecture.lectureNumber}
                name="lectureNumber"
                onChange={(e) => handleLectureChange(lectureIndex, e)}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quiz Number"
                variant="outlined"
                fullWidth
                value={lecture.QuizNumber}
                name="QuizNumber"
                onChange={(e) => handleLectureChange(lectureIndex, e)}
                disabled
              />
            </Grid>
          </Grid>

          {/* Questions Section for this Lecture */}
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Questions for this Lecture:
          </Typography>
          {lecture.questions.map((question, questionIndex) => (
            <Box key={questionIndex} sx={{ marginTop: 2, border: '1px solid #ccc', padding: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={question.question}
                    name="question"
                    onChange={(e) => handleQuestionChange(lectureIndex, questionIndex, e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Options (comma-separated)"
                    variant="outlined"
                    fullWidth
                    value={question.options.join(', ')}
                    name="options"
                    onChange={(e) => {
                      const options = e.target.value.split(',').map(opt => opt.trim());
                      const updatedLectures = [...courseData.lectures];
                      updatedLectures[lectureIndex].questions[questionIndex].options = options;
                      setCourseData(prev => ({ ...prev, lectures: updatedLectures }));
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Correct Answer"
                    variant="outlined"
                    fullWidth
                    value={question.correctAnswer}
                    name="correctAnswer"
                    onChange={(e) => handleQuestionChange(lectureIndex, questionIndex, e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Time (in seconds)"
                    variant="outlined"
                    fullWidth
                    value={question.time}
                    name="time"
                    onChange={(e) => handleQuestionChange(lectureIndex, questionIndex, e)}
                    type="number"
                  />
                </Grid>
              </Grid>
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={() => addLectureQuestion(lectureIndex)}
            sx={{ mt: 2 }}
          >
            Add Question to this Lecture
          </Button>
        </Box>
      ))}
      <Button variant="outlined" onClick={addLecture} sx={{ mt: 2 }}>
        Add Lecture
      </Button>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 , ml:"15px"}}
        onClick={handleSubmit}
      >
        Submit Course
      </Button>
    </Box>
    </AdminLayout>
  );
}

export default AddCourse;
