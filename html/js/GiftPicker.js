
var GiftPicker = 
{
	/*var giftList = [
	{"image":"http://tinyurl.com/2ly8m7"},
	{"image":"http://tinyurl.com/32kn67"},
	{"image":"http://tinyurl.com/2ktn7c"},
	{"image":"http://tinyurl.com/36j3yt"},
	{"image":"http://tinyurl.com/39gpv9"},
	{"image":"http://tinyurl.com/2qe27a"},
	{"image":"http://tinyurl.com/2mnror"}
	];*/

	giftList : [
		{"image" : "birthday1.jpg"},
		{"image" : "birthday2.jpg"},
		{"image" : "birthday3.jpg"},
		{"image" : "birthday4.jpg"},
		{"image" : "birthday1.jpg"},
		{"image" : "birthday2.jpg"},
		{"image" : "birthday3.jpg"},
		{"image" : "birthday4.jpg"},
		{"image" : "birthday1.jpg"},
		{"image" : "birthday2.jpg"},		
		{"image" : "birthday3.jpg"},
		{"image" : "birthday4.jpg"},
		{"image" : "birthday1.jpg"},
		{"image" : "birthday2.jpg"},
		{"image" : "birthday3.jpg"},
		{"image" : "birthday4.jpg"}
	],
	
	init : function(giftPane)
	{
		this.giftPane = document.getElementById(giftPane);
		this.prepareHTML(this.giftPane);
	},

	setTargetBoxes : function (urlBox,widthBox, heightBox)
	{
		this.targetBox = document.getElementById(urlBox);
		this.widthBox = document.getElementById(widthBox);
		this.heightBox = document.getElementById(heightBox);
		
		YAHOO.util.Event.addListener(this.targetBox, "blur", this.preloadImage, null, this);
		
		YAHOO.util.Event.addListener(this.widthBox, "blur", this.setCurrentGift, null, this);
		YAHOO.util.Event.addListener(this.heightBox, "blur", this.setCurrentGift, null, this);
	},

	setScrollArrows : function(giftLeftArrow, giftRightArrow)
	{
		YAHOO.util.Event.addListener(giftLeftArrow, "mouseover" , function(){GiftPicker.startScroll(-1)}, this);
		YAHOO.util.Event.addListener(giftLeftArrow, "mouseout" , GiftPicker.stopScroll,null, this);
		
		YAHOO.util.Event.addListener(giftRightArrow, "mouseover" , function(){GiftPicker.startScroll(1)}, this);
		YAHOO.util.Event.addListener(giftRightArrow, "mouseout" , GiftPicker.stopScroll, null,this);
	},
	
	setReadyFunction : function(readyFunction)
	{
		this.readyNotifier = readyFunction;
	},
	
	prepareHTML : function(giftPickerPane)
	{
		var docPos = "";
		for (var i = 0; i < this.giftList.length; i++)
		{
			docPos += "<img src = '"+ this.giftList[i].image + "' style = 'border : SOLID 1px GREY; width : 70px; height : 70px; cursor : pointer' onclick = 'GiftPicker.selectGift(" + i +  ")'>&nbsp;";
		}
		giftPickerPane.style.width = (this.giftList.length) * 77 + "px";
		giftPickerPane.innerHTML = docPos;
		giftPickerPane.style.position = "relative";		
	},
	
	startScroll : function(amount)
	{
		var paneWidth = parseInt(YAHOO.util.Dom.getStyle(this.giftPane,"width"));
		var paneLeft = parseInt(YAHOO.util.Dom.getStyle(this.giftPane,"left"));
		var parentWidth = parseInt(YAHOO.util.Dom.getStyle(this.giftPane.parentNode,"width"));

		var min = 0;
		var max = parentWidth - paneWidth;
		var time = paneLeft - (amount < 0 ? min:max);
		time = (time < 0 ? -time:time)/100;
		
		this.stopScroll();	
		var attributes = 
		{
			left: {to: amount < 0 ? min : max}
		};
		this.scrollAnimHandler = new YAHOO.util.Anim('giftPickerPane', attributes, time, YAHOO.util.Easing.easeNone);
		this.scrollAnimHandler.animate();
		
	},
	
	stopScroll : function()
	{
		if (this.scrollAnimHandler) 
		{
			this.scrollAnimHandler.stop();
		}
	},

	selectGift : function(giftItem)
	{
		this.targetBox.value = this.giftList[giftItem].image;
		this.preLoadImage();
	},
	
	preLoadImage : function()
	{
		this.readyNotifier.call(this, false);
		var imgPreview = new Image();
		imgPreview.src = this.targetBox.value;
		
		if (imgPreview.width > 0)
		{
			this.imageSizehandler(imgPreview);
		}
		else
		{
			imgPreview.onload = function(){GiftPicker.imageSizehandler(imgPreview)};
		}
	},
	
	imageSizehandler : function(imgPreview)
	{
		this.heightBox.value = imgPreview.height;
		this.widthBox.value = imgPreview.width;
		this.setCurrentGift();
		this.readyNotifier.call(this, true);		
	},
	
	setCurrentGift : function()
	{
		this.currentGift = {};
		this.currentGift.url = this.targetBox.value;
		this.currentGift.width = parseInt(this.widthBox.value) > 0 ? this.widthBox.value:240;
		this.currentGift.height = parseInt(this.heightBox.value) > 0 ? this.heightBox.value:240;
	}
};
