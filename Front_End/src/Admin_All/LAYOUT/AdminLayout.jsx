import React from 'react'
import AdminNavBar from './AdminNavBar'
import AdminFooter from './AdminFooter'

const AdminLayout = ({children}) => {
  return (
    <>

    <AdminNavBar/>
    
    {children}

    <AdminFooter/>
    
    </>
  )
}

export default AdminLayout
