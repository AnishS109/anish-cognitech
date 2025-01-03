import React, { useState, useEffect } from "react";
import TeacherLayout from "./LAYOUT/TeacherLayout";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { blue, green, grey } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../components/Loader"; // Assuming you have a Loader component

const TeacherCourses = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [addVideo, setAddVideo] = useState({
    lectureName: "",
    lectureURL: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    time: 0,
  });

  const [newMainQuiz, setNewMainQuiz] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    time: "",
  });

  const [mainQuiz, setMainQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const teacherIdFromLocation = location.state?.teacher_id;
  const storedTeacherId = localStorage.getItem("teacher_id");

  useEffect(() => {
    if (teacherIdFromLocation) {
      localStorage.setItem("teacher_id", teacherIdFromLocation);
    }
  }, [teacherIdFromLocation]);

  const teacherId = teacherIdFromLocation || storedTeacherId;

  const handleAddVideo = (e) => {
    const { name, value } = e.target;
    setAddVideo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]:
        name === "options"
          ? prev.options.map((opt, i) => (i === index ? value : opt))
          : value,
    }));
  };

  const handleMainQuizChange = (e, index) => {
    const { name, value } = e.target;
    setNewMainQuiz((prev) => ({
      ...prev,
      [name]:
        name === "options"
          ? prev.options.map((opt, i) => (i === index ? value : opt))
          : value,
    }));
  };

  const addQuestionToLecture = () => {
    setAddVideo((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      time: 0,
    });
  };

  const addQuestionToMainQuiz = () => {
    setMainQuiz((prev) => [...prev, newMainQuiz]);
    setNewMainQuiz({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      time: "",
    });
  };

  const handleSubmitCourseContent = async (e) => {
    e.preventDefault();

    try {
      const selectedCourse = assignedCourses[selectedCourseIndex];
      if (!selectedCourse) {
        console.error("No course selected");
        return;
      }

      const payload = {
        courseId: selectedCourse.courseId,
        lectureName: addVideo.lectureName,
        lectureURL: addVideo.lectureURL,
        questions: addVideo.questions,
        mainQuiz,
      };

      const response = await fetch(
        "https://anish-cognitech-backend.onrender.com/add-lecture-video",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Content added successfully");
        setAddVideo({ lectureName: "", lectureURL: "", questions: [] });
        setNewQuestion({ question: "", options: ["", "", "", ""], correctAnswer: "", time: 0 });
        setMainQuiz([]);
      } else {
        console.error("Failed to add content:", await response.text());
      }
    } catch (error) {
      console.error("Error while adding content:", error);
    }
  };

  useEffect(() => {
    const fetchAssignedCourses = async () => {
      try {
        const response = await fetch(
          `https://anish-cognitech-backend.onrender.com/course-student-fetch/${teacherId}`
        );
        const result = await response.json();

        if (Array.isArray(result)) {
          setAssignedCourses(result);
        } else {
          console.error("Expected an array of courses, but got:", result);
        }
      } catch (error) {
        console.error("Error fetching assigned courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedCourses();
  }, [teacherId]);

  const handleCourseChange = (event, newValue) => {
    setSelectedCourseIndex(newValue);
  };

  return (
    <TeacherLayout>
      <Box sx={{ padding: "20px", backgroundColor: grey[50], minHeight: "100vh" }}>
        {loading ? (
          <Loader /> // Your loader component to show while the content is being fetched
        ) : (
          <>
            <Paper sx={{ marginBottom: "20px", padding: "20px", borderRadius: "12px", boxShadow: 3 }}>
              <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: 0 }}>
                <Toolbar>
                  <Tabs
                    value={selectedCourseIndex}
                    onChange={handleCourseChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      marginBottom: "20px",
                      borderBottom: `2px solid ${blue[300]}`,
                      flexGrow: 1,
                      "& .MuiTab-root": {
                        fontWeight: "normal",
                        color: blue[700],
                        textTransform: "none",
                        padding: "10px 20px",
                        transition: "all 0.3s ease",
                      },
                      "& .Mui-selected": {
                        color: green[600],
                      },
                    }}
                  >
                    {assignedCourses.map((course, index) => (
                      <Tab key={index} label={course.courseName} />
                    ))}
                  </Tabs>
                </Toolbar>
              </AppBar>
            </Paper>

            <Card sx={{ marginTop: "20px", padding: "30px", borderRadius: "12px", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Add Lecture and Questions
                </Typography>

                <TextField
                  name="lectureName"
                  value={addVideo.lectureName}
                  onChange={handleAddVideo}
                  label="Lecture Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  name="lectureURL"
                  value={addVideo.lectureURL}
                  onChange={handleAddVideo}
                  label="Lecture URL"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <Typography variant="h6" sx={{ marginTop: "20px" }}>
                  Add Questions for Lecture
                </Typography>
                <TextField
                  name="question"
                  value={newQuestion.question}
                  onChange={handleQuestionChange}
                  label="Question"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                {newQuestion.options.map((option, index) => (
                  <TextField
                    key={index}
                    name="options"
                    value={option}
                    onChange={(e) => handleQuestionChange(e, index)}
                    label={`Option ${index + 1}`}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                ))}
                <TextField
                  name="correctAnswer"
                  value={newQuestion.correctAnswer}
                  onChange={handleQuestionChange}
                  label="Correct Answer"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  name="time"
                  value={newQuestion.time}
                  onChange={handleQuestionChange}
                  label="Time (seconds)"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addQuestionToLecture}
                  sx={{ marginTop: "10px", fontWeight: "bold" }}
                >
                  Add Question
                </Button>

                <Typography variant="h6" sx={{ marginTop: "40px" }}>
                  Add Main Quiz Questions
                </Typography>
                <TextField
                  name="question"
                  value={newMainQuiz.question}
                  onChange={handleMainQuizChange}
                  label="Main Quiz Question"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                {newMainQuiz.options.map((option, index) => (
                  <TextField
                    key={index}
                    name="options"
                    value={option}
                    onChange={(e) => handleMainQuizChange(e, index)}
                    label={`Option ${index + 1}`}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                ))}
                <TextField
                  name="correctAnswer"
                  value={newMainQuiz.correctAnswer}
                  onChange={handleMainQuizChange}
                  label="Correct Answer"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  name="time"
                  value={newMainQuiz.time}
                  onChange={handleMainQuizChange}
                  label="Time (seconds)"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addQuestionToMainQuiz}
                  sx={{ marginTop: "10px", fontWeight: "bold" }}
                >
                  Add Main Quiz Question
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmitCourseContent}
                  sx={{
                    marginTop: "20px",
                    padding: "12px 24px",
                    fontWeight: "bold",
                    backgroundColor: green[600],
                    "&:hover": {
                      backgroundColor: green[700],
                    },
                  }}
                >
                  Submit Course Content
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </TeacherLayout>
  );
};

export default TeacherCourses;