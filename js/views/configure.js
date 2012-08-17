STO.Views.send = new (Backbone.View.extend({
	el: "#configure",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
		this.$el.find(".open-date").datepicker();
		this.$el.find(".open-time").timepicker();
	},
	
	events: {
		"click .cancel": function(){
			STO.go("selectGift");
			return false;
		},
		
		"click .submit": function(){
			if (!this.$el.find(".gifturl").val()) {
				alert("Please enter a gift URL or hit cancel")
				return;
			}
			var message = STO.giftConfig.get("msg") || {};
			message.start = this.$el.find(".beforeMsg").val() || message.start;
			message.end = this.$el.find(".afterMsg").val() || message.end;
			message.desc = this.$el.find(".fbcaption").val() || message.desc;
			STO.giftConfig.set({
				"msg": message,
				"gift": this.$el.find(".gifturl").val(),
				"time": this.$el.find(".open-time").val()
			});
		},
		
		"changeDate .open-date": function(ev){
			STO.giftConfig.set("date", ev.date);
		},
		
		"configure": function(){
			var message = STO.giftConfig.get("msg") || {};
			this.$el.find(".beforeMsg").val(message.start);
			this.$el.find(".afterMsg").val(message.end);
			this.$el.find(".fbcaption").val(message.desc);
			
			this.$el.find(".gifturl").val(STO.giftConfig.get("gift") || "");
			this.$el.find(".open-time").val(STO.giftConfig.get("time") || "10:10");
			var date = STO.giftConfig.get("date");
			this.$el.find(".open-date input").val([date.getMonth(), date.getDate(), date.getFullYear()].join("-"));
		}
	}
}))();
