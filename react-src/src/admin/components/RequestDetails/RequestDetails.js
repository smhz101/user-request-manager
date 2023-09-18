import React, { useEffect, useState } from "react";
import { __ } from "@wordpress/i18n";
import { Form, Textarea, Button } from "../../common";
import { fetchRequestsForUser, sendResponse } from "../../../services/api";

import "./RequestDetails.css";

/**
 * Displays the details for a specific request.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.request - The request details.
 */
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
      alert(__("Response sent successfully.", "user-request-manager"));
      setResponseMessage("");
      if (response.success) {
        setSuccessMessage(
          __("Message sent successfully!", "user-request-manager")
        );
      } else {
        setSuccessMessage(
          __(
            "Failed to send the message. Please try again.",
            "user-request-manager"
          )
        );
      }

      setIsLoading(false);
    } catch (error) {
      alert(
        __(
          "Failed to send response. Please try again later.",
          "user-request-manager"
        )
      );
    }
  };

  return (
    <div className="request-details-container">
      <h2 className="request-user-name">
        {__("Muzammil Hussain", "user-request-manager")}
      </h2>
      <p className="request-email">{request.email}</p>
      <p className="request-date">{request.date}</p>

      <div className="request-details-content">
        {request && (
          <>
            <h3 className="current-message-title">
              {__("Current Message", "user-request-manager")}
            </h3>
            <p>{request.message}</p>

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
          <h4>{__("Send a Response", "user-request-manager")}</h4>

          <Textarea
            placeholder={__(
              "Type your response here...",
              "user-request-manager"
            )}
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
              __("Send Response", "user-request-manager")
            )}
          </Button>

          {successMessage && <p>{successMessage}</p>}
        </Form>
      </div>
    </div>
  );
}

export default RequestDetails;
