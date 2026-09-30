import { useNavigate } from "react-router-dom";

const AdminHeader = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminSessionExpiry");

    navigate("/admin/login", { replace: true });
  }

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Admin Panel</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Admin</span>

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center">A</div>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;