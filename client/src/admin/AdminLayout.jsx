import React from 'react'
import AdminSidebar from './components/AdminSideBar'
import AdminHeader from './components/AdminHeader'

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 flex">
      <div className="sticky top-0">
        <AdminSidebar />
      </div>


      <div className="flex-1">

        <AdminHeader />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  )
}

export default AdminLayout