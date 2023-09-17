// RequestTable.js
import React from "react";
import { Button, Table } from "../../common"; // Importing the common components
import "./RequestTable.css";

function RequestTable({ requests, onSelectRequest }) {
  const headers = [
    { key: "id", label: "ID" },
    { key: "username", label: "User Name" },
    { key: "email", label: "Email" },
    { key: "message", label: "Message" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "actions", label: "Actions" },
  ];

  const renderCell = (row, key) => {
    if (key === "actions") {
      return <Button onClick={() => onSelectRequest(row)}>View Details</Button>;
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
