<?php
/**
 * User Request Manager Public Class
 *
 * Handles frontend display and modals for the User Request Manager plugin.
 */

namespace URM\Frontend;

/**
 * Class URM_Public
 *
 * Handles frontend display for the User Request Manager.
 *
 * @package URM\Frontend
 */
class URM_Public {

    /**
     * URM_Public constructor.
     */
    public function __construct() {
        add_action('wp_footer', array($this, 'add_frontend_modal_content'));
    }

    /**
     * Outputs the modal content and floating button in the footer.
     */
    public function add_frontend_modal_content() {
        ?>

        <!-- Floating Button -->
        <button id="floatButton" class="button-styled button-float"><?php _e('Open Modal', 'user-requests-manager'); ?></button>

        <!-- Modal Structure -->
        <div id="modalOverlay"></div>
        <div id="customModal">

            <div id="loader" style="display: none;">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" stroke-linecap="round" stroke="#000">
                        <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.8s" repeatCount="indefinite"></animateTransform>
                    </circle>
                </svg>
            </div>

            <form id="userRequestForm">
                <div class="form-group">
                    <label for="userEmail"><?php _e('Email', 'user-requests-manager'); ?></label>
                    <input type="email" name="user_email" id="userEmail" class="form-input">
                </div>
                <div class="form-group">
                    <label for="subjectDropdown"><?php _e('Subject', 'user-requests-manager'); ?></label>
                    <select name="subject" id="subjectDropdown" class="form-select">
                        <option value="issue1"><?php _e('Issue 1', 'user-requests-manager'); ?></option>
                        <!-- @TODO: Later will add dynamically populating the options based on admin settings -->
                        <option value="custom"><?php _e('Custom', 'user-requests-manager'); ?></option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="customSubject"><?php _e('Custom Subject', 'user-requests-manager'); ?></label>
                    <input type="text" name="custom_subject" id="customSubject" class="form-input">
                </div>
                <div class="form-group">
                    <label for="message"><?php _e('Request', 'user-requests-manager'); ?></label>
                    <textarea name="message" id="message" class="form-textarea"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="form-button"><?php _e('Submit', 'user-requests-manager'); ?></button>
                </div>
            </form>
            <button id="closeModal"><?php _e('Close', 'user-requests-manager'); ?></button>
        </div>

        <?php
    }
}
