<?php

namespace URM\Includes\PostTypes;

class User_Request {

    public function __construct() {
        add_action('init', array($this, 'register_post_type'));
        add_action('init', array($this, 'register_taxonomy'));
        add_action('init', array($this, 'add_default_terms'), 11);
    }

    public function register_post_type() {
        $args = array(
            'public' => false,
            'show_ui' => false,
            'has_archive' => false,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'show_in_nav_menus' => false,
            'label'  => 'User Requests',
            'supports' => array('title', 'editor', 'author'),
            'show_in_rest' => true,
        );
        register_post_type('user_request', $args);
    }

    public function register_taxonomy() {
        register_taxonomy('status', 'user_request', array(
            'label' => 'Status',
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'hierarchical' => true,
            'supports' => array('title')
        ));
    }

    public function add_default_terms() {
        $terms = array('unread', 'in-process', 'complete');
        foreach ($terms as $term) {
            if (!term_exists($term, 'status')) {
                wp_insert_term($term, 'status');
            }
        }
    }
}