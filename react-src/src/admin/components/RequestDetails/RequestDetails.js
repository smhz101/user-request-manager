import React, { useEffect, useState } from "react";
import { Form, Textarea, Button } from "../../common";
import { fetchRequestsForUser, sendResponse } from "../../../services/api";

import "./RequestDetails.css";

function RequestDetails({ request }) {
  const [messages, setMessages] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (request && request.email) {
        const data = await fetchRequestsForUser(request.email);
        setMessages(data.requests || []);
      }
    }
    fetchData();
  }, [request]);

  const handleResponseSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendResponse(request.email, responseMessage);
      alert("Response sent successfully.");
      // Optionally, you can clear the message field after sending
      setResponseMessage("");
      if (response.success) {
        setSuccessMessage("Message sent successfully!");
      } else {
        setSuccessMessage("Failed to send the message. Please try again.");
      }

      setIsLoading(false);
    } catch (error) {
      alert("Failed to send response. Please try again later.");
    }
  };

  return (
    <div className="request-details-container">
      <h2 className="request-user-name">Muzammil Hussain</h2>
      <p className="request-email">{request.email}</p>
      <p className="request-date">{request.date}</p>

      <div className="request-details-content">
        {request && (
          <>
            <h3 className="current-message-title">Current Message</h3>
            {/* Current message content */}
            <p>{request.message}</p>

            {/* Placeholder for previous messages */}
            <div className="messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.route}`}>
                  <p>{msg.message}</p>
                  <span className="message-time">{msg.date}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="response-form">
        <Form onSubmit={handleResponseSubmit}>
          <h4>Send a Response</h4>

          <Textarea
            placeholder="Type your response here..."
            value={responseMessage}
            onChange={(e) => setResponseMessage(e.target.value)}
            disabled={isLoading}
          />

          <Button
            type="submit"
            className="response-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="dashicons dashicons-update"></span>
            ) : (
              "Send Response"
            )}
          </Button>

          {successMessage && <p>{successMessage}</p>}
        </Form>
      </div>
    </div>
  );
}

export default RequestDetails;
