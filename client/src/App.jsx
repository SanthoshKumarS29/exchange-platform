import { Route, Routes } from "react-router-dom"
import AdminLayout from "./admin/AdminLayout"
import PageEditor from "./admin/PageEditor"
import AdminDashboard from "./admin/AdminDashboard"
import UserManagement from "./admin/UserManagement"
import AdminLogin from "./admin/AdminLogin"
import AdminProtectedRoute from "./admin/protectedRoute/AdminProtectedRoute"
import Register from "./auth/Register"
import VerifyEmail from "./auth/VerifyEmail"
import UserLogin from "./auth/UserLogin"
import ForgetPassword from "./auth/ForgetPassword"
import ResetPassword from "./auth/ResetPassword"
import UserProtectedRoute from "./auth/UserProtectedRoute"
import DashboardHome from "./dashboard/DashboardHome"
import MarketList from "./pages/markets/MarketList"


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

          <Route path='/dashboard' element={
            <UserProtectedRoute>
              <DashboardHome />
            </UserProtectedRoute>
          }/>

          <Route path="*" element={<div>404 Not Found</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />}/>
          <Route path="/login" element={<UserLogin />}/>
          <Route path="/forgot-password" element={<ForgetPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path ="/markets" element={<MarketList />}/>
        </Routes>
    </>
  )
}

export default App
