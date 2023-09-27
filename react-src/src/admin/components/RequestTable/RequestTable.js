import React from "react";
import { __ } from "@wordpress/i18n";
import { Button, Table } from "../../common";
import "./RequestTable.css";

/**
 * Renders a table to display user requests.
 *
 * @param {Object} props - The component's props.
 * @param {Array} props.requests - An array of user request data.
 * @param {Function} props.onSelectRequest - A callback function invoked when a request is selected.
 */
function RequestTable({ requests, onSelectRequest }) {
  const headers = [
    { key: "id", label: __("ID", "user-request-manager") },
    { key: "username", label: __("User Name", "user-request-manager") },
    { key: "email", label: __("Email", "user-request-manager") },
    { key: "message", label: __("Message", "user-request-manager") },
    { key: "status", label: __("Status", "user-request-manager") },
    { key: "date", label: __("Date", "user-request-manager") },
    { key: "actions", label: __("Actions", "user-request-manager") },
  ];

  const renderCell = (row, key) => {
    if (key === "status") {
      const status = row[key]; // Get the status value from the row
      const className = `tag-${status.toLowerCase()}`; // Convert status to lowercase and form the class name
      return <span className={className}>{status}</span>; // Apply the class name to the span
    }

    if (key === "actions") {
      return (
        <Button onClick={() => onSelectRequest(row)}>
          {__("View Details", "user-request-manager")}
        </Button>
      );
    }
    return row[key];
  };

  return (
    <div className="request-table-container">
      <Table headers={headers} data={requests} renderCell={renderCell} />
    </div>
  );
}

export default RequestTable;
