<?php


	// items to return
	$returnList = "StopCode1,StopPointName,Bearing,StopPointIndicator,StopPointType,Latitude,Longitude";




	//$circle = "51.558939,-0.115045,250"; // lat / long // range
		
	$circle = $_POST["latlong"];

	$serverURL = "http://countdown.api.tfl.gov.uk/interfaces/ura/instant_V1"; // server URL

	$queryString = "?Circle=".$circle."&StopPointState=0&ReturnList=".$returnList;

	$url = $serverURL . $queryString;
	

	$username = "xxx";	
	$password = "xxx";


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
			return $output;

			curl_close($ch);
		}


		function jsonify_chunkies($string) {
		  $out = array();
		  $lines = preg_split('/\r\n|\r|\n/', $string);
		  
		  foreach ($lines as $i => $line) {
		    $out[] = '"' . $i . '": ' . $line . "";
		  }
		  
		  return "{\n" . join(",\n", $out) . "\n}";
		}

		$returned_content = get_data($url);
		echo  jsonify_chunkies($returned_content);	
		//echo  "<pre>". $returned_content.  "</pre>";	




?>

		<?php echo $_POST["formMovie"]; ?>
