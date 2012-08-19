
STO.Views.send = new (Backbone.View.extend({
	el: "#send",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
	},
	
	getSwfUrl: function(){
		return $.Deferred(function(dfd){
			var model = STO.giftConfig;
			var date = model.get("date");
			var time = model.get("time").split(/[:\s]/);
			var me = this;
			var tmpImg = $("<img>").load(function(){
				var el = $(this);
				var params = {
					bg: model.get("bg"),
					gift: model.get("gift"),
					gw: el.width(),
					gh: el.height(),
					start: model.get("msg").start,
					end: model.get("msg").end,
					y: date.getFullYear(),
					m: date.getMonth(),
					d: date.getDate(),
					hour: parseInt(time[0], 10) + (time[2] === "PM" ? 12 : 0),
					min: time[1]
				};
				var url = "https://dl.dropbox.com/u/98924751/general.swf?" + $.param(params);
				dfd.resolve(url);
				el.remove();
			}).attr("src", model.get("gift")).appendTo("body").hide();
		});
	},
	
	events: {
		"click .previous": function(){
			STO.go("selectGift");
		},
		"click .post": function(){
			var baseurl = window.location.href;
			baseurl = baseurl.substring(0, baseurl.lastIndexOf("/"));
			this.getSwfUrl().then(function(swfUrl){
				FB.ui({
					method: 'feed',
					link: "http://nparashuram.com/scrapstimeout",
					picture: "http://nparashuram.com/scrapstimeout/img/gift.png",
					name: STO.giftConfig.get("msg").heading,
					caption: STO.giftConfig.get("msg").start,
					description: STO.giftConfig.get("msg").desc,
					to: STO.giftConfig.get("friend").uid,
					source: swfUrl
				}, function(response){
					if (response) {
						STO.go("done");
					} else {
						$("#noFBWallPost").modal({
							backdrop: false,
							show: true
						})
					}
				});
			});
		},
		
		"send": function(){
			var me = this;
			var template = _.template(this.$el.find("#swfpreviewTemplate").html());
			window.axe = template;
			this.getSwfUrl().then(function(swfUrl){
				var h, w;
				var width = me.$el.find(".content").width(), height = me.$el.find(".content").height();
				if (width < height) {
					h = height * 0.7, w = h * 394 / 228;
				} else {
					w = width * 0.7, h = w * 228 / 394;
				}
				me.$el.find(".swfpreview").empty().html(template({
					"height": h,
					"width": w,
					"swf": swfUrl
				}));
			});
			this.$el.find(".giftToFriend").attr("src", STO.giftConfig.get("friend").pic_square);
		}
	}
}))();
