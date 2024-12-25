import React from 'react'
import TeachernavBar from './TeachernavBar'
import TeacherFooter from './TeacherFooter'

const TeacherLayout = ({children}) => {
  return (
    <>

    <TeachernavBar/>
    
    {children}

    <TeacherFooter/>
    
    </>
  )
}

export default TeacherLayout
