<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'encuentroActivo' );

/** MySQL database username */
define( 'DB_USER', 'ccesar' );

/** MySQL database password */
define( 'DB_PASSWORD', 'Becquer098..' );

/** MySQL hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );


/*lvilavicencio*/

define('FS_METHOD','direct');


/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '8(m8ItwZ?d~R_2.!bofm@~7$i;cry5g]K*gY5pfQ//koXxAsreW>(yMR~Qhv5T}>' );
define( 'SECURE_AUTH_KEY',  'koWbVhJ_%zh-`vtB47qq/yj&5wb2SkDb?QJEIm<qH9W&(3oueOV)iRX)&ha#~P&C' );
define( 'LOGGED_IN_KEY',    '1SR-}u%_S]^:Wy!|ukPYFt#w2z0&IdH3{b`3cw`fBazD;FrT*dgTvY23+u:cK(P|' );
define( 'NONCE_KEY',        '7,`{FOXXO @V5 F00No8!} 5-%8cy])~0xda(4R_-#20>]A^dnhlo(3<fp>htp7S' );
define( 'AUTH_SALT',        '#5KW)m`f$h%Bo#OSD8mR[<szr^xdz899vh,7e*2&A`xTo[^?s< xtg!*K|K#FN0U' );
define( 'SECURE_AUTH_SALT', '{SXH;wmU1DciG8rl|TPU/.x 5LY* Iw8ro03W/N%`3=0JYe*9[kz7d.u&sMlMIJd' );
define( 'LOGGED_IN_SALT',   'KV2h0[&R$i2L~Pcqu+!&)~zn)WoBV#/eI)V?cPwz3[yX9q0;(AOs/7,-iQ/<-9y:' );
define( 'NONCE_SALT',       'g%DBtf@Eh3H~ElIGH2/4F^BOS 9#fqUvw&WMmtP}uUY w}MWh8#O}6eo(?-!/Cid' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'encuentro_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
