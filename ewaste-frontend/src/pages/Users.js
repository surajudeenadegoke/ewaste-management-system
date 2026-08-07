import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5001/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.error("FETCH USERS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load registered users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const role = user.role?.toLowerCase() || "";
    const searchText = search.toLowerCase();

    return (
      name.includes(searchText) ||
      email.includes(searchText) ||
      role.includes(searchText)
    );
  });

  return (
    <>
      <AdminNavbar />

      <div className="users-page">
        <div className="users-header">
          <div>
            <h1>Registered Users</h1>
            <p>
              View users and their accumulated reward points.
            </p>
          </div>

          <div className="users-count">
            Total Users: {users.length}
          </div>
        </div>

        <div className="users-toolbar">
          <input
            type="text"
            placeholder="Search by name, email or role"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button onClick={fetchUsers}>
            Refresh
          </button>
        </div>

        {loading && (
          <p className="users-message">
            Loading users...
          </p>
        )}

        {error && (
          <p className="users-error">
            {error}
          </p>
        )}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="users-message">
            No users found.
          </p>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Reward Points</th>
                  <th>Date Registered</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`role-badge ${
                          user.role === "admin"
                            ? "admin-role"
                            : "user-role"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      {user.rewardPoints || 0}
                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "Not available"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;