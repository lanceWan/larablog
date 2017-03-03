const elixir = require('laravel-elixir');
elixir.config.sourcemaps = false;

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix.sass('app.scss')
    	.styles([
    		'bootstrap.min.css',
    		'font-awesome.min.css',
    		'animate.css',
            'prism.css'
    	])
    	.scripts([
    		'jquery.min.js',
            'bootstrap.min.js',
            'jquery.smooth-scroll.js',
            'jquery.animsition.min.js',
            'jquery.wow.min.js',
            'jquery.footer-reveal.js',
        ])
        .scripts([
            'jquery.back-to-top.js',
            'app.js',
            'header-sticky.js',
            'animsition.js',
            'wow.js',
            'footer-reveal.js',
            'prism.js',
        ],'public/js/app.js')
    	.copy('resources/assets/fonts', 'public/fonts')
    	.copy('resources/assets/js/html5shiv.js', 'public/js/html5shiv.js')
    	.copy('resources/assets/js/respond.min.js', 'public/js/respond.min.js')
    	.version(['css/all.css','css/app.css', 'js/all.js', 'js/app.js']);
});
