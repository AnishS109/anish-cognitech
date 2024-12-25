import React from 'react'
import Layout from '../pages/Layout'
import { Box} from '@mui/material'
import AllCourses from "../Small_Components/AllCourses"

const Courses = () => {
  return (
    <>
    
    <Layout>

    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row"
          },
          mb:"20px",
          mt:"20px"
        }}
>

      <AllCourses/>

      </Box>

    </Layout>
    
    </>
  )
}

export default Courses
