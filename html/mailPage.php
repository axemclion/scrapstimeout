<?
	header("Content-disposition: attachment; filename=mail.html");
?>
<html>
	<head>
	</head>
	<body align = "center" style = "font-family : trebuchet MS; font-size : 14px">
		<hr/>
		<div align = "center"><div id = "mainDiv" style = "display: table; background-color : #FFFFFF; width : 80%; height : 100%; padding : 5px">
			<div style ="font-size : 20px; font-weight : bold; color : #AB0104; text-align : center; width : 90%; padding : 10px">
				You have been sent a surprise GIFT using <a href = "http://scraps.geekstimeout.com">ScrapsTimeOut</a> !! 
			</div>
			<hr>
			<div align = "center" style = "width:100%; padding : none">
				<div id = "swfPreview">
					Preview <br/>
					<img src = "<?php echo $scrapPreview; ?>">
				</div>
				<div id = "swfContent" style = "display : none; background-color : #FFFFFF; width : 90%; padding : 10px">
					<?php echo $scrapSource; ?>
				</div>
			</div>
			<br/><br/>
			<div id = "instructionsDiv" align = "left" style = "background-color : #F0E4D2; color : #AB0104; padding : 5px;">
				<div id = "mailPreview">
					You are seeing the <b>PREVIEW</b> of the gift. To see the actual gift, 
					<ol>
						<li> Download and save the attatchment on your computer</li>
						<li> Open the attatchment (the html file) in a web browser</li>
						<li> You need to be on the internet to see the gift</li>
					</ol>
				</div>
				<div id = "noNetInstructions">
				</div>
				<div id = "giftInstructions">
				</div>
			</div>
			<br/>
			<br/>
			<hr>
			<div id = "advertisingDiv" align = "center">
				Send virtual gifts to your friends for FREE now !! Visit <a href = "http://scraps.geekstimeout.com"> ScrapsTimeout</a>
			</div>
		</div></div>
	</body>
	<script>
		function noInternet()
		{
			document.getElementById("noNetInstructions").innerHTML = 
			'Having trouble seeing the gift ? '+
			'		<ul>' +
			'			<li>Check if you are connected to the internet</li>' +
			'			<li>Are scripts and flash content disabled in your browser ? </li>' +
			'			<li>If you are still having problems, <a href= "http://scraps.geekstimeout.com#chatWindow">talk</a> to us</li>'+
			'		</ul>';
			document.getElementById("mailPreview").style.display = "none";
		}
	</script>
	
	<script src="http://scraps.geekstimeout.com/js/MailHelper.js" type="text/javascript"></script>
<script type="text/javascript">
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<script type="text/javascript">
var pageTracker = _gat._getTracker("UA-617499-7");
pageTracker._initData();
pageTracker._trackPageview();
</script>
</html>