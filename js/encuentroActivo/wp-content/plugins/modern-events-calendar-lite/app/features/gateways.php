<?php
/** no direct access **/
defined('MECEXEC') or die();

/**
 * Webnus MEC gateways class.
 *
 * @author Webnus <info@webnus.biz>
 */
class MEC_feature_gateways extends MEC_base
{
    /**
     * @var MEC_factory
     */
    public $factory;

    /**
     * @var MEC_main
     */
    public $main;

    /**
     * Constructor method
     *
     * @author Webnus <info@webnus.biz>
     */
    public function __construct()
    {
        // Import MEC Factory
        $this->factory = $this->getFactory();

        // Import MEC Main
        $this->main = $this->getMain();
    }

    /**
     * Initialize colors feature
     *
     * @author Webnus <info@webnus.biz>
     */
    public function init()
    {
        // PRO Version is required
        if(!$this->getPRO()) return false;

        // MEC Settings
        $settings = $this->main->get_settings();

        // Booking is disabled
        if(!isset($settings['booking_status']) or (isset($settings['booking_status']) and !$settings['booking_status'])) return false;

        // WC System
        $WC_status = (isset($settings['wc_status']) and $settings['wc_status'] and class_exists('WooCommerce')) ? true : false;

        // WC system is enabled so we will skip MEC gateways
        if($WC_status) return false;

        $this->factory->action('mec_gateways', array($this, 'register_gateways'));
        $this->factory->action('wp_ajax_mec_do_transaction_free', array($this, 'do_free_booking'));
        $this->factory->action('wp_ajax_nopriv_mec_do_transaction_free', array($this, 'do_free_booking'));

        new MEC_gateway_pay_locally();
        new MEC_gateway_paypal_express();
        new MEC_gateway_paypal_credit_card();
        new MEC_gateway_stripe();
        new MEC_gateway_woocommerce();
        new MEC_gateway_stripe_connect();
        new MEC_gateway_bank_transfer();

        do_action('MEC_feature_gateways_init');
    }

    public function register_gateways($gateways = array())
    {
        $gateways['pay_locally'] = new MEC_gateway_pay_locally();
        $gateways['paypal_express'] = new MEC_gateway_paypal_express();
        $gateways['paypal_credit_card'] = new MEC_gateway_paypal_credit_card();
        $gateways['stripe'] = new MEC_gateway_stripe();
        $gateways['woocommerce'] = new MEC_gateway_woocommerce();
        $gateways['stripe_connect'] = new MEC_gateway_stripe_connect();
        $gateways['bank_transfer'] = new MEC_gateway_bank_transfer();

        usort($gateways, function($a, $b)
        {
            $a_index = (isset($a->options) and isset($a->options['index'])) ? $a->options['index'] : 9999999999;
            $b_index = (isset($b->options) and isset($b->options['index'])) ? $b->options['index'] : 9999999999;

            if($a_index == $b_index) return 0;
            return ($a_index < $b_index) ? -1 : 1;
        });

        return apply_filters('MEC_register_gateways', $gateways);
    }

    public function do_free_booking()
    {
        $transaction_id = isset($_POST['transaction_id']) ? sanitize_text_field($_POST['transaction_id']) : '';

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_POST['_wpnonce']), 'mec_transaction_form_' . $transaction_id))
        {
            $this->main->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        $free_gateway = new MEC_gateway_free();
        $results = $free_gateway->do_transaction($transaction_id);

        $results['output'] = '<h4>' . __('Thanks for your booking.', 'modern-events-calendar-lite') . '</h4>
        <div class="mec-event-book-message">
            <div class="' . ($results['success'] ? 'mec-success' : 'mec-error') . '">' . $results['message'] . '</div>
        </div>';

        $this->main->response($results);
    }
}

do_action('after_MEC_feature_gateways');

interface MEC_gateway_interface
{
    public function id();
    public function label();
    public function options_form();
    public function op_form();
    public function options($transaction_id);
    public function checkout_form($transaction_id, $params = array());
    public function enabled();
    public function op_enabled();
    public function comment();
    public function do_transaction();
    public function register_user($ticket, $args);
}

class MEC_gateway extends MEC_base implements MEC_gateway_interface
{
    /**
     * @var MEC_main
     */
    public $main;

    /**
     * @var MEC_book
     */
    public $book;

    /**
     * @var MEC_factory
     */
    public $factory;

    public $settings;
    public $gateways_options;
    public $PT;
    public $id;
    public $options;

    public function __construct()
    {
        // MEC Main library
        $this->main = $this->getMain();

        // MEC Main library
        $this->book = $this->getBook();

        // Import MEC Factory
        $this->factory = $this->getFactory();

        // MEC settings
        $this->settings = $this->main->get_settings();

        // MEC gateways options
        $this->gateways_options = $this->main->get_gateways_options();

        // MEC Book Post Type Name
        $this->PT = $this->main->get_book_post_type();
    }

    public function id()
    {
        return $this->id;
    }

    public function label()
    {
        return __('Gateway', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#E7E9ED';
    }

    public function title()
    {
        return (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : $this->label();
    }

    public function options_form()
    {
    }

    public function op_form()
    {
    }

    public function options($transaction_id = NULL)
    {
        $options = isset($this->gateways_options[$this->id]) ? $this->gateways_options[$this->id] : array();
        return apply_filters('mec_gateway_options', $options, $this->id, $transaction_id);
    }

    public function checkout_form($transaction_id, $params = array())
    {
    }

    public function enabled()
    {
        return ((isset($this->options['status']) and $this->options['status']) ? true : false);
    }

    public function op_enabled()
    {
        return false;
    }

    public function comment()
    {
        return ((isset($this->options['comment']) and trim($this->options['comment'])) ? '<p class="mec-gateway-comment">' . __(stripslashes($this->options['comment']), 'modern-events-calendar-lite') . '</p>' : '');
    }

    public function do_transaction($transaction_id = null)
    {
    }

    public function response($response)
    {
        $this->main->response($response);
    }

    public function register_user($attendee, $args = array())
    {
        $user = $this->getUser();
        return $user->register($attendee, $args);
    }

    public function get_request_string($vars)
    {
        $string = '';
        foreach($vars as $var => $val) $string .= '&' . $var . '=' . urlencode(stripslashes($val));

        return $string;
    }

    public function decode_custom($encoded)
    {
        $base64 = urldecode($encoded);
        $json = base64_decode($base64);

        return json_decode($json, true);
    }

    public function get_paypal_response($request_str, $url)
    {
        $results = null;

        $api_url = $url;
        $parsed_url = parse_url($api_url);
        $fp = fsockopen('ssl://' . $parsed_url['host'], '443', $errNum, $errStr, 30);

        if(!$fp)
        {
            // @TODO log error here
            return '';
        }
        else
        {
            fputs($fp, 'POST ' . $parsed_url['path'] . " HTTP/1.1\r\n");
            fputs($fp, 'Host: ' . $parsed_url['host'] . "\r\n");
            fputs($fp, "Content-type: application/x-www-form-urlencoded\r\n");
            fputs($fp, 'Content-length: ' . strlen($request_str) . "\r\n");
            fputs($fp, "Connection: close\r\n\r\n");
            fputs($fp, $request_str . "\r\n\r\n");

            $results = '';
            while(!feof($fp)) $results .= fgets($fp, 1024);

            fclose($fp);

            list($header, $body) = preg_split('/\R\R/', $results, 2);
            $results = $body;
        }

        return $results;
    }

    public function get_cancel_url($event_id)
    {
        return trim(get_permalink($event_id), '/') . '/gateway-cancel/';
    }

    public function get_return_url($event_id, $thankyou = true)
    {
        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id and $thankyou)
        {
            return $this->book->get_thankyou_page($thankyou_page_id, NULL);
        }

        return trim(get_permalink($event_id), '/') . '/gateway-return/';
    }

    public function validate($transaction_id)
    {
        $transaction = $this->book->get_transaction($transaction_id);

        // Check Transaction State
        if(isset($transaction['booking_id']) and trim($transaction['booking_id'])) return true;

        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();
        $date = isset($transaction['date']) ? $transaction['date'] : '';
        $timestamps = explode(':', $date);

        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
        if(!$event_id) return true;

        $tickets = array();
        foreach($attendees as $attendee)
        {
            $ticket_id = (isset($attendee['id']) ? $attendee['id'] : 0);
            if(!$ticket_id) continue;

            if(!isset($tickets[$ticket_id])) $tickets[$ticket_id] = 1;
            else $tickets[$ticket_id]++;
        }

        $availability = $this->book->get_tickets_availability($event_id, $timestamps[0]);
        $event_tickets = get_post_meta($event_id, 'mec_tickets', true);

        foreach($tickets as $ticket_id => $quantity)
        {
            // Ticket is not available
            if(!isset($availability[$ticket_id]) or (isset($availability[$ticket_id]) and $availability[$ticket_id] != '-1' and $availability[$ticket_id] < $quantity))
            {
                if($availability[$ticket_id] == '0') $this->response(array('success' => 0, 'code' => 'SOLDOUT', 'message' => sprintf(__('%s ticket is sold out! Please go back and select another ticket if available.', 'modern-events-calendar-lite'), $event_tickets[$ticket_id]['name'])));
                else $this->response(array('success' => 0, 'code' => 'SOLDOUT', 'message' => sprintf(__('Only %s slots remained for %s ticket so you cannot book %s ones.', 'modern-events-calendar-lite'), $availability[$ticket_id], $event_tickets[$ticket_id]['name'], $quantity)));
            }
        }

        return true;
    }

    public function stripe_multiply($amount, $currency = NULL)
    {
        if(is_null($currency)) $currency = $this->main->get_currency_code();

        // Zero Decimal Currencies
        if(in_array($currency, array('BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF'))) return (int) $amount;
        else return (int) ($amount * 100);
    }

    public function get_stripe_charge_description($transaction_id)
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $event_title = (isset($transaction['event_id']) ? get_the_title($transaction['event_id']) : 'N/A');

        return sprintf(__('MEC Transaction ID: %s, Event Title: %s', 'modern-events-calendar-lite'), $transaction_id, $event_title);
    }

    public function cart_validate($cart_id)
    {
        // Cart Library
        $c = $this->getCart();

        $cart = $c->get_cart($cart_id);

        $validity = true;
        $messages = array();

        foreach($cart as $transaction_id)
        {
            $transaction = $this->book->get_transaction($transaction_id);

            // Check Transaction State
            if(isset($transaction['booking_id']) and trim($transaction['booking_id'])) continue;

            $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();
            $date = isset($transaction['date']) ? $transaction['date'] : '';
            $timestamps = explode(':', $date);

            $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
            if(!$event_id) continue;

            $tickets = array();
            foreach($attendees as $attendee)
            {
                $ticket_id = (isset($attendee['id']) ? $attendee['id'] : 0);
                if(!$ticket_id) continue;

                if(!isset($tickets[$ticket_id])) $tickets[$ticket_id] = 1;
                else $tickets[$ticket_id]++;
            }

            $availability = $this->book->get_tickets_availability($event_id, $timestamps[0]);
            $event_tickets = get_post_meta($event_id, 'mec_tickets', true);

            foreach($tickets as $ticket_id => $quantity)
            {
                // Ticket is not available
                if(!isset($availability[$ticket_id]) or (isset($availability[$ticket_id]) and $availability[$ticket_id] != '-1' and $availability[$ticket_id] < $quantity))
                {
                    $validity = false;
                    
                    if($availability[$ticket_id] == '0') $messages[] = sprintf(__('%s Transaction: %s ticket is sold out! Please remove it and book another ticket if available.', 'modern-events-calendar-lite'), $transaction_id, $event_tickets[$ticket_id]['name']);
                    else $messages[] = sprintf(__('%s Transaction: Only %s slots remained for %s ticket so you cannot book %s ones.', 'modern-events-calendar-lite'), $transaction_id, $availability[$ticket_id], $event_tickets[$ticket_id]['name'], $quantity);
                }
            }
        }

        if(!$validity)
        {
            $this->response(array(
                'success' => 0,
                'code' => 'SOLDOUT',
                'message' => implode('<br>', $messages)
            ));
        }

        return true;
    }

    public function do_cart_transaction($cart_id, $params = array())
    {
        $gateway_key = ((isset($params['gateway']) and trim($params['gateway'])) ? $params['gateway'] : '');

        // Cart Library
        $c = $this->getCart();

        $cart = $c->get_cart($cart_id);

        $book_ids = array();
        foreach($cart as $transaction_id)
        {
            $transaction = $this->book->get_transaction($transaction_id);
            $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

            $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
            $attention_times = explode(':', $attention_date);
            $date = date('Y-m-d H:i:s', trim($attention_times[0]));

            $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
            $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

            $ticket_ids = '';
            $attendees_info = array();

            foreach($attendees as $i => $attendee)
            {
                if(!is_numeric($i)) continue;

                $ticket_ids .= $attendee['id'] . ',';
                if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
                else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
            }

            $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
            $user_id = $this->register_user($main_attendee, $transaction);

            // Remove Sensitive Data
            if(isset($transaction['username']) or isset($transaction['password']))
            {
                unset($transaction['username']);
                unset($transaction['password']);

                $this->book->update_transaction($transaction_id, $transaction);
            }

            // MEC User
            $u = $this->getUser();

            $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
            $book_id = $this->book->add(
                array(
                    'post_author' => $user_id,
                    'post_type' => $this->PT,
                    'post_title' => $book_subject,
                    'post_date' => $date,
                    'attendees_info' => $attendees_info,
                    'mec_attendees' => $attendees,
                    'mec_gateway' => $gateway_key,
                    'mec_gateway_label' => $this->title()
                ),
                $transaction_id,
                $ticket_ids
            );

            if(!$book_id) $book_id = $this->book->get_book_id_transaction_id($transaction_id);

            // Assign User
            $u->assign($book_id, $user_id);

            // Fires after completely creating a new booking
            do_action('mec_booking_completed', $book_id);

            $book_ids[] = $book_id;
        }

        $invoice_status = (isset($this->settings['mec_cart_invoice']) and $this->settings['mec_cart_invoice']);
        $invoice_link = (!$invoice_status) ? '' : $c->get_invoice_link($cart_id);

        $message = stripslashes($this->main->m('cart_success_message', __('Thank you for your booking. Your bookings are made, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));
        if(trim($invoice_link)) $message .= ' <a class="mec-invoice-download" href="'.esc_url($invoice_link).'">'.__('Download Invoice', 'modern-events-calendar-lite').'</a>';

        // Make the Cart Empty
        $c->clear($cart_id);

        return array(
            'success' => 1,
            'message' => $message,
            'data' => array(
                'book_ids' => $book_ids,
                'invoice_link' => $invoice_link,
            ),
        );
    }
}

class MEC_gateway_stripe extends MEC_gateway
{
    public $id = 5;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        $this->factory->action('init', array($this, 'include_api'));

        // Register actions
        $this->factory->action('wp_ajax_mec_do_transaction_stripe', array($this, 'do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_do_transaction_stripe', array($this, 'do_transaction'));

        // Add Stripe JS Library
        if($this->enabled() and !is_admin()) $this->factory->action('wp_enqueue_scripts', array($this, 'frontend_assets'));

        // iDEAL verification
        $this->factory->action('init', array($this, 'do_ideal_transaction'));

        // MEC Cart
        $this->factory->action('wp_ajax_mec_cart_do_transaction_stripe', array($this, 'cart_do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_cart_do_transaction_stripe', array($this, 'cart_do_transaction'));
        $this->factory->action('init', array($this, 'cart_do_ideal_transaction'));
    }

    public function frontend_assets()
    {
        $stripe_js = apply_filters('mec_gateways_stripe_js', true);
        if($stripe_js) wp_enqueue_script('mec-stripe', 'https://js.stripe.com/v3/');
    }

    public function label()
    {
        return __('Stripe', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#FF7D51';
    }

    public function include_api()
    {
        if(class_exists('Stripe')) return;

        MEC::import('app.api.Stripe.autoload', false);
    }

    public function do_transaction($transaction_id = null)
    {
        if(!trim($transaction_id)) $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $transaction_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        // Invalid Transaction
        if(!is_array($transaction) or (is_array($transaction) and !isset($transaction['price']))) return false;

        // Is there any attendee?
        if(!count($attendees))
        {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'NO_TICKET',
                    'message' => __(
                        'There is no attendee for booking!',
                        'mec'
                    ),
                )
            );
        }

        // Transaction is not done
        if(!isset($transaction['done']))
        {
            // Stripe Payment Details
            $payment_method_id = isset($_GET['payment_method_id']) ? sanitize_text_field($_GET['payment_method_id']) : '';
            $payment_intent_id = isset($_GET['payment_intent_id']) ? sanitize_text_field($_GET['payment_intent_id']) : '';

            // Pay
            $results = $this->pay($payment_method_id, $payment_intent_id, $transaction_id);

            // Payment is invalid
            if(!$results['success'])
            {
                $this->response(
                    array(
                        'success' => 0,
                        'code' => 'INVALID_PAYMENT',
                        'message' => $results['message'],
                    )
                );
            }

            // Payment requires more actions
            if($results['success'] == 2)
            {
                $this->response(
                    array(
                        'success' => 2,
                        'requires_action' => 1,
                        'code' => 'REQUIRES_ACTION',
                        'payment_intent_client_secret' => $results['payment_intent_client_secret'],
                    )
                );
            }

            // Get Options Compatible with Organizer Payment
            $options = $this->options($transaction_id);

            $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
            $attention_times = explode(':', $attention_date);
            $date = date('Y-m-d H:i:s', trim($attention_times[0]));

            $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
            $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

            $ticket_ids = '';
            $attendees_info = array();

            foreach($attendees as $i => $attendee)
            {
                if(!is_numeric($i)) continue;

                $ticket_ids .= $attendee['id'] . ',';
                if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
                else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
            }

            $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
            $user_id = $this->register_user($main_attendee, $transaction);

            // Remove Sensitive Data
            if(isset($transaction['username']) or isset($transaction['password']))
            {
                unset($transaction['username']);
                unset($transaction['password']);
            }

            $transaction['done'] = 1;
            $this->book->update_transaction($transaction_id, $transaction);

            // MEC User
            $u = $this->getUser();

            $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
            $book_id = $this->book->add(
                array(
                    'post_author' => $user_id,
                    'post_type' => $this->PT,
                    'post_title' => $book_subject,
                    'post_date' => $date,
                    'attendees_info' => $attendees_info,
                    'mec_attendees' => $attendees,
                    'mec_gateway' => 'MEC_gateway_stripe',
                    'mec_gateway_label' => $this->title()
                ),
                $transaction_id,
                $ticket_ids
            );

            // Assign User
            $u->assign($book_id, $user_id);

            // Gateway Referrer
            update_post_meta($book_id, 'mec_gateway_ref_type', 'intent');
            update_post_meta($book_id, 'mec_gateway_ref_id', (isset($results['id']) ? $results['id'] : ''));

            // Fires after completely creating a new booking
            do_action('mec_booking_completed', $book_id);

            // Create Stripe Customer
            if(isset($results['id']))
            {
                $user_email = $u->get($user_id)->user_email;

                $stripe = new \Stripe\StripeClient($options['secret_key']);

                // Search Customers
                $customers = $stripe->customers->all([
                    'email' => $user_email,
                    'limit' => 1,
                ]);

                if($customers->count()) $customer = $customers->first();
                else
                {
                    $customer = $stripe->customers->create([
                        'name' => $name,
                        'email' => $user_email,
                    ]);
                }

                if($customer and isset($customer->id)) $stripe->paymentIntents->update($results['id'], ['customer' => $customer->id, 'receipt_email' => $user_email]);
            }
        }
        else $book_id = (isset($transaction['booking_id']) ? $transaction['booking_id'] : 0);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        $this->response(
            array(
                'success' => 1,
                'message' => stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite'))),
                'data' => array(
                    'book_id' => $book_id,
                    'redirect_to' => $redirect_to,
                    'invoice_link' => $invoice_link,
                    'dl_file_link' => $dl_file_link,
                    'extra_info' => $extra_info,
                ),
            )
        );
    }

    public function pay($payment_method_id, $payment_intent_id, $transaction_id)
    {
        $transaction = $this->book->get_transaction($transaction_id);

        // Get Options Compatible with Organizer Payment
        $options = $this->options($transaction_id);

        // Set Stripe Secret Key
        \Stripe\Stripe::setApiKey($options['secret_key']);

        // Get Status of Payment Intent
        if($payment_intent_id)
        {
            $intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
            $intent->confirm();

            if($intent->status == 'succeeded') return array('success' => 1, 'id' => $intent->id);
            else if($intent->status == 'requires_confirmation') return array('success' => 0, 'message' => __('Your payment needs to be confirmed!', 'modern-events-calendar-lite'));
            else return array('success' => 0, 'message' => __('Unknown Error!', 'modern-events-calendar-lite'));
        }

        try
        {
            $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
            $currency_code = $this->main->get_currency_code($event_id);

            $intent = \Stripe\PaymentIntent::create(
                array(
                    'payment_method' => $payment_method_id,
                    'amount' => (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $currency_code)) : 0),
                    'currency' => $currency_code,
                    'description' => $this->get_stripe_charge_description($transaction_id),
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                )
            );
        }
        catch(Exception $e)
        {
            return array(
                'success' => 0,
                'message' => $e->getMessage(),
            );
        }

        if($intent->status == 'requires_action' and $intent->next_action->type == 'use_stripe_sdk')
        {
            # Tell the client to handle the action
            return array(
                'success' => 2,
                'requires_action' => true,
                'payment_intent_client_secret' => $intent->client_secret
            );
        }
        elseif($intent->status == 'succeeded') return array('success' => 1, 'id' => $intent->id);
        else return array('success' => 0, 'message' => __('Unknown Error!', 'modern-events-calendar-lite'));
    }

    public function do_ideal_transaction()
    {
        $transaction_id = isset($_GET['mec_ideal_transaction_id']) ? sanitize_text_field($_GET['mec_ideal_transaction_id']) : NULL;
        if(!trim($transaction_id)) return false;

        $source = isset($_GET['source']) ? sanitize_text_field($_GET['source']) : NULL;
        if(!trim($source)) return false;

        $transaction = $this->book->get_transaction($transaction_id);

        // Invalid Transaction
        if(!is_array($transaction) or (is_array($transaction) and !isset($transaction['price']))) return false;

        // Transaction is done
        if(isset($transaction['done']) and $transaction['done'] == '1') return false;

        // Get Options Compatible with Organizer Payment
        $options = $this->options($transaction_id);

        try
        {
            // Set Stripe Secret Key
            \Stripe\Stripe::setApiKey($options['secret_key']);

            $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
            $currency_code = $this->main->get_currency_code($event_id);

            $charge = \Stripe\Charge::create([
                'amount' => (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $currency_code)) : 0),
                'currency' => $currency_code,
                'source' => $source,
            ]);
        }
        catch(Exception $e)
        {
            return false;
        }

        // Payment Invalid
        if(!$charge->captured or !$charge->paid) return false;

        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);
        }

        $transaction['done'] = 1;
        $this->book->update_transaction($transaction_id, $transaction);

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_stripe',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        // Gateway Referrer
        update_post_meta($book_id, 'mec_gateway_ref_type', 'charge');
        update_post_meta($book_id, 'mec_gateway_ref_id', (isset($charge->id) ? $charge->id : ''));

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Create Stripe Customer
        if($charge and $charge->id)
        {
            $user_email = $u->get($user_id)->user_email;

            $stripe = new \Stripe\StripeClient($options['secret_key']);

            // Search Customers
            $customers = $stripe->customers->all([
                'email' => $user_email,
                'limit' => 1,
            ]);

            if($customers->count()) $customer = $customers->first();
            else
            {
                $customer = $stripe->customers->create([
                    'name' => $name,
                    'email' => $user_email,
                ]);
            }

            if($customer and isset($customer->id)) $stripe->charges->update($charge->id, ['customer' => $customer->id]);
        }

        // Redirect
        if(trim($redirect_to))
        {
            wp_redirect($redirect_to);
            exit;
        }
    }

    public function refund($booking_id, $amount = NULL)
    {
        $gateway_ref_type = get_post_meta($booking_id, 'mec_gateway_ref_type', true);
        $gateway_ref_id = get_post_meta($booking_id, 'mec_gateway_ref_id', true);

        // Amount
        if(trim($amount) == '') $amount = get_post_meta($booking_id, 'mec_price', true);

        // Transaction ID
        $transaction_id = $this->book->get_transaction_id_book_id($booking_id);

        // Get Options Compatible with Organizer Payment
        $options = $this->options($transaction_id);

        // Set Stripe Secret Key
        \Stripe\Stripe::setApiKey($options['secret_key']);

        try
        {
            if($gateway_ref_type == 'intent')
            {
                $args = array(
                    'payment_intent' => $gateway_ref_id,
                    'amount' => ((int) $this->stripe_multiply($amount))
                );
            }
            else
            {
                $args = array(
                    'charge' => $gateway_ref_id,
                    'amount' => ((int) $this->stripe_multiply($amount))
                );
            }

            // Refund
            $results = \Stripe\Refund::create($args);

            // Refund ID
            update_post_meta($booking_id, 'mec_refund_ref_id', (isset($results->id) ? $results->id : NULL));

            if($results and isset($results->id)) return true;
            else return false;
        }
        catch(Exception $e)
        {
            return false;
        }
    }

    public function checkout_form($transaction_id, $params = array())
    {
        // Get Options Compatible with Organizer Payment
        $options = $this->options($transaction_id);

        // Payment Method
        $payment_method = (isset($options['payment_method']) and trim($options['payment_method'])) ? $options['payment_method'] : 'cc';

        if($payment_method == 'cc') $this->checkout_form_cc($transaction_id, $options, $params);
        elseif($payment_method == 'ideal') $this->checkout_form_ideal($transaction_id, $options, $params);
    }

    public function checkout_form_cc($transaction_id, $options, $params = array())
    {
        $transaction = $this->book->get_transaction($transaction_id);

        $main_attendee_name = ((isset($transaction['tickets']) and isset($transaction['tickets'][0]) and isset($transaction['tickets'][0]['name'])) ? $transaction['tickets'][0]['name'] : '');
        $main_attendee_email = ((isset($transaction['tickets']) and isset($transaction['tickets'][0]) and isset($transaction['tickets'][0]['email'])) ? $transaction['tickets'][0]['email'] : '');
        ?>
        <script type="text/javascript">
            var stripe = Stripe("<?php echo(isset($options['publishable_key']) ? $options['publishable_key'] : ''); ?>");
            var elements = stripe.elements();
            var style = {
                base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    minHeight: '40px',
                    '::placeholder': {
                        color: '#aab7c4'
                    },
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            };

            var card = elements.create('card');
            card.mount('#mec_card_element_stripe_<?php echo $transaction_id; ?>');

            // Validation
            card.addEventListener('change', function(event)
            {
                // Show the Error
                if(event.error) jQuery('#mec_do_transaction_stripe_message<?php echo $transaction_id; ?>').text(event.error.message).addClass('mec-error').show();
                // Hide the Message
                else jQuery("#mec_do_transaction_stripe_message<?php echo $transaction_id; ?>").removeClass("mec-success mec-error").hide();
            });

            jQuery('#mec_do_transaction_stripe_form<?php echo $transaction_id; ?>').on('submit', function(e)
            {
                // Prevent the form from submitting
                e.preventDefault();

                var form = jQuery(this);
                var transaction_id = '<?php echo $transaction_id; ?>';

                // No pressing the buy now button more than once
                form.find('button').prop('disabled', true);

                // Hide the Message
                jQuery("#mec_do_transaction_stripe_message" + transaction_id).removeClass("mec-success mec-error").hide();

                // Add loading Class to the button
                jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").addClass("loading");

                var payer_name = jQuery("#mec_name_stripe_" + transaction_id).val();
                var payer_email = jQuery("#mec_email_stripe_" + transaction_id).val();
                var payer_details = {
                    billing_details: {}
                };

                if(payer_name !== '') payer_details.billing_details.name = payer_name;
                if(payer_email !== '') payer_details.billing_details.email = payer_email;

                stripe.createPaymentMethod('card', card, payer_details).then(function(result)
                {
                    if(result.error)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        // Show the user what they did wrong
                        jQuery('#mec_do_transaction_stripe_message' + transaction_id).text(result.error.message).addClass('mec-error').show();

                        // Make the submit clickable again
                        form.find('button').prop('disabled', false);
                    }
                    else
                    {
                        // Hide the Message
                        jQuery("#mec_do_transaction_stripe_message" + transaction_id).removeClass("mec-success mec-error").hide();

                        // Set Payment Method ID
                        jQuery("#mec_do_transaction_stripe_payment_method_id" + transaction_id).val(result.paymentMethod.id);

                        var data = form.serialize();
                        jQuery.ajax(
                        {
                            type: "GET",
                            url: "<?php echo admin_url('admin-ajax.php', NULL); ?>",
                            data: data,
                            dataType: "JSON",
                            success: function(data)
                            {
                                if(data.success === 1)
                                {
                                    // Remove the loading Class from the button
                                    jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                    jQuery("#mec_do_transaction_stripe_form" + transaction_id).hide();
                                    jQuery(".mec-book-form-gateway-label").remove();
                                    jQuery(".mec-book-form-coupon").hide();
                                    jQuery(".mec-gateway-comment").hide();

                                    jQuery("#mec-book-form-back-btn-step-3").remove();
                                    jQuery("#mec_do_transaction_stripe_message" + transaction_id).addClass("mec-success").html(data.message).show();

                                    // Show Invoice Link
                                    if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                                    {
                                        jQuery("#mec_do_transaction_stripe_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                                    }

                                    // Show Downloadable Link
                                    if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                                    {
                                        jQuery("#mec_do_transaction_stripe_message" + transaction_id).append('  ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                                    }

                                    // Show Extra info
                                    if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                                    {
                                        jQuery("#mec_do_transaction_stripe_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                                    }

                                    // Redirect to thank you page
                                    if(typeof data.data.redirect_to !== "undefined" && data.data.redirect_to !== "")
                                    {
                                        setTimeout(function()
                                        {
                                            window.location.href = data.data.redirect_to;
                                        }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                                    }
                                }
                                else if(data.requires_action)
                                {
                                    stripe.handleCardAction(data.payment_intent_client_secret).then(function(result)
                                    {
                                        if(result.error)
                                        {
                                            // Show the user what they did wrong
                                            jQuery('#mec_do_transaction_stripe_message' + transaction_id).text(result.error.message).addClass('mec-error').show();

                                            // Remove the loading Class from the button
                                            jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                            // Make the submit clickable again
                                            form.find('button').prop('disabled', false);
                                        }
                                        else
                                        {
                                            // Set Payment Intent ID
                                            jQuery("#mec_do_transaction_stripe_payment_intent_id" + transaction_id).val(result.paymentIntent.id);

                                            var data = form.serialize();
                                            jQuery.ajax(
                                            {
                                                type: "GET",
                                                url: "<?php echo admin_url('admin-ajax.php', NULL); ?>",
                                                data: data,
                                                dataType: "JSON",
                                                success: function(data)
                                                {
                                                    if(data.success === 1)
                                                    {
                                                        // Remove the loading Class from the button
                                                        jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                                        jQuery("#mec_do_transaction_stripe_form" + transaction_id).hide();
                                                        jQuery(".mec-book-form-gateway-label").remove();
                                                        jQuery(".mec-book-form-coupon").hide();
                                                        jQuery(".mec-gateway-comment").hide();

                                                        jQuery("#mec-book-form-back-btn-step-3").remove();
                                                        jQuery("#mec_do_transaction_stripe_message" + transaction_id).addClass("mec-success").html(data.message).show();

                                                        // Show Invoice Link
                                                        if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                                                        {
                                                            jQuery("#mec_do_transaction_stripe_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                                                        }

                                                        // Show Downloadable Link
                                                        if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                                                        {
                                                            jQuery("#mec_do_transaction_stripe_message" + transaction_id).append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                                                        }

                                                        // Show Extra info
                                                        if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                                                        {
                                                            jQuery("#mec_do_transaction_stripe_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                                                        }

                                                        // Redirect to thank you page
                                                        if(typeof data.data.redirect_to !== "undefined" && data.data.redirect_to !== "")
                                                        {
                                                            setTimeout(function()
                                                            {
                                                                window.location.href = data.data.redirect_to;
                                                            }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                                                        }
                                                    }
                                                    else
                                                    {
                                                        // Remove the loading Class from the button
                                                        jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                                        jQuery("#mec_do_transaction_stripe_message" + transaction_id).addClass("mec-error").html(data.message).show();
                                                    }
                                                },
                                                error: function(jqXHR, textStatus, errorThrown)
                                                {
                                                    // Remove the loading Class from the button
                                                    jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");
                                                }
                                            });
                                        }
                                    });
                                }
                                else
                                {
                                    // Remove the loading Class from the button
                                    jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                    jQuery("#mec_do_transaction_stripe_message" + transaction_id).addClass("mec-error").html(data.message).show();
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown)
                            {
                                // Remove the loading Class from the button
                                jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").removeClass("loading");
                            }
                        });
                    }
                });
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_stripe_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_stripe_form<?php echo $transaction_id; ?>">
            <div class="mec-form-row mec-name-stripe">
                <label for="mec_name_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('Name', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_name_stripe_<?php echo $transaction_id; ?>" type="text" value="<?php echo esc_attr($main_attendee_name); ?>">
            </div>
            <div class="mec-form-row mec-email-stripe">
                <label for="mec_email_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('Email', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_email_stripe_<?php echo $transaction_id; ?>" type="email" value="<?php echo esc_attr($main_attendee_email); ?>">
            </div>
            <div class="mec-form-row mec-card-element-stripe">
                <label for="mec_card_element_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('Credit or debit card', 'modern-events-calendar-lite'); ?>
                </label>
                <div id="mec_card_element_stripe_<?php echo $transaction_id; ?>">
                </div>
            </div>
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" name="action" value="mec_do_transaction_stripe"/>
                <input type="hidden" name="transaction_id" value="<?php echo $transaction_id; ?>"/>
                <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
                <input type="hidden" name="payment_method_id" value="" id="mec_do_transaction_stripe_payment_method_id<?php echo $transaction_id; ?>"/>
                <input type="hidden" name="payment_intent_id" value="" id="mec_do_transaction_stripe_payment_intent_id<?php echo $transaction_id; ?>"/>
                <?php wp_nonce_field('mec_transaction_form_' . $transaction_id); ?>
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <?php
    }

    public function checkout_form_ideal($transaction_id, $options, $params = array())
    {
        $transaction = $this->book->get_transaction($transaction_id);

        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
        $main_attendee_name = ((isset($transaction['tickets']) and isset($transaction['tickets'][0]) and isset($transaction['tickets'][0]['name'])) ? $transaction['tickets'][0]['name'] : '');
        ?>
        <script type="text/javascript">
            var stripe = Stripe("<?php echo(isset($options['publishable_key']) ? $options['publishable_key'] : ''); ?>");
            var elements = stripe.elements();

            var idealBank = elements.create('idealBank');
            idealBank.mount('#mec_card_element_stripe_<?php echo $transaction_id; ?>');

            jQuery('#mec_do_transaction_stripe_form<?php echo $transaction_id; ?>').on('submit', function(e)
            {
                // Prevent the form from submitting
                e.preventDefault();

                var form = jQuery(this);
                var transaction_id = '<?php echo $transaction_id; ?>';

                // No pressing the buy now button more than once
                form.find('button').prop('disabled', true);

                // Hide the Message
                jQuery("#mec_do_transaction_stripe_message" + transaction_id).removeClass("mec-success mec-error").hide();

                // Add loading Class to the button
                jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").addClass("loading");

                var payer_name = jQuery("#mec_name_stripe_" + transaction_id).val();
                var payable = jQuery("#mec_ideal_stripe_amount").val();
                var source = {
                    type: 'ideal',
                    amount: payable,
                    currency: '<?php echo $this->main->get_currency_code($event_id); ?>',
                    owner:
                    {
                        name: payer_name,
                    },
                    redirect:
                    {
                        return_url: '<?php echo $this->main->add_qs_var('mec_ideal_transaction_id', $transaction_id, $this->get_return_url($event_id, false)); ?>',
                    }
                };

                stripe.createSource(idealBank, source).then(function(result)
                {
                    if(result.error) jQuery("#mec_do_transaction_stripe_message" + transaction_id).addClass("mec-error").html(result.error.message).show();
                    else document.location.href = result.source.redirect.url;
                });
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_stripe_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_stripe_form<?php echo $transaction_id; ?>">
            <div class="info-msg"><?php esc_html_e("You should complete the payment by returning back to the website.", 'modern-events-calendar-lite'); ?></div>
            <div class="mec-form-row mec-name-stripe">
                <label for="mec_name_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('Name', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_name_stripe_<?php echo $transaction_id; ?>" type="text" value="<?php echo esc_attr($main_attendee_name); ?>" required>
            </div>
            <div class="mec-form-row mec-ideal-element-stripe">
                <label for="mec_card_element_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('iDEAL Bank', 'modern-events-calendar-lite'); ?>
                </label>
                <div id="mec_card_element_stripe_<?php echo $transaction_id; ?>">
                </div>
            </div>
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" id="mec_ideal_stripe_amount" value="<?php echo (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $this->main->get_currency_code($event_id))) : 0); ?>">
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <?php
    }

    public function options_form()
    {
        ?>
        <div class="mec-form-row">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle();" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('Stripe', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form <?php
            if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
                echo 'mec-util-hidden';
            }
        ?>">
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title"
                           name="mec[gateways][<?php echo $this->id(); ?>][title]"
                           value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>"
                           placeholder="<?php echo $this->label(); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>_comment"
                              name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('Stripe Gateway Description', 'modern-events-calendar-lite'); ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a
                                            href="https://webnus.net/dox/modern-events-calendar/booking/"
                                            target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_payment_method"><?php _e('Payment Method', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <select name="mec[gateways][<?php echo $this->id(); ?>][payment_method]" id="mec_gateways<?php echo $this->id(); ?>_comment">
                        <option value="cc" <?php echo (isset($this->options['payment_method']) and $this->options['payment_method'] == 'cc') ? 'selected="selected"' : ''; ?>><?php esc_html_e('Credit Card', 'modern-events-calendar-lite'); ?></option>
                        <option value="ideal" <?php echo (isset($this->options['payment_method']) and $this->options['payment_method'] == 'ideal') ? 'selected="selected"' : ''; ?>><?php esc_html_e('iDEAL', 'modern-events-calendar-lite'); ?></option>
                    </select>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_secret_key"><?php _e('Secret Key', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_secret_key"
                           name="mec[gateways][<?php echo $this->id(); ?>][secret_key]"
                           value="<?php echo isset($this->options['secret_key']) ? $this->options['secret_key'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_publishable_key"><?php _e('Publishable Key', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_publishable_key"
                           name="mec[gateways][<?php echo $this->id(); ?>][publishable_key]"
                           value="<?php echo isset($this->options['publishable_key']) ? $this->options['publishable_key'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                           name="mec[gateways][<?php echo $this->id(); ?>][index]"
                           value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 4; ?>"
                           placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                </div>
            </div>
        </div>
        <?php
    }

    public function op_enabled()
    {
        return true;
    }

    public function op_form($options = array())
    {
        ?>
        <h4><?php echo $this->label(); ?></h4>
        <div class="mec-gateway-options-form">
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_op<?php echo $this->id(); ?>_secret_key"><?php _e('Secret Key', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_op<?php echo $this->id(); ?>_secret_key" name="mec[op][<?php echo $this->id(); ?>][secret_key]" value="<?php echo isset($options['secret_key']) ? $options['secret_key'] : ''; ?>" />
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_op<?php echo $this->id(); ?>_publishable_key"><?php _e('Publishable Key', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_op<?php echo $this->id(); ?>_publishable_key" name="mec[op][<?php echo $this->id(); ?>][publishable_key]" value="<?php echo isset($options['publishable_key']) ? $options['publishable_key'] : ''; ?>"/>
                </div>
            </div>
        </div>
        <?php
    }

    public function cart_checkout_form($cart_id, $params = array())
    {
        // Get Options
        $options = $this->options();

        // Payment Method
        $payment_method = (isset($options['payment_method']) and trim($options['payment_method'])) ? $options['payment_method'] : 'cc';

        if($payment_method == 'cc') $this->cart_checkout_form_cc($cart_id, $options, $params);
        elseif($payment_method == 'ideal') $this->cart_checkout_form_ideal($cart_id, $options, $params);
    }

    public function cart_checkout_form_cc($cart_id, $options, $params = array())
    {
        ?>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_stripe_message<?php echo $cart_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_stripe_form<?php echo $cart_id; ?>">
            <div class="mec-form-row mec-name-stripe">
                <label for="mec_name_stripe_<?php echo $cart_id; ?>">
                    <?php _e('Name', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_name_stripe_<?php echo $cart_id; ?>" type="text" value="">
            </div>
            <div class="mec-form-row mec-email-stripe">
                <label for="mec_email_stripe_<?php echo $cart_id; ?>">
                    <?php _e('Email', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_email_stripe_<?php echo $cart_id; ?>" type="email" value="">
            </div>
            <div class="mec-form-row mec-card-element-stripe">
                <label for="mec_card_element_stripe_<?php echo $cart_id; ?>">
                    <?php _e('Credit or debit card', 'modern-events-calendar-lite'); ?>
                </label>
                <div id="mec_card_element_stripe_<?php echo $cart_id; ?>">
                </div>
            </div>
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" name="action" value="mec_cart_do_transaction_stripe"/>
                <input type="hidden" name="cart_id" value="<?php echo $cart_id; ?>"/>
                <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
                <input type="hidden" name="payment_method_id" value="" id="mec_do_transaction_stripe_payment_method_id<?php echo $cart_id; ?>"/>
                <input type="hidden" name="payment_intent_id" value="" id="mec_do_transaction_stripe_payment_intent_id<?php echo $cart_id; ?>"/>
                <?php wp_nonce_field('mec_transaction_form_' . $cart_id); ?>
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <script type="text/javascript">
        var stripe = Stripe("<?php echo(isset($options['publishable_key']) ? $options['publishable_key'] : ''); ?>");
        var elements = stripe.elements();
        var style = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                minHeight: '40px',
                '::placeholder': {
                    color: '#aab7c4'
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };

        var card = elements.create('card');
        card.mount('#mec_card_element_stripe_<?php echo $cart_id; ?>');

        // Validation
        card.addEventListener('change', function(event)
        {
            // Show the Error
            if(event.error) jQuery('#mec_do_transaction_stripe_message<?php echo $cart_id; ?>').text(event.error.message).addClass('mec-error').show();
            // Hide the Message
            else jQuery("#mec_do_transaction_stripe_message<?php echo $cart_id; ?>").removeClass("mec-success mec-error").hide();
        });

        jQuery('#mec_do_transaction_stripe_form<?php echo $cart_id; ?>').on('submit', function(e)
        {
            // Prevent the form from submitting
            e.preventDefault();

            var form = jQuery(this);
            var cart_id = '<?php echo $cart_id; ?>';

            // No pressing the buy now button more than once
            form.find('button').prop('disabled', true);

            // Hide the Message
            jQuery("#mec_do_transaction_stripe_message" + cart_id).removeClass("mec-success mec-error").hide();

            // Add loading Class to the button
            jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").addClass("loading");

            var payer_name = jQuery("#mec_name_stripe_" + cart_id).val();
            var payer_email = jQuery("#mec_email_stripe_" + cart_id).val();
            var payer_details = {
                billing_details: {}
            };

            if(payer_name !== '') payer_details.billing_details.name = payer_name;
            if(payer_email !== '') payer_details.billing_details.email = payer_email;

            stripe.createPaymentMethod('card', card, payer_details).then(function(result)
            {
                if(result.error)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");

                    // Show the user what they did wrong
                    jQuery('#mec_do_transaction_stripe_message' + cart_id).text(result.error.message).addClass('mec-error').show();

                    // Make the submit clickable again
                    form.find('button').prop('disabled', false);
                }
                else
                {
                    // Hide the Message
                    jQuery("#mec_do_transaction_stripe_message" + cart_id).removeClass("mec-success mec-error").hide();

                    // Set Payment Method ID
                    jQuery("#mec_do_transaction_stripe_payment_method_id" + cart_id).val(result.paymentMethod.id);

                    var data = form.serialize();
                    jQuery.ajax(
                    {
                        type: "GET",
                        url: "<?php echo admin_url('admin-ajax.php', NULL); ?>",
                        data: data,
                        dataType: "JSON",
                        success: function(data)
                        {
                            if(data.success === 1)
                            {
                                // Remove the loading Class from the button
                                jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");

                                jQuery("#mec_do_transaction_stripe_form" + cart_id).hide();
                                jQuery(".mec-checkout-form-gateway-label").remove();
                                jQuery(".mec-gateway-comment").hide();

                                jQuery("#mec_do_transaction_stripe_message" + cart_id).addClass("mec-success").html(data.message).show();
                            }
                            else if(data.requires_action)
                            {
                                stripe.handleCardAction(data.payment_intent_client_secret).then(function(result)
                                {
                                    if(result.error)
                                    {
                                        // Show the user what they did wrong
                                        jQuery('#mec_do_transaction_stripe_message' + cart_id).text(result.error.message).addClass('mec-error').show();

                                        // Remove the loading Class from the button
                                        jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");

                                        // Make the submit clickable again
                                        form.find('button').prop('disabled', false);
                                    }
                                    else
                                    {
                                        // Set Payment Intent ID
                                        jQuery("#mec_do_transaction_stripe_payment_intent_id" + cart_id).val(result.paymentIntent.id);

                                        var data = form.serialize();
                                        jQuery.ajax(
                                        {
                                            type: "GET",
                                            url: "<?php echo admin_url('admin-ajax.php', NULL); ?>",
                                            data: data,
                                            dataType: "JSON",
                                            success: function(data)
                                            {
                                                if(data.success === 1)
                                                {
                                                    // Remove the loading Class from the button
                                                    jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");

                                                    jQuery("#mec_do_transaction_stripe_form" + cart_id).hide();
                                                    jQuery(".mec-checkout-form-gateway-label").remove();
                                                    jQuery(".mec-gateway-comment").hide();

                                                    jQuery("#mec_do_transaction_stripe_message" + cart_id).addClass("mec-success").html(data.message).show();
                                                }
                                                else
                                                {
                                                    // Remove the loading Class from the button
                                                    jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");

                                                    jQuery("#mec_do_transaction_stripe_message" + cart_id).addClass("mec-error").html(data.message).show();
                                                }
                                            },
                                            error: function(jqXHR, textStatus, errorThrown)
                                            {
                                                // Remove the loading Class from the button
                                                jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");
                                            }
                                        });
                                    }
                                });
                            }
                            else
                            {
                                // Remove the loading Class from the button
                                jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");

                                jQuery("#mec_do_transaction_stripe_message" + cart_id).addClass("mec-error").html(data.message).show();
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown)
                        {
                            // Remove the loading Class from the button
                            jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").removeClass("loading");
                        }
                    });
                }
            });
        });
        </script>
        <?php
    }

    public function cart_checkout_form_ideal($cart_id, $options, $params = array())
    {
        $c = $this->getCart();
        $cart = $c->get_cart($cart_id);

        $payable = $c->get_payable($cart);
        $event_id = $c->get_first_event_id($cart);
        ?>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_stripe_message<?php echo $cart_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_stripe_form<?php echo $cart_id; ?>">
            <div class="info-msg"><?php esc_html_e("You should complete the payment by returning back to the website.", 'modern-events-calendar-lite'); ?></div>
            <div class="mec-form-row mec-name-stripe">
                <label for="mec_name_stripe_<?php echo $cart_id; ?>">
                    <?php _e('Name', 'modern-events-calendar-lite'); ?> <span class="mec-required">*</span>
                </label>
                <input id="mec_name_stripe_<?php echo $cart_id; ?>" type="text" value="" required>
            </div>
            <div class="mec-form-row mec-ideal-element-stripe">
                <label for="mec_card_element_stripe_<?php echo $cart_id; ?>">
                    <?php _e('iDEAL Bank', 'modern-events-calendar-lite'); ?>
                </label>
                <div id="mec_card_element_stripe_<?php echo $cart_id; ?>">
                </div>
            </div>
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" id="mec_ideal_stripe_amount" value="<?php echo ((int) $this->stripe_multiply($payable, $this->main->get_currency_code())); ?>">
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <script type="text/javascript">
        var stripe = Stripe("<?php echo(isset($options['publishable_key']) ? $options['publishable_key'] : ''); ?>");
        var elements = stripe.elements();

        var idealBank = elements.create('idealBank');
        idealBank.mount('#mec_card_element_stripe_<?php echo $cart_id; ?>');

        jQuery('#mec_do_transaction_stripe_form<?php echo $cart_id; ?>').on('submit', function(e)
        {
            // Prevent the form from submitting
            e.preventDefault();

            var form = jQuery(this);
            var cart_id = '<?php echo $cart_id; ?>';

            // No pressing the buy now button more than once
            form.find('button').prop('disabled', true);

            // Hide the Message
            jQuery("#mec_do_transaction_stripe_message" + cart_id).removeClass("mec-success mec-error").hide();

            // Add loading Class to the button
            jQuery("#mec_do_transaction_stripe_form" + cart_id + " button[type=submit]").addClass("loading");

            var payer_name = jQuery("#mec_name_stripe_" + cart_id).val();
            var payable = jQuery("#mec_ideal_stripe_amount").val();
            var source = {
                type: 'ideal',
                amount: payable,
                currency: '<?php echo $this->main->get_currency_code(); ?>',
                owner:
                {
                    name: payer_name,
                },
                redirect:
                {
                    return_url: '<?php echo $this->main->add_qs_var('mec_ideal_cart_id', $cart_id, $this->get_return_url($event_id, false)); ?>',
                }
            };

            stripe.createSource(idealBank, source).then(function(result)
            {
                if(result.error) jQuery("#mec_do_transaction_stripe_message" + cart_id).addClass("mec-error").html(result.error.message).show();
                else document.location.href = result.source.redirect.url;
            });
        });
        </script>
        <?php
    }

    public function cart_pay($payment_method_id, $payment_intent_id, $cart_id)
    {
        // Get Options Compatible with Organizer Payment
        $options = $this->options();

        // Set Stripe Secret Key
        \Stripe\Stripe::setApiKey($options['secret_key']);

        // Get Status of Payment Intent
        if($payment_intent_id)
        {
            $intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
            $intent->confirm();

            if($intent->status == 'succeeded') return array('success' => 1, 'id' => $intent->id);
            else if($intent->status == 'requires_confirmation') return array('success' => 0, 'message' => __('Your payment needs to be confirmed!', 'modern-events-calendar-lite'));
            else return array('success' => 0, 'message' => __('Unknown Error!', 'modern-events-calendar-lite'));
        }

        try
        {
            $c = $this->getCart();
            $cart = $c->get_cart($cart_id);

            $payable = $c->get_payable($cart);
            $currency_code = $this->main->get_currency_code();

            $intent = \Stripe\PaymentIntent::create(array(
                'payment_method' => $payment_method_id,
                'amount' => ((int) $this->stripe_multiply($payable, $currency_code)),
                'currency' => $currency_code,
                'description' => sprintf(__('Transaction IDs: %s', 'modern-events-calendar-lite'), implode(', ', $cart)),
                'confirmation_method' => 'manual',
                'confirm' => true,
            ));
        }
        catch(Exception $e)
        {
            return array(
                'success' => 0,
                'message' => $e->getMessage(),
            );
        }

        if($intent->status == 'requires_action' and $intent->next_action->type == 'use_stripe_sdk')
        {
            # Tell the client to handle the action
            return array(
                'success' => 2,
                'requires_action' => true,
                'payment_intent_client_secret' => $intent->client_secret
            );
        }
        elseif($intent->status == 'succeeded') return array('success' => 1, 'id' => $intent->id);
        else return array('success' => 0, 'message' => __('Unknown Error!', 'modern-events-calendar-lite'));
    }

    public function cart_do_transaction()
    {
        $cart_id = isset($_GET['cart_id']) ? sanitize_text_field($_GET['cart_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $cart_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->cart_validate($cart_id);

        // Cart Library
        $c = $this->getCart();

        $cart = $c->get_cart($cart_id);

        /**
         * Payment
         */
        $payment_method_id = isset($_GET['payment_method_id']) ? sanitize_text_field($_GET['payment_method_id']) : '';
        $payment_intent_id = isset($_GET['payment_intent_id']) ? sanitize_text_field($_GET['payment_intent_id']) : '';

        // Pay
        $results = $this->cart_pay($payment_method_id, $payment_intent_id, $cart_id);

        // Payment is invalid
        if(!$results['success'])
        {
            $this->response(array(
                'success' => 0,
                'code' => 'INVALID_PAYMENT',
                'message' => $results['message'],
            ));
        }

        // Payment requires more actions
        if($results['success'] == 2)
        {
            $this->response(array(
                'success' => 2,
                'requires_action' => 1,
                'code' => 'REQUIRES_ACTION',
                'payment_intent_client_secret' => $results['payment_intent_client_secret'],
            ));
        }

        $book_ids = array();
        foreach($cart as $transaction_id)
        {
            $transaction = $this->book->get_transaction($transaction_id);
            $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

            // Transaction is not done
            if(!isset($transaction['done']))
            {
                // Get Options
                $options = $this->options();

                $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
                $attention_times = explode(':', $attention_date);
                $date = date('Y-m-d H:i:s', trim($attention_times[0]));

                $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
                $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

                $ticket_ids = '';
                $attendees_info = array();

                foreach($attendees as $i => $attendee)
                {
                    if(!is_numeric($i)) continue;

                    $ticket_ids .= $attendee['id'] . ',';
                    if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
                    else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
                }

                $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
                $user_id = $this->register_user($main_attendee, $transaction);

                // Remove Sensitive Data
                if(isset($transaction['username']) or isset($transaction['password']))
                {
                    unset($transaction['username']);
                    unset($transaction['password']);
                }

                $transaction['done'] = 1;
                $this->book->update_transaction($transaction_id, $transaction);

                // MEC User
                $u = $this->getUser();

                $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
                $book_id = $this->book->add(
                    array(
                        'post_author' => $user_id,
                        'post_type' => $this->PT,
                        'post_title' => $book_subject,
                        'post_date' => $date,
                        'attendees_info' => $attendees_info,
                        'mec_attendees' => $attendees,
                        'mec_gateway' => 'MEC_gateway_stripe',
                        'mec_gateway_label' => $this->title()
                    ),
                    $transaction_id,
                    $ticket_ids
                );

                // Assign User
                $u->assign($book_id, $user_id);

                // Gateway Referrer
                update_post_meta($book_id, 'mec_gateway_ref_type', 'intent');
                update_post_meta($book_id, 'mec_gateway_ref_id', (isset($results['id']) ? $results['id'] : ''));

                // Fires after completely creating a new booking
                do_action('mec_booking_completed', $book_id);

                // Create Stripe Customer
                if(isset($results['id']))
                {
                    $user_email = $u->get($user_id)->user_email;

                    $stripe = new \Stripe\StripeClient($options['secret_key']);

                    // Search Customers
                    $customers = $stripe->customers->all([
                        'email' => $user_email,
                        'limit' => 1,
                    ]);

                    if($customers->count()) $customer = $customers->first();
                    else
                    {
                        $customer = $stripe->customers->create([
                            'name' => $name,
                            'email' => $user_email,
                        ]);
                    }

                    if($customer and isset($customer->id)) $stripe->paymentIntents->update($results['id'], ['customer' => $customer->id, 'receipt_email' => $user_email]);
                }
            }
            else $book_id = (isset($transaction['booking_id']) ? $transaction['booking_id'] : 0);

            $book_ids[] = $book_id;
        }

        $invoice_status = (isset($this->settings['mec_cart_invoice']) and $this->settings['mec_cart_invoice']);
        $invoice_link = (!$invoice_status) ? '' : $c->get_invoice_link($cart_id);

        $message = stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));
        if(trim($invoice_link)) $message .= ' <a class="mec-invoice-download" href="'.esc_url($invoice_link).'">'.__('Download Invoice', 'modern-events-calendar-lite').'</a>';

        // Make the Cart Empty
        $c->clear($cart_id);

        $this->response(
            array(
                'success' => 1,
                'message' => $message,
                'data' => array(
                    'book_ids' => $book_ids,
                    'invoice_link' => $invoice_link,
                ),
            )
        );
    }

    public function cart_do_ideal_transaction()
    {
        $cart_id = isset($_GET['mec_ideal_cart_id']) ? sanitize_text_field($_GET['mec_ideal_cart_id']) : NULL;
        if(!trim($cart_id)) return false;

        $source = isset($_GET['source']) ? sanitize_text_field($_GET['source']) : NULL;
        if(!trim($source)) return false;

        // Cart Library
        $c = $this->getCart();

        $cart = $c->get_cart($cart_id);

        // Get Options
        $options = $this->options();

        /**
         * Payment
         */

        try
        {
            // Set Stripe Secret Key
            \Stripe\Stripe::setApiKey($options['secret_key']);

            $payable = $c->get_payable($cart);
            $currency_code = $this->main->get_currency_code();

            $charge = \Stripe\Charge::create([
                'amount' => ((int) $this->stripe_multiply($payable, $currency_code)),
                'currency' => $currency_code,
                'source' => $source,
            ]);
        }
        catch(Exception $e)
        {
            return false;
        }

        // Payment Invalid
        if(!$charge->captured or !$charge->paid) return false;

        foreach($cart as $transaction_id)
        {
            $transaction = $this->book->get_transaction($transaction_id);

            $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

            $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
            $attention_times = explode(':', $attention_date);
            $date = date('Y-m-d H:i:s', trim($attention_times[0]));

            $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
            $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

            $ticket_ids = '';
            $attendees_info = array();

            foreach($attendees as $i => $attendee)
            {
                if(!is_numeric($i)) continue;

                $ticket_ids .= $attendee['id'] . ',';
                if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
                else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
            }

            $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
            $user_id = $this->register_user($main_attendee, $transaction);

            // Remove Sensitive Data
            if(isset($transaction['username']) or isset($transaction['password']))
            {
                unset($transaction['username']);
                unset($transaction['password']);
            }

            $transaction['done'] = 1;
            $this->book->update_transaction($transaction_id, $transaction);

            // MEC User
            $u = $this->getUser();

            $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
            $book_id = $this->book->add(
                array(
                    'post_author' => $user_id,
                    'post_type' => $this->PT,
                    'post_title' => $book_subject,
                    'post_date' => $date,
                    'attendees_info' => $attendees_info,
                    'mec_attendees' => $attendees,
                    'mec_gateway' => 'MEC_gateway_stripe',
                    'mec_gateway_label' => $this->title()
                ),
                $transaction_id,
                $ticket_ids
            );

            // Assign User
            $u->assign($book_id, $user_id);

            // Gateway Referrer
            update_post_meta($book_id, 'mec_gateway_ref_type', 'charge');
            update_post_meta($book_id, 'mec_gateway_ref_id', (isset($charge->id) ? $charge->id : ''));

            // Fires after completely creating a new booking
            do_action('mec_booking_completed', $book_id);

            // Create Stripe Customer
            if($charge and $charge->id)
            {
                $user_email = $u->get($user_id)->user_email;

                $stripe = new \Stripe\StripeClient($options['secret_key']);

                // Search Customers
                $customers = $stripe->customers->all([
                    'email' => $user_email,
                    'limit' => 1,
                ]);

                if($customers->count()) $customer = $customers->first();
                else
                {
                    $customer = $stripe->customers->create([
                        'name' => $name,
                        'email' => $user_email,
                    ]);
                }

                if($customer and isset($customer->id)) $stripe->charges->update($charge->id, ['customer' => $customer->id]);
            }
        }

        // Make the Cart Empty
        $c->clear($cart_id);

        return true;
    }
}

class MEC_gateway_stripe_connect extends MEC_gateway
{
    public $id = 7;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        $this->factory->action('init', array($this, 'include_api'));
        $this->factory->action('init', array($this, 'authenticate'));
        $this->factory->action('init', array($this, 'express_redirect'));
        $this->factory->action('init', array($this, 'express_refresh'));
        $this->factory->action('init', array($this, 'express_return'));
        $this->factory->action('init', array($this, 'express_dashboard'));

        // Register actions
        $this->factory->action('wp_ajax_mec_check_stripe_connection', array($this, 'check_connection'));
        $this->factory->action('wp_ajax_nopriv_mec_check_stripe_connection', array($this, 'check_connection'));

        $this->factory->action('wp_ajax_mec_do_transaction_stripe_connect', array($this, 'do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_do_transaction_stripe_connect', array($this, 'do_transaction'));

        // Add Stripe JS Library
        if($this->enabled() and !is_admin()) $this->factory->action('wp_enqueue_scripts', array($this, 'frontend_assets'));

        // iDEAL verification
        $this->factory->action('init', array($this, 'do_ideal_transaction'));
    }

    public function frontend_assets()
    {
        $stripe_js = apply_filters('mec_gateways_stripe_js', true);
        if($stripe_js) wp_enqueue_script('mec-stripe', 'https://js.stripe.com/v3/');
    }

    public function label()
    {
        return __('Stripe Connect', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#FFBE0C';
    }

    public function get_connection_method()
    {
        return ((isset($this->options['connection_method']) and trim($this->options['connection_method'])) ? $this->options['connection_method'] : 'standard');
    }

    public function include_api()
    {
        if(class_exists('Stripe')) return;

        MEC::import('app.api.Stripe.autoload', false);
    }

    /**
     * It run after come back from Stripe
     */
    public function authenticate()
    {
        // Is it a request to autheticate?
        $called = (isset($_GET['mec-stripe-connect']) and $_GET['mec-stripe-connect'] == 1) ? true : false;
        if(!$called) return;

        $code = (isset($_GET['code']) and trim($_GET['code'])) ? $_GET['code'] : NULL;
        if(!$code) return;

        $current_user_id = get_current_user_id();
        if(!$current_user_id) return;

        // Call Stripe API to validate the request
        $post = array(
            'client_secret' => $this->options['secret_key'],
            'code' => $code,
            'grant_type' => 'authorization_code'
        );

        $ch = curl_init('https://connect.stripe.com/oauth/token');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

        $JSON = curl_exec($ch);
        curl_close($ch);

        // Get Stripe Account ID
        $response = json_decode($JSON);
        $stripe_user_id = isset($response->stripe_user_id) ? $response->stripe_user_id : NULL;

        // Stripe Account ID not found!
        if(!$stripe_user_id) return;

        // Save User ID
        update_user_meta($current_user_id, 'mec_stripe_id', $stripe_user_id);

        // Redirect
        $redirect_to = (isset($this->options['redirection_page']) and trim($this->options['redirection_page'])) ? get_permalink($this->options['redirection_page']) : get_home_url();

        wp_redirect($redirect_to);
        exit;
    }

    /**
     * It redirects the user to stripe for onboarding
     */
    public function express_redirect()
    {
        // Is it a request to redirect?
        $called = (isset($_GET['mec-stripe-connect-express-redirect']) and $_GET['mec-stripe-connect-express-redirect'] == 1) ? true : false;
        if(!$called) return;

        // Is Nonce Valid?
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_stripe_connect_express_redirect')) return;

        // Do the Redirect
        $this->express_do_redirect();
    }

    /**
     * It calls whenever use came back to refresh URL
     */
    public function express_refresh()
    {
        // Is it a request to refresh?
        $called = (isset($_GET['mec-stripe-connect-express-refresh']) and $_GET['mec-stripe-connect-express-refresh'] == 1) ? true : false;
        if(!$called) return;

        // Do the Redirect
        $this->express_do_redirect();
    }

    /**
     * It calls whenever use came back to refresh URL
     */
    public function express_return()
    {
        // Is user returned?
        $called = (isset($_GET['mec-stripe-connect-express-return']) and $_GET['mec-stripe-connect-express-return'] == 1) ? true : false;
        if(!$called) return;

        $current_user_id = get_current_user_id();
        if(!$current_user_id) return;

        $strip_account_id_temp = get_user_meta($current_user_id, 'mec_stripe_id_temp', true);
        if(!$strip_account_id_temp) return;

        // Set Stripe Secret Key
        \Stripe\Stripe::setApiKey($this->options['secret_key']);
        $account = \Stripe\Account::retrieve($strip_account_id_temp);

        // A problem occurred in getting account
        if(!$account or (is_object($account) and !isset($account->id)))
        {
            wp_redirect($this->main->URL('site'));
            exit;
        }

        // Onboarding Completed ...
        if($account->charges_enabled) update_user_meta($current_user_id, 'mec_stripe_id', $account->id);

        // Redirect
        $redirect_to = (isset($this->options['redirection_page']) and trim($this->options['redirection_page'])) ? get_permalink($this->options['redirection_page']) : get_home_url();

        wp_redirect($redirect_to);
        exit;
    }

    public function express_do_redirect()
    {
        $current_user_id = get_current_user_id();
        if(!$current_user_id) return;

        // Set Stripe Secret Key
        \Stripe\Stripe::setApiKey($this->options['secret_key']);

        $temp_account_id = get_user_meta($current_user_id, 'mec_stripe_id_temp', true);
        if(!$temp_account_id)
        {
            try
            {
                // Account
                $account = \Stripe\Account::create([
                    'type' => 'express',
                ]);

                // A problem occurred in account creation
                if(!$account or (is_object($account) and !isset($account->id)))
                {
                    wp_redirect($this->main->URL('site'));
                    exit;
                }

                // Save User ID
                update_user_meta($current_user_id, 'mec_stripe_id_temp', $account->id);
                $temp_account_id = $account->id;
            }
            catch(Exception $e)
            {
                wp_die($e->getMessage(), 'Stripe Error');
                exit;
            }
        }

        $account_link = \Stripe\AccountLink::create([
            'account' => $temp_account_id,
            'refresh_url' => $this->main->URL('site').'?mec-stripe-connect-express-refresh=1',
            'return_url' => $this->main->URL('site').'?mec-stripe-connect-express-return=1',
            'type' => 'account_onboarding',
        ]);

        // A problem occurred in account creation
        if(!$account_link or (is_object($account_link) and !isset($account_link->url)))
        {
            wp_redirect($this->main->URL('site'));
            exit;
        }

        wp_redirect($account_link->url);
        exit;
    }

    /**
     * It redirects the user to stripe dashboard
     */
    public function express_dashboard()
    {
        $current_user_id = get_current_user_id();
        if(!$current_user_id) return;

        // Is it a request to redirect?
        $called = (isset($_GET['mec-stripe-connect-express-dashboard']) and $_GET['mec-stripe-connect-express-dashboard'] == 1) ? true : false;
        if(!$called) return;

        // Is Nonce Valid?
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_stripe_connect_express_dashboard')) return;

        try
        {
            // Set Stripe Secret Key
            \Stripe\Stripe::setApiKey($this->options['secret_key']);

            $account_id = get_user_meta($current_user_id, 'mec_stripe_id', true);
            $dashboard = \Stripe\Account::createLoginLink($account_id);

            wp_redirect($dashboard->url);
            exit;
        }
        catch(Exception $e)
        {
            delete_user_meta($current_user_id, 'mec_stripe_id');
        }
    }

    public function do_transaction($transaction_id = null)
    {
        if(!trim($transaction_id)) $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $transaction_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        // Invalid Transaction
        if(!is_array($transaction) or (is_array($transaction) and !isset($transaction['price']))) return false;

        // Is there any attendee?
        if(!count($attendees))
        {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'NO_TICKET',
                    'message' => __(
                        'There is no attendee for booking!',
                        'mec'
                    ),
                )
            );
        }

        // Transaction is not done
        if(!isset($transaction['done']))
        {
            // Stripe Payment Details
            $payment_method_id = isset($_GET['payment_method_id']) ? sanitize_text_field($_GET['payment_method_id']) : '';
            $payment_intent_id = isset($_GET['payment_intent_id']) ? sanitize_text_field($_GET['payment_intent_id']) : '';

            // Pay by Stripe Token
            $results = $this->pay($payment_method_id, $payment_intent_id, $transaction_id);

            // Payment is invalid
            if(!$results['success'])
            {
                $this->response(
                    array(
                        'success' => 0,
                        'code' => 'INVALID_PAYMENT',
                        'message' => $results['message'],
                    )
                );
            }

            // Payment requires more actions
            if($results['success'] == 2)
            {
                $this->response(
                    array(
                        'success' => 2,
                        'requires_action' => 1,
                        'code' => 'REQUIRES_ACTION',
                        'payment_intent_client_secret' => $results['payment_intent_client_secret'],
                    )
                );
            }

            // Get Options Compatible with Organizer Payment
            $options = $this->options($transaction_id);

            $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
            $attention_times = explode(':', $attention_date);
            $date = date('Y-m-d H:i:s', trim($attention_times[0]));

            $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
            $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

            $ticket_ids = '';
            $attendees_info = array();

            foreach($attendees as $i => $attendee)
            {
                if(!is_numeric($i)) continue;

                $ticket_ids .= $attendee['id'] . ',';
                if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
                else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
            }

            $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
            $user_id = $this->register_user($main_attendee, $transaction);

            // Remove Sensitive Data
            if(isset($transaction['username']) or isset($transaction['password']))
            {
                unset($transaction['username']);
                unset($transaction['password']);

                $this->book->update_transaction($transaction_id, $transaction);
            }

            // MEC User
            $u = $this->getUser();

            $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
            $book_id = $this->book->add(
                array(
                    'post_author' => $user_id,
                    'post_type' => $this->PT,
                    'post_title' => $book_subject,
                    'post_date' => $date,
                    'attendees_info' => $attendees_info,
                    'mec_attendees' => $attendees,
                    'mec_gateway' => 'MEC_gateway_stripe',
                    'mec_gateway_label' => $this->title()
                ),
                $transaction_id,
                $ticket_ids
            );

            // Assign User
            $u->assign($book_id, $user_id);

            // Gateway Referrer
            update_post_meta($book_id, 'mec_gateway_ref_type', 'intent');
            update_post_meta($book_id, 'mec_gateway_ref_id', (isset($results['id']) ? $results['id'] : ''));

            // Fires after completely creating a new booking
            do_action('mec_booking_completed', $book_id);

            // Create Stripe Customer
            if(isset($results['id']))
            {
                $user_email = $u->get($user_id)->user_email;

                $stripe = new \Stripe\StripeClient($options['secret_key']);

                // Search Customers
                $customers = $stripe->customers->all([
                    'email' => $user_email,
                    'limit' => 1,
                ]);

                if($customers->count()) $customer = $customers->first();
                else
                {
                    $customer = $stripe->customers->create([
                        'name' => $name,
                        'email' => $user_email,
                    ]);
                }

                if($customer and isset($customer->id)) $stripe->paymentIntents->update($results['id'], ['customer' => $customer->id, 'receipt_email' => $user_email]);
            }
        }
        else $book_id = (isset($transaction['booking_id']) ? $transaction['booking_id'] : 0);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        $this->response(
            array(
                'success' => 1,
                'message' => stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite'))),
                'data' => array(
                    'book_id' => $book_id,
                    'redirect_to' => $redirect_to,
                    'invoice_link' => $invoice_link,
                    'dl_file_link' => $dl_file_link,
                    'extra_info' => $extra_info,
                ),
            )
        );
    }

    public function pay($payment_method_id, $payment_intent_id, $transaction_id)
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : NULL;
        $event = get_post($event_id);

        $author_id = $event->post_author;
        $stripe_user_id = get_user_meta($author_id, 'mec_stripe_id', true);

        if($stripe_user_id) $charge_options = array('stripe_account' => $stripe_user_id);
        else $charge_options = NULL;

        // Set Stripe Secret Key
        \Stripe\Stripe::setApiKey($this->options['secret_key']);

        // Get Status of Payment Intent
        if($payment_intent_id)
        {
            $intent = \Stripe\PaymentIntent::retrieve($payment_intent_id, $charge_options);
            $intent->confirm();

            if($intent->status == 'succeeded') return array('success' => 1, 'id' => $intent->id);
            else if($intent->status == 'requires_confirmation') return array('success' => 0, 'message' => __('Your payment needs to be confirmed!', 'modern-events-calendar-lite'));
            else return array('success' => 0, 'message' => __('Unknown Error!', 'modern-events-calendar-lite'));
        }

        try
        {
            if($stripe_user_id)
            {
                $application_fee_amount = $this->get_fee_amount($transaction);
                $currency_code = $this->main->get_currency_code($event_id);

                $charge = array(
                    'payment_method' => $payment_method_id,
                    'amount' => (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $currency_code)) : 0),
                    'currency' => $currency_code,
                    'description' => $this->get_stripe_charge_description($transaction_id),
                    'application_fee_amount' => (int) $this->stripe_multiply($application_fee_amount, $currency_code),
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                );
            }
            else
            {
                $currency_code = $this->main->get_currency_code($event_id);
                $charge = array(
                    'payment_method' => $payment_method_id,
                    'amount' => (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $currency_code)) : 0),
                    'currency' => $currency_code,
                    'description' => $this->get_stripe_charge_description($transaction_id),
                    'confirmation_method' => 'manual',
                    'confirm' => true,
                );
            }

            $intent = \Stripe\PaymentIntent::create($charge, $charge_options);
        }
        catch(Exception $e)
        {
            return array(
                'success' => 0,
                'message' => $e->getMessage(),
            );
        }

        if($intent->status == 'requires_action' and $intent->next_action->type == 'use_stripe_sdk')
        {
            return array(
                'success' => 2,
                'requires_action' => true,
                'payment_intent_client_secret' => $intent->client_secret
            );
        }
        elseif($intent->status == 'succeeded') return array('success' => 1, 'id' => $intent->id);
        else return array('success' => 0, 'message' => __('Unknown Error!', 'modern-events-calendar-lite'));
    }

    public function get_fee_amount($transaction)
    {
        $fee = isset($this->options['fee']) ? $this->options['fee'] : 0;
        $fee_type = isset($this->options['fee_type']) ? $this->options['fee_type'] : 'amount';
        $fee_per = isset($this->options['fee_per']) ? $this->options['fee_per'] : 'ticket';

        if($fee_type == 'amount')
        {
            if($fee_per == 'ticket')
            {
                $amount = $fee * count($transaction['tickets']);
            }
            // Booking
            else
            {
                $amount = $fee;
            }
        }
        // Percent
        else
        {
            if($fee_per == 'ticket')
            {
                $tickets_price = 0;
                foreach($transaction['price_details']['details'] as $p)
                {
                    if(isset($p['type']) and $p['type'] == 'tickets')
                    {
                        $tickets_price = $p['amount'];
                        break;
                    }
                }
                
                $amount = ($fee * $tickets_price) / 100;
            }
            // Booking
            else
            {
                $amount = ($fee * $transaction['price']) / 100;
            }
        }

        return $amount;
    }

    public function do_ideal_transaction()
    {
        $transaction_id = isset($_GET['mec_ideal_transaction_id']) ? sanitize_text_field($_GET['mec_ideal_transaction_id']) : NULL;
        if(!trim($transaction_id)) return false;

        $source = isset($_GET['source']) ? sanitize_text_field($_GET['source']) : NULL;
        if(!trim($source)) return false;

        $transaction = $this->book->get_transaction($transaction_id);

        // Invalid Transaction
        if(!is_array($transaction) or (is_array($transaction) and !isset($transaction['price']))) return false;

        // Transaction is done
        if(isset($transaction['done']) and $transaction['done'] == '1') return false;

        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : NULL;
        $event = get_post($event_id);

        $author_id = $event->post_author;
        $stripe_user_id = get_user_meta($author_id, 'mec_stripe_id', true);

        if($stripe_user_id) $charge_options = array('stripe_account' => $stripe_user_id);
        else $charge_options = NULL;

        try
        {
            // Set Stripe Secret Key
            \Stripe\Stripe::setApiKey($this->options['secret_key']);

            // Currency
            $currency_code = $this->main->get_currency_code($event_id);

            if($stripe_user_id)
            {
                $application_fee_amount = $this->get_fee_amount($transaction);

                $ch = array(
                    'amount' => (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $currency_code)) : 0),
                    'currency' => $currency_code,
                    'source' => $source,
                    'description' => $this->get_stripe_charge_description($transaction_id),
                    'application_fee_amount' => (int) $this->stripe_multiply($application_fee_amount, $currency_code),
                );
            }
            else
            {
                $ch = array(
                    'amount' => (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $currency_code)) : 0),
                    'currency' => $currency_code,
                    'source' => $source,
                    'description' => $this->get_stripe_charge_description($transaction_id),
                );
            }

            $charge = \Stripe\Charge::create($ch, $charge_options);
        }
        catch(Exception $e)
        {
            return false;
        }

        // Payment Invalid
        if(!$charge->captured or !$charge->paid) return false;

        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);
        }

        $transaction['done'] = 1;
        $this->book->update_transaction($transaction_id, $transaction);

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_stripe',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        // Gateway Referrer
        update_post_meta($book_id, 'mec_gateway_ref_type', 'charge');
        update_post_meta($book_id, 'mec_gateway_ref_id', (isset($charge->id) ? $charge->id : ''));

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Create Stripe Customer
        if($charge and $charge->id)
        {
            $user_email = $u->get($user_id)->user_email;

            $stripe = new \Stripe\StripeClient($this->options['secret_key']);

            // Search Customers
            $customers = $stripe->customers->all([
                'email' => $user_email,
                'limit' => 1,
            ]);

            if($customers->count()) $customer = $customers->first();
            else
            {
                $customer = $stripe->customers->create([
                    'name' => $name,
                    'email' => $user_email,
                ]);
            }

            if($customer and isset($customer->id)) $stripe->charges->update($charge->id, ['customer' => $customer->id]);
        }

        // Redirect
        if(trim($redirect_to))
        {
            wp_redirect($redirect_to);
            exit;
        }
    }

    public function checkout_form($transaction_id, $params = array())
    {
        // Payment Method
        $payment_method = (isset($this->options['payment_method']) and trim($this->options['payment_method'])) ? $this->options['payment_method'] : 'cc';

        if($payment_method == 'cc') $this->checkout_form_cc($transaction_id, $params);
        elseif($payment_method == 'ideal') $this->checkout_form_ideal($transaction_id, $params);
    }

    public function checkout_form_cc($transaction_id, $params = array())
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : NULL;

        $main_attendee_name = ((isset($transaction['tickets']) and isset($transaction['tickets'][0]) and isset($transaction['tickets'][0]['name'])) ? $transaction['tickets'][0]['name'] : '');
        $main_attendee_email = ((isset($transaction['tickets']) and isset($transaction['tickets'][0]) and isset($transaction['tickets'][0]['email'])) ? $transaction['tickets'][0]['email'] : '');

        $event = get_post($event_id);

        $author_id = $event->post_author;
        $stripe_user_id = get_user_meta($author_id, 'mec_stripe_id', true);
        ?>
        <script type="text/javascript">
            var stripe;

            <?php if($stripe_user_id): ?>
            stripe = Stripe("<?php echo(isset($this->options['publishable_key']) ? $this->options['publishable_key'] : ''); ?>", {
                stripeAccount: "<?php echo $stripe_user_id; ?>"
            });
            <?php else: ?>
            stripe = Stripe("<?php echo(isset($this->options['publishable_key']) ? $this->options['publishable_key'] : ''); ?>");
            <?php endif; ?>

            var elements = stripe.elements();
            var style = {
                base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    minHeight: '40px',
                    '::placeholder': {
                        color: '#aab7c4'
                    },
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            };

            var card = elements.create('card');
            card.mount('#mec_card_element_stripe_connect_<?php echo $transaction_id; ?>');

            // Validation
            card.addEventListener('change', function(event)
            {
                // Show the Error
                if(event.error) jQuery('#mec_do_transaction_stripe_connect_message<?php echo $transaction_id; ?>').text(event.error.message).addClass('mec-error').show();
                // Hide the Message
                else jQuery("#mec_do_transaction_stripe_connect_message<?php echo $transaction_id; ?>").removeClass("mec-success mec-error").hide();
            });

            jQuery('#mec_do_transaction_stripe_connect_form<?php echo $transaction_id; ?>').on('submit', function(e)
            {
                // Prevent the form from submitting
                e.preventDefault();

                var form = jQuery(this);
                var transaction_id = '<?php echo $transaction_id; ?>';

                // No pressing the buy now button more than once
                form.find('button').prop('disabled', true);

                // Add loading Class to the button
                jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").addClass("loading");

                // Hide the Message
                jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).removeClass("mec-success mec-error").hide();

                var payer_name = jQuery("#mec_name_stripe_connect_" + transaction_id).val();
                var payer_email = jQuery("#mec_email_stripe_connect_" + transaction_id).val();
                var payer_details = {
                    billing_details: {}
                };

                if(payer_name !== '') payer_details.billing_details.name = payer_name;
                if(payer_email !== '') payer_details.billing_details.email = payer_email;

                stripe.createPaymentMethod('card', card, payer_details).then(function(result)
                {
                    if(result.error)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        // Show the user what they did wrong
                        jQuery('#mec_do_transaction_stripe_connect_message' + transaction_id).text(result.error.message).addClass('mec-error').show();

                        // Make the submit clickable again
                        form.find('button').prop('disabled', false);
                    }
                    else
                    {
                        // Make the submit clickable again
                        form.find('button').prop('disabled', false);

                        // Hide the Message
                        jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).removeClass("mec-success mec-error").hide();

                        // Set Payment Method ID
                        jQuery("#mec_do_transaction_stripe_connect_payment_method_id" + transaction_id).val(result.paymentMethod.id);

                        var data = form.serialize();
                        jQuery.ajax(
                        {
                            type: "GET",
                            url: "<?php echo admin_url('admin-ajax.php', NULL); ?>",
                            data: data,
                            dataType: "JSON",
                            success: function(data)
                            {
                                if(data.success === 1)
                                {
                                    // Remove the loading Class from the button
                                    jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                    jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id).hide();
                                    jQuery(".mec-book-form-gateway-label").remove();
                                    jQuery(".mec-book-form-coupon").hide();
                                    jQuery(".mec-gateway-comment").hide();

                                    jQuery("#mec-book-form-back-btn-step-3").remove();
                                    jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).addClass("mec-success").html(data.message).show();

                                    // Show Invoice Link
                                    if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                                    {
                                        jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                                    }

                                    // Show Downloadable Link
                                    if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                                    {
                                        jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                                    }

                                    // Show Extra info
                                    if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                                    {
                                        jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                                    }

                                    // Redirect to thank you page
                                    if(typeof data.data.redirect_to !== "undefined" && data.data.redirect_to !== "")
                                    {
                                        setTimeout(function()
                                        {
                                            window.location.href = data.data.redirect_to;
                                        }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                                    }
                                }
                                else if(data.requires_action)
                                {
                                    stripe.handleCardAction(data.payment_intent_client_secret).then(function(result)
                                    {
                                        if(result.error)
                                        {
                                            // Show the user what they did wrong
                                            jQuery('#mec_do_transaction_stripe_connect_message' + transaction_id).text(result.error.message).addClass('mec-error').show();

                                            // Remove the loading Class from the button
                                            jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                            // Make the submit clickable again
                                            form.find('button').prop('disabled', false);
                                        }
                                        else
                                        {
                                            // Set Payment Intent ID
                                            jQuery("#mec_do_transaction_stripe_connect_payment_intent_id" + transaction_id).val(result.paymentIntent.id);

                                            var data = form.serialize();
                                            jQuery.ajax(
                                            {
                                                type: "GET",
                                                url: "<?php echo admin_url('admin-ajax.php', NULL); ?>",
                                                data: data,
                                                dataType: "JSON",
                                                success: function(data)
                                                {
                                                    if(data.success === 1)
                                                    {
                                                        // Remove the loading Class from the button
                                                        jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                                        jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id).hide();
                                                        jQuery(".mec-book-form-gateway-label").remove();
                                                        jQuery(".mec-book-form-coupon").hide();
                                                        jQuery(".mec-gateway-comment").hide();

                                                        jQuery("#mec-book-form-back-btn-step-3").remove();
                                                        jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).addClass("mec-success").html(data.message).show();

                                                        // Show Invoice Link
                                                        if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                                                        {
                                                            jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                                                        }

                                                        // Show Downloadable Link
                                                        if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                                                        {
                                                            jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                                                        }

                                                        // Show Extra info
                                                        if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                                                        {
                                                            jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                                                        }

                                                        // Redirect to thank you page
                                                        if(typeof data.data.redirect_to !== "undefined" && data.data.redirect_to !== "")
                                                        {
                                                            setTimeout(function()
                                                            {
                                                                window.location.href = data.data.redirect_to;
                                                            }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                                                        }
                                                    }
                                                    else
                                                    {
                                                        // Remove the loading Class from the button
                                                        jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                                        jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).addClass("mec-error").html(data.message).show();
                                                    }
                                                },
                                                error: function(jqXHR, textStatus, errorThrown)
                                                {
                                                    // Remove the loading Class from the button
                                                    jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");
                                                }
                                            });
                                        }
                                    });
                                }
                                else
                                {
                                    // Remove the loading Class from the button
                                    jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");

                                    jQuery("#mec_do_transaction_stripe_connect_message" + transaction_id).addClass("mec-error").html(data.message).show();
                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown)
                            {
                                // Remove the loading Class from the button
                                jQuery("#mec_do_transaction_stripe_connect_form" + transaction_id + " button[type=submit]").removeClass("loading");
                            }
                        });
                    }
                });
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden" id="mec_do_transaction_stripe_connect_message<?php echo $transaction_id; ?>" role="alert"></div>
        <form id="mec_do_transaction_stripe_connect_form<?php echo $transaction_id; ?>">
            <div class="mec-form-row">
                <label for="mec_name_stripe_connect_<?php echo $transaction_id; ?>">
                    <?php _e('Name', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_name_stripe_connect_<?php echo $transaction_id; ?>" type="text" value="<?php echo esc_attr($main_attendee_name); ?>">
            </div>
            <div class="mec-form-row">
                <label for="mec_email_stripe_connect_<?php echo $transaction_id; ?>">
                    <?php _e('Email', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_email_stripe_connect_<?php echo $transaction_id; ?>" type="email" value="<?php echo esc_attr($main_attendee_email); ?>">
            </div>
            <div class="mec-form-row">
                <label for="mec_card_element_stripe_connect_<?php echo $transaction_id; ?>">
                    <?php _e('Credit or debit card', 'modern-events-calendar-lite'); ?>
                </label>
                <div id="mec_card_element_stripe_connect_<?php echo $transaction_id; ?>">
                </div>
            </div>
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" name="action" value="mec_do_transaction_stripe_connect"/>
                <input type="hidden" name="transaction_id" value="<?php echo $transaction_id; ?>"/>
                <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
                <input type="hidden" name="payment_method_id" value="" id="mec_do_transaction_stripe_connect_payment_method_id<?php echo $transaction_id; ?>"/>
                <input type="hidden" name="payment_intent_id" value="" id="mec_do_transaction_stripe_connect_payment_intent_id<?php echo $transaction_id; ?>"/>
                <?php wp_nonce_field('mec_transaction_form_' . $transaction_id); ?>
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <?php
    }

    public function checkout_form_ideal($transaction_id, $params = array())
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;

        $main_attendee_name = ((isset($transaction['tickets']) and isset($transaction['tickets'][0]) and isset($transaction['tickets'][0]['name'])) ? $transaction['tickets'][0]['name'] : '');
        $event = get_post($event_id);

        $author_id = $event->post_author;
        $stripe_user_id = get_user_meta($author_id, 'mec_stripe_id', true);
        ?>
        <script type="text/javascript">
            var stripe;

            <?php if($stripe_user_id): ?>
            stripe = Stripe("<?php echo(isset($this->options['publishable_key']) ? $this->options['publishable_key'] : ''); ?>", {
                stripeAccount: "<?php echo $stripe_user_id; ?>"
            });
            <?php else: ?>
            stripe = Stripe("<?php echo(isset($this->options['publishable_key']) ? $this->options['publishable_key'] : ''); ?>");
            <?php endif; ?>

            var elements = stripe.elements();

            var idealBank = elements.create('idealBank');
            idealBank.mount('#mec_card_element_stripe_<?php echo $transaction_id; ?>');

            jQuery('#mec_do_transaction_stripe_form<?php echo $transaction_id; ?>').on('submit', function(e)
            {
                // Prevent the form from submitting
                e.preventDefault();

                var form = jQuery(this);
                var transaction_id = '<?php echo $transaction_id; ?>';

                // No pressing the buy now button more than once
                form.find('button').prop('disabled', true);

                // Hide the Message
                jQuery("#mec_do_transaction_stripe_message" + transaction_id).removeClass("mec-success mec-error").hide();

                // Add loading Class to the button
                jQuery("#mec_do_transaction_stripe_form" + transaction_id + " button[type=submit]").addClass("loading");

                var payer_name = jQuery("#mec_name_stripe_" + transaction_id).val();
                var source = {
                    type: 'ideal',
                    amount: <?php echo (isset($transaction['price']) ? ((int) $this->stripe_multiply($transaction['price'], $this->main->get_currency_code($event_id))) : 0); ?>,
                    currency: '<?php echo $this->main->get_currency_code($event_id); ?>',
                    owner:
                    {
                        name: payer_name,
                    },
                    redirect:
                    {
                        return_url: '<?php echo $this->main->add_qs_var('mec_ideal_transaction_id', $transaction_id, $this->get_return_url($event_id, false)); ?>',
                    }
                };

                stripe.createSource(idealBank, source).then(function(result)
                {
                    if(result.error) jQuery("#mec_do_transaction_stripe_message" + transaction_id).addClass("mec-error").html(result.error.message).show();
                    else document.location.href = result.source.redirect.url;
                });
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_stripe_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_stripe_form<?php echo $transaction_id; ?>">
            <div class="info-msg"><?php esc_html_e("You should complete the payment by returning back to the website.", 'modern-events-calendar-lite'); ?></div>
            <div class="mec-form-row mec-name-stripe">
                <label for="mec_name_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('Name', 'modern-events-calendar-lite'); ?>
                </label>
                <input id="mec_name_stripe_<?php echo $transaction_id; ?>" type="text" value="<?php echo esc_attr($main_attendee_name); ?>">
            </div>
            <div class="mec-form-row mec-ideal-element-stripe">
                <label for="mec_card_element_stripe_<?php echo $transaction_id; ?>">
                    <?php _e('iDEAL Bank', 'modern-events-calendar-lite'); ?>
                </label>
                <div id="mec_card_element_stripe_<?php echo $transaction_id; ?>">
                </div>
            </div>
            <div class="mec-form-row mec-click-pay">
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <?php
    }

    public function options_form()
    {
        $pages = get_pages();
        $connection_method = (isset($this->options['connection_method']) and trim($this->options['connection_method'])) ? $this->options['connection_method'] : 'standard';
        ?>
        <div class="mec-form-row">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle(); if(jQuery(this).is(':checked')) jQuery('#mec_gateways_op_status').prop('checked', 'checked');" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('Stripe Connect', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form
										<?php
        if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
            echo 'mec-util-hidden';
        }
        ?>">
            <p><?php _e("Using this gateway, booking fee goes to the organizer account directly but you can get your fee in your Stripe account.", 'modern-events-calendar-lite'); ?></p>
            <p><?php _e("If organizer connects their account, then it will be the only enabled gateway for organizer events even if other gateways are enabled. Organizer Payment Module must be enabled to use this!", 'modern-events-calendar-lite'); ?></p>
            <p class="mec-only-strip-connect-standard <?php echo ($connection_method == 'express' ? 'w-hide' : ''); ?>"><?php echo sprintf(__("You should set %s as Redirect URL in your Stripe dashboard.", 'modern-events-calendar-lite'), '<code>'.rtrim(get_home_url(), '/').'/?mec-stripe-connect=1</code>'); ?></p>
            <br>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title" name="mec[gateways][<?php echo $this->id(); ?>][title]" value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>" placeholder="<?php echo $this->label(); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>_comment" name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('Stripe Gateway Description', 'modern-events-calendar-lite'); ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a href="https://webnus.net/dox/modern-events-calendar/booking/" target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_organizer_comment"><?php _e('Comment for Organizer', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>organizer_comment" name="mec[gateways][<?php echo $this->id(); ?>][organizer_comment]"><?php echo (isset($this->options['organizer_comment']) and trim($this->options['organizer_comment'])) ? stripslashes($this->options['organizer_comment']) : ''; ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a href="https://webnus.net/dox/modern-events-calendar/booking/" target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_connection_method"><?php _e('Connection Method', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <select name="mec[gateways][<?php echo $this->id(); ?>][connection_method]" id="mec_gateways<?php echo $this->id(); ?>_connection_method" onchange="if(this.value === 'express') jQuery('.mec-only-strip-connect-standard').addClass('w-hide'); else jQuery('.mec-only-strip-connect-standard').removeClass('w-hide');">
                        <option value="standard" <?php echo (isset($this->options['connection_method']) and $this->options['connection_method'] == 'standard') ? 'selected="selected"' : ''; ?>><?php esc_html_e('Standard', 'modern-events-calendar-lite'); ?></option>
                        <option value="express" <?php echo (isset($this->options['connection_method']) and $this->options['connection_method'] == 'express') ? 'selected="selected"' : ''; ?>><?php esc_html_e('Express', 'modern-events-calendar-lite'); ?></option>
                    </select>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_payment_method"><?php _e('Payment Method', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <select name="mec[gateways][<?php echo $this->id(); ?>][payment_method]" id="mec_gateways<?php echo $this->id(); ?>_payment_method">
                        <option value="cc" <?php echo (isset($this->options['payment_method']) and $this->options['payment_method'] == 'cc') ? 'selected="selected"' : ''; ?>><?php esc_html_e('Credit Card', 'modern-events-calendar-lite'); ?></option>
                        <option value="ideal" <?php echo (isset($this->options['payment_method']) and $this->options['payment_method'] == 'ideal') ? 'selected="selected"' : ''; ?>><?php esc_html_e('iDEAL', 'modern-events-calendar-lite'); ?></option>
                    </select>
                </div>
            </div>
            <div class="mec-form-row mec-only-strip-connect-standard <?php echo ($connection_method == 'express' ? 'w-hide' : ''); ?>">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_client_id"><?php _e('Client ID', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_client_id" name="mec[gateways][<?php echo $this->id(); ?>][client_id]" value="<?php echo isset($this->options['client_id']) ? $this->options['client_id'] : ''; ?>">
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_secret_key"><?php _e('Secret Key', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_secret_key" name="mec[gateways][<?php echo $this->id(); ?>][secret_key]" value="<?php echo isset($this->options['secret_key']) ? $this->options['secret_key'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_publishable_key"><?php _e('Publishable Key', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_publishable_key" name="mec[gateways][<?php echo $this->id(); ?>][publishable_key]" value="<?php echo isset($this->options['publishable_key']) ? $this->options['publishable_key'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_fee"><?php _e('Your Fee', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <div class="mec-form-row">
                        <div class="mec-col-4">
                            <input type="number" id="mec_gateways<?php echo $this->id(); ?>_fee" name="mec[gateways][<?php echo $this->id(); ?>][fee]" value="<?php echo isset($this->options['fee']) ? $this->options['fee'] : 10; ?>">
                        </div>
                        <div class="mec-col-4">
                            <select id="mec_gateways<?php echo $this->id(); ?>_fee_type" name="mec[gateways][<?php echo $this->id(); ?>][fee_type]" title="<?php esc_attr_e('Fee Type', 'modern-events-calendar-lite'); ?>">
                                <option value="amount" <?php echo ((isset($this->options['fee_type']) and $this->options['fee_type'] == 'amount') ? 'selected="selected"' : ''); ?>><?php _e('Amount', 'modern-events-calendar-lite'); ?></option>
                                <option value="percent" <?php echo ((isset($this->options['fee_type']) and $this->options['fee_type'] == 'percent') ? 'selected="selected"' : ''); ?>><?php _e('Percent', 'modern-events-calendar-lite'); ?></option>
                            </select>
                        </div>
                        <div class="mec-col-4">
                            <select id="mec_gateways<?php echo $this->id(); ?>_fee_per" name="mec[gateways][<?php echo $this->id(); ?>][fee_per]" title="<?php esc_attr_e('Per', 'modern-events-calendar-lite'); ?>">
                                <option value="booking" <?php echo ((isset($this->options['fee_per']) and $this->options['fee_per'] == 'booking') ? 'selected="selected"' : ''); ?>><?php _e('Booking', 'modern-events-calendar-lite'); ?></option>
                                <option value="ticket" <?php echo ((isset($this->options['fee_per']) and $this->options['fee_per'] == 'ticket') ? 'selected="selected"' : ''); ?>><?php _e('Ticket', 'modern-events-calendar-lite'); ?></option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_redirection_page"><?php _e('Redirection Page', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <select id="mec_gateways<?php echo $this->id(); ?>_redirection_page" name="mec[gateways][<?php echo $this->id(); ?>][redirection_page]">
                        <option value="">-----</option>
                        <?php foreach($pages as $page): if(!trim($page->post_title)) continue; ?>
                            <option value="<?php echo $page->ID; ?>" <?php echo ((isset($this->options['redirection_page']) and $this->options['redirection_page'] == $page->ID) ? 'selected="selected"' : ''); ?>><?php echo $page->post_title; ?></option>
                        <?php endforeach; ?>
                    </select>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Redirection Page', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('Users will redirect to this page after connecting to your Stripe account. You can create a page to thank them. If you leave it empty then users will redirect to home page!', 'modern-events-calendar-lite'); ?></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                           name="mec[gateways][<?php echo $this->id(); ?>][index]"
                           value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 6; ?>"
                           placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                </div>
            </div>
        </div>
        <?php
    }

    public function op_enabled()
    {
        return true;
    }

    public function op_form($options = array())
    {
        $client_id = isset($this->options['client_id']) ? trim($this->options['client_id']) : NULL;
        $secret_key = isset($this->options['secret_key']) ? trim($this->options['secret_key']) : NULL;

        if(!$client_id or !$secret_key) return '';

        global $post;
        $strip_account_id = get_user_meta($post->post_author, 'mec_stripe_id', true);

        $connection_method = $this->get_connection_method();
        if($connection_method === 'express')
        {
            try
            {
                // Set Stripe Secret Key
                \Stripe\Stripe::setApiKey($this->options['secret_key']);
                \Stripe\Account::createLoginLink($strip_account_id);
            }
            catch(Exception $e)
            {
                delete_user_meta($post->post_author, 'mec_stripe_id');
                $strip_account_id = NULL;
            }
        }
        ?>
        <h4><?php echo $this->label(); ?></h4>
        <div class="mec-gateway-options-form">

            <?php if(isset($this->options['organizer_comment']) and trim($this->options['organizer_comment'])): ?>
                <p><?php echo $this->options['organizer_comment']; ?></p>
            <?php endif; ?>

            <div class="mec-form-row">
                <div class="mec-col-12">

                    <?php if($connection_method === 'express'): ?>
                        <a id="mec_gateway_options_form_stripe_connection_button" class="button button-primary" onclick="mec_stripe_connection_checker();" href="<?php echo $this->main->URL('site'); ?>?mec-stripe-connect-express-redirect=1&_wpnonce=<?php echo wp_create_nonce('mec_stripe_connect_express_redirect'); ?>" target="_blank"><?php echo ($strip_account_id ? __('Connect New Account', 'modern-events-calendar-lite') : __('Connect', 'modern-events-calendar-lite')); ?></a>

                        <div id="mec_gateway_options_form_stripe_connection_success" class="<?php echo $strip_account_id ? '' : 'mec-util-hidden'; ?>">
                            <p class="mec-success"><?php _e("You're connected to our account successfully and you will receive payments in your stripe account directly after deducting the fees.", 'modern-events-calendar-lite'); ?></p>
                            <a href="<?php echo $this->main->URL('site'); ?>?mec-stripe-connect-express-dashboard=1&_wpnonce=<?php echo wp_create_nonce('mec_stripe_connect_express_dashboard'); ?>" target="_blank"><?php echo esc_html__('Visit your dashboard', 'modern-events-calendar-lite'); ?></a>
                        </div>
                    <?php else: ?>
                        <a id="mec_gateway_options_form_stripe_connection_button" class="button button-primary" onclick="mec_stripe_connection_checker();" href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=<?php echo $client_id; ?>&scope=read_write" target="_blank"><?php echo ($strip_account_id ? __('Connect New Account', 'modern-events-calendar-lite') : __('Connect Your Account', 'modern-events-calendar-lite')); ?></a>

                        <div id="mec_gateway_options_form_stripe_connection_success" class="<?php echo $strip_account_id ? '' : 'mec-util-hidden'; ?>">
                            <p class="mec-success"><?php _e("You're connected to our account successfully and you will receive payments in your stripe account directly after deducting the fees.", 'modern-events-calendar-lite'); ?></p>
                        </div>
                    <?php endif; ?>

                </div>
            </div>
        </div>
        <script>
        function mec_stripe_connection_checker()
        {
            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: "action=mec_check_stripe_connection",
                dataType: "JSON",
                success: function(data)
                {
                    if(data.success === 1)
                    {
                        jQuery("#mec_gateway_options_form_stripe_connection_button").hide();

                        jQuery("#mec_gateway_options_form_stripe_connection_success").removeClass("mec-util-hidden");
                    }
                    else
                    {
                        setTimeout(function()
                        {
                            mec_stripe_connection_checker();
                        }, 10000);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown)
                {
                }
            });
        }
        </script>
        <?php
    }

    public function check_connection()
    {
        $success = 2;
        $message = __('Waiting for a response from gateway.', 'modern-events-calendar-lite');

        $current_user_id = get_current_user_id();
        $stripe_user_id = get_user_meta($current_user_id, 'mec_stripe_id', true);

        if($stripe_user_id)
        {
            $success = 1;
            $message = __('User connected successfully!', 'modern-events-calendar-lite');
        }

        $this->response(
            array(
                'success' => $success,
                'message' => $message,
            )
        );
    }
}

do_action('after_MEC_gateway');

class MEC_gateway_pay_locally extends MEC_gateway
{
    public $id = 1;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        // Register actions
        $this->factory->action('wp_ajax_mec_do_transaction_pay_locally', array($this, 'do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_do_transaction_pay_locally', array($this, 'do_transaction'));

        $this->factory->action('wp_ajax_mec_cart_do_transaction_pay_locally', array($this, 'cart_do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_cart_do_transaction_pay_locally', array($this, 'cart_do_transaction'));
    }

    public function label()
    {
        return __('Pay Locally', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#2DCA73';
    }

    public function options_form()
    {
        ?>
        <div class="mec-form-row mec-click-pay">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle();" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('Pay Locally', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form
										<?php
        if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
            echo 'mec-util-hidden';
        }
        ?>">
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title"
                           name="mec[gateways][<?php echo $this->id(); ?>][title]"
                           value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>"
                           placeholder="<?php echo $this->label(); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>_comment"
                              name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('Pay Locally Description', 'modern-events-calendar-lite'); ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a
                                            href="https://webnus.net/dox/modern-events-calendar/booking/"
                                            target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                           name="mec[gateways][<?php echo $this->id(); ?>][index]"
                           value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 1; ?>"
                           placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-12">
                    <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][disable_auto_confirmation]" value="0">
                    <input value="1" type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][disable_auto_confirmation]" <?php echo (isset($this->options['disable_auto_confirmation']) and trim($this->options['disable_auto_confirmation'])) ? 'checked="checked"' : ''; ?>>
                    <?php _e('Disable Auto Confirmation', 'modern-events-calendar-lite'); ?>
                </label>
            </div>
        </div>
        <?php
    }

    public function checkout_form($transaction_id, $params = array())
    {
        ?>
        <script type="text/javascript">
            jQuery("#mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?>").on("submit", function(event)
            {
                event.preventDefault();
                jQuery(this).find('button').attr('disabled', true);

                // Add loading Class to the button
                jQuery("#mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?> button[type=submit]").addClass("loading");
                jQuery("#mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>").removeClass("mec-success mec-error").hide();

                var data = jQuery("#mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?>").serialize();
                jQuery.ajax(
                {
                    type: "GET",
                    url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                    data: data,
                    dataType: "JSON",
                    success: function (data)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?> button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?>").hide();
                        jQuery(".mec-book-form-gateway-label").remove();

                        if(data.success)
                        {
                            jQuery(".mec-book-form-coupon").hide();
                            jQuery(".mec-gateway-comment").hide();

                            jQuery("#mec-book-form-back-btn-step-3").remove();
                            jQuery("#mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>").addClass("mec-success").html(data.message).show();

                            // Show Invoice Link
                            if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                            {
                                jQuery("#mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>").append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                            }

                            // Show Downloadable Link
                            if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                            {
                                jQuery("#mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>").append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                            }

                            // Show Extra info
                            if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                            {
                                jQuery("#mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>").append('<div>' + data.data.extra_info+'</div>');
                            }

                            // Redirect to thank you page
                            if (typeof data.data.redirect_to != "undefined" && data.data.redirect_to != "") {
                                setTimeout(function () {
                                    window.location.href = data.data.redirect_to;
                                }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                            }
                            jQuery(this).find('button').removeAttr('disabled');
                        }
                        else {
                            jQuery("#mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>").addClass("mec-error").html(data.message).show();
                        }
                        
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?> button[type=submit]").removeClass("loading");
                    }
                });
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_pay_locally_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_pay_locally_form<?php echo $transaction_id; ?>" class="mec-click-pay">
            <input type="hidden" name="action" value="mec_do_transaction_pay_locally"/>
            <input type="hidden" name="transaction_id" value="<?php echo $transaction_id; ?>"/>
            <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
            <?php wp_nonce_field('mec_transaction_form_' . $transaction_id); ?>
                <button class="mec-book-form-next-button" type="submit"><?php _e('Submit', 'modern-events-calendar-lite'); ?></button>
            <?php do_action('mec_booking_checkout_form_before_end', $transaction_id); ?>
        </form>
        <?php
    }

    public function do_transaction($transaction_id = null)
    {
        if(!trim($transaction_id)) $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $transaction_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        // Is there any attendee?
        if (!count($attendees)) {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'NO_TICKET',
                    'message' => __(
                        'There is no attendee for booking!',
                        'mec'
                    ),
                )
            );
        }

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }
        
        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);

            $this->book->update_transaction($transaction_id, $transaction);
        }

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_pay_locally',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        $this->response(
            array(
                'success' => 1,
                'message' => stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite'))),
                'data' => array(
                    'book_id' => $book_id,
                    'redirect_to' => $redirect_to,
                    'invoice_link' => $invoice_link,
                    'dl_file_link' => $dl_file_link,
                    'extra_info' => $extra_info,
                ),
            )
        );
    }

    public function cart_checkout_form($cart_id, $params = array())
    {
        ?>
        <div class="mec-gateway-message mec-util-hidden" id="mec_do_cart_pay_locally_message<?php echo $cart_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_cart_pay_locally_form<?php echo $cart_id; ?>" class="mec-click-pay">
            <input type="hidden" name="action" value="mec_cart_do_transaction_pay_locally"/>
            <input type="hidden" name="cart_id" value="<?php echo $cart_id; ?>"/>
            <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
            <?php wp_nonce_field('mec_cart_form_' . $cart_id); ?>
            <button class="mec-book-form-next-button" type="submit"><?php _e('Submit', 'modern-events-calendar-lite'); ?></button>
            <?php do_action('mec_cart_checkout_form_before_end', $cart_id); ?>
        </form>
        <script type="text/javascript">
        jQuery("#mec_do_cart_pay_locally_form<?php echo $cart_id; ?>").on("submit", function(e)
        {
            e.preventDefault();
            jQuery(this).find('button').attr('disabled', true);

            // Add loading Class to the button
            jQuery("#mec_do_cart_pay_locally_form<?php echo $cart_id; ?> button[type=submit]").addClass("loading");
            jQuery("#mec_do_cart_pay_locally_message<?php echo $cart_id; ?>").removeClass("mec-success mec-error").hide();

            var data = jQuery("#mec_do_cart_pay_locally_form<?php echo $cart_id; ?>").serialize();
            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: data,
                dataType: "JSON",
                success: function (data)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_cart_pay_locally_form<?php echo $cart_id; ?> button[type=submit]").removeClass("loading");

                    if(data.success)
                    {
                        jQuery("#mec_do_cart_pay_locally_form<?php echo $cart_id; ?>").hide();
                        jQuery(".mec-checkout-form-gateway-label").remove();

                        jQuery(".mec-gateway-comment").hide();
                        jQuery("#mec_do_cart_pay_locally_message<?php echo $cart_id; ?>").addClass("mec-success").html(data.message).show();

                        jQuery(this).find('button').removeAttr('disabled');
                    }
                    else
                    {
                        jQuery("#mec_do_cart_pay_locally_message<?php echo $cart_id; ?>").addClass("mec-error").html(data.message).show();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_cart_pay_locally_form<?php echo $cart_id; ?> button[type=submit]").removeClass("loading");
                }
            });
        });
        </script>
        <?php
    }

    public function cart_do_transaction()
    {
        $cart_id = isset($_GET['cart_id']) ? sanitize_text_field($_GET['cart_id']) : NULL;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_cart_form_' . $cart_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->cart_validate($cart_id);

        // Parent Function
        $this->response($this->do_cart_transaction($cart_id, array(
            'gateway' => 'MEC_gateway_pay_locally',
        )));
    }
}

class MEC_gateway_paypal_express extends MEC_gateway
{
    public $id = 2;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        // Register actions
        $this->factory->action('wp_ajax_mec_check_transaction_paypal_express', array($this, 'check_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_check_transaction_paypal_express', array($this, 'check_transaction'));
        $this->factory->action('wp_ajax_mec_pre_transaction_paypal_express', array($this, 'pre_validation'));
        $this->factory->action('wp_ajax_nopriv_mec_pre_transaction_paypal_express', array($this, 'pre_validation'));

        $this->factory->action('wp_ajax_mec_cart_check_transaction_paypal_express', array($this, 'cart_check_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_cart_check_transaction_paypal_express', array($this, 'cart_check_transaction'));
        $this->factory->action('wp_ajax_mec_cart_pre_transaction_paypal_express', array($this, 'cart_pre_validation'));
        $this->factory->action('wp_ajax_nopriv_mec_cart_pre_transaction_paypal_express', array($this, 'cart_pre_validation'));
    }

    public function label()
    {
        return __('PayPal Express', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#8338ec';
    }

    public function op_enabled()
    {
        return true;
    }

    public function op_form($options = array())
    {
        ?>
        <h4><?php echo $this->label(); ?></h4>
        <div class="mec-gateway-options-form">
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_op<?php echo $this->id(); ?>_account"><?php _e('Business Account', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_op<?php echo $this->id(); ?>_account" name="mec[op][<?php echo $this->id(); ?>][account]" value="<?php echo isset($options['account']) ? $options['account'] : ''; ?>" />
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Business Account', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('Normally PayPal Email.', 'modern-events-calendar-lite'); ?><a href="https://webnus.net/dox/modern-events-calendar/booking/" target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
        </div>
        <?php
    }

    public function options_form()
    {
        ?>
        <div class="mec-form-row mec-click-pay">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle();" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('PayPal Express', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form
										<?php
        if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
            echo 'mec-util-hidden';
        }
        ?>">
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title"
                           name="mec[gateways][<?php echo $this->id(); ?>][title]"
                           value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>"
                           placeholder="<?php echo $this->label(); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>_comment"
                              name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('Paypal Express Description', 'modern-events-calendar-lite'); ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a
                                            href="https://webnus.net/dox/modern-events-calendar/booking/"
                                            target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_account"><?php _e('Business Account', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_account"
                           name="mec[gateways][<?php echo $this->id(); ?>][account]"
                           value="<?php echo isset($this->options['account']) ? $this->options['account'] : ''; ?>" />
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Business Account', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('Normally PayPal Email.', 'modern-events-calendar-lite'); ?><a
                                            href="https://webnus.net/dox/modern-events-calendar/booking/"
                                            target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_mode"><?php _e('Mode', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <select id="mec_gateways<?php echo $this->id(); ?>_mode"
                            name="mec[gateways][<?php echo $this->id(); ?>][mode]">
                        <option value="live" <?php echo (isset($this->options['mode']) and $this->options['mode'] == 'live') ? 'selected="selected"' : ''; ?>><?php _e('Live', 'modern-events-calendar-lite'); ?></option>
                        <option value="sandbox" <?php echo (isset($this->options['mode']) and $this->options['mode'] == 'sandbox') ? 'selected="selected"' : ''; ?>><?php _e('Sandbox', 'modern-events-calendar-lite'); ?></option>
                    </select>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                           name="mec[gateways][<?php echo $this->id(); ?>][index]"
                           value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 2; ?>"
                           placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                </div>
            </div>
        </div>
        <?php
    }

    public function get_api_url()
    {
        $live = 'https://www.paypal.com/cgi-bin/webscr';
        $sandbox = 'https://www.sandbox.paypal.com/cgi-bin/webscr';

        if($this->options['mode'] == 'live') $url = $live;
        else $url = $sandbox;

        return $url;
    }

    public function get_notify_url()
    {
        return $this->main->URL('mec') . 'app/features/gateways/paypal_ipn.php';
    }

    public function checkout_form($transaction_id, $params = array())
    {
        // Get Options Compatible with Organizer Payment
        $options = $this->options($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
        $tickets_count = isset($transaction['tickets']) ? count($transaction['tickets']) : 1;
        ?>
        <script type="text/javascript">
        function mec_paypal_express_pre_validation(transaction_id)
        {
            // Add loading Class to the button
            jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").addClass("loading");
            jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).removeClass("mec-success mec-error").hide();

            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: "action=mec_pre_transaction_paypal_express&transaction_id=" + transaction_id,
                dataType: "JSON",
                success: function(data)
                {
                    if(data.success == 1)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        // Submit the Form
                        jQuery('#mec_do_transaction_paypal_express_form' + transaction_id).trigger('submit');
                    }
                    else
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).addClass("mec-error").html(data.message).show();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").removeClass("loading");
                }
            });
        }

        function mec_paypal_express_pay_checker(transaction_id)
        {
            // Add loading Class to the button
            jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").addClass("loading");
            jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).removeClass("mec-success mec-error").hide();

            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: "action=mec_check_transaction_paypal_express&transaction_id=" + transaction_id,
                dataType: "JSON",
                success: function(data)
                {
                    if(data.success == 1)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_paypal_express_form" + transaction_id).hide();
                        jQuery(".mec-book-form-gateway-label").remove();
                        jQuery(".mec-book-form-coupon").hide();
                        jQuery(".mec-gateway-comment").hide();

                        jQuery("#mec-book-form-back-btn-step-3").remove();
                        jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).addClass("mec-success").html(data.message).show();

                        // Show Invoice Link
                        if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                        {
                            jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                        }

                        // Show Downloadable Link
                        if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                        {
                            jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                        }

                        // Show Extra info
                        if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                        {
                            jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                        }

                        // Redirect to thank you page
                        if(typeof data.data.redirect_to != "undefined" && data.data.redirect_to != "")
                        {
                            setTimeout(function()
                            {
                                window.location.href = data.data.redirect_to;
                            }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                        }
                    }
                    else if(data.success == 0)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_paypal_express_message" + transaction_id).addClass("mec-error").html(data.message).show();
                    }
                    else
                    {
                        setTimeout(function () {
                            mec_paypal_express_pay_checker(transaction_id)
                        }, 10000);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_paypal_express_form" + transaction_id + " button[type=submit]").removeClass("loading");
                }
            });
        }
        </script>
        <div class="mec-gateway-message mec-util-hidden" id="mec_do_transaction_paypal_express_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_paypal_express_form<?php echo $transaction_id; ?>" class="mec-click-pay" action="<?php echo $this->get_api_url(); ?>" method="post" target="_blank" onsubmit="mec_paypal_express_pay_checker('<?php echo $transaction_id; ?>');">
            <input type="hidden" name="cmd" value="_xclick"/>
            <input type="hidden" name="rm" value="2"/>
            <input type="hidden" name="business" value="<?php echo(isset($options['account']) ? $options['account'] : null); ?>"/>
            <input type="hidden" name="item_name" value="<?php echo esc_attr(get_the_title($event_id)); ?>"/>
            <input type="hidden" name="item_number" value="<?php echo $tickets_count; ?>"/>
            <input type="hidden" name="amount" value="<?php echo(isset($transaction['price']) ? $transaction['price'] : 0); ?>"/>
            <input type="hidden" name="currency_code" value="<?php echo $this->main->get_currency_code($event_id); ?>"/>
            <input type="hidden" name="cancel_return" value="<?php echo $this->get_cancel_url($event_id); ?>"/>
            <input type="hidden" name="notify_url" value="<?php echo $this->get_notify_url(); ?>"/>
            <input type="hidden" name="return" value="<?php echo $this->get_return_url($event_id); ?>"/>
            <input type="hidden" name="custom" value="<?php echo base64_encode(json_encode(array('transaction_id' => $transaction_id))); ?>"/>
            <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
        </form>
        <?php
    }

    public function pre_validation()
    {
        $transaction_id = (isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0);

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $this->response(array('success' => 1, 'message' => __('Ready to checkout.', 'modern-events-calendar-lite')));
    }

    public function do_transaction($transaction_id = null)
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        // Is there any attendee?
        if(!count($attendees))
        {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'NO_TICKET',
                    'message' => __(
                        'There is no attendee for booking!',
                        'mec'
                    ),
                )
            );
        }

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);

            $this->book->update_transaction($transaction_id, $transaction);
        }

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_paypal_express',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);
    }

    public function validate_express_payment($vars)
    {
        // Check if Paypal is disabled
        if(!$this->enabled())
        {
            return false;
        }

        $custom = $this->decode_custom($vars['custom']);
        $transaction_id = $custom['transaction_id'];

        $transaction = $this->book->get_transaction($transaction_id);

        $request_str = $this->get_request_string($vars) . '&cmd=_notify-validate';
        $response_str = $this->get_paypal_response($request_str, $this->get_api_url());

        // $this->main->debug_log(current_time('Y-m-d H:i:s').' => ('.$response_str.') => '.print_r($vars, true));

        if(strpos($response_str, 'VERIFIED') !== false) $status = 1;
        else $status = 0;

        $amount = $vars['mc_gross'];

        // Compare paid amount with transaction amount
        $valid = ($amount >= $transaction['price'] and $status) ? true : false;
        if($valid)
        {
            // Mark it as done
            $transaction['done'] = 1;

            // Save Gateway Transaction ID
            $transaction['gateway_transaction_id'] = (isset($vars['txn_id']) and trim($vars['txn_id'])) ? $vars['txn_id'] : '';

            $this->book->update_transaction($transaction_id, $transaction);
            $this->do_transaction($transaction_id);

            return true;
        }
        else
        {
            // Mark it as done
            $transaction['done'] = 0;
            $this->book->update_transaction($transaction_id, $transaction);

            return false;
        }
    }

    public function check_transaction($transaction_id = null)
    {
        if(!trim($transaction_id)) $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;

        $transaction = $this->book->get_transaction($transaction_id);

        $success = 2;
        $message = __('Waiting for a response from gateway.', 'modern-events-calendar-lite');
        $data = array();

        if(isset($transaction['done']) and $transaction['done'] == 1)
        {
            $success = 1;
            $message = stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));

            $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);

            $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
            if($thankyou_page_id) $data['redirect_to'] = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

            $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), NULL);

            // Invoice Link
            $data['invoice_link'] = $this->book->get_invoice_link($transaction_id);
            $data['dl_file_link'] = $this->book->get_dl_file_link($this->book->get_event_id_by_transaction_id($transaction_id));
            $data['extra_info'] = $extra_info;
        }
        elseif(isset($transaction['done']) and $transaction['done'] == 0)
        {
            $success = 0;
            $message = __('Payment invalid! Booking failed.', 'modern-events-calendar-lite');
        }

        $this->response(
            array(
                'success' => $success,
                'message' => $message,
                'data' => $data,
            )
        );
    }

    public function cart_checkout_form($cart_id, $params = array())
    {
        // Get Options
        $options = $this->options();

        // Cart Library
        $c = $this->getCart();
        $cart = $c->get_cart($cart_id);

        $event_id = $c->get_first_event_id($cart);
        $transactions_count = count($cart);
        ?>
        <script type="text/javascript">
        function mec_paypal_express_pre_validation(cart_id)
        {
            // Add loading Class to the button
            jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").addClass("loading");
            jQuery("#mec_do_transaction_paypal_express_message" + cart_id).removeClass("mec-success mec-error").hide();

            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: "action=mec_cart_pre_transaction_paypal_express&cart_id=" + cart_id,
                dataType: "JSON",
                success: function(data)
                {
                    if(data.success == 1)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").removeClass("loading");

                        // Submit the Form
                        jQuery('#mec_do_transaction_paypal_express_form' + cart_id).trigger('submit');
                    }
                    else
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_paypal_express_message" + cart_id).addClass("mec-error").html(data.message).show();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").removeClass("loading");
                }
            });
        }

        function mec_paypal_express_pay_checker(cart_id)
        {
            // Add loading Class to the button
            jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").addClass("loading");
            jQuery("#mec_do_transaction_paypal_express_message" + cart_id).removeClass("mec-success mec-error").hide();

            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: "action=mec_cart_check_transaction_paypal_express&cart_id=" + cart_id,
                dataType: "JSON",
                success: function(data)
                {
                    if(data.success == 1)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_paypal_express_form" + cart_id).hide();
                        jQuery(".mec-checkout-form-gateway-label").remove();
                        jQuery(".mec-gateway-comment").hide();

                        jQuery("#mec_do_transaction_paypal_express_message" + cart_id).addClass("mec-success").html(data.message).show();
                    }
                    else if(data.success == 0)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_paypal_express_message" + cart_id).addClass("mec-error").html(data.message).show();
                    }
                    else
                    {
                        setTimeout(function()
                        {
                            mec_paypal_express_pay_checker(cart_id)
                        }, 10000);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_paypal_express_form" + cart_id + " button[type=submit]").removeClass("loading");
                }
            });
        }
        </script>
        <div class="mec-gateway-message mec-util-hidden" id="mec_do_transaction_paypal_express_message<?php echo $cart_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_paypal_express_form<?php echo $cart_id; ?>" class="mec-click-pay" action="<?php echo $this->get_api_url(); ?>" method="post" target="_blank" onsubmit="mec_paypal_express_pay_checker('<?php echo $cart_id; ?>');">
            <input type="hidden" name="cmd" value="_xclick"/>
            <input type="hidden" name="rm" value="2"/>
            <input type="hidden" name="business" value="<?php echo(isset($options['account']) ? $options['account'] : null); ?>"/>
            <input type="hidden" name="item_name" value="<?php echo esc_attr(get_the_title($event_id)); ?>"/>
            <input type="hidden" name="item_number" value="<?php echo $transactions_count; ?>"/>
            <input type="hidden" name="amount" value="<?php echo $c->get_payable($cart); ?>"/>
            <input type="hidden" name="currency_code" value="<?php echo $this->main->get_currency_code(); ?>"/>
            <input type="hidden" name="cancel_return" value="<?php echo $this->get_cancel_url($event_id); ?>"/>
            <input type="hidden" name="notify_url" value="<?php echo $this->cart_get_notify_url(); ?>"/>
            <input type="hidden" name="return" value="<?php echo $this->get_return_url($event_id); ?>"/>
            <input type="hidden" name="custom" value="<?php echo base64_encode(json_encode(array('cart_id' => $cart_id))); ?>"/>
            <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
        </form>
        <?php
    }

    public function cart_get_notify_url()
    {
        return $this->main->URL('mec') . 'app/features/gateways/paypal_ipn_cart.php';
    }

    public function cart_validate_express_payment($vars)
    {
        // Check if Paypal is disabled
        if(!$this->enabled()) return false;

        $custom = $this->decode_custom($vars['custom']);
        $cart_id = $custom['cart_id'];

        // Cart Library
        $c = $this->getCart();
        $cart = $c->get_cart($cart_id);

        $payable = $c->get_payable($cart);

        $request_str = $this->get_request_string($vars) . '&cmd=_notify-validate';
        $response_str = $this->get_paypal_response($request_str, $this->get_api_url());

        // $this->main->debug_log(current_time('Y-m-d H:i:s').' => ('.$response_str.') => '.print_r($vars, true));

        if(strpos($response_str, 'VERIFIED') !== false) $status = 1;
        else $status = 0;

        $amount = $vars['mc_gross'];

        // Compare paid amount with transaction amount
        $valid = ($amount >= $payable and $status) ? true : false;
        if($valid)
        {
            foreach($cart as $transaction_id)
            {
                // Mark as done
                $transaction['done'] = 1;

                // Save Gateway Transaction ID
                $transaction['gateway_transaction_id'] = (isset($vars['txn_id']) and trim($vars['txn_id'])) ? $vars['txn_id'] : '';

                $this->book->update_transaction($transaction_id, $transaction);
            }

            $this->cart_do_transaction($cart_id);

            return true;
        }
        else
        {
            // Mark as not done
            foreach($cart as $transaction_id)
            {
                $transaction['done'] = 0;
                $this->book->update_transaction($transaction_id, $transaction);
            }

            return false;
        }
    }

    public function cart_pre_validation()
    {
        $cart_id = (isset($_GET['cart_id']) ? sanitize_text_field($_GET['cart_id']) : 0);

        // Validate Ticket Availability
        $this->cart_validate($cart_id);

        $this->response(array('success' => 1, 'message' => __('Ready to checkout.', 'modern-events-calendar-lite')));
    }

    public function cart_do_transaction($cart_id)
    {
        // Cart Library
        $c = $this->getCart();

        $cart = $c->get_cart($cart_id);
        foreach($cart as $transaction_id) $this->do_transaction($transaction_id);

        // Empty Cart
        $c->clear($cart_id);
    }

    public function cart_check_transaction()
    {
        $cart_id = isset($_GET['cart_id']) ? sanitize_text_field($_GET['cart_id']) : 0;
        $transaction = array();

        // Cart Library
        $c = $this->getCart();

        $cart = $c->get_cart($cart_id);
        foreach($cart as $transaction_id)
        {
            $transaction = $this->book->get_transaction($transaction_id);
            break;
        }

        $success = 2;
        $message = __('Waiting for a response from gateway.', 'modern-events-calendar-lite');
        $data = array();

        if(isset($transaction['done']) and $transaction['done'] == 1)
        {
            $success = 1;
            $message = stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));
        }
        elseif(isset($transaction['done']) and $transaction['done'] == 0)
        {
            $success = 0;
            $message = __('Payment invalid! Booking failed.', 'modern-events-calendar-lite');
        }

        $this->response(array(
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ));
    }
}

class MEC_gateway_paypal_credit_card extends MEC_gateway
{
    public $id = 3;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        // Register actions
        $this->factory->action('wp_ajax_mec_do_transaction_paypal_credit_card', array($this, 'do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_do_transaction_paypal_credit_card', array($this, 'do_transaction'));

        $this->factory->action('wp_ajax_mec_cart_do_transaction_paypal_credit_card', array($this, 'cart_do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_cart_do_transaction_paypal_credit_card', array($this, 'cart_do_transaction'));
    }

    public function label()
    {
        return __('PayPal Credit Card', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#0aafff';
    }

    public function get_api_url()
    {
        $live = 'https://api-3t.paypal.com/nvp';
        $sandbox = 'https://api-3t.sandbox.paypal.com/nvp';

        if ($this->options['mode'] == 'live') {
            $url = $live;
        } else {
            $url = $sandbox;
        }

        return $url;
    }

    public function op_enabled()
    {
        return true;
    }

    public function op_form($options = array())
    {
        $last_error = get_option('mec_paypal_cc_error', NULL);
        ?>
        <h4><?php echo $this->label(); ?></h4>
        <div class="mec-gateway-options-form">
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_op<?php echo $this->id(); ?>_api_username"><?php _e('API Username', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_op<?php echo $this->id(); ?>_api_username" name="mec[op][<?php echo $this->id(); ?>][api_username]" value="<?php echo isset($options['api_username']) ? $options['api_username'] : ''; ?>" />
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_op<?php echo $this->id(); ?>_api_password"><?php _e('API Password', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_op<?php echo $this->id(); ?>_api_password" name="mec[op][<?php echo $this->id(); ?>][api_password]" value="<?php echo isset($options['api_password']) ? $options['api_password'] : ''; ?>" />
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_op<?php echo $this->id(); ?>_api_signature"><?php _e('API Signature', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_op<?php echo $this->id(); ?>_api_signature" name="mec[op][<?php echo $this->id(); ?>][api_signature]" value="<?php echo isset($options['api_signature']) ? $options['api_signature'] : ''; ?>" />
                </div>
            </div>
        </div>
        <?php
    }

    public function options_form()
    {
        $last_error = get_option('mec_paypal_cc_error', NULL);
        ?>
        <div class="mec-form-row mec-click-pay">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle();" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('PayPal Credit Card', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form <?php
            if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
                echo 'mec-util-hidden';
            }
        ?>">
            <?php if($last_error): ?>
            <div class="warning-msg">
                <p><?php esc_html_e("Below error is the latest error received from Paypal during the payment in frontend so it's not related to the configuration form. It might help you to find some misconfiguration on your Paypal account or inserted credentials.", 'modern-events-calendar-lite'); ?></p>
                <?php echo $last_error; ?>
            </div>
            <?php endif; ?>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title"
                           name="mec[gateways][<?php echo $this->id(); ?>][title]"
                           value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>"
                           placeholder="<?php echo $this->label(); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>_comment"
                              name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('Paypal Credit Card Description', 'modern-events-calendar-lite'); ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a
                                            href="https://webnus.net/dox/modern-events-calendar/booking/"
                                            target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_api_username"><?php _e('API Username', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_api_username"
                           name="mec[gateways][<?php echo $this->id(); ?>][api_username]"
                           value="<?php echo isset($this->options['api_username']) ? $this->options['api_username'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_api_password"><?php _e('API Password', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_api_password"
                           name="mec[gateways][<?php echo $this->id(); ?>][api_password]"
                           value="<?php echo isset($this->options['api_password']) ? $this->options['api_password'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_api_signature"><?php _e('API Signature', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input class="mec-required" type="text" id="mec_gateways<?php echo $this->id(); ?>_api_signature"
                           name="mec[gateways][<?php echo $this->id(); ?>][api_signature]"
                           value="<?php echo isset($this->options['api_signature']) ? $this->options['api_signature'] : ''; ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_mode"><?php _e('Mode', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <select id="mec_gateways<?php echo $this->id(); ?>_mode"
                            name="mec[gateways][<?php echo $this->id(); ?>][mode]">
                        <option value="live" <?php echo (isset($this->options['mode']) and $this->options['mode'] == 'live') ? 'selected="selected"' : ''; ?>><?php _e('Live', 'modern-events-calendar-lite'); ?></option>
                        <option value="sandbox" <?php echo (isset($this->options['mode']) and $this->options['mode'] == 'sandbox') ? 'selected="selected"' : ''; ?>><?php _e('Sandbox', 'modern-events-calendar-lite'); ?></option>
                    </select>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                           name="mec[gateways][<?php echo $this->id(); ?>][index]"
                           value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 3; ?>"
                           placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                </div>
            </div>
        </div>
        <?php
    }

    public function checkout_form($transaction_id, $params = array())
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;
        ?>
        <script type="text/javascript">
            function mec_paypal_credit_card_send_request(transaction_id) {
                // Add loading Class to the button
                jQuery("#mec_do_transaction_paypal_credit_card_form" + transaction_id + " button[type=submit]").addClass("loading");
                jQuery("#mec_do_transaction_paypal_credit_card_message" + transaction_id).removeClass("mec-success mec-error").hide();

                var data = jQuery("#mec_do_transaction_paypal_credit_card_form" + transaction_id).serialize();
                jQuery.ajax(
                {
                    type: "GET",
                    url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                    data: data,
                    dataType: "JSON",
                    success: function (data) {
                        if (data.success == 1) {
                            // Remove the loading Class from the button
                            jQuery("#mec_do_transaction_paypal_credit_card_form" + transaction_id + " button[type=submit]").removeClass("loading");

                            jQuery("#mec_do_transaction_paypal_credit_card_form" + transaction_id).hide();
                            jQuery(".mec-book-form-gateway-label").remove();
                            jQuery(".mec-book-form-coupon").hide();
                            jQuery(".mec-gateway-comment").hide();

                            jQuery("#mec-book-form-back-btn-step-3").remove();
                            jQuery("#mec_do_transaction_paypal_credit_card_message" + transaction_id).addClass("mec-success").html(data.message).show();

                            // Show Invoice Link
                            if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                            {
                                jQuery("#mec_do_transaction_paypal_credit_card_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                            }

                            // Show Downloadable Link
                            if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                            {
                                jQuery("#mec_do_transaction_paypal_credit_card_message" + transaction_id).append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                            }

                            // Show Extra info
                            if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                            {
                                jQuery("#mec_do_transaction_paypal_credit_card_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                            }

                            // Redirect to thank you page
                            if (typeof data.data.redirect_to != "undefined" && data.data.redirect_to != "") {
                                setTimeout(function () {
                                    window.location.href = data.data.redirect_to;
                                }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                            }
                        }
                        else {
                            // Remove the loading Class from the button
                            jQuery("#mec_do_transaction_paypal_credit_card_form" + transaction_id + " button[type=submit]").removeClass("loading");

                            jQuery("#mec_do_transaction_paypal_credit_card_message" + transaction_id).addClass("mec-error").html(data.message).show();
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_paypal_credit_card_form" + transaction_id + " button[type=submit]").removeClass("loading");
                    }
                });
            }
        </script>
        <style>.nice-select{-webkit-tap-highlight-color:transparent;background-color:#fff;border-radius:5px;border:solid 1px #e8e8e8;box-sizing:border-box;clear:both;cursor:pointer;display:block;float:left;font-family:inherit;font-size:14px;font-weight:400;height:42px;line-height:40px;outline:0;padding-left:18px;padding-right:30px;position:relative;text-align:left!important;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;width:auto}.nice-select:hover{border-color:#dbdbdb}.nice-select.open,.nice-select:active,.nice-select:focus{border-color:#999}.nice-select:after{border-bottom:2px solid #999;border-right:2px solid #999;content:'';display:block;height:5px;margin-top:-4px;pointer-events:none;position:absolute;right:12px;top:50%;-webkit-transform-origin:66% 66%;-ms-transform-origin:66% 66%;transform-origin:66% 66%;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);-webkit-transition:all .15s ease-in-out;transition:all .15s ease-in-out;width:5px}.nice-select.open:after{-webkit-transform:rotate(-135deg);-ms-transform:rotate(-135deg);transform:rotate(-135deg)}.nice-select.open .list{opacity:1;pointer-events:auto;-webkit-transform:scale(1) translateY(0);-ms-transform:scale(1) translateY(0);transform:scale(1) translateY(0)}.nice-select.disabled{border-color:#ededed;color:#999;pointer-events:none}.nice-select.disabled:after{border-color:#ccc}.nice-select.wide{width:100%}.nice-select.wide .list{left:0!important;right:0!important}.nice-select.right{float:right}.nice-select.right .list{left:auto;right:0}.nice-select.small{font-size:12px;height:36px;line-height:34px}.nice-select.small:after{height:4px;width:4px}.nice-select.small .option{line-height:34px;min-height:34px}.nice-select .list{background-color:#fff;border-radius:5px;box-shadow:0 0 0 1px rgba(68,68,68,.11);box-sizing:border-box;margin-top:4px;opacity:0;overflow:hidden;padding:0;pointer-events:none;position:absolute;top:100%;left:0;-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(.75) translateY(-21px);-ms-transform:scale(.75) translateY(-21px);transform:scale(.75) translateY(-21px);-webkit-transition:all .2s cubic-bezier(.5,0,0,1.25),opacity .15s ease-out;transition:all .2s cubic-bezier(.5,0,0,1.25),opacity .15s ease-out;z-index:9}.nice-select .list:hover .option:not(:hover){background-color:transparent!important}.nice-select .option{cursor:pointer;font-weight:400;line-height:40px;list-style:none;min-height:40px;outline:0;padding-left:18px;padding-right:29px;text-align:left;-webkit-transition:all .2s;transition:all .2s}.nice-select .option.focus,.nice-select .option.selected.focus,.nice-select .option:hover{background-color:#f6f6f6}.nice-select .option.selected{font-weight:700}.nice-select .option.disabled{background-color:transparent;color:#999;cursor:default}.no-csspointerevents .nice-select .list{display:none}.no-csspointerevents .nice-select.open .list{display:block}</style>
        <script type="text/javascript" src="<?php echo $this->main->asset('js/jquery.nice-select.min.js'); ?>"></script>
        <script>
            jQuery(document).ready(function () {
                if (jQuery('.mec-booking-shortcode').length < 0) {
                    return;
                }
                // Events
                jQuery('.mec-booking-shortcode').find('select').niceSelect();
                
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_paypal_credit_card_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_paypal_credit_card_form<?php echo $transaction_id; ?>"
              onsubmit="mec_paypal_credit_card_send_request('<?php echo $transaction_id; ?>'); return false;">
            <div class="mec-form-row mec-paypal-credit-card-first-name">
                <label for="mec_paypal_credit_card_first_name"><?php echo __('First name', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="first_name" id="mec_paypal_credit_card_first_name"/>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-last-name">
                <label for="mec_paypal_credit_card_last_name"><?php echo __('Last name', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="last_name" id="mec_paypal_credit_card_last_name"/>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-card-type">
                <label for="mec_paypal_credit_card_card_type"><?php echo __('Card Type', 'modern-events-calendar-lite'); ?></label>
                <select name="card_type" id="mec_paypal_credit_card_card_type">
                    <option value="Visa"><?php echo __('Visa', 'modern-events-calendar-lite'); ?></option>
                    <option value="MasterCard"><?php echo __('MasterCard', 'modern-events-calendar-lite'); ?></option>
                    <option value="Discover"><?php echo __('Discover', 'modern-events-calendar-lite'); ?></option>
                    <option value="Amex"><?php echo __('American Express', 'modern-events-calendar-lite'); ?></option>
                </select>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-cc-number">
                <label for="mec_paypal_credit_card_cc_number"><?php echo __('CC Number', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="cc_number" id="mec_paypal_credit_card_cc_number"/>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-expiration-date-month">
                <label for="mec_paypal_credit_card_expiration_date_month"><?php echo __('Expiration Date', 'modern-events-calendar-lite'); ?></label>
                <select name="expiration_date_month" id="mec_paypal_credit_card_expiration_date_month">
                    <?php foreach (array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12') as $month) : ?>
                        <option value="<?php echo $month; ?>"><?php echo $month; ?></option>
                    <?php endforeach; ?>
                </select>
                <select name="expiration_date_year" id="mec_paypal_credit_card_expiration_date_year">
                    <?php
                    for ($i = 0; $i <= 10;
                         $i++) :
                        $y = date('Y', strtotime('+' . $i . ' years'));
                        ?>
                        <option value="<?php echo $y; ?>"><?php echo $y; ?></option>
                    <?php endfor; ?>
                </select>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-cvv2">
                <label for="mec_paypal_credit_card_cvv2"><?php echo __('CVV2', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="cvv2" id="mec_paypal_credit_card_cvv2"/>
            </div>         
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" name="action" value="mec_do_transaction_paypal_credit_card"/>
                <input type="hidden" name="transaction_id" value="<?php echo $transaction_id; ?>"/>
                <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
                <?php wp_nonce_field('mec_transaction_form_' . $transaction_id); ?>
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <?php
    }

    public function do_transaction($transaction_id = null)
    {
        if(!trim($transaction_id)) $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $transaction_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        // Is there any attendee?
        if (!count($attendees)) {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'NO_TICKET',
                    'message' => __(
                        'There is no attendee for booking!',
                        'mec'
                    ),
                )
            );
        }

        $validate = $this->validate_paypal($_GET);
        if(!$validate)
        {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'PAYMENT_IS_INVALID',
                    'message' => __(
                        'Payment is invalid.',
                        'mec'
                    ),
                )
            );
        }

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);

            $this->book->update_transaction($transaction_id, $transaction);
        }

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_paypal_credit_card',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        $this->response(
            array(
                'success' => 1,
                'message' => stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite'))),
                'data' => array(
                    'book_id' => $book_id,
                    'redirect_to' => $redirect_to,
                    'invoice_link' => $invoice_link,
                    'dl_file_link' => $dl_file_link,
                    'extra_info' => $extra_info,
                ),
            )
        );
    }

    public function validate_paypal($vars = array())
    {
        $card_type = (isset($vars['card_type']) ? sanitize_text_field($vars['card_type']) : null);
        $cc_number = (isset($vars['cc_number']) ? sanitize_text_field($vars['cc_number']) : null);
        $cvv2 = (isset($vars['cvv2']) ? sanitize_text_field($vars['cvv2']) : null);
        $first_name = (isset($vars['first_name']) ? sanitize_text_field($vars['first_name']) : null);
        $last_name = (isset($vars['last_name']) ? sanitize_text_field($vars['last_name']) : null);
        $exp_date_month = (isset($vars['expiration_date_month']) ? sanitize_text_field($vars['expiration_date_month']) : null);
        $exp_date_year = (isset($vars['expiration_date_year']) ? sanitize_text_field($vars['expiration_date_year']) : null);

        // Check Card details
        if(!$card_type or !$cc_number or !$cvv2) return false;

        $transaction_id = isset($vars['transaction_id']) ? sanitize_text_field($vars['transaction_id']) : 0;

        // Get Options Compatible with Organizer Payment
        $options = $this->options($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = isset($transaction['event_id']) ? $transaction['event_id'] : 0;

        $expdate = $exp_date_month . $exp_date_year;
        $params = array(
            'METHOD' => 'DoDirectPayment',
            'USER' => (isset($options['api_username']) ? $options['api_username'] : null),
            'PWD' => (isset($options['api_password']) ? $options['api_password'] : null),
            'SIGNATURE' => (isset($options['api_signature']) ? $options['api_signature'] : null),
            'VERSION' => 90.0,
            'CREDITCARDTYPE' => $card_type,
            'ACCT' => $cc_number,
            'EXPDATE' => $expdate,
            'CVV2' => $cvv2,
            'FIRSTNAME' => $first_name,
            'LASTNAME' => $last_name,
            'AMT' => (isset($transaction['price']) ? $transaction['price'] : 0),
            'CURRENCYCODE' => $this->main->get_currency_code($event_id),
            'DESC' => get_the_title($event_id),
        );

        $request_str = $this->get_request_string($params);
        $response_str = $this->get_paypal_response($request_str, $this->get_api_url());

        $results = $this->normalize_NVP($response_str);

        $status = strpos(strtolower($results['ACK']), 'success') !== false ? 1 : 0;
        $amount = isset($results['AMT']) ? $results['AMT'] : 0;

        // Save Transaction ID
        if($status)
        {
            $gateway_transaction_id = isset($results['TRANSACTIONID']) ? $results['TRANSACTIONID'] : '';
            if($gateway_transaction_id)
            {
                $transaction['gateway_transaction_id'] = $gateway_transaction_id;
                $this->book->update_transaction($transaction_id, $transaction);
            }
        }

        // Error
        if(!$status)
        {
            $error = (isset($results['L_ERRORCODE0']) ? '('.$results['L_ERRORCODE0'].') ' : '').(isset($results['L_LONGMESSAGE0']) ? $results['L_LONGMESSAGE0'] : '');

            // Log it
            trigger_error($error, E_USER_NOTICE);

            // Save it
            update_option('mec_paypal_cc_error', current_time('Y-m-d H:i:s').': '.$error, false);
        }

        // Compare paid amount with transaction amount
        return ($amount >= $transaction['price'] and $status) ? true : false;
    }

    public function normalize_NVP($nvp_string)
    {
        $Array = array();
        while (strlen($nvp_string)) {
            // name
            $keypos = strpos($nvp_string, '=');
            $keyval = substr($nvp_string, 0, $keypos);

            // value
            $valuepos = strpos($nvp_string, '&') ? strpos($nvp_string, '&') : strlen($nvp_string);
            $valval = substr($nvp_string, $keypos + 1, $valuepos - $keypos - 1);

            // decoding the respose
            $Array[$keyval] = urldecode($valval);
            $nvp_string = substr($nvp_string, $valuepos + 1, strlen($nvp_string));
        }

        return $Array;
    }

    public function cart_checkout_form($cart_id, $params = array())
    {
        ?>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_paypal_credit_card_message<?php echo $cart_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_paypal_credit_card_form<?php echo $cart_id; ?>"
              onsubmit="mec_paypal_credit_card_send_request('<?php echo $cart_id; ?>'); return false;">
            <div class="mec-form-row mec-paypal-credit-card-first-name">
                <label for="mec_paypal_credit_card_first_name"><?php echo __('First name', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="first_name" id="mec_paypal_credit_card_first_name"/>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-last-name">
                <label for="mec_paypal_credit_card_last_name"><?php echo __('Last name', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="last_name" id="mec_paypal_credit_card_last_name"/>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-card-type">
                <label for="mec_paypal_credit_card_card_type"><?php echo __('Card Type', 'modern-events-calendar-lite'); ?></label>
                <select name="card_type" id="mec_paypal_credit_card_card_type">
                    <option value="Visa"><?php echo __('Visa', 'modern-events-calendar-lite'); ?></option>
                    <option value="MasterCard"><?php echo __('MasterCard', 'modern-events-calendar-lite'); ?></option>
                    <option value="Discover"><?php echo __('Discover', 'modern-events-calendar-lite'); ?></option>
                    <option value="Amex"><?php echo __('American Express', 'modern-events-calendar-lite'); ?></option>
                </select>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-cc-number">
                <label for="mec_paypal_credit_card_cc_number"><?php echo __('CC Number', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="cc_number" id="mec_paypal_credit_card_cc_number"/>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-expiration-date-month">
                <label for="mec_paypal_credit_card_expiration_date_month"><?php echo __('Expiration Date', 'modern-events-calendar-lite'); ?></label>
                <select name="expiration_date_month" id="mec_paypal_credit_card_expiration_date_month">
                    <?php foreach (array('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12') as $month) : ?>
                        <option value="<?php echo $month; ?>"><?php echo $month; ?></option>
                    <?php endforeach; ?>
                </select>
                <select name="expiration_date_year" id="mec_paypal_credit_card_expiration_date_year">
                    <?php
                    for ($i = 0; $i <= 10;
                         $i++) :
                        $y = date('Y', strtotime('+' . $i . ' years'));
                        ?>
                        <option value="<?php echo $y; ?>"><?php echo $y; ?></option>
                    <?php endfor; ?>
                </select>
            </div>
            <div class="mec-form-row mec-paypal-credit-card-cvv2">
                <label for="mec_paypal_credit_card_cvv2"><?php echo __('CVV2', 'modern-events-calendar-lite'); ?></label>
                <input type="text" name="cvv2" id="mec_paypal_credit_card_cvv2"/>
            </div>
            <div class="mec-form-row mec-click-pay">
                <input type="hidden" name="action" value="mec_cart_do_transaction_paypal_credit_card"/>
                <input type="hidden" name="cart_id" value="<?php echo $cart_id; ?>"/>
                <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
                <?php wp_nonce_field('mec_transaction_form_' . $cart_id); ?>
                <button type="submit" class="mec-book-form-next-button"><?php _e('Pay', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <script type="text/javascript">
        function mec_paypal_credit_card_send_request(cart_id)
        {
            // Add loading Class to the button
            jQuery("#mec_do_transaction_paypal_credit_card_form" + cart_id + " button[type=submit]").addClass("loading");
            jQuery("#mec_do_transaction_paypal_credit_card_message" + cart_id).removeClass("mec-success mec-error").hide();

            var data = jQuery("#mec_do_transaction_paypal_credit_card_form" + cart_id).serialize();
            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: data,
                dataType: "JSON",
                success: function(data)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_paypal_credit_card_form" + cart_id + " button[type=submit]").removeClass("loading");

                    if(data.success == 1)
                    {
                        jQuery("#mec_do_transaction_paypal_credit_card_form" + cart_id).hide();
                        jQuery(".mec-checkout-form-gateway-label").remove();
                        jQuery(".mec-gateway-comment").hide();

                        jQuery("#mec_do_transaction_paypal_credit_card_message" + cart_id).addClass("mec-success").html(data.message).show();
                    }
                    else
                    {
                        jQuery("#mec_do_transaction_paypal_credit_card_message" + cart_id).addClass("mec-error").html(data.message).show();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_paypal_credit_card_form" + cart_id + " button[type=submit]").removeClass("loading");
                }
            });
        }
        </script>
        <?php
    }

    public function cart_do_transaction()
    {
        $cart_id = isset($_GET['cart_id']) ? sanitize_text_field($_GET['cart_id']) : NULL;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $cart_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->cart_validate($cart_id);

        /**
         * Payment
         */

        $validate = $this->cart_validate_paypal($_GET);
        if(!$validate)
        {
            $this->response(array(
                'success' => 0,
                'code' => 'PAYMENT_IS_INVALID',
                'message' => __('Payment is invalid.', 'modern-events-calendar-lite'),
            ));
        }

        /**
         * Booking
         */

        // Cart Library
        $c = $this->getCart();
        $cart = $c->get_cart($cart_id);

        $book_ids = array();
        foreach($cart as $transaction_id)
        {
            $transaction = $this->book->get_transaction($transaction_id);
            $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

            $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
            $attention_times = explode(':', $attention_date);
            $date = date('Y-m-d H:i:s', trim($attention_times[0]));

            $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
            $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

            $ticket_ids = '';
            $attendees_info = array();

            foreach($attendees as $i => $attendee)
            {
                if(!is_numeric($i)) continue;

                $ticket_ids .= $attendee['id'] . ',';

                if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
                else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
            }

            $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
            $user_id = $this->register_user($main_attendee, $transaction);

            // Remove Sensitive Data
            if(isset($transaction['username']) or isset($transaction['password']))
            {
                unset($transaction['username']);
                unset($transaction['password']);

                $this->book->update_transaction($transaction_id, $transaction);
            }

            // MEC User
            $u = $this->getUser();

            $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
            $book_id = $this->book->add(
                array(
                    'post_author' => $user_id,
                    'post_type' => $this->PT,
                    'post_title' => $book_subject,
                    'post_date' => $date,
                    'attendees_info' => $attendees_info,
                    'mec_attendees' => $attendees,
                    'mec_gateway' => 'MEC_gateway_paypal_credit_card',
                    'mec_gateway_label' => $this->title()
                ),
                $transaction_id,
                $ticket_ids
            );

            // Assign User
            $u->assign($book_id, $user_id);

            // Fires after completely creating a new booking
            do_action('mec_booking_completed', $book_id);

            $book_ids[] = $book_id;
        }

        $invoice_status = (isset($this->settings['mec_cart_invoice']) and $this->settings['mec_cart_invoice']);
        $invoice_link = (!$invoice_status) ? '' : $c->get_invoice_link($cart_id);

        $message = stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));
        if(trim($invoice_link)) $message .= ' <a class="mec-invoice-download" href="'.esc_url($invoice_link).'">'.__('Download Invoice', 'modern-events-calendar-lite').'</a>';

        // Empty Cart
        $c->clear($cart_id);

        $this->response(array(
            'success' => 1,
            'message' => $message,
            'data' => array(
                'book_ids' => $book_ids,
                'invoice_link' => $invoice_link,
            ),
        ));
    }

    public function cart_validate_paypal($vars = array())
    {
        $card_type = (isset($vars['card_type']) ? sanitize_text_field($vars['card_type']) : null);
        $cc_number = (isset($vars['cc_number']) ? sanitize_text_field($vars['cc_number']) : null);
        $cvv2 = (isset($vars['cvv2']) ? sanitize_text_field($vars['cvv2']) : null);
        $first_name = (isset($vars['first_name']) ? sanitize_text_field($vars['first_name']) : null);
        $last_name = (isset($vars['last_name']) ? sanitize_text_field($vars['last_name']) : null);
        $exp_date_month = (isset($vars['expiration_date_month']) ? sanitize_text_field($vars['expiration_date_month']) : null);
        $exp_date_year = (isset($vars['expiration_date_year']) ? sanitize_text_field($vars['expiration_date_year']) : null);

        // Check Card details
        if(!$card_type or !$cc_number or !$cvv2) return false;

        $cart_id = isset($vars['cart_id']) ? sanitize_text_field($vars['cart_id']) : 0;

        // Cart Library
        $c = $this->getCart();
        $cart = $c->get_cart($cart_id);

        // Payable
        $payable = $c->get_payable($cart);

        // Get Options
        $options = $this->options();

        $expdate = $exp_date_month . $exp_date_year;
        $params = array(
            'METHOD' => 'DoDirectPayment',
            'USER' => (isset($options['api_username']) ? $options['api_username'] : null),
            'PWD' => (isset($options['api_password']) ? $options['api_password'] : null),
            'SIGNATURE' => (isset($options['api_signature']) ? $options['api_signature'] : null),
            'VERSION' => 90.0,
            'CREDITCARDTYPE' => $card_type,
            'ACCT' => $cc_number,
            'EXPDATE' => $expdate,
            'CVV2' => $cvv2,
            'FIRSTNAME' => $first_name,
            'LASTNAME' => $last_name,
            'AMT' => $payable,
            'CURRENCYCODE' => $this->main->get_currency_code(),
            'DESC' => sprintf(__('Transactions: %s', 'modern-events-calendar-lite'), implode(', ', $cart)),
        );

        $request_str = $this->get_request_string($params);
        $response_str = $this->get_paypal_response($request_str, $this->get_api_url());

        $results = $this->normalize_NVP($response_str);

        $status = strpos(strtolower($results['ACK']), 'success') !== false ? 1 : 0;
        $amount = isset($results['AMT']) ? $results['AMT'] : 0;

        // Save Transaction ID
        if($status)
        {
            $gateway_transaction_id = isset($results['TRANSACTIONID']) ? $results['TRANSACTIONID'] : '';
            if($gateway_transaction_id)
            {
                foreach($cart as $transaction_id)
                {
                    $transaction = $this->book->get_transaction($transaction_id);

                    $transaction['gateway_transaction_id'] = $gateway_transaction_id;
                    $this->book->update_transaction($transaction_id, $transaction);
                }
            }
        }

        // Error
        if(!$status)
        {
            $error = (isset($results['L_ERRORCODE0']) ? '('.$results['L_ERRORCODE0'].') ' : '').(isset($results['L_LONGMESSAGE0']) ? $results['L_LONGMESSAGE0'] : '');

            // Log it
            trigger_error($error, E_USER_NOTICE);

            // Save it
            update_option('mec_paypal_cc_error', current_time('Y-m-d H:i:s').': '.$error, false);
        }

        // Compare paid amount with transaction amount
        return ($amount >= $payable and $status) ? true : false;
    }
}

class MEC_gateway_woocommerce extends MEC_gateway
{
    public $id = 6;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        // Register actions
        $this->factory->action('wp_ajax_mec_create_order_woocommerce', array($this, 'create_order'));
        $this->factory->action('wp_ajax_nopriv_mec_create_order_woocommerce', array($this, 'create_order'));

        $this->factory->action('wp_ajax_mec_check_transaction_woocommerce', array($this, 'check_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_check_transaction_woocommerce', array($this, 'check_transaction'));

        $this->factory->action('woocommerce_order_status_completed', array($this, 'after_order_completed'), 10, 1);
        $this->factory->action('woocommerce_thankyou', array($this, 'after_payment'), 10, 1);

        $this->factory->action('woocommerce_order_status_cancelled', array($this, 'after_order_cancellation'), 10, 1);
        $this->factory->action('woocommerce_order_status_refunded', array($this, 'after_order_cancellation'), 10, 1);

        $this->factory->filter('woocommerce_order_subtotal_to_display', array($this, 'hide_subtotal'), 10, 3);
    }

    public function label()
    {
        return __('Pay by WooCommerce', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#ff007f';
    }

    public function enabled()
    {
        return ((isset($this->options['status']) and $this->options['status']) ? (function_exists('wc_create_order') ? true : false) : false);
    }

    public function create_order()
    {
        $transaction_id = isset($_POST['transaction_id']) ? sanitize_text_field($_POST['transaction_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce($_POST['_wpnonce'], 'mec_transaction_form_' . $transaction_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $event_id = $transaction['event_id'];

        // Now we create the order
        $order = wc_create_order(
            array(
                'customer_id' => get_current_user_id(),
            )
        );

        // Set Transaction ID into the Order Meta Data, We will use it after WC checkout
        update_post_meta($order->get_id(), '_mec_transaction_id', $transaction_id);

        $attendee_name = isset($transaction['tickets']) ? $transaction['tickets'][0]['name'] : '';
        $ex = explode(' ', $attendee_name);

        $fname = $lname = '';

        // Update Order Billing First Name and Last Name
        if(trim($ex[0]))
        {
            $fname = $ex[0];
            update_post_meta($order->get_id(), '_billing_first_name', $fname);
        }

        if(trim($ex[1]))
        {
            $lname = implode(' ', array_slice($ex, 1));
            update_post_meta($order->get_id(), '_billing_last_name', $lname);
        }

        $order->set_address(
            array(
                'first_name' => $fname,
                'last_name' => $lname,
                'email' => $transaction['tickets'][0]['email'],
            ),
            'shipping'
        );

        $order->set_address(
            array(
                'first_name' => $fname,
                'last_name' => $lname,
                'email' => $transaction['tickets'][0]['email'],
            ),
            'billing'
        );

        $order->set_currency($this->main->get_currency_code($event_id));

        $fee = new WC_Order_Item_Fee();
        $fee->set_name(sprintf(__('Booking fee for %s', 'modern-events-calendar-lite'), get_the_title($event_id)));
        $fee->set_tax_class('');
        $fee->set_tax_status('taxable');
        $fee->set_amount((isset($transaction['price']) ? $transaction['price'] : 0));
        $fee->set_total((isset($transaction['price']) ? $transaction['price'] : 0));

        $order->add_item($fee);
        $order->calculate_totals();

        $url = $order->get_checkout_payment_url();
        $this->response(
            array(
                'success' => 1,
                'message' => __('Order created. Please proceed with checkout.', 'modern-events-calendar-lite'),
                'data' => array(
                    'url' => $url,
                    'id' => $order->get_id(),
                ),
            )
        );
    }

    public function do_transaction($transaction_id = null, $order_id = null)
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        // Is there any attendee?
        if(!count($attendees))
        {
            return array(
                'success' => 0,
                'code' => 'NO_TICKET',
                'message' => __('There is no attendee for booking!', 'modern-events-calendar-lite'),
            );
        }

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);

            $this->book->update_transaction($transaction_id, $transaction);
        }

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_woocommerce',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        update_post_meta($book_id, 'mec_order_id', $order_id);

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        // Update WC Order client
        if($order_id)
        {
            $customer = get_post_meta($order_id, '_customer_user', true);
            if($customer != $user_id)
            {
                // MEC User
                $u = $this->getUser();

                update_post_meta($order_id, '_customer_user', $user_id);
                update_post_meta($order_id, '_billing_email', $u->get($user_id)->user_email);
            }
        }

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        return array(
            'success' => 1,
            'message' => stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite'))),
            'data' => array(
                'book_id' => $book_id,
                'redirect_to' => $redirect_to,
                'invoice_link' => $invoice_link,
                'dl_file_link' => $dl_file_link,
                'extra_info' => $extra_info,
            ),
        );
    }

    public function checkout_form($transaction_id, $params = array())
    {
        ?>
        <script type="text/javascript">
        jQuery('#mec_do_transaction_woocommerce_form<?php echo $transaction_id; ?>').on('submit', function(e)
        {
            // Prevent the form from submitting
            e.preventDefault();

            var transaction_id = '<?php echo $transaction_id; ?>';

            // Add loading Class to the button
            jQuery("#mec_do_transaction_woocommerce_form" + transaction_id + " button[type=submit]").addClass("loading");
            jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).removeClass("mec-success mec-error").hide();

            var data = jQuery("#mec_do_transaction_woocommerce_form" + transaction_id).serialize();
            jQuery.ajax(
            {
                type: "POST",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: data,
                dataType: "JSON",
                success: function (data) {
                    if (data.success == 1) {
                        window.location.href = data.data.url;
                    }
                    else {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_woocommerce_form" + transaction_id + " button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).addClass("mec-error").html(data.message).show();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_transaction_woocommerce_form" + transaction_id + " button[type=submit]").removeClass("loading");
                }
            });
        });

        function mec_woocommerce_pay_checker(transaction_id)
        {
            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: "action=mec_check_transaction_woocommerce&transaction_id=" + transaction_id,
                dataType: "JSON",
                success: function (data) {
                    if (data.success == 1) {
                        jQuery("#mec-book-form-back-btn-step-3").remove();
                        jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).addClass("mec-success").html(data.message).show();
                        jQuery("#mec_do_transaction_woocommerce_checkout" + transaction_id).hide();

                        // Show Invoice Link
                        if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                        {
                            jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                        }

                        // Show Downloadable Link
                        if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                        {
                            jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                        }

                        // Show Extra info
                        if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                        {
                            jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).append('<div>' + data.data.extra_info+'</div>');
                        }

                        // Redirect to thank you page
                        if (typeof data.data.redirect_to != "undefined" && data.data.redirect_to != "") {
                            setTimeout(function () {
                                window.location.href = data.data.redirect_to;
                            }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                        }
                    }
                    else if (data.success == 0) {
                        jQuery("#mec_do_transaction_woocommerce_message" + transaction_id).addClass("mec-error").html(data.message).show();
                    }
                    else {
                        setTimeout(function () {
                            mec_woocommerce_pay_checker(transaction_id)
                        }, 10000);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    setTimeout(function () {
                        mec_woocommerce_pay_checker(transaction_id)
                    }, 10000);
                }
            });
        }
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_woocommerce_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_woocommerce_form<?php echo $transaction_id; ?>" class="mec-click-pay">
            <div class="mec-form-row">
                <input type="hidden" name="action" value="mec_create_order_woocommerce"/>
                <input type="hidden" name="transaction_id" value="<?php echo $transaction_id; ?>"/>
                <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
                <?php wp_nonce_field('mec_transaction_form_' . $transaction_id); ?>
                <button type="submit" class="mec-book-form-next-button"><?php _e('Checkout', 'modern-events-calendar-lite'); ?></button>
            </div>
        </form>
        <div class="mec-util-hidden" id="mec_do_transaction_woocommerce_checkout<?php echo $transaction_id; ?>">
            <a class="mec-woo-booking-checkout" target="_blank"><?php _e('Checkout', 'modern-events-calendar-lite'); ?></a>
        </div>
        <?php
    }

    public function options_form()
    {
        ?>
        <div class="mec-form-row mec-click-pay">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle();" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('Pay by WooCommerce', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form
										<?php
        if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
            echo 'mec-util-hidden';
        }
        ?>
		">
            <?php if (!function_exists('wc_create_order')) : ?>
                <p class="mec-error"><?php _e('WooCommerce must be installed and activated first.', 'modern-events-calendar-lite'); ?></p>
            <?php else : ?>
                <div class="mec-form-row">
                    <label class="mec-col-3"
                           for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                    <div class="mec-col-9">
                        <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title"
                               name="mec[gateways][<?php echo $this->id(); ?>][title]"
                               value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>"
                               placeholder="<?php echo $this->label(); ?>"/>
                    </div>
                </div>
                <div class="mec-form-row">
                    <label class="mec-col-3"
                           for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                    <div class="mec-col-9">
                        <textarea id="mec_gateways<?php echo $this->id(); ?>_comment"
                                  name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('WooCommerce Gateway Description', 'modern-events-calendar-lite'); ?></textarea>
                        <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a
                                            href="https://webnus.net/dox/modern-events-calendar/woocommerce/"
                                            target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                    </div>
                </div>
                <div class="mec-form-row">
                    <label class="mec-col-3"
                           for="mec_gateways<?php echo $this->id(); ?>_auto_order_complete"><?php _e('Automatically complete WC orders', 'modern-events-calendar-lite'); ?></label>
                    <div class="mec-col-9">
                        <select id="mec_gateways<?php echo $this->id(); ?>_auto_order_complete"
                                name="mec[gateways][<?php echo $this->id(); ?>][auto_order_complete]">
                            <option value="1" <?php echo((isset($this->options['auto_order_complete']) and $this->options['auto_order_complete'] == '1') ? 'selected="selected"' : ''); ?>><?php _e('Enabled', 'modern-events-calendar-lite'); ?></option>
                            <option value="0" <?php echo((isset($this->options['auto_order_complete']) and $this->options['auto_order_complete'] == '0') ? 'selected="selected"' : ''); ?>><?php _e('Disabled', 'modern-events-calendar-lite'); ?></option>
                        </select>
                        <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Auto WC orders', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('It applies only to the orders that are related to MEC.', 'modern-events-calendar-lite'); ?>
                                    <a href="https://webnus.net/dox/modern-events-calendar/woocommerce/"
                                       target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                    </div>
                </div>
                <div class="mec-form-row">
                    <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                    <div class="mec-col-9">
                        <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                               name="mec[gateways][<?php echo $this->id(); ?>][index]"
                               value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 5; ?>"
                               placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                    </div>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }

    public function check_transaction($transaction_id = null)
    {
        if (!trim($transaction_id)) {
            $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;
        }

        $transaction = $this->book->get_transaction($transaction_id);

        $success = 2;
        $message = __('Waiting for a response from gateway.', 'modern-events-calendar-lite');
        $data = array();

        if (isset($transaction['done']) and $transaction['done'] == 1) {
            $success = 1;
            $message = stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));

            $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);

            $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
            if($thankyou_page_id) $data['redirect_to'] = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);
        } elseif (isset($transaction['done']) and $transaction['done'] == 0) {
            $success = 0;
            $message = __('Payment invalid! Booking failed.', 'modern-events-calendar-lite');
        }

        $this->response(
            array(
                'success' => $success,
                'message' => $message,
                'data' => $data,
            )
        );
    }

    public function after_payment($order_id)
    {
        if (!$order_id) {
            return;
        }

        // Auto Order Complete is not enabled
        if (!isset($this->options['auto_order_complete']) or (isset($this->options['auto_order_complete']) and !$this->options['auto_order_complete'])) {
            return;
        }

        $transaction_id = get_post_meta($order_id, '_mec_transaction_id', true);
        if (!$transaction_id) {
            return;
        }

        $order = wc_get_order($order_id);
        $order->update_status('completed');
    }

    public function after_order_completed($order_id)
    {
        $transaction_id = get_post_meta($order_id, '_mec_transaction_id', true);
        if (!$transaction_id) {
            return;
        }

        // Mark it as done
        $transaction = $this->book->get_transaction($transaction_id);
        $transaction['done'] = 1;

        $this->book->update_transaction($transaction_id, $transaction);

        // Do MEC Transaction
        $this->do_transaction($transaction_id, $order_id);
    }

    public function after_order_cancellation($order_id)
    {
        $transaction_id = get_post_meta($order_id, '_mec_transaction_id', true);
        if (!$transaction_id) {
            return;
        }

        // Mark bookings as Canceled
        $bookings = $this->book->get_bookings_by_transaction_id($transaction_id);
        foreach($bookings as $booking)
        {
            $this->book->cancel($booking->ID);
            $this->book->reject($booking->ID);
        }
    }

    public function hide_subtotal($subtotal, $compound, $order)
    {
        if(is_object($order) and method_exists($order, 'meta_exists') and $order->meta_exists('_mec_transaction_id')) return false;
        else return $subtotal;
    }
}

class MEC_gateway_free extends MEC_gateway
{
    public $id = 4;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();
    }

    public function label()
    {
        return __('Free', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#23c8d2';
    }

    public function do_transaction($transaction_id = null)
    {
        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        $price = isset($transaction['price']) ? $transaction['price'] : 0;

        // Booking is not free!
        if($price)
        {
            return array(
                'success' => 0,
                'code' => 'NOT_FREE',
                'message' => __('This booking is not free!', 'modern-events-calendar-lite'),
            );
        }

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        // Is there any attendee?
        if(!count($attendees))
        {
            return array(
                'success' => 0,
                'code' => 'NO_TICKET',
                'message' => __('There is no attendee for booking!', 'modern-events-calendar-lite'),
            );
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);

            $this->book->update_transaction($transaction_id, $transaction);
        }

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_free',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        if(!$book_id) $book_id = $this->book->get_book_id_transaction_id($transaction_id);

        // Assign User
        $u->assign($book_id, $user_id);

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        $message = stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite')));
        if(trim($invoice_link)) $message .= ' <a class="mec-invoice-download" href="'.esc_url($invoice_link).'">'.__('Download Invoice', 'modern-events-calendar-lite').'</a>';
        if(trim($dl_file_link)) $message .= ' ??? <a class="mec-file-download" href="'.esc_url($dl_file_link).'">'.__('Download File', 'modern-events-calendar-lite').'</a>';
        if(trim($extra_info)) $message .= '<div>' . $extra_info . '</div>';

        return array(
            'success' => 1,
            'message' => $message,
            'data' => array(
                'book_id' => $book_id,
                'redirect_to' => $redirect_to,
            ),
        );
    }

    public function cart_do_transaction($cart_id)
    {
        // Validate Ticket Availability
        $this->cart_validate($cart_id);

        // Parent Function
        return $this->do_cart_transaction($cart_id, array(
            'gateway' => 'MEC_gateway_free',
        ));
    }
}

class MEC_gateway_bank_transfer extends MEC_gateway
{
    public $id = 8;
    public $options;

    public function __construct()
    {
        parent::__construct();

        // Gateway options
        $this->options = $this->options();

        // Register actions
        $this->factory->action('wp_ajax_mec_do_transaction_bank_transfer', array($this, 'do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_do_transaction_bank_transfer', array($this, 'do_transaction'));

        $this->factory->action('wp_ajax_mec_cart_do_transaction_bank_transfer', array($this, 'cart_do_transaction'));
        $this->factory->action('wp_ajax_nopriv_mec_cart_do_transaction_bank_transfer', array($this, 'cart_do_transaction'));
    }

    public function label()
    {
        return __('Bank Transfer', 'modern-events-calendar-lite');
    }

    public function color()
    {
        return '#2DCA73';
    }

    public function options_form()
    {
        ?>
        <div class="mec-form-row mec-click-pay">
            <label>
                <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][status]" value="0"/>
                <input onchange="jQuery('#mec_gateways<?php echo $this->id(); ?>_container_toggle').toggle();" value="1"
                       type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][status]"
                    <?php
                    if (isset($this->options['status']) and $this->options['status']) {
                        echo 'checked="checked"';
                    }
                    ?>
                /> <?php _e('Bank Transfer', 'modern-events-calendar-lite'); ?>
            </label>
        </div>
        <div id="mec_gateways<?php echo $this->id(); ?>_container_toggle" class="mec-gateway-options-form
										<?php
        if ((isset($this->options['status']) and !$this->options['status']) or !isset($this->options['status'])) {
            echo 'mec-util-hidden';
        }
        ?>">
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_title"><?php _e('Title', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="text" id="mec_gateways<?php echo $this->id(); ?>_title"
                           name="mec[gateways][<?php echo $this->id(); ?>][title]"
                           value="<?php echo (isset($this->options['title']) and trim($this->options['title'])) ? $this->options['title'] : ''; ?>"
                           placeholder="<?php echo $this->label(); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3"
                       for="mec_gateways<?php echo $this->id(); ?>_comment"><?php _e('Comment', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <textarea id="mec_gateways<?php echo $this->id(); ?>_comment"
                              name="mec[gateways][<?php echo $this->id(); ?>][comment]"><?php echo (isset($this->options['comment']) and trim($this->options['comment'])) ? stripslashes($this->options['comment']) : esc_html__('Bank Transfer Description', 'modern-events-calendar-lite'); ?></textarea>
                    <span class="mec-tooltip">
						<div class="box left">
							<h5 class="title"><?php _e('Comment', 'modern-events-calendar-lite'); ?></h5>
							<div class="content"><p><?php esc_attr_e('HTML allowed.', 'modern-events-calendar-lite'); ?><a
                                        href="https://webnus.net/dox/modern-events-calendar/booking/"
                                        target="_blank"><?php _e('Read More', 'modern-events-calendar-lite'); ?></a></p></div>
						</div>
						<i title="" class="dashicons-before dashicons-editor-help"></i>
					</span>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-3" for="mec_gateways<?php echo $this->id(); ?>_index"><?php _e('Position', 'modern-events-calendar-lite'); ?></label>
                <div class="mec-col-9">
                    <input type="number" min="0" step="1" id="mec_gateways<?php echo $this->id(); ?>_index"
                           name="mec[gateways][<?php echo $this->id(); ?>][index]"
                           value="<?php echo (isset($this->options['index']) and trim($this->options['index'])) ? $this->options['index'] : 8; ?>"
                           placeholder="<?php echo esc_attr__('Position', 'modern-events-calendar-lite'); ?>"/>
                </div>
            </div>
            <div class="mec-form-row">
                <label class="mec-col-12">
                    <input type="hidden" name="mec[gateways][<?php echo $this->id(); ?>][disable_auto_confirmation]" value="0">
                    <input value="1" type="checkbox" name="mec[gateways][<?php echo $this->id(); ?>][disable_auto_confirmation]" <?php echo (isset($this->options['disable_auto_confirmation']) and trim($this->options['disable_auto_confirmation'])) ? 'checked="checked"' : ''; ?>>
                    <?php _e('Disable Auto Confirmation', 'modern-events-calendar-lite'); ?>
                </label>
            </div>
        </div>
        <?php
    }

    public function checkout_form($transaction_id, $params = array())
    {
        ?>
        <script type="text/javascript">
            jQuery("#mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?>").on("submit", function(event)
            {
                event.preventDefault();
                jQuery(this).find('button').attr('disabled', true);

                // Add loading Class to the button
                jQuery("#mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?> button[type=submit]").addClass("loading");
                jQuery("#mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>").removeClass("mec-success mec-error").hide();

                var data = jQuery("#mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?>").serialize();
                jQuery.ajax(
                {
                    type: "GET",
                    url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                    data: data,
                    dataType: "JSON",
                    success: function (data)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?> button[type=submit]").removeClass("loading");

                        jQuery("#mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?>").hide();
                        jQuery(".mec-book-form-gateway-label").remove();

                        if(data.success)
                        {
                            jQuery(".mec-book-form-coupon").hide();
                            jQuery(".mec-gateway-comment").hide();

                            jQuery("#mec-book-form-back-btn-step-3").remove();
                            jQuery("#mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>").addClass("mec-success").html(data.message).show();

                            // Show Invoice Link
                            if(typeof data.data.invoice_link !== "undefined" && data.data.invoice_link != "")
                            {
                                jQuery("#mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>").append(' <a class="mec-invoice-download" href="' + data.data.invoice_link + '"><?php echo esc_js(__('Download Invoice', 'modern-events-calendar-lite')); ?></a>');
                            }

                            // Show Downloadable Link
                            if(typeof data.data.dl_file_link !== "undefined" && data.data.dl_file_link != "")
                            {
                                jQuery("#mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>").append(' ??? <a class="mec-dl-file-download" href="' + data.data.dl_file_link + '"><?php echo esc_js(__('Download File', 'modern-events-calendar-lite')); ?></a>');
                            }

                            // Show Extra info
                            if(typeof data.data.extra_info !== "undefined" && data.data.extra_info != "" && data.data.extra_info != null)
                            {
                                jQuery("#mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>").append('<div>' + data.data.extra_info+'</div>');
                            }

                            // Redirect to thank you page
                            if (typeof data.data.redirect_to != "undefined" && data.data.redirect_to != "") {
                                setTimeout(function () {
                                    window.location.href = data.data.redirect_to;
                                }, <?php echo $this->main->get_thankyou_page_time($transaction_id); ?>);
                            }
                            jQuery(this).find('button').removeAttr('disabled');
                        }
                        else
                        {
                            jQuery("#mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>").addClass("mec-error").html(data.message).show();
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        // Remove the loading Class from the button
                        jQuery("#mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?> button[type=submit]").removeClass("loading");
                    }
                });
            });
        </script>
        <div class="mec-gateway-message mec-util-hidden"
             id="mec_do_transaction_bank_transfer_message<?php echo $transaction_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_transaction_bank_transfer_form<?php echo $transaction_id; ?>" class="mec-click-pay">
            <input type="hidden" name="action" value="mec_do_transaction_bank_transfer"/>
            <input type="hidden" name="transaction_id" value="<?php echo $transaction_id; ?>"/>
            <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
            <?php wp_nonce_field('mec_transaction_form_' . $transaction_id); ?>
            <button class="mec-book-form-next-button" type="submit"><?php _e('Submit', 'modern-events-calendar-lite'); ?></button>
            <?php do_action('mec_booking_checkout_form_before_end', $transaction_id); ?>
        </form>
        <?php
    }

    public function do_transaction($transaction_id = null)
    {
        if(!trim($transaction_id)) $transaction_id = isset($_GET['transaction_id']) ? sanitize_text_field($_GET['transaction_id']) : 0;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_transaction_form_' . $transaction_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->validate($transaction_id);

        $transaction = $this->book->get_transaction($transaction_id);
        $attendees = isset($transaction['tickets']) ? $transaction['tickets'] : array();

        $attention_date = isset($transaction['date']) ? $transaction['date'] : '';
        $attention_times = explode(':', $attention_date);
        $date = date('Y-m-d H:i:s', trim($attention_times[0]));

        // Is there any attendee?
        if (!count($attendees)) {
            $this->response(
                array(
                    'success' => 0,
                    'code' => 'NO_TICKET',
                    'message' => __(
                        'There is no attendee for booking!',
                        'mec'
                    ),
                )
            );
        }

        $main_attendee = isset($attendees[0]) ? $attendees[0] : array();
        $name = isset($main_attendee['name']) ? $main_attendee['name'] : '';

        $ticket_ids = '';
        $attendees_info = array();

        foreach($attendees as $i => $attendee)
        {
            if(!is_numeric($i)) continue;

            $ticket_ids .= $attendee['id'] . ',';
            if(!array_key_exists($attendee['email'], $attendees_info)) $attendees_info[$attendee['email']] = array('count' => $attendee['count']);
            else $attendees_info[$attendee['email']]['count'] = ($attendees_info[$attendee['email']]['count'] + $attendee['count']);
        }

        $ticket_ids = ',' . trim($ticket_ids, ', ') . ',';
        $user_id = $this->register_user($main_attendee, $transaction);

        // Remove Sensitive Data
        if(isset($transaction['username']) or isset($transaction['password']))
        {
            unset($transaction['username']);
            unset($transaction['password']);

            $this->book->update_transaction($transaction_id, $transaction);
        }

        // MEC User
        $u = $this->getUser();

        $book_subject = $name.' - '.(isset($main_attendee['email']) ? $main_attendee['email'] : $u->get($user_id)->user_email);
        $book_id = $this->book->add(
            array(
                'post_author' => $user_id,
                'post_type' => $this->PT,
                'post_title' => $book_subject,
                'post_date' => $date,
                'attendees_info' => $attendees_info,
                'mec_attendees' => $attendees,
                'mec_gateway' => 'MEC_gateway_bank_transfer',
                'mec_gateway_label' => $this->title()
            ),
            $transaction_id,
            $ticket_ids
        );

        // Assign User
        $u->assign($book_id, $user_id);

        // Fires after completely creating a new booking
        do_action('mec_booking_completed', $book_id);

        $event_id = (isset($transaction['event_id']) ? $transaction['event_id'] : 0);
        $redirect_to = '';

        $thankyou_page_id = $this->main->get_thankyou_page_id($event_id);
        if($thankyou_page_id) $redirect_to = $this->book->get_thankyou_page($thankyou_page_id, $transaction_id);

        // Invoice Link
        $mec_confirmed = get_post_meta($book_id, 'mec_confirmed', true);
        $invoice_link = (!$mec_confirmed) ? '' : $this->book->get_invoice_link($transaction_id);
        $dl_file_link = (!$mec_confirmed) ? '' : $this->book->get_dl_file_link($book_id);

        $extra_info = apply_filters('MEC_extra_info_gateways', '', $this->book->get_event_id_by_transaction_id($transaction_id), $book_id);

        $this->response(
            array(
                'success' => 1,
                'message' => stripslashes($this->main->m('book_success_message', __('Thank you for booking. Your tickets are booked, booking verification might be needed, please check your email.', 'modern-events-calendar-lite'))),
                'data' => array(
                    'book_id' => $book_id,
                    'redirect_to' => $redirect_to,
                    'invoice_link' => $invoice_link,
                    'dl_file_link' => $dl_file_link,
                    'extra_info' => $extra_info,
                ),
            )
        );
    }

    public function cart_checkout_form($cart_id, $params = array())
    {
        ?>
        <div class="mec-gateway-message mec-util-hidden" id="mec_do_cart_bank_transfer_message<?php echo $cart_id; ?>"><?php do_action('mec_extra_info_payment'); ?></div>
        <form id="mec_do_cart_bank_transfer_form<?php echo $cart_id; ?>" class="mec-click-pay">
            <input type="hidden" name="action" value="mec_cart_do_transaction_bank_transfer"/>
            <input type="hidden" name="cart_id" value="<?php echo $cart_id; ?>"/>
            <input type="hidden" name="gateway_id" value="<?php echo $this->id(); ?>"/>
            <?php wp_nonce_field('mec_cart_form_' . $cart_id); ?>
            <button class="mec-book-form-next-button" type="submit"><?php _e('Submit', 'modern-events-calendar-lite'); ?></button>
            <?php do_action('mec_cart_checkout_form_before_end', $cart_id); ?>
        </form>
        <script type="text/javascript">
        jQuery("#mec_do_cart_bank_transfer_form<?php echo $cart_id; ?>").on("submit", function(event)
        {
            event.preventDefault();
            jQuery(this).find('button').attr('disabled', true);

            // Add loading Class to the button
            jQuery("#mec_do_cart_bank_transfer_form<?php echo $cart_id; ?> button[type=submit]").addClass("loading");
            jQuery("#mec_do_cart_bank_transfer_message<?php echo $cart_id; ?>").removeClass("mec-success mec-error").hide();

            var data = jQuery("#mec_do_cart_bank_transfer_form<?php echo $cart_id; ?>").serialize();
            jQuery.ajax(
            {
                type: "GET",
                url: "<?php echo admin_url('admin-ajax.php', null); ?>",
                data: data,
                dataType: "JSON",
                success: function (data)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_cart_bank_transfer_form<?php echo $cart_id; ?> button[type=submit]").removeClass("loading");

                    if(data.success)
                    {
                        jQuery("#mec_do_cart_bank_transfer_form<?php echo $cart_id; ?>").hide();
                        jQuery(".mec-checkout-form-gateway-label").remove();

                        jQuery(".mec-gateway-comment").hide();
                        jQuery("#mec_do_cart_bank_transfer_message<?php echo $cart_id; ?>").addClass("mec-success").html(data.message).show();

                        jQuery(this).find('button').removeAttr('disabled');
                    }
                    else
                    {
                        jQuery("#mec_do_cart_bank_transfer_message<?php echo $cart_id; ?>").addClass("mec-error").html(data.message).show();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Remove the loading Class from the button
                    jQuery("#mec_do_cart_bank_transfer_form<?php echo $cart_id; ?> button[type=submit]").removeClass("loading");
                }
            });
        });
        </script>
        <?php
    }

    public function cart_do_transaction()
    {
        $cart_id = isset($_GET['cart_id']) ? sanitize_text_field($_GET['cart_id']) : NULL;

        // Verify that the nonce is valid.
        if(!wp_verify_nonce(sanitize_text_field($_GET['_wpnonce']), 'mec_cart_form_' . $cart_id))
        {
            $this->response(array(
                'success' => 0,
                'code' => 'NONCE_IS_INVALID',
                'message' => __('Request is invalid!', 'modern-events-calendar-lite'),
            ));
        }

        // Validate Ticket Availability
        $this->cart_validate($cart_id);

        // Parent Function
        $this->response($this->do_cart_transaction($cart_id, array(
            'gateway' => 'MEC_gateway_bank_transfer',
        )));
    }
}
