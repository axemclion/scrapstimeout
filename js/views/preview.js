STO.Views.preview = new (Backbone.View.extend({
	el: "#preview",
	initialize: function(){
	
	},
	
	render: function(){
		console.log("Rendering view");
	},
	
	events: {
		"click .send": function(){
			STO.go("send");
		},
		"click .back": function(){
			STO.go("selectGift");
		}
	}
}))();
