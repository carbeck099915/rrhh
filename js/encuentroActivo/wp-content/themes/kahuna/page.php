<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Kahuna
 */

get_header(); ?>

	<div id="container" class="<?php kahuna_get_layout_class(); ?>">

		<main id="main" class="main">
			<?php cryout_before_content_hook(); ?>

			<?php get_template_part( 'content/content', 'page' ); ?>

			<?php cryout_after_content_hook(); ?>
		</main><!-- #main -->

		<?php kahuna_get_sidebar(); ?>

	</div><!-- #container -->

<?php get_footer();
