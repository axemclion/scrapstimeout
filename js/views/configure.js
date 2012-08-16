STO.Views.send = new (Backbone.View.extend({
	el: "#configure",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
	},
	
	events: {
		"click .done": function(){
			STO.go("selectGift");
		}
	}
}))();
