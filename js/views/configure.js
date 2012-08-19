STO.Views.send = new (Backbone.View.extend({
	el: "#configure",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
		this.$el.find(".open-time").timepicker();
		this.$el.find(".open-date").datepicker({
			format: "mm/dd/yyyy",
			autoclose: true
		});
	},
	
	events: {
		"click .cancel": function(){
			STO.go("selectGift");
			return false;
		},
		
		"click .submit": function(){
			if (!this.$el.find(".gifturl").val()) {
				alert("Please enter a gift URL or hit cancel")
				return false;
			}
			var message = STO.giftConfig.get("msg") || {};
			message.start = this.$el.find(".beforeMsg").val() || message.start;
			message.end = this.$el.find(".afterMsg").val() || message.end;
			message.desc = this.$el.find(".fbcaption").val() || message.desc;
			message.heading = this.$el.find(".fbheading").val() || message.heading;
			STO.giftConfig.set({
				"msg": message,
				"gift": this.$el.find(".gifturl").val(),
				"time": this.$el.find(".open-time").val()
			});
			STO.go("send");
			return false;
		},
		
		"changeDate .open-date": function(ev){
			STO.giftConfig.set("date", ev.date);
		},
		
		"configure": function(){
			var message = STO.giftConfig.get("msg") || {};
			this.$el.find(".beforeMsg").val(message.start);
			this.$el.find(".afterMsg").val(message.end);
			this.$el.find(".fbcaption").val(message.desc);
			this.$el.find(".fbheading").val(message.heading);
			
			this.$el.find(".gifturl").val(STO.giftConfig.get("gift") || "");
			this.$el.find(".open-time").val(STO.giftConfig.get("time") || "10:10");
			this.$el.find(".open-date").data("date", STO.giftConfig.getDateString()).datepicker('update').find("input").val(STO.giftConfig.getDateString());
			
			this.$el.find(".giftToFriend").attr("src", STO.giftConfig.get("friend").pic_square);
		}
	}
}))();
