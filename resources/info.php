<?php

class Info{
	public static function getJSON(){
		echo "<script type=\"application/ld+json\"> { 
            \"@context\" : \"http://schema.org/\",
            \"@type\" : \"Organization\", 
            \"url\":\"https://www.innovativeprogramming.org/\",
            \"email\":\"services@innovativeprogramming.org\",
            \"sponsor\":{
                \"@type\":\"EducationalOrganization\",
                \"name\":\"Steven's Institute of Technology\",
                \"address\":\"1 Castle Point Terrace, Hoboken, NJ 07030\"
            }
            \"member\":{
                \"@type\":\"Person\",
                \"name\":\"Nathaniel Blakely\",
                \"jobTitle\":\"President\",
                \"url\":\"https://www.innovativeprogramming.org\"
            }
            \"location\":\"Steven's Institute Of Technology\",
            \"address\":\"1 Castle Point Terrace, Hoboken, NJ 07030\",
            \"founder\":{
                \"@type\":\"Person\",
                \"name\":\"Mark Mirtchouk\",
                \"jobTitle\":\"Former President\"
            }
        }
         </script>";
	}

	public static function getHeader($title,$desc,...$css){
		$out = "<title>${title}</title>
        <meta charset=\"UTF-8\">
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
        <meta name=\"description\" content=\"${desc}\">
        <link rel=\"shortcut icon\" type=\"image/x-icon\" href=\"/chess/resources/favicon.ico\" />";
        foreach($css as $style){
        	$out .= "<link type=\"text/css\" rel=\"stylesheet\" href=\"/chess/resources/${style}\" />";
        }
        echo $out;
        
	}

	public static function initWebsocket($user,$gid){
		?>
		<script>
			var conn = new WebSocket("ws://localhost:8989");
			const username = <?php echo "\"${user}\";";?>
			const command_sep = String.fromCharCode(5);
            const data_sep = String.fromCharCode(31);
            var url = new URL(window.location.href);
			var game_id = <?php echo "${gid};";?>

			conn.onopen = function(evt) { 
			    conn.send(prepare_message("LOGIN",username,game_id));
			};

			function prepare_message(){
            	var command = arguments[0];
            	var out = command + command_sep;
            	for(var i = 1;i<arguments.length;i++){
            		if(i!=1){
            			out += data_sep;
            		}
            		out += arguments[i];
            	}
            	return out;    
            }

            function init_game(){
            	var msg = prepare_message("GET_GAME_ALL",game_id);
            }


		</script>
		<?php
	}

	public static function basic_init($user){
		?>
		<script>
			var conn = new WebSocket("ws://localhost:8989");
			const username = <?php echo "\"${user}\";";?>
			const command_sep = String.fromCharCode(5);
			const data_sep = String.fromCharCode(31);

			function prepare_message(){
            	var command = arguments[0];
            	var out = command + command_sep;
            	for(var i = 1;i<arguments.length;i++){
            		if(i!=1){
            			out += data_sep;
            		}
            		out += arguments[i];
            	}
            	return out;    
            }
		</script>

		<?php
	}
}



?>