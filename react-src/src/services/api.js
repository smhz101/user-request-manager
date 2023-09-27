/* global urmReactVars */

import axios from "axios";
import { addQueryArgs } from "@wordpress/url";
// Importing the internationalization function
import { __ } from "@wordpress/i18n";

const BASE_URL = "/wp-json/urm/v1";

/**
 * Constructs the headers for axios requests.
 *
 * @param {boolean} isJSON - Whether to include the JSON content type header.
 * @returns {Object} - Headers object.
 */
const getHeaders = (isJSON = true) => {
  let headers = {
    "X-WP-Nonce": urmReactVars.nonce,
  };

  if (isJSON) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
};

/**
 * Fetch user requests.
 *
 * @returns {Promise<Object[]>} - An array of user requests.
 */
export const fetchUserRequests = async () => {
  const response = await axios.get(addQueryArgs(`${BASE_URL}/user-requests`), {
    headers: getHeaders(false),
  });

  return response.data.requests;
};

/**
 * Send a response.
 *
 * @param {string} email - The email to send the response to.
 * @param {string} message - The response message.
 * @returns {Promise<Object>} - Response data.
 * @throws Will throw an error if the request fails.
 */
export const sendResponse = async (email, message) => {
  try {
    const response = await axios.post(
      addQueryArgs(`${BASE_URL}/send-response`),
      { email, message },
      { headers: getHeaders() }
    );

    return response.data;
  } catch (error) {
    console.error(
      __("Failed to send response:", "user-request-manager"),
      error
    );
    throw error;
  }
};

/**
 * Fetch requests for a specific user.
 *
 * @param {string} identifier - The user's identifier.
 * @returns {Promise<Object>} - Data related to the user's requests.
 */
export const fetchRequestsForUser = async (identifier) => {
  const response = await axios.get(
    addQueryArgs(`${BASE_URL}/requests-by-user`, { identifier }),
    { headers: getHeaders(false) }
  );

  return response.data;
};

/**
 * Fetch settings.
 *
 * @returns {Promise<Object>} - The settings data.
 */
export async function fetchSettings() {
  const response = await axios.get(addQueryArgs(`${BASE_URL}/settings`), {
    headers: getHeaders(false),
  });
  return response.data;
}

/**
 * Save settings.
 *
 * @param {Object} data - The settings data to save.
 * @returns {Promise<Object>} - The saved settings data.
 */
export async function saveSettings(data) {
  const response = await axios.post(
    addQueryArgs(`${BASE_URL}/settings`),
    data,
    {
      headers: getHeaders(),
    }
  );
  return response.data;
}

/**
 * Updates the status of a user request by making an API call.
 *
 * @async
 * @param {number|string} id - The ID of the request to be updated.
 * @param {string} status - The new status to be assigned to the request.
 * @returns {Promise<Object>} The data from the response as a JavaScript object.
 * @throws {Error} Throws an error if the API request fails.
 */
export async function updateRequestStatus(id, status) {
  const response = await axios.post(
    addQueryArgs(`${BASE_URL}/user-requests/${id}/status`),
    { status: status },
    {
      headers: getHeaders(),
    }
  );
  return response.data;
}
