import React from 'react';
import StudentLayout from './LAYOUT/StudentLayout';
import StudentCourseCards from './StudentCourseCards';

const StudentDashBoard = () => {

  return (
    <>
      <StudentLayout>

        <StudentCourseCards/>

      </StudentLayout>
    </>
  );
};

export default StudentDashBoard;
