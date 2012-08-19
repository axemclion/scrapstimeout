STO.Views.selectFriend = new (Backbone.View.extend({
	el: "#selectFriend",
	initialize: function(){
		STO.getDecoration().prependTo(this.el);
		this.friendList = null;
		this.render();
	},
	
	showUpcoming: function(list){
		var template = _.template(this.$el.find("#upcomingBirthdayTmpl").html());
		this.$el.find(".upcoming-birthdays").html(template({
			friendList: _.sortBy(list, function(friend){
				if (!friend.birthday_date) {
					return Infinity;
				} else {
					var date = friend.birthday_date.split("/");
					var x = new Date();
					x.setDate(parseInt(date[1], 10));
					x.setMonth(parseInt(date[0], 10) - 1);
					var diff = x - new Date();
					diff < 0 && (diff += 31536000000);
					return diff;
				}
			})
		}));
	},
	
	getFriends: function(){
		var me = this;
		return $.Deferred(function(dfd){
			if (me.friendList) {
				dfd.resolveWith(me, me.friendList);
			} else {
				var q = escape('SELECT uid, name, pic_square, birthday_date  FROM user WHERE uid = me() OR uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) order by birthday_date');
				FB.api('fql?q=' + q, function(response){
					me.friendList = response.data;
					dfd.resolveWith(me, [me.friendList]);
				});
			}
		});
	},
	
	render: function(){
		var me = this;
		this.getFriends().then(function(list){
			me.$el.find(".friendTypeAhead").typeahead({
				source: list,
				property: "name",
				onselect: _.bind(me.onSelectFriend, me)
			});
			me.showUpcoming(list);
		});
	},
	onSelectFriend: function(obj){
		this.$el.find(".friend-img").attr("src", obj.pic_square);
		this.$el.find(".dob").html("Birthday : <strong>" + obj.birthday_date + "</strong>");
		this.$el.find(".friend-name").html("Name : <strong>" + obj.name + "</strong>");
		var date = new Date();
		if (obj.birthday_date === null) {
			STO.giftConfig.set("date", date);
			this.$el.find(".dob").hide()
		} else {
			var dateParts = obj.birthday_date.split("/");
			date.setDate(dateParts[1]);
			date.setMonth(parseInt(dateParts[0], 10) - 1);
			STO.giftConfig.set("date", date);
			this.$el.find(".dob").show();
		}
		STO.giftConfig.set("friend", obj);
	},
	events: {
		"click .selectSelf": function(){
			FB.api()
		},
		
		"click .prevScreen": function(){
			STO.go("getStarted");
		},
		"click .upcoming-birthdays img": function(e){
			var f = $(e.target);
			this.onSelectFriend({
				name: f.data("name"),
				birthday_date: f.data("birthday"),
				uid: f.data("id"),
				pic_square: f.attr("src")
			});
			return false;
		},
		
		"click .nextScreen": function(){
			if (!STO.giftConfig.get("friend")) {
				alert("Select a friend to continue");
			} else {
				STO.go("selectGift");
			}
		}
	}
}))();
