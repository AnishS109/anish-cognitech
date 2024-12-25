import React, { useState, useEffect, useRef } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import StudentLayout from '../LAYOUT/StudentLayout';
import { useLocation } from 'react-router-dom';
import Lecture1 from "../Lectures/React-L-1.mp4";

function ViewCourse() {
  const [courseData, setCourseData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedLectureQuestions, setSelectedLectureQuestions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [message, setMessage] = useState("");  // Correct/Incorrect message
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [lectureQuizOpen, setLectureQuizOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [courseQuizOpen, setCourseQuizOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizTimer, setQuizTimer] = useState(null);
  const [warningMsg, setWarningMsg] = useState(false);
  const [isWarningShown, setIsWarningShown] = useState(false);
  const [videoSkippingModalOpen, setVideoSkippingModalOpen] = useState(false); // Added state for skipping modal
  const [isSkipping, setIsSkipping] = useState(false); // Added state to track skipping

  const videoRef = useRef(null);
  const location = useLocation();
  const course_id = location.state?.course_id;

  useEffect(() => {
    if (course_id) {
      const fetchCourseData = async () => {
        try {
          const response = await fetch(`https://anish-cognitech-backend-fwia.onrender.com/api/router/course/${course_id}`);
          const data = await response.json();
          setCourseData(data);
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      };
      fetchCourseData();
    }
  }, [course_id]);

  const handleLectureChange = (event) => {
    const selectedLectureId = event.target.value;
    setSelectedLecture(selectedLectureId);

    const selectedLectureData = courseData.lectures.find(lecture => lecture._id === selectedLectureId);
    if (selectedLectureData) {
      setSelectedLectureQuestions(selectedLectureData.questions || []);
    }

    setVideoTime(0);
    setIsPaused(false);
    setLectureQuizOpen(false);
    setMessage("");  // Reset message on lecture change
    setCurrentQuestionIndex(0);
    setAnsweredCorrectly(false);
  };

  const handleVideoTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    setVideoTime(currentTime);

    const nextQuestion = selectedLectureQuestions.find((q, index) => {
      const questionTime = q.time;
      return currentTime >= questionTime - 1 && currentTime <= questionTime + 1 && currentQuestionIndex === index;
    });

    if (nextQuestion && !isPaused) {
      setLectureQuizOpen(true);
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleAnswer = (answer) => {
    const currentQuestion = selectedLectureQuestions[currentQuestionIndex];
    const normalizedAnswer = answer.trim().toLowerCase();
    const normalizedCorrectAnswer = currentQuestion.correctAnswer.trim().toLowerCase();
  
    const isCorrect = normalizedAnswer === normalizedCorrectAnswer;
  
    if (isCorrect) {
      setMessage("Correct!");
      setAnsweredCorrectly(true);
      setIsPaused(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      videoRef.current.play();
    } else {
      setMessage("Incorrect!");
      setAnsweredCorrectly(false);
      setIsPaused(true);
      videoRef.current.currentTime = 0; // Reset video time
      videoRef.current.pause();
  
    }
  
    // Close quiz dialog after answering
    setLectureQuizOpen(false);
  };

  const handleSeek = (event) => {
    if (isSkipping) return; // Prevent triggering multiple times within the same seek event
    
    setIsSkipping(true);  // Set skipping state to true when the user seeks
    setVideoSkippingModalOpen(true); // Show video skipping modal

    // Reset video time to 0 to prevent skipping
    videoRef.current.currentTime = 0;

    // Automatically close the modal after 2 seconds
    setTimeout(() => {
      setVideoSkippingModalOpen(false);
      setIsSkipping(false); // Reset skipping state after 2 seconds
    }, 1000);
  };

  const startCourseQuiz = () => {
    setCourseQuizOpen(true);
    setCurrentQuizQuestionIndex(0);
    setQuizFinished(false);
    setQuizAnswers([]);
    setQuizResult(null);
    startQuizTimer();
  };

  const startQuizTimer = () => {
    const questionDuration = 30;
    setQuizTimer(setInterval(() => {
      if (currentQuizQuestionIndex < courseData.QuizMain.length) {
        setCurrentQuizQuestionIndex(prevIndex => prevIndex + 1);
      }
    }, questionDuration * 1000));
  };

  const submitCourseQuiz = () => {
    setQuizResult("Your response has been recorded.");
    setQuizFinished(true);
    clearInterval(quizTimer);
  };

  const selectedLectureData = courseData?.lectures?.find(lecture => lecture._id === selectedLecture);

  return (
    <StudentLayout>
      <div style={{ margin: 20 }}>
        {courseData ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Typography variant='h3' gutterBottom>{courseData.course_name}</Typography>
              <Typography variant="h5" gutterBottom>{courseData.description}</Typography>

              <br />
              <Typography variant="h5" gutterBottom>Select Lecture</Typography>
              <FormControl fullWidth>
                <InputLabel id="lecture-select-label">Select Lecture</InputLabel>
                <Select
                  labelId="lecture-select-label"
                  id="lecture-select"
                  value={selectedLecture || ''}
                  onChange={handleLectureChange}
                  label="Select Lecture"
                  fullWidth
                >
                  {courseData.lectures.map((lecture) => (
                    <MenuItem key={lecture._id} value={lecture._id}>
                      {lecture.lectureName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              

              {selectedLectureData && (
                <Box mt={3}>
                  <Typography variant="h6">Now Playing: {selectedLectureData.lectureName}</Typography>
                  <video
                    ref={videoRef}
                    width="100%"
                    height="400vh"
                    controls
                    autoPlay
                    onTimeUpdate={handleVideoTimeUpdate}
                    onPlay={() => setIsVideoPlaying(true)}
                    onCanPlay={() => {
                      if (!isVideoPlaying && selectedLectureData) {
                        videoRef.current.play();
                        setIsVideoPlaying(true);
                      }
                    }}
                    onSeeked={handleSeek}
                    onSeeking={handleSeek}
                  >
                    <source src={Lecture1} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Box>
              )}

              {/* Message for correct/incorrect answer */}
              {message && <center><Typography variant="h6" color={answeredCorrectly ? "green" : "red"}>{message}</Typography></center>}

              <Box mt={3} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startCourseQuiz}
                >
                  Start Course Quiz
                </Button>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1">Loading course data...</Typography>
        )}

        {/* Lecture-specific Quiz Dialog */}
        {lectureQuizOpen && (
          <Dialog open={lectureQuizOpen} onClose={() => {}} aria-labelledby="lecture-quiz-dialog-title">
            <DialogTitle id="lecture-quiz-dialog-title">
              Question: {selectedLectureQuestions[currentQuestionIndex]?.question}
            </DialogTitle>
            <DialogContent>
              <Box textAlign="center">
                {selectedLectureQuestions[currentQuestionIndex]?.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    variant="contained"
                    color="primary"
                    style={{ margin: 5 }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </DialogContent>
          </Dialog>
        )}

        {/* Video Skipping Warning Modal */}
        <Dialog open={videoSkippingModalOpen} onClose={() => setVideoSkippingModalOpen(false)} aria-labelledby="video-skipping-dialog-title">
          <DialogTitle id="video-skipping-dialog-title">Warning</DialogTitle>
          <DialogContent>
            <Typography variant="h6" color="error">Video skipping is not allowed!</Typography>
          </DialogContent>
        </Dialog>

        {/* Course-wide Quiz Dialog */}
        {courseQuizOpen && !quizFinished && (
          <Dialog open={courseQuizOpen} onClose={() => setCourseQuizOpen(false)} aria-labelledby="course-quiz-dialog-title">
            <DialogTitle id="course-quiz-dialog-title">
              Question {currentQuizQuestionIndex + 1}: {courseData.QuizMain[currentQuizQuestionIndex]?.question}
            </DialogTitle>
            <DialogContent>
              <Box textAlign="center">
                {courseData.QuizMain[currentQuizQuestionIndex]?.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      const isCorrect = option === courseData.QuizMain[currentQuizQuestionIndex].correctAnswer;
                      setQuizAnswers([...quizAnswers, { option, isCorrect }]);
                      setCurrentQuizQuestionIndex(currentQuizQuestionIndex + 1);
                    }}
                    variant="contained"
                    color="primary"
                    style={{ margin: 5 }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitCourseQuiz} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* Quiz Result Dialog */}
        {quizFinished && (
          <Dialog open={quizFinished} onClose={() => setQuizFinished(false)} aria-labelledby="quiz-result-dialog-title">
            <DialogTitle id="quiz-result-dialog-title">Quiz Submitted</DialogTitle>
            <DialogContent>
              <Typography variant="h6">{quizResult}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setQuizFinished(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </StudentLayout>
  );
}

export default ViewCourse;

// import React, { useState, useEffect, useRef } from 'react';
// import { Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import StudentLayout from '../LAYOUT/StudentLayout';
// import { useLocation } from 'react-router-dom';
// import Lecture1 from "../Lectures/React-L-1.mp4";

// function ViewCourse() {
//   const [courseData, setCourseData] = useState(null);
//   const [selectedLecture, setSelectedLecture] = useState(null);
//   const [selectedLectureQuestions, setSelectedLectureQuestions] = useState([]);
//   const [isPaused, setIsPaused] = useState(false);
//   const [videoTime, setVideoTime] = useState(0);
//   const [message, setMessage] = useState("");  // Correct/Incorrect message
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const [lectureQuizOpen, setLectureQuizOpen] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
//   const [courseQuizOpen, setCourseQuizOpen] = useState(false);
//   const [quizAnswers, setQuizAnswers] = useState([]);
//   const [quizResult, setQuizResult] = useState(null);
//   const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
//   const [quizFinished, setQuizFinished] = useState(false);
//   const [quizTimer, setQuizTimer] = useState(null);
//   const [warningMsg, setWarningMsg] = useState(false);
//   const [isWarningShown, setIsWarningShown] = useState(false);
//   const [videoSkippingModalOpen, setVideoSkippingModalOpen] = useState(false); // Added state for skipping modal
//   const [isSkipping, setIsSkipping] = useState(false); // Added state to track skipping
//   const [hasWarned, setHasWarned] = useState(false);  // State to track if warning has been shown

//   const videoRef = useRef(null);
//   const location = useLocation();
//   const course_id = location.state?.course_id;

//   useEffect(() => {
//     if (course_id) {
//       const fetchCourseData = async () => {
//         try {
//           const response = await fetch(`https://anish-cognitech-backend-fwia.onrender.com/api/router/course/${course_id}`);
//           const data = await response.json();
//           setCourseData(data);
//         } catch (error) {
//           console.error('Error fetching course data:', error);
//         }
//       };
//       fetchCourseData();
//     }
//   }, [course_id]);

//   const handleLectureChange = (event) => {
//     const selectedLectureId = event.target.value;
//     setSelectedLecture(selectedLectureId);

//     const selectedLectureData = courseData.lectures.find(lecture => lecture._id === selectedLectureId);
//     if (selectedLectureData) {
//       setSelectedLectureQuestions(selectedLectureData.questions || []);
//     }

//     setVideoTime(0);
//     setIsPaused(false);
//     setLectureQuizOpen(false);
//     setMessage("");  // Reset message on lecture change
//     setCurrentQuestionIndex(0);
//     setAnsweredCorrectly(false);
//   };

//   const handleVideoTimeUpdate = () => {
//     const currentTime = videoRef.current.currentTime;
//     setVideoTime(currentTime);

//     const nextQuestion = selectedLectureQuestions.find((q, index) => {
//       const questionTime = q.time;
//       return currentTime >= questionTime - 1 && currentTime <= questionTime + 1 && currentQuestionIndex === index;
//     });

//     if (nextQuestion && !isPaused) {
//       setLectureQuizOpen(true);
//       videoRef.current.pause();
//       setIsPaused(true);
//     }
//   };

//   const handleAnswer = (answer) => {
//     const currentQuestion = selectedLectureQuestions[currentQuestionIndex];
//     const normalizedAnswer = answer.trim().toLowerCase();
//     const normalizedCorrectAnswer = currentQuestion.correctAnswer.trim().toLowerCase();
  
//     const isCorrect = normalizedAnswer === normalizedCorrectAnswer;
  
//     if (isCorrect) {
//       setMessage("Correct!");
//       setAnsweredCorrectly(true);
//       setIsPaused(false);
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       videoRef.current.play();
//     } else {
//       setMessage("Incorrect!");
//       setAnsweredCorrectly(false);
//       setIsPaused(true);
//       videoRef.current.currentTime = 0; // Reset video time
//       videoRef.current.pause();
  
//       // Reload page after 2 seconds if the answer is incorrect
//       setTimeout(() => {
//         window.location.reload();
//       }, 2000); // Page reload delay
//     }
  
//     // Close quiz dialog after answering
//     setLectureQuizOpen(false);
//   };

//   const handleSeek = (event) => {
//     if (isSkipping) return; // Prevent triggering multiple times within the same seek event
  
//     setIsSkipping(true);  // Set skipping state to true when the user seeks
    
//     if (!hasWarned) {
//       setVideoSkippingModalOpen(true); // Show video skipping modal
//       setHasWarned(true); // Set warning as shown
//     }
  
//     // Reset video time to 0 to prevent skipping
//     videoRef.current.currentTime = 0;
  
//     // Automatically close the modal after 2 seconds
//     setTimeout(() => {
//       setVideoSkippingModalOpen(false);
//       setIsSkipping(false); // Reset skipping state after 2 seconds
//     }, 2000);
//   };
  

//   const startCourseQuiz = () => {
//     setCourseQuizOpen(true);
//     setCurrentQuizQuestionIndex(0);
//     setQuizFinished(false);
//     setQuizAnswers([]);
//     setQuizResult(null);
//     startQuizTimer();
//   };

//   const startQuizTimer = () => {
//     const questionDuration = 30;
//     setQuizTimer(setInterval(() => {
//       if (currentQuizQuestionIndex < courseData.QuizMain.length) {
//         setCurrentQuizQuestionIndex(prevIndex => prevIndex + 1);
//       }
//     }, questionDuration * 1000));
//   };

//   const submitCourseQuiz = () => {
//     setQuizResult("Your response has been recorded.");
//     setQuizFinished(true);
//     clearInterval(quizTimer);
//   };

//   const selectedLectureData = courseData?.lectures?.find(lecture => lecture._id === selectedLecture);

//   return (
//     <StudentLayout>
//       <div style={{ margin: 20 }}>
//         {courseData ? (
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={12}>
//               <Typography variant='h3' gutterBottom>{courseData.course_name}</Typography>
//               <Typography variant="h5" gutterBottom>{courseData.description}</Typography>

//               <br />
//               <Typography variant="h5" gutterBottom>Select Lecture</Typography>
//               <FormControl fullWidth>
//                 <InputLabel id="lecture-select-label">Select Lecture</InputLabel>
//                 <Select
//                   labelId="lecture-select-label"
//                   id="lecture-select"
//                   value={selectedLecture || ''}
//                   onChange={handleLectureChange}
//                   label="Select Lecture"
//                   fullWidth
//                 >
//                   {courseData.lectures.map((lecture) => (
//                     <MenuItem key={lecture._id} value={lecture._id}>
//                       {lecture.lectureName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {selectedLectureData && (
//                 <Box mt={3}>
//                   <Typography variant="h6">Now Playing: {selectedLectureData.lectureName}</Typography>
//                   <video
//                     ref={videoRef}
//                     width="100%"
//                     height="400vh"
//                     controls
//                     autoPlay
//                     onTimeUpdate={handleVideoTimeUpdate}
//                     onPlay={() => setIsVideoPlaying(true)}
//                     onCanPlay={() => {
//                       if (!isVideoPlaying && selectedLectureData) {
//                         videoRef.current.play();
//                         setIsVideoPlaying(true);
//                       }
//                     }}
//                     onSeeked={handleSeek}
//                     onSeeking={handleSeek}
//                   >
//                     <source src={Lecture1} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </Box>
//               )}

//               {/* Message for correct/incorrect answer */}
//               {message && <center><Typography variant="h6" color={answeredCorrectly ? "green" : "red"}>{message}</Typography></center>}

//               <Box mt={3} textAlign="center">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={startCourseQuiz}
//                 >
//                   Start Course Quiz
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         ) : (
//           <Typography variant="body1">Loading course data...</Typography>
//         )}

//         {/* Lecture-specific Quiz Dialog */}
//         {lectureQuizOpen && (
//           <Dialog open={lectureQuizOpen} onClose={() => {}} aria-labelledby="lecture-quiz-dialog-title">
//             <DialogTitle id="lecture-quiz-dialog-title">
//               Question: {selectedLectureQuestions[currentQuestionIndex]?.question}
//             </DialogTitle>
//             <DialogContent>
//               <Box textAlign="center">
//                 {selectedLectureQuestions[currentQuestionIndex]?.options.map((option, index) => (
//                   <Button
//                     key={index}
//                     onClick={() => handleAnswer(option)}
//                     variant="contained"
//                     color="primary"
//                     style={{ margin: 5 }}
//                   >
//                     {option}
//                   </Button>
//                 ))}
//               </Box>
//               <Typography variant="body1" color="secondary">{message}</Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setLectureQuizOpen(false)} color="primary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         {/* Video Skipping Warning Modal */}
//         <Dialog open={videoSkippingModalOpen} onClose={() => setVideoSkippingModalOpen(false)}>
//           <DialogTitle>Warning</DialogTitle>
//           <DialogContent>
//             <Typography variant="body1">Video skipping is not allowed!</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setVideoSkippingModalOpen(false)} color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </StudentLayout>
//   );
// }

// export default ViewCourse;