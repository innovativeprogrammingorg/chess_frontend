<!DOCTYPE html>
<html>
	<head>
		<title>Chess Club Event Loader</title>
		<meta charset="utf-8">
		<meta name="author" content="Nathaniel Wilson Blakely">
		<meta name="description" content="US Gross Domestic Product By Quarter">
		<style>
			*{
				margin:0;
				padding:0;
			}
			div.date{
				width:70px;
				height:70px;
				border-radius:5px;
				border-style:solid;
				border-color:#000;
				border-width:1px;
				background-color:#FFF;
				float:left;
			}
			div.event{
				margin:auto;
				margin-bottom:5px;
				width:320px;
				height:70px;
				padding:5px 0 5px 0;
			}
			div.event a{
				color:#000;
			}
			div.event a:hover{
				color:#00F;
			}
			h2.month{
				text-align:center;
				color:#FFF;
				background-color: #F00;
			}
			h3.day{
				text-align:center;
				color:black;
				background-color:#FFF;
				font-size:25px;
				margin-top:6px;
			}
			h1.eventName{
				font-size:16px;
				float:right;
				width:220px;
				margin-top:25px;
			}
		</style>
	</head>
	<body>
<?php
	$data = file_get_contents("https://orgsync.com/50809/chapter");
	$data = substr($data,stripos($data,"<body"));
	$data = substr($data,0,stripos($data,"<div class=\"sidebar\">"));
	$data = substr($data,stripos($data,"<div class=\"feed-items\">"));
	$regex = '/<div class="feed-item event" id="[A-Z|a-z|_|0-9]{0,30}"><div class="media "><div class="pull-left"><i class="feed-item-icon icon-event"><\/i><\/div><div class="media-body"><h3><a href="\/50809\/events\/[0-9]{0,15}">.{0,200}<\/a><\/h3> <div class="feed-item-body"><div class="event-info"><i class=" icon-timesheet"><\/i> <div class="event-info-body">[0-9|A-Z|a-z|,|\s]{0,30}<\/div>[\s\S]{0,3000}<div class="feed-item-footer"><div class="feed-item-options"> <span class="make-new-comment"><a href="#"><i class=" icon-discussion"><\/i>Comment<\/a><\/span><\/div> <div class="feed-item-footer-left"><time class=" js-relative-time" datetime="[0-9|\-|:]{0,40}/';

	$regex2 = '/<div class="feed-item event" id="[A-Z|a-z|_|0-9]{0,30}"><div class="media "><div class="pull-left"><i class="feed-item-icon icon-event"><\/i><\/div><div class="media-body"><h3><a href="\/50809\/events\/[0-9]{0,15}">/';
	$regex3 = '/<\/a><\/h3> <div class="feed-item-body"><div class="event-info"><i class=" icon-timesheet"><\/i> <div class="event-info-body">/';
	$regex4 = '/<\/div>[\s\S]{0,3000}<div class="feed-item-footer"><div class="feed-item-options"> <span class="make-new-comment"><a href="#"><i class=" icon-discussion"><\/i>Comment<\/a><\/span><\/div> <div class="feed-item-footer-left"><time class=" js-relative-time" datetime="/';
	$regex5 = '/<div class="feed-item event" id="[A-Z|a-z|_|0-9]{0,30}"><div class="media "><div class="pull-left"><i class="feed-item-icon icon-event"><\/i><\/div><div class="media-body"><h3><a href="/';
	$res = array();
	$result = array();
	while(preg_match($regex,$data,$result)){
		$data = preg_replace($regex,"",$data,1);
		array_push($res,$result[0]);
		$result = array();
	}
	$out = array();
	$links = array();
	$link = array();
	for($i=0;$i<count($res);$i++){
		preg_match($regex2,$res[$i],$link);
		array_push($links,$link[0]);
		$link = array();
		$res[$i] = preg_replace($regex2,"",$res[$i]);
		$res[$i] = preg_replace($regex3,"#",$res[$i]);
		$res[$i] = preg_replace($regex4,"#",$res[$i]);
		array_push($out,explode("#",$res[$i]));
	}
	for($i=0;$i<count($links);$i++){
		$links[$i] = preg_replace($regex5,"",$links[$i]);
		$links[$i] = preg_replace('/">/',"",$links[$i]);
		$links[$i] = "https://orgsync.com".$links[$i];
	}
	$months = array("Jan"=>1,"Feb"=>2,"Mar"=>3,"Apr"=>4,"May"=>5,"Jun"=>6,"Jul"=>7,"Aug"=>8,"Sep"=>9,"Oct"=>10,"Nov"=>11,"Dec"=>12);
	for($i=0;$i<count($out);$i++){
		$postDate = array(
			"Y"=>intval(substr($out[$i][2],0,4)),
			"M"=>intval(substr($out[$i][2],5,2)),
			"D"=>intval(substr($out[$i][2],8,2))
		);
		$eventDate = array(
			"Y"=>intval(substr($out[$i][2],0,4)),
			"M"=>substr($out[$i][1],stripos($out[$i][1],",")+2,3),
			"D"=>intval(substr($out[$i][1],strripos($out[$i][1],",")-2,2))
		);

		if($postDate["M"]<$months[substr($out[$i][1],0,3)]){
			$eventDate["Y"]++;
		}
		ob_start();
		echo "<div class='event'>";
		echo "<div class='date'>";
		echo "<h2 class='month'>";
		echo $eventDate["M"];
		echo "</h2>";
		echo "<h3 class='day'>";
		echo $eventDate["D"];
		echo "</h3>";
		echo "</div>";
		echo "<a href='";
		echo $links[$i];
		echo "'>";
		echo "<h1 class='eventName'>";
		echo $out[$i][0];
		echo "</h1></a>";
		echo "</div>";
		ob_flush();
	}

?>
	</body>
</html>