import React from 'react'
import StudentNavBar from './StudentNavBar'
import StudentFooter from './studentFooter'

const StudentLayout = ({ children }) => {
  return (
    <>

    <StudentNavBar/>
    
    {children}

    <StudentFooter/>
    
    </>
  )
}

export default StudentLayout
