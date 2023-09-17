import React, { useState, useEffect } from "react";
import { fetchUserRequests } from "../../../services/api";
import RequestTable from "../RequestTable/RequestTable";
import RequestDetails from "../RequestDetails/RequestDetails";
import { Button } from "../../common";

function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchUserRequests();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="dashboard wrap">
      <header>
        <h1 className="wp-heading-inline">Dashboard</h1>
      </header>

      <footer>{/* Pagination controls */}</footer>
    </div>
  );
}

export default Dashboard;
