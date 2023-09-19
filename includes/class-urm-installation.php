<?php

namespace URM\Includes;

class URM_Installation {

  private static $instance = null;

  private function __construct() {
    // private constructor to prevent direct object creation
  }

  // Singleton instance
  public static function instance() {
    if (null === self::$instance) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  public function install() {
    $this->urm_set_default_options();

    // Flush the rewrite rules
    flush_rewrite_rules();
  }

  public function urm_set_default_options() {
    $default_options = array(
      'general' => array(
        'activateRequests' => true,
        'defaultStatus' => '',
        'autoReply' => true,
        'autoReplyMessage' => "Dear [User's Name],\n\nThank you for reaching out to us!\n\nWe have received your request and our team will review it shortly. We strive to respond as quickly as possible, and we truly appreciate your patience in the meantime.\n\nIf you have any other questions or need further assistance, don't hesitate to reach out.\n\nWarm regards,\n\n[Your Team or Company Name]",
        'notificationEmail' => '',
        'requestLimit' => '',
        'enableCaptcha' => false,
      ),
      'notifications' => array (
        'enableNotifications' => true,
        'notificationRecipients' => '',
        'notificationSubject' => '',
        'notificationMessage' => '',
        'notificationFrequency' => 'Instantly',
        'includeResolved' => false,
      ),
      'appearance' => array (
        'themeColor' => '#2d8086',
        'fontFamily' => '',
        'fontSize' => '',
        'customCSS' => '',
        'tableRowHighlightColor' => '',
        'buttonHoverColor' => '#702424',
        'modalBackgroundColor' => '',
      ),
      'advanced' => array (
        'apiKey' => '',
        'debugMode' => false,
        'customEndpoint' => '',
        'dataRetention' => '',
        'importData' => '',
      )
    );

    // Check if 'urm_settings' already exists
    if ( false === get_option('urm_settings') ) {
      add_option('urm_settings', $default_options);
    }
  }

}