<?php

namespace URM\Frontend;

class URM_Public {

  public function __construct() {
    add_action('wp_footer', array($this, 'add_frontend_modal_content'));
  }

  public function add_frontend_modal_content() {
      ?>

      <!-- Floating Button -->
      <button id="floatButton" class="button-styled button-float">Open Modal</button>

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
            <label for="userEmail">Email</label>
            <input type="email" name="user_email" id="userEmail" class="form-input">
          </div>
          <div class="form-group">
            <label for="subjectDropdown">Subject</label>
            <select name="subject" id="subjectDropdown" class="form-select">
              <option value="issue1">Issue 1</option>
              <!-- ... other issues ... -->
              <option value="custom">Custom</option>
            </select>
          </div>
          <div class="form-group">
            <label for="customSubject">Custom Subject</label>
            <input type="text" name="custom_subject" id="customSubject" class="form-input">
          </div>
          <div class="form-group">
            <label for="message">Request</label>
            <textarea name="message" id="message" class="form-textarea"></textarea>
          </div>
          <div class="form-group">
            <button type="submit" class="form-button">Submit</button>
          </div>
        </form>
        <button id="closeModal">Close</button>
      </div>

      <?php
  }

}