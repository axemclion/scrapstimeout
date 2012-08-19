STO.Views.done = new (Backbone.View.extend({
	el: "#done",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
	},
	
	events: {
		"click .startOver": function(){
			STO.go("getStarted");
		},
		"done": function(){
			this.$el.find(".viewWall").attr("href", "http://www.facebok.com/" + STO.giftConfig.get("friend").uid);
		}
	}
}))();
