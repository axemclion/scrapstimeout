STO.Views.getStarted = new (Backbone.View.extend({
	el: "#getStarted",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
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
	
	nextScreen: function(){
		STO.go("selectFriend");
	},
	
	events: {
		"click .nextScreen": "nextScreen",
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
