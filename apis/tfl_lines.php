<?php
/**
 * XML to JSON proxy server
 * Converts XML to JSON
 * Pass full encoded URL to url GET parameter, e.g.
 * http://yourdomain.com/xmlproxy.php?url=http%3A%2F%2Fdomain.com%2Fmessage.xml
 *
 * By Craig Buckler, @craigbuckler, http://optimalworks.net
 *
 * As featured on SitePoint.com:
 * http://www.sitepoint.com/php-xml-to-json-proxy/
 *
 * Please use as you wish at your own risk.
 */

ini_set('display_errors', false);
set_exception_handler('ReturnError');
$r = '';

$url = "http://cloud.tfl.gov.uk/TrackerNet/LineStatus";

if ($url) {

	// fetch XML
	$c = curl_init();
	curl_setopt_array($c, array(
		CURLOPT_URL => $url,
		CURLOPT_HEADER => false,
		CURLOPT_TIMEOUT => 10,
		CURLOPT_RETURNTRANSFER => true
	));
	$r = curl_exec($c);
	curl_close($c);

}

if ($r) {
	// XML to JSON
	echo json_encode(new SimpleXMLElement($r));
}
else {
	// nothing returned?
	ReturnError();
}

// return JSON error flag
function ReturnError() {
	echo '{"error":true}';
}