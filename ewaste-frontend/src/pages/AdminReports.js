import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminReports.css";

function AdminReports() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalWaste: 0,
    pending: 0,
    approved: 0,
    collected: 0,
  });

  const [wastes, setWastes] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [statsResponse, wastesResponse] = await Promise.all([
        axios.get(
          "http://localhost:5001/api/admin/stats",
          config
        ),

        axios.get(
          "http://localhost:5001/api/waste/all",
          config
        ),
      ]);

      setStats(statsResponse.data);
      setWastes(wastesResponse.data);
    } catch (error) {
      console.error("REPORT ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load report information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredWastes =
    statusFilter === "all"
      ? wastes
      : wastes.filter(
          (waste) =>
            waste.status?.toLowerCase() === statusFilter
        );

  const downloadCSV = () => {
    if (filteredWastes.length === 0) {
      alert("There are no records to download.");
      return;
    }

    const headings = [
      "S/N",
      "User",
      "Email",
      "Waste Type",
      "Quantity",
      "Location",
      "Pickup Date",
      "Status",
      "Date Submitted",
    ];

    const rows = filteredWastes.map((waste, index) => [
      index + 1,
      waste.user?.name || "Unknown User",
      waste.user?.email || "No email",
      waste.wasteType || "",
      waste.quantity || "",
      waste.location || "",
      waste.pickupDate
        ? new Date(waste.pickupDate).toLocaleDateString()
        : "",
      waste.status || "",
      waste.createdAt
        ? new Date(waste.createdAt).toLocaleDateString()
        : "",
    ]);

    const csvContent = [headings, ...rows]
      .map((row) =>
        row
          .map((value) => {
            const safeValue = String(value).replace(/"/g, '""');
            return `"${safeValue}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `ewaste-report-${statusFilter}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <>
      <AdminNavbar />

      <div className="reports-page">
        <div className="reports-heading">
          <div>
            <h1>📊 System Reports</h1>
            <p>
              View, filter, print and download system records.
            </p>
          </div>

          <button
            className="refresh-report-button"
            onClick={fetchReports}
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="report-error">{error}</div>
        )}

        <div className="report-stats">
          <div className="report-card">
            <h3>👥 Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="report-card">
            <h3>📦 Total Waste</h3>
            <p>{stats.totalWaste}</p>
          </div>

          <div className="report-card">
            <h3>⏳ Pending</h3>
            <p>{stats.pending}</p>
          </div>

          <div className="report-card">
            <h3>✅ Approved</h3>
            <p>{stats.approved}</p>
          </div>

          <div className="report-card">
            <h3>♻️ Collected</h3>
            <p>{stats.collected}</p>
          </div>
        </div>

        <div className="report-toolbar">
          <div>
            <label htmlFor="statusFilter">
              Filter by status:
            </label>

            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="all">All Records</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="collected">Collected</option>
            </select>
          </div>

          <div className="report-actions">
            <button
              className="csv-button"
              onClick={downloadCSV}
            >
              Download CSV
            </button>

            <button
              className="print-button"
              onClick={printReport}
            >
              Print Report
            </button>
          </div>
        </div>

        {loading ? (
          <p className="report-message">
            Loading report...
          </p>
        ) : filteredWastes.length === 0 ? (
          <p className="report-message">
            No waste records found.
          </p>
        ) : (
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Waste Type</th>
                  <th>Quantity</th>
                  <th>Location</th>
                  <th>Pickup Date</th>
                  <th>Status</th>
                  <th>Date Submitted</th>
                </tr>
              </thead>

              <tbody>
                {filteredWastes.map((waste, index) => (
                  <tr key={waste._id}>
                    <td>{index + 1}</td>

                    <td>
                      {waste.user?.name || "Unknown User"}
                    </td>

                    <td>
                      {waste.user?.email || "No email"}
                    </td>

                    <td>{waste.wasteType}</td>

                    <td>{waste.quantity}</td>

                    <td>{waste.location}</td>

                    <td>
                      {waste.pickupDate
                        ? new Date(
                            waste.pickupDate
                          ).toLocaleDateString()
                        : "Not available"}
                    </td>

                    <td>
                      <span
                        className={`report-status ${waste.status?.toLowerCase()}`}
                      >
                        {waste.status}
                      </span>
                    </td>

                    <td>
                      {waste.createdAt
                        ? new Date(
                            waste.createdAt
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

export default AdminReports;