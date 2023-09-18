<?php

namespace URM\Admin;

class URM_Admin_Menu {

    public function __construct() {
        add_action('admin_menu', array($this, 'create_settings_page'));
        add_action('admin_footer', array($this, 'urm_admin_footer_script'));
    }

    public function create_settings_page() {
        add_menu_page(
            __('User Request Manager', 'user-requests-manager'),
            __('URM', 'user-requests-manager'),
            'manage_options',
            'urm-dashboard',
            array($this, 'render_react_page'),
            'dashicons-admin-tools',
            20
        );

        // Dashboard (this will duplicate the main menu item, so it's optional)
        add_submenu_page(
            'urm-dashboard',
            __('Dashboard', 'user-requests-manager'),
            __('Dashboard', 'user-requests-manager'),
            'manage_options',
            'urm-dashboard', // Same as parent slug to avoid duplicate menu items
            array($this, 'render_react_page')
        );

        // All Requests
        add_submenu_page(
            'urm-dashboard',
            __('All Requests', 'user-requests-manager'),
            __('All Requests', 'user-requests-manager'),
            'manage_options',
            'urm-all-requests',
            array($this, 'render_react_page')
        );

        // Settings
        add_submenu_page(
            'urm-dashboard',
            __('Settings', 'user-requests-manager'),
            __('Settings', 'user-requests-manager'),
            'manage_options',
            'urm-settings',
            array($this, 'render_react_page')
        );

    }

    public function render_react_page() {
        echo '<div id="urm-settings-root"></div>'; // This is where your React app will mount
    }

    function urm_admin_footer_script() {
        $page = $_GET['page'] ?? '';
        $hash = '';

        switch ($page) {
            case 'urm-dashboard':
                $hash = '#/dashboard';
                break;
            case 'urm-all-requests':
                $hash = '#/all-requests';
                break;
            case 'urm-settings':
                $hash = '#/settings';
                break;
        }

        if ($hash) {
            echo "<script type='text/javascript'>
                if (!window.location.hash) {
                    window.location.hash = '{$hash}';
                }
            </script>";
        }
    }

}
