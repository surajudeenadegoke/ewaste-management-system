import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminDashboard.css";
import API_URL from "../config";


function AdminDashboard() {

  const [wastes, setWastes] = useState([]);
  const [stats, setStats] = useState({
  totalUsers: 0,
  totalWaste: 0,
  pending: 0,
  approved: 0,
  collected: 0,
});


  const fetchWaste = async () => {

    try {

      const token = localStorage.getItem("token");


      const res = await axios.get(
        `${API_URL}/api/waste/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setWastes(res.data);


    } catch (error) {

      console.log(error);

      alert("Failed to load waste data");

    }

  };
  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5001/api/admin/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(res.data);
  } catch (error) {
    console.log(error);
    alert("Failed to load dashboard statistics");
  }
};



  // APPROVE WASTE + AWARD REWARD

  const approveWaste = async (id) => {

    try {

      const token = localStorage.getItem("token");


      await axios.put(

        `http://localhost:5001/api/waste/${id}/approve`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );


      alert(
        "Waste approved successfully. Reward points awarded."
      );


      fetchWaste();
      fetchStats();


    } catch(error) {


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Approval failed"
      );

    }

  };



  // UPDATE STATUS TO COLLECTED

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");


      await axios.put(

        `http://localhost:5001/api/waste/${id}`,

        {
          status,
        },

        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }

      );


      alert("Status updated");


      fetchWaste();
      fetchStats();


    } catch(error) {

      console.log(error);

      alert("Status update failed");

    }

  };



  useEffect(() => {
  fetchWaste();
  fetchStats();
}, []);



  return (
    <>

<AdminNavbar />

    <div className="admin-container">


      <h1>
        ♻️ Admin Dashboard
      </h1>
      <div className="admin-stats">
  <div className="admin-stat-card">
    <h3>👥 Total Users</h3>
    <p>{stats.totalUsers}</p>
  </div>

  <div className="admin-stat-card">
    <h3>📦 Total Requests</h3>
    <p>{stats.totalWaste}</p>
  </div>

  <div className="admin-stat-card">
    <h3>⏳ Pending</h3>
    <p>{stats.pending}</p>
  </div>

  <div className="admin-stat-card">
    <h3>✅ Approved</h3>
    <p>{stats.approved}</p>
  </div>

  <div className="admin-stat-card">
    <h3>♻️ Collected</h3>
    <p>{stats.collected}</p>
  </div>
</div>



      <div className="table-container">


        <table>


          <thead>

            <tr>

              <th>User</th>

              <th>Email</th>

              <th>Waste Type</th>

              <th>Quantity</th>

              <th>Location</th>

              <th>Pickup Date</th>

              <th>Status</th>

              <th>Action</th>


            </tr>

          </thead>




          <tbody>


          {wastes.map((waste)=>(


            <tr key={waste._id}>


              <td>
                {waste.user?.name}
              </td>



              <td>
                {waste.user?.email}
              </td>



              <td>
                {waste.wasteType}
              </td>



              <td>
                {waste.quantity}
              </td>



              <td>
                {waste.location}
              </td>



              <td>

                {
                  new Date(
                    waste.pickupDate
                  ).toLocaleDateString()
                }

              </td>



              <td>

                <span className={`status ${waste.status}`}>

                  {waste.status}

                </span>


              </td>




              <td>


                {waste.status === "pending" && (

                  <button

                    className="approve-btn"

                    onClick={() =>
                      approveWaste(waste._id)
                    }

                  >

                    Approve

                  </button>

                )}



                {waste.status === "approved" && (

                  <button

                    className="collect-btn"

                    onClick={() =>
                      updateStatus(
                        waste._id,
                        "collected"
                      )
                    }

                  >

                    Collected

                  </button>

                )}



              </td>


            </tr>


          ))}



          </tbody>


        </table>


      </div>


    </div>
  </>

  );

}


export default AdminDashboard;