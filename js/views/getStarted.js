STO.Views.getStarted = new (Backbone.View.extend({
	el: "#getStarted",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
	},
	
	events: {
		"getStarted": function(){
			FB.getLoginStatus(function(response){
				if (response.status === "connected") {
					$(".nextScreen").show();
					$("#fbLoginButton").hide();
				} else {
					$(".nextScreen").hide();
					$("#fbLoginButton").show();
				}
			});
		},
		"click .nextScreen": function(){
			STO.go("selectFriend");
		},
		"click .fblogin": function(){
			var me = this;
			FB.login(function(response){
				if (response.status === "connected") {
					me.nextScreen();
				} else {
					$("#noFbLogin").modal({
						"backdrop": false,
						"show": true
					})
				}
			}, {
				scope: "friends_birthday"
			})
		}
	}
}))();
