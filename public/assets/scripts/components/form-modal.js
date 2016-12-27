// Form Modal
var FormModal = function() {
    "use strict";

    // Handle Form Modal Tab
    var handleFormModalTab = function() {
        $(document).ready(function($){
            var $form_modal = $('.form-modal'),
                $form_login = $form_modal.find('#form-modal-login'),
                $form_signup = $form_modal.find('#form-modal-signup'),
                $form_forgot_password = $form_modal.find('#form-modal-reset-password'),

                $form_modal_tab = $('.form-modal-switcher'),
                $tab_login = $form_modal_tab.children('.form-modal-switcher-item').eq(0),
                $tab_signup = $form_modal_tab.children('.form-modal-switcher-item').eq(1),

                $forgot_password_link = $form_login.find('.form-modal-back-btn'),
                $form_signup_link = $form_login.find('.form-modal-back-btn'),
                $back_to_login_link = $form_forgot_password.find('.form-modal-back-btn'),
                $main_nav = $('.form-modal-nav');

            //open modal
            $main_nav.on('click', function(event){
                if( $(event.target).is($main_nav) ) {
                    // on mobile open the submenu
                    $(this).children('ul').toggleClass('is-visible');
                } else {
                    // on mobile close submenu
                    $main_nav.children('ul').removeClass('is-visible');
                    //show modal layer
                    $form_modal.addClass('is-visible');
                    //show the selected form
                    ( $(event.target).is('.form-modal-signup') ) ? signup_selected() : login_selected();
                }
            });

            //close modal
            $('.form-modal').on('click', function(event){
                if ( $(event.target).is('.form-modal-close-form') ) {
                    $form_modal.removeClass('is-visible');
                }
            });

            //switch from a tab to another
            $form_modal_tab.on('click', function(event) {
                event.preventDefault();
                ( $(event.target).is( $tab_login ) ) ? login_selected() : signup_selected();
            });

            //hide or show password
            $('.form-modal-hide-password').on('click', function(){
                var $this= $(this),
                    $password_field = $this.prev('input');

                ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
                ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
            });

            //show forgot-password form
            $forgot_password_link.on('click', function(event){
                event.preventDefault();
                forgot_password_selected();
            });

            //back to login from the forgot-password form
            $back_to_login_link.on('click', function(event){
                event.preventDefault();
                login_selected();
            });

            function login_selected(){
                // $main_nav.children('is-selected').removeClass('is-visible');;
                $form_modal.addClass('is-selected');
                $form_login.addClass('is-selected');
                $form_signup.removeClass('is-selected');
                $form_forgot_password.removeClass('is-selected');
                $tab_login.addClass('selected');
                $tab_signup.removeClass('selected');
            }

            function signup_selected(){
                // $main_nav.children('is-selected').removeClass('is-visible');;
                $form_modal.addClass('is-selected');
                $form_login.removeClass('is-selected');
                $form_signup.addClass('is-selected');
                $form_forgot_password.removeClass('is-selected');
                $tab_signup.addClass('selected');
                $tab_login.removeClass('selected');
            }

            function forgot_password_selected(){
                $form_login.removeClass('is-selected');
                $form_signup.removeClass('is-selected');
                $form_forgot_password.addClass('is-selected');
            }
        });
    }

    return {
        init: function() {
            handleFormModalTab(); // initial setup for form modal tab
        }
    }
}();

$(document).ready(function() {
    FormModal.init();
});
