<?php
/**
 * Plugin Name: User Request Manager
 * Plugin URI: https://wpthemepress.com/plugins/user-request-manager
 * Description: A comprehensive solution to manage user requests, integrate with WooCommerce, and provide dynamic admin interfaces using React.
 * Version: 1.0
 * Author: Muzammil Hussain
 * Author URI: https://muzammil.dev
 * Text Domain: user-request-manager
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Email: dev@muzammil.dev
 *
 * @package UserRequestManager
 */

// Ensure direct access is blocked
defined('ABSPATH') or die(esc_html__('No script kiddies please!', 'user-request-manager'));

// Define constants
define( 'URM_PATH', plugin_dir_path(__FILE__) );
define( 'URM_MAIN', plugin_dir_url(__FILE__) );

// Include class files
require_once URM_PATH . 'includes/post-types/class-user-request.php';
require_once URM_PATH . 'admin/class-urm-admin.php';
require_once URM_PATH . 'includes/class-urm-enqueue-scripts.php';
require_once URM_PATH . 'includes/api/class-urm-api.php';
require_once URM_PATH . 'public/class-urm-public.php';

// Instantiate classes
$urm_post_type = new URM\Includes\PostTypes\User_Request();
$urm_admin_menu = new URM\Admin\URM_Admin_Menu();
$urm_enqueue_scripts = new URM\Includes\URM_Enqueue_Scripts();
$urm_frontend_loader = new URM\Frontend\URM_Public();

/**
 * Load plugin text domain for translations.
 */
function user_requests_manager_load_textdomain() {
    load_plugin_textdomain('user-requests-manager', false, basename(dirname(__FILE__)) . '/languages');
}
add_action('plugins_loaded', 'user_requests_manager_load_textdomain');
