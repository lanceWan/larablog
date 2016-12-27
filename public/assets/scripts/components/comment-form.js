// CommentForm
var CommentForm = function() {
    "use strict";

    // Handle CommentForm
    var handleCommentForm = function() {
        function submitForm(formId) {
            $(formId).submit(function(event) {
                var formData = $(this).serialize();
                $.ajax({
                    url: "include/php/comment-form.php",
                    type: "POST",
                    data: formData,
                    success: function(response) {
                        if (JSON.parse(response).status == 'success') {
                            var n = noty({text: '<div class="alert alert-box-general margin-b-0"> <div class="theme-icons-wrap"><i class="alert-box-element theme-icons theme-icons-teal-bg theme-icons-md radius-circle fa fa-check"></i></div> <div class="alert-box-body"><span class="alert-box-title color-teal">Congratulations!</span><p class="alert-box-paragraph">Your message successfully sent.</p></span></div> <div class="theme-noty-close"></div></div>', layout: 'topRight'}).setTimeout(3000); 
                        } else if (JSON.parse(response).status == 'error') {
                            var n = noty({text: '<div class="alert alert-box-general margin-b-0"> <div class="theme-icons-wrap"><i class="alert-box-element theme-icons theme-icons-gold-bg theme-icons-md radius-circle fa fa-bell"></i></div> <div class="alert-box-body"><span class="alert-box-title color-gold">Heads up!</span><p class="alert-box-paragraph">Your message has not sent.</p></span></div> <div class="theme-noty-close"></div></div>', layout: 'topRight'}).setTimeout(3000); 
                        }
                    }
                });
                return false;
            });
        }
        submitForm("#comment-form");
    }

    return {
        init: function() {
            handleCommentForm(); // initial setup for CommentForm
        }
    }
}();

$(document).ready(function() {
    CommentForm.init();
});
