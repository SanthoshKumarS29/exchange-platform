import {Link} from 'react-router-dom';


const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-5 sticky top-0">
      <h2 className="text-xl font-bold mb-8">Exchange Admin</h2>

      <nav className="space-y-2">
        <Link to="/admin" className="block px-4 py-3 rounded-lg hover:bg-gray-800">Dashboard</Link>

        <Link to="/admin/homepage" className="block px-4 py-3 rounded-lg hover:bg-gray-800">Homepage</Link>
        <Link to="/admin/users" className="block px-4 py-3 rounded-lg hover:bg-gray-800">Users</Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;