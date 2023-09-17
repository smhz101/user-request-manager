<?php

namespace URM\Includes;

class URM_Enqueue_Scripts {

    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'custom_enqueue_scripts'));
    }

    public function enqueue_admin_scripts() {
        wp_enqueue_script('urm-react-app', URM_MAIN . 'react-src/build/static/js/main.js', array(), '1.0.0', true);
        wp_enqueue_style('urm-react-app', URM_MAIN . 'react-src/build/static/css/main.css', array(), '1.0.0');

        // Localize the script with your nonce
        wp_localize_script('urm-react-app', 'urmReactVars', array(
            'root' => esc_url_raw( rest_url() ),
            'nonce' => wp_create_nonce( 'wp_rest' )
        ));
    }

    function custom_enqueue_scripts() {
        wp_enqueue_script('jquery');
        wp_enqueue_script('urm-frontend-app', URM_MAIN . 'assets/js/modal-form.js', array('jquery'), '1.0', true );
        wp_enqueue_style('urm-frontend-app', URM_MAIN . 'assets/css/modal-form.css' );

        // Adding localized variables to the script
        wp_localize_script('urm-frontend-app', 'urm_frontend', array(
            'rest_url' => rest_url(),
            'nonce' => wp_create_nonce('wp_rest')
        ));
    }


}