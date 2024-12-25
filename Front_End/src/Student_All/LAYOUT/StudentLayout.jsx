import React from 'react'
import StudentNavBar from './StudentNavBar.jsx'
import StudentFooter from './StudentFooter.jsx'

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
