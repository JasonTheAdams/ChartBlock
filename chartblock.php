<?php
/**
 * Plugin Name: ChartBlock - Chart Block for Gutenberg
 * Plugin URI: https://github.com/JasonTheAdams/ChartBlock
 * Description: Adds a block to Gutenberg for displaying interactive charts
 * Version: 1.0.0
 * Author: Jason Adams
 * Author URI: https://github.com/jasontheadams
 * Requires PHP: 5.6
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 */

namespace JasonTheAdams\ChartBlock;

final class ChartBlock
{
    public function load()
    {
        add_action('init', [$this, 'registerBlock']);
    }

    public function registerBlock()
    {
        wp_register_style('chartblock-editor-styles', plugins_url('assets/dist/editor.css', __FILE__));
        wp_register_script('chartblock-block', plugins_url('assets/dist/block.js', __FILE__),
            ['wp-blocks', 'wp-element', 'wp-editor']);
        wp_register_script('chartblock-script', plugins_url('assets/dist/front-script.js', __FILE__), [], '', true);

        register_block_type('chartblock/chartblock', [
            'editor_style'  => 'chartblock-editor-styles',
            'editor_script' => 'chartblock-block',
            'script'        => 'chartblock-script'
        ]);
    }
}

(new ChartBlock())->load();
