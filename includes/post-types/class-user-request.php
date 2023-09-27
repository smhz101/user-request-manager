<?php

namespace URM\Includes\PostTypes;

/**
 * Class User_Request
 *
 * Handles the custom post type and taxonomy for user requests.
 *
 * @package URM\Includes\PostTypes
 */
class User_Request {

    /**
     * User_Request constructor.
     */
    public function __construct() {
        add_action('init', array($this, 'register_post_type'));
        add_action('init', array($this, 'register_taxonomy'));
        add_action('init', array($this, 'add_default_terms'), 11);
    }

    /**
     * Registers the 'user_request' post type.
     */
    public function register_post_type() {
        $args = array(
            'public' => false,
            'show_ui' => false,
            'has_archive' => false,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'show_in_nav_menus' => false,
            'label'  => __('User Requests', 'user-request-manager'),
            'supports' => array('title', 'editor', 'author'),
            'show_in_rest' => true,
        );
        register_post_type('user_request', $args);
    }

    /**
     * Registers the 'status' taxonomy for the 'user_request' post type.
     */
    public function register_taxonomy() {
        register_taxonomy('status', 'user_request', array(
            'label' => __('Status', 'user-request-manager'),
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'hierarchical' => true,
        ));
    }

    /**
     * Adds default terms for the 'status' taxonomy.
     */
    public function add_default_terms() {
        $terms = array('unread', 'read', 'complete');
        foreach ($terms as $term) {
            if (!term_exists($term, 'status')) {
                wp_insert_term($term, 'status');
            }
        }
    }
}
