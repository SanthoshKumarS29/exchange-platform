import { Route, Routes } from "react-router-dom"
import AdminLayout from "./admin/AdminLayout"
import PageEditor from "./admin/PageEditor"
import AdminDashboard from "./admin/AdminDashboard"
import UserManagement from "./admin/UserManagement"
import AdminLogin from "./admin/AdminLogin"
import AdminProtectedRoute from "./admin/protectedRoute/AdminProtectedRoute"
import Register from "./auth/Register"
import VerifyEmail from "./auth/VerifyEmail"
import Login from "./auth/login"
import UserLogin from "./auth/UserLogin"


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
          <Route path="/admin/users" element={
            <AdminProtectedRoute>
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            </AdminProtectedRoute>
          } />

          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />}/>
          <Route path="/login" element={<UserLogin />}/>
        </Routes>
    </>
  )
}

export default App
