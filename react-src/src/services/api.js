/* global urmReactVars */

import axios from "axios";

export const fetchUserRequests = async () => {
  const response = await axios.get("/wp-json/urm/v1/user-requests", {
    headers: {
      "X-WP-Nonce": urmReactVars.nonce, // Use the localized nonce here
    },
  });

  return response.data.requests;
};

export const sendResponse = async (email, message) => {
  try {
    const response = await axios.post(
      "/wp-json/urm/v1/send-response",
      {
        email,
        message,
      },
      {
        headers: {
          "X-WP-Nonce": urmReactVars.nonce,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to send response:", error);
    throw error;
  }
};

export const fetchRequestsForUser = async (identifier) => {
  const response = await axios.get(
    `/wp-json/urm/v1/requests-by-user?identifier=${identifier}`,
    {
      headers: {
        "X-WP-Nonce": urmReactVars.nonce, // Use the localized nonce here
      },
    }
  );

  return response.data;
};

export async function fetchSettings() {
  const response = await axios.get("/wp-json/urm/v1/settings", {
    headers: {
      "X-WP-Nonce": urmReactVars.nonce, // Use the localized nonce here
    },
  });
  return response.data;
}

export async function saveSettings(data) {
  const response = await axios.post("/wp-json/urm/v1/settings", data, {
    headers: {
      "Content-Type": "application/json",
      "X-WP-Nonce": urmReactVars.nonce,
    },
  });
  return response.data;
}
