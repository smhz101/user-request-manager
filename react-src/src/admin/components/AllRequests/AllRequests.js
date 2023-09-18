import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { fetchUserRequests } from "../../../services/api";
import RequestTable from "../RequestTable/RequestTable";
import RequestDetails from "../RequestDetails/RequestDetails";
import { Button, Modal } from "../../common";

/**
 * Component to display all user requests.
 */
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

  if (loading) return <p>{__("Loading...", "user-request-manager")}</p>;
  if (error)
    return (
      <p>
        {__("Error:", "user-request-manager")} {error}
      </p>
    );

  return (
    <div className="all-requests wrap">
      <header>
        <h1 className="wp-heading-inline">
          {__("User Requests", "user-request-manager")}
        </h1>
        <Button onClick={fetchUserRequests}>
          <span className="dashicons dashicons-image-rotate"></span>
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

      <footer>{/* @TODO: Implement pagination controls */}</footer>
    </div>
  );
}

export default AllRequests;
