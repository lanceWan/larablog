// Login
var Login = function() {
    "use strict";

    // Login Form
    var handleLoginForm = function() {
        $(".login-form").validate({
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            }
            }), $(".login-form input").keypress(function(e) {
            return 13 == e.which ? ($(".login-form").validate().form() && $(".login-form").submit(), !1) : void 0
        })
    };

    // Forgot Password Form
    var handleForgotPasswordForm = function() {
        $(".forgot-password-form").validate({
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Email is required."
                }
            }
        }), $(".forgot-password-form input").keypress(function(e) {
            return 13 == e.which ? ($(".forgot-password-form").validate().form() && $(".forgot-password-form").submit(), !1) : void 0
        }), $("#forgot-password").on('click', function() {
            $(".login-form").hide(), $(".forgot-password-form").show()
        }), $("#back-btn").on('click', function() {
            $(".login-form").show(), $(".forgot-password-form").hide()
        })
    };

    // Signup Form
    var handleSignupForm = function() {
        $(".signup-form").validate({
            ignore: "",
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                username: {
                    required: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                confirm_password: {
                    required: true,
                    minlength: 6,
                    equalTo: "#signup_password"
                }
            },
            messages: {
                name: "Please enter your name",
                email: "Please enter a valid email address",
                username: {
                    required: "Please enter a username",
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long"
                },
                confirm_password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 6 characters long",
                    equalTo: "Please enter the same password as above"
                }
            }
        }), $(".signup-form input").keypress(function(e) {
            return 13 == e.which ? ($(".signup-form").validate().form() && $(".signup-form").submit(), !1) : void 0
        }), $("#go-to-signup-form-btn").on('click', function() {
            $(".login-form").hide(), $(".signup-form").show()
        }), $("#back-to-login-form-btn").on('click', function() {
            $(".login-form").show(), $(".signup-form").hide()
        })
    };
    return {
        init: function() {
            handleLoginForm(); // initial setup for login form
            handleForgotPasswordForm(); // initial setup for forgot password form
            handleSignupForm(); // initial setup for signup form
        }
    }
}();

$(document).ready(function() {
    Login.init()
});