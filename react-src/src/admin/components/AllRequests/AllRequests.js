import React, { useState, useEffect } from "react";
import { fetchUserRequests } from "../../../services/api";
import RequestTable from "../RequestTable/RequestTable";
import RequestDetails from "../RequestDetails/RequestDetails";
import { Button, Modal } from "../../common";

function AllRequests() {
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

  console.log("Selected Request:", selectedRequest);

  return (
    <div className="all-requests wrap">
      <header>
        <h1 className="wp-heading-inline">User Requests</h1>
        <Button onClick={fetchUserRequests}>
          <span class="dashicons dashicons-image-rotate"></span>
        </Button>
      </header>

      <RequestTable requests={requests} onSelectRequest={setSelectedRequest} />

      {selectedRequest && (
        <Modal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        >
          <RequestDetails request={selectedRequest} />
        </Modal>
      )}

      <footer>{/* Pagination controls */}</footer>
    </div>
  );
}

export default AllRequests;
