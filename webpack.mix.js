/**
 * This file sets up the compilation of JS and SASS for the project using Laravel Mix. That is a
 * framework built on top of Webpack, greatly simplifying doing the same thing in vanilla Webpack.
 *
 * Use `npm run dev` to compile once
 * Use `npm run watch` to watch the files, compile, and refresh the proxy below
 * Use `npm run production` to compile the files for production
 *
 * @link https://github.com/JeffreyWay/laravel-mix/tree/master/docs
 */

const mix = require('laravel-mix');

// Setup asset compilation
mix
    .setPublicPath('assets/dist')
    .setResourceRoot('/wp-content/plugins/chartblock/assets/dist/')
    .react('assets/js/block.jsx', 'assets/dist')
    .js('assets/js/front-script.js', 'assets/dist')
    .sass('assets/scss/editor.scss', 'assets/dist/')
    .options({
        processCssUrls: false
    });

// Refresh the browser at the following domain when files change
mix.browserSync({
    proxy:  'http://streamline.mvpdiscsports.local/',
    files:  [
        '**/*.php',
        'style.css',
        'dist/app.js',
    ],
    open:   false,
    notify: false,
});

// Load jQuery into every script and resolve package aliases
mix.autoload({
    jQuery: ['$', 'window.jQuery'],
})
    .webpackConfig({
        externals: {
            jQuery: 'jQuery',
            jquery: 'jQuery'
        }
    });