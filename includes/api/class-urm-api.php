<?php
/**
 * User Request Manager API Class
 *
 * Handles custom API endpoints for the User Request Manager plugin.
 */

namespace URM\API;

use WP_REST_Request;
use WP_REST_Response;

/**
 * Class URM_API
 *
 * Handles custom API endpoints for the User Request Manager.
 *
 * @package URM\API
 */
class URM_API {

    /**
     * URM_API constructor.
     */
    public function __construct() {
        add_action('rest_api_init', [$this, 'register_endpoints']);
    }

    /**
     * Registers the custom API endpoints.
     */
    public function register_endpoints() {
        // @TODO: Later will enhance permission checks for more security.

        register_rest_route('urm/v1', '/user-requests', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_user_requests'],
            'permission_callback' => '__return_true',
        ));

        register_rest_route('urm/v1', '/user-requests', array(
            'methods' => 'POST',
            'callback' => [$this, 'save_user_requests'],
            'permission_callback' => '__return_true',
        ));

        register_rest_route('urm/v1', '/user-requests/(?P<id>\d+)/status', array(
            'methods' => 'POST',
            'callback' => [$this, 'update_request_status'],
            'args' => array(
                'id' => array(
                    'validate_callback' => function($param, $request, $key) {
                        return is_numeric($param);
                    }
                ),
            ),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('urm/v1', '/settings', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => [$this, 'permissions_check'],
        ));

        register_rest_route('urm/v1', '/settings', array(
            'methods' => 'POST',
            'callback' => [$this, 'save_settings'],
            'permission_callback' => [$this, 'permissions_check'],
        ));

        register_rest_route('urm/v1', '/requests-by-user', array(
            'methods' => 'GET',
            'callback' => [$this, 'get_request_by_user'], // replace with your function name
            'args' => array(
                'identifier' => array(
                    'required' => true,
                    'validate_callback' => function($param, $request, $key) {
                        // Check if identifier is a valid email or numeric (user ID)
                        return (filter_var($param, FILTER_VALIDATE_EMAIL) || is_numeric($param));
                    }
                ),
            ),
        ));

        register_rest_route('urm/v1', '/send-response', array(
            'methods' => 'POST',
            'callback' => [$this, 'send_response'],
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Checks if the user is logged in.
     *
     * @return bool True if the user is logged in, otherwise false.
     */
    public function permissions_check() {
        return is_user_logged_in();
    }

    /**
     * Fetches all user requests.
     *
     * @return WP_REST_Response The response object.
     */
    public function get_user_requests() {
        $args = array(
            'post_type' => 'user_request',
            'posts_per_page' => -1,
        );

        $posts = get_posts($args);

        $requests = array();

        foreach ($posts as $post) {
            $email = get_post_meta($post->ID, '_urm_user_email', true);
            $status_terms = wp_get_post_terms($post->ID, 'status');

            // Check if user exists by email
            $user = get_user_by('email', $email);
            if ($user) {
                // Check if the user is a WooCommerce customer
                if (in_array('customer', $user->roles)) {
                    $role_class = 'customer';
                    $role_label = 'Customer';
                } else {
                    $role_class = 'user';
                    $role_label = 'User';
                }
            } else {
                $role_class = 'guest';
                $role_label = 'Guest';
            }

            $requests[] = array(
                'id' => $post->ID,
                'subject' => $post->post_title,
                'message' => $post->post_content,
                'email' => $email,
                'date' => $post->post_date,
                'status' => !empty($status_terms) ? $status_terms[0]->name : 'N/A',
                'role_class' => $role_class,
                'role_label' => $role_label
            );
        }

        return new WP_REST_Response(array('requests' => $requests), 200);
    }

    /**
     * Fetches requests based on the user's email or ID.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response The response object.
     */
    public function get_request_by_user(WP_REST_Request $request) {
        // Get the identifier from the request's query parameters
        $identifier = $request->get_param('identifier');

        // If the identifier isn't provided, return an error
        if (!$identifier) {
            return new WP_REST_Response(array('error' => 'Identifier parameter is required.'), 400);
        }

        // First, try to fetch by email
        $email_posts = get_posts(array(
            'post_type' => 'user_request',
            'posts_per_page' => -1,
            'meta_key' => '_urm_user_email',
            'meta_value' => $identifier
        ));

        if (!empty($email_posts)) {
            // If posts found by email, use them
            $posts = $email_posts;
        } elseif (is_numeric($identifier)) {
            $user = get_user_by('id', $identifier);
            $posts = get_posts(array(
                'post_type' => 'user_request',
                'posts_per_page' => -1,
                'meta_key' => '_urm_user_email',
                'meta_value' => $user->user_email
            ));
        } else {
            return new WP_REST_Response(array('error' => 'User not found'), 404);
        }

        $messages = array();

        foreach ($posts as $post) {
            $status_terms = wp_get_post_terms($post->ID, 'status');
            $messages[] = array(
                'id' => $post->ID,
                'subject' => $post->post_title,
                'message' => $post->post_content,
                'date' => $post->post_date,
                'status' => !empty($status_terms) ? $status_terms[0]->name : 'N/A',
                'route' => get_post_meta($post->ID, '_urm_route', true),
            );
        }

        // Return the user requests in the response
        return new WP_REST_Response(array('requests' => $messages), 200);
    }

    /**
     * Sends a response email to the user.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response The response object.
     */
    public function send_response(WP_REST_Request $request) {
        $message_content = $request->get_param('message');
        $email = $request->get_param('email');

        // Validate the provided parameters
        if (!$message_content || !$email) {
            return new WP_REST_Response(array('message' => 'Message and email are required.'), 400);
        }

        // Send the email
        $sent = wp_mail($email, 'Response to Your Query', $message_content);

        if (!$sent) {
            return new WP_REST_Response(array('message' => 'Failed to send the email.'), 500);
        }

        // Save the message in the database as a user_request post type
        $post_id = wp_insert_post(array(
            'post_type' => 'user_request',
            'post_title' => 'Response to User Query',
            'post_content' => $message_content,
            'post_status' => 'publish',
            'post_author' => get_current_user_id(),
        ));

        // Assign the default 'unread' status to the post
        if ($post_id) {
            wp_set_object_terms($post_id, 'unread', 'status');
            update_post_meta($post_id, '_urm_user_email', $email);
            update_post_meta($post_id, '_urm_route', 'outgoing');
        }

        return new WP_REST_Response(array('message' => 'Response sent successfully.'), 200);
    }

    /**
     * Saves the user requests.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response The response object.
     */
    public function save_user_requests(WP_REST_Request $request) {
        // Get the nonce from header
        $nonce = $request->get_header('X-WP-Nonce');

        // Verify the nonce
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_REST_Response(array('message' => 'Nonce verification failed.'), 401);
        }

        $email = sanitize_email($request->get_param('user_email'));
        $subject = sanitize_text_field($request->get_param('subject'));
        $message = sanitize_textarea_field($request->get_param('message'));

        // Check for required fields
        if (empty($email) || empty($subject) || empty($message)) {
            return new WP_REST_Response(array('message' => 'All fields are required.'), 400);
        }

        $post_id = wp_insert_post(array(
            'post_type' => 'user_request',
            'post_title' => $subject,
            'post_content' => $message,
            'post_status' => 'publish',
            'post_author' => get_current_user_id(),
        ));

        // Assign the default 'unread' status to the post
        if ($post_id) {
            wp_set_object_terms($post_id, 'unread', 'status');
            // Save the email as post meta data
            update_post_meta($post_id, '_urm_user_email', $email);
            update_post_meta($post_id, '_urm_route', 'incoming');
        }

        // Check if auto-reply is enabled and send the auto-reply email
        $option = get_option('urm_settings');
        if (isset($option['general']['autoReply']) && $option['general']['autoReply'] === true) {
            $autoReplyMessage = $option['general']['autoReplyMessage'];
            wp_mail($email, _e('Thank you for contacting us', 'user-request-manager'), $autoReplyMessage);
        }

        return new WP_REST_Response(array('message' => 'Request submitted successfully.'), 200);

        wp_die();
    }

    /**
     * Updates the status of a user request.
     *
     * This function updates the status taxonomy term for a specified 'user_request' post type.
     * It accepts a WP_REST_Request object that contains the request parameters, including the request ID and the new status.
     *
     * @param WP_REST_Request $request The WP_REST_Request object, containing request parameters.
     *
     * @return WP_REST_Response A WP_REST_Response object containing the response data.
     *
     * @throws WP_Error If the nonce verification fails.
     * @throws WP_Error If the term update fails.
     */
    public function update_request_status(WP_REST_Request $request) {
        // Get the nonce from header
        $nonce = $request->get_header('X-WP-Nonce');

        // Verify the nonce
        if (!wp_verify_nonce($nonce, 'wp_rest')) {
            return new WP_REST_Response(array('message' => 'Nonce verification failed.'), 401);
        }

        // Get the ID and status from the request
        $id = $request['id'];

        $json = $request->get_json_params();
        $status = isset($json['status']) ? $json['status'] : null;

        $check_status = term_exists($status, 'status');

        // Verify that the term exists
        if (!$check_status) {
            return new WP_REST_Response(array('message' => 'Invalid status'), 400);
        }

        // Update the taxonomy term for this post
        $updated = wp_set_post_terms($id, array($check_status['term_id']), 'status');

        if (is_wp_error($updated)) {
            return new WP_REST_Response(array('message' => $updated->get_error_message()), 500);
        }

        return new WP_REST_Response(array('message' => 'Status updated successfully'), 200);
    }


    /**
     * Fetches the plugin's settings.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response The response object.
     */
    public function get_settings(WP_REST_Request $request) {
        // Fetch settings from the database
        $settings = get_option('urm_settings', array());
        return new WP_REST_Response($settings, 200);
    }

    /**
     * Saves the plugin's settings.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response The response object.
     */
    public function save_settings(WP_REST_Request $request) {
        $settings = $request->get_json_params();
        update_option('urm_settings', $settings);
        return new WP_REST_Response(array('message' => 'Settings updated successfully'), 200);
    }

}

// Initialize the class.
new URM_API();
