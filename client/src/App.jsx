import { Route, Routes } from "react-router-dom"
import AdminLayout from "./admin/AdminLayout"
import PageEditor from "./admin/PageEditor"
import AdminDashboard from "./admin/AdminDashboard"
import AdminLogin from "./admin/AdminLogin"
import AdminProtectedRoute from "./admin/protectedRoute/AdminProtectedRoute"


function App() {

  return (
    <>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          } />
          <Route path="/admin/homepage" element={
            <AdminProtectedRoute>
              <AdminLayout>
                <PageEditor />
              </AdminLayout>
            </AdminProtectedRoute>
          } />
        </Routes>
    </>
  )
}

export default App
