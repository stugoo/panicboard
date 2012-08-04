<?php


///Load Google Weather API information (XML)
 	// $city = "Iowa City IA"; //can explicitly define city/zipcode or
	///$city = $_GET['city']; //use GET parameter "?city=" appended to this file's URL/AJAX request
	//$url = 'https://recruit.zoho.com/ats/EmbedResult.hr?jodigest=2cV.Sr2As6VxhLMxQGuTNij*g.Fb3J7ysduDs.AC9sU-&atslocale=en_GB&rawdata=json';
	
	//	$url = "http://countdown.api.tfl.gov.uk/interfaces/ura/stream_V1?Stopid=99,13551&ReturnList=Stoppointname,VehicleID,RegistrationNumber,LineName,DestinationName,EstimatedTime,ExpireTime";

	
	
	$url = "http://countdown.api.tfl.gov.uk/interfaces/ura/stream_V1?Stopid=99,13551&ReturnList=Stoppointname,VehicleID,RegistrationNumber,LineName,DestinationName,EstimatedTime,ExpireTime";
	//$url = "http://stugoo.co.uk/";
	$username = "LiveBus91589";	
	$password = "kaw6jaGESu";


	/* gets the data from a URL */
		function get_data($url)
		{
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			$output = curl_exec($ch);
			$info = curl_getinfo($ch);
			return $info;

			curl_close($ch);
		}

	
	$returned_content = get_data($url);

	
	//$JSON = file_get_contents($x);
	
	// echo the JSON (you can echo this to JavaScript to use it there)
	
	// You can decode it to process it in PHP
//	$data = json_decode($JSON);
	//var_dump($data);


/*
//Parse current conditions XML
$current_condition = $xml->weather->current_conditions->condition[data];
$current_temp = $xml->weather->current_conditions->temp_f[data];
$current_humidity = $xml->weather->current_conditions->humidity[data];
$current_wind = $xml->weather->current_conditions->wind_condition[data];
$current_icon = explode("/ig/images/weather/", $xml->weather->current_conditions->icon[data]);
///Begin JSON
echo "{";
	//Return current conditions in JSON format
echo ('"current" : {
	"condition":"'.$current_condition.'",
	"temp":"'.$current_temp.'",
	"humidity":"'.$current_humidity.'",
	"wind_condition":"'.$current_wind.'",
	"icon":"'.$current_icon[1].'"
	},');
//Parse four day outlook XML
	for ($i = 0; $i <= 3; $i++){
	$forcast_day[$i] = $xml->weather->forecast_conditions->$i->day_of_week[data];
	$forcast_condition[$i] = $xml->weather->forecast_conditions->$i->condition[data];
	$forcast_low[$i] = $xml->weather->forecast_conditions->$i->low[data];
	$forcast_high[$i] = $xml->weather->forecast_conditions->$i->high[data];
	$forcast_icon[$i] = explode("/ig/images/weather/", $xml->weather->forecast_conditions->$i->icon[data]);
	//Return four day outlook in JSON format
		echo ('"'.$i.'" : {
			"day":"'.$forcast_day[$i].'",
			"condition":"'.$forcast_condition[$i].'",
			"low":"'.$forcast_low[$i].'",
			"high":"'.$forcast_high[$i].'",
			"icon":"'.$forcast_icon[$i][1].'"
		}');
	if ($i< 3){
	echo ",";
	}
}
echo "}";
*/

?>