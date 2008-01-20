var ScrapsTimeout = 
{
	init : function()
	{
		GiftPicker.init('giftPickerPane');
		GiftPicker.setTargetBoxes('giftImage','giftImageWidth','giftImageHeight');
		GiftPicker.setScrollArrows('giftLeftArrow', 'giftRightArrow');
		GiftPicker.setReadyFunction(this.setWaitState);
		GiftPicker.selectGift(0);
		
		ThemePicker.init('themeDiv', 'themePreview');
		TimePicker.init("dateConfig", "monthConfig", "yearConfig", "hourConfig", "minsConfig");
		
		this.associateEvents();
	},
	
	setWaitState : function(state)
	{
		if (state == false)
		{
			document.getElementById("applyButton").disabled = true;	
			document.getElementById("applyButton").value = "Loading .... ";				
		}
		else
		{
			document.getElementById("applyButton").disabled = false;	
			document.getElementById("applyButton").value = "Apply Settings and Preview";
		}
	},
	
	associateEvents : function()
	{

		YAHOO.util.Event.addListener("applyButton", "click", this.updateFlash, null, this);
		YAHOO.util.Event.addListener("scrapSource", "click", function(){document.getElementById('scrapSource').select()});		
	},
	
	updateFlash : function()
	{
		var greetingMessage = document.getElementById("greetingMessage").value;
		var teaserMessage= document.getElementById("teaserMessage").value;
		
		var time = TimePicker.getTime();
		
		var flashVars = "gift=" + escape(GiftPicker.currentGift.url);
		flashVars += "&gw=" + GiftPicker.currentGift.width +"&gh=" + GiftPicker.currentGift.height;
		
		flashVars += "&start=" + escape(greetingMessage);
		flashVars += "&end=" + escape(teaserMessage);
		
		if (document.getElementById("timeSpecific").checked == true)
		{
			flashVars += "&y=" + escape(time.year) + "&m="  + escape(time.month) + "&d=" + escape(time.date);
			flashVars += "&hour=" + escape(time.hour) + "&min=" + escape(time.mins);
		}
	
		var docPos = ScrapsTimeout.getFlashSource(ThemePicker.currentTheme, flashVars);
		
		if (docPos.length > 1024)
		{
			document.getElementById("orkutWarning").style.display = "";
		}
		else
		{
			document.getElementById("orkutWarning").style.display = "none";
		}		

		document.getElementById("scrapFlash").innerHTML = docPos;
		document.getElementById("scrapSource").value = docPos;
	},
	
	getFlashSource : function(theme, flashVars)
	{
		var docPos = '<object classid=clsid:D27CDB6E-AE6D-11cf-96B8-444553540000 '
				     + 'width=' + theme.width + ' height='+ theme.height+' '
				     + '><param name=movie value=' + theme.movie +'>'
				     + '<param name=flashvars value=' + flashVars+ '>'
				     + '<embed type=application/x-shockwave-flash '
				     + 'width=' + theme.width + ' height=' + theme.height+ ' src=' + theme.movie + ' '
				     + 'flashvars=' + flashVars+ ''
				     + '></embed></object><br><a style="padding:2px;border:SOLID 1px BLACK" href="http://scraps.geekstimeout.com">Send this to your friends</a><br>'
		return docPos;		
	}
	
};

var TimePicker = 
{
	init : function(dateConfig, monthConfig, yearConfig, hourConfig, minsConfig)
	{
		var currentTime = new Date();
		this.dateConfig = document.getElementById(dateConfig);
		this.monthConfig = document.getElementById(monthConfig);
		this.yearConfig = document.getElementById(yearConfig);
		this.hourConfig = document.getElementById(hourConfig);
		this.minsConfig = document.getElementById(minsConfig);

		this.dateConfig.value = currentTime.getDate();
		this.monthConfig.value = currentTime.getMonth();
		this.yearConfig.value = currentTime.getFullYear();
		this.hourConfig.value = currentTime.getHours();
		this.minsConfig.value = currentTime.getMinutes() + 1;
	},
	
	getTime : function()
	{
		var result = {};
		result.date = this.dateConfig.value;
		result.month = this.monthConfig.value;
		result.year = this.yearConfig.value;
		result.mins = this.minsConfig.value;
		result.hour = this.hourConfig.value;
		
		return result;
	}
}

ScrapsTimeout.init();


