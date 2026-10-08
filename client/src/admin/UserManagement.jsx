import React, { useEffect, useState } from 'react'
import { approveUser, getUsers } from '../services/admin/UserApi';

const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(); // Assuming getUsers is a function that fetches users from an API
        if (response.success) {
          setUsers(response.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  const handleApprove = async(userId) => {
    try{
      const response = await approveUser(userId);
      if(response.success){
        setUsers(prevUsers => prevUsers.map(user => user._id === userId ? { ...user, status: 'approved' } : user));
      }
    } catch (error) {
      console.error("Error approving user:", error);
      setError("Failed to approve user.");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        User Management
      </h1>

      <p className="mt-2 text-gray-500">
        Manage registered users and approve accounts.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Email Verified</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-3">{user.name}</td>

                  <td className="px-4 py-3">
                    {user.email}
                  </td>

                  <td className="px-4 py-3">
                    {user.isEmailVerified ? "Verified" : "Not Verified"}
                  </td>

                  <td className="px-4 py-3">
                    {user.status}
                  </td>
                  <td className="px-4 py-3">
                    {user.status === "approved" ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : user.status === "rejected" ? (
                      <span className="text-red-600 font-semibold">Rejected</span>
                    ) : (
                      <button onClick={() => handleApprove(user._id)} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" disabled={user.status === "approved"}>
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default UserManagement