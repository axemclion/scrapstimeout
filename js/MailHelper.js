var MailHelper = 
{
	init : function()
	{
		this.setPageStyle();
		this.showSWF();
		this.showInstructions();
	},
	
	showSWF : function()
	{
		document.getElementById("swfPreview").style.display = "none";
		document.getElementById("swfContent").style.display = "";
	},
	
	showInstructions : function()
	{
		document.getElementById("mailPreview").style.display = "none";
		document.getElementById("noNetInstructions").style.display = "none";
		document.getElementById("giftInstructions").innerHTML = 'You have been sent a gift. If the timer is still ticking, wait till it reaches zero, only then you can open it. <br/>Click on the gift wrap to open it';
	},
	
	setPageStyle : function()
	{
		document.getElementById("mainDiv").style.backgroundColor = "#F0E4D2";
		document.getElementById("mainDiv").style.border = "SOLID 2px #BC8636";
		document.body.style.backgroundColor = "#5A431E";
	}
}

MailHelper.init();