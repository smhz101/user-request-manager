jQuery(document).ready(function ($) {
  // Open the modal
  $("#floatButton").click(function () {
    $("#customModal").addClass("active");
    $("#modalOverlay").addClass("active");
  });

  // Close the modal when the close button or overlay is clicked
  $("#closeModal, #modalOverlay").click(function () {
    $("#customModal").removeClass("active");
    $("#modalOverlay").removeClass("active");
  });

  // Prevent the modal from closing when it's clicked directly
  $("#customModal").click(function (event) {
    event.stopPropagation();
  });

  // Initially hide the customSubject
  $("#customSubject").hide();

  // Toggle customSubject input based on dropdown value
  $("#subjectDropdown").on("change", function () {
    if ($(this).val() === "custom") {
      $("#customSubject").show();
    } else {
      $("#customSubject").hide();
    }
  });

  // Submit form using jQuery
  $("#userRequestForm").submit(function (e) {
    e.preventDefault();

    // Validation
    var email = $("#userEmail").val();
    var message = $("#message").val();
    // var subject = $("#subjectDropdown").val();
    // var customSubject = $("#customSubject").val();

    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    if (!message) {
      alert("Please enter a message.");
      return;
    }

    // if (subject === "custom" && !customSubject) {
    //   alert("Please enter a custom subject.");
    //   return;
    // }

    // Show loader
    $("#loader").show();
    $.ajax({
      url: urm_frontend.rest_url + "urm/v1/user-requests",
      type: "POST",
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-WP-Nonce", urm_frontend.nonce);
      },
      data: {
        user_email: $("#userEmail").val(),
        subject: $("#subjectDropdown").val(),
        custom_subject: $("#customSubject").val(),
        message: $("#message").val(),
      },
      success: function (response) {
        // Hide loader
        $("#loader").hide();

        // Show success message in the modal
        $("#customModal").html("<p>" + response.message + "</p>");
      },
      error: function (response) {
        // Hide loader
        $("#loader").hide();

        // Show error message in the modal
        $("#customModal").html("<p>Error! Something went wrong.</p>");
      },
    });
  });
});
