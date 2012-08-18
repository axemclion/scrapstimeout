STO.Views.selectFriend = new (Backbone.View.extend({
    el: "#selectFriend",
    initialize: function(){
        STO.getDecoration().prependTo(this.el);
        this.friendList = null;
        this.render();
    },
    
    getFriends: function(){
        var me = this;
        return $.Deferred(function(dfd){
            if (me.friendList) {
                dfd.resolveWith(me, me.friendList);
            }
            else {
                var q = escape('SELECT uid, name, pic_square, birthday_date  FROM user WHERE uid = me() OR uid IN (SELECT uid2 FROM friend WHERE uid1 = me()) order by birthday_date');
                FB.api('fql?q=' + q, function(response){
                    var data = response.data;
                    var result = [];
                    for (var i = 0; i < data.length; i++) {
                        result.push(data[i]);
                    }
                    me.friendList = result;
                    dfd.resolveWith(me, [data]);
                });
            }
        });
    },
    
    render: function(){
        var me = this;
        this.getFriends().then(function(list){
            $(".friendTypeAhead").typeahead({
                source: list,
                property: "name",
                onselect: me.onSelectFriend
            });
        });
    },
    onSelectFriend: function(obj){
        $(".selectedFriend").attr("src", obj.pic_square);
        $(".dob").html(obj.birthday_date);
        if (obj.birthday_date === null) {
            $(".dobContainer").hide()
        }
        else {
            var dateParts = obj.birthday_date.split("/");
            var date = new Date();
            date.setDate(dateParts[1]);
            date.setMonth(parseInt(dateParts[0], 10) - 1);
            STO.giftConfig.set("date", date);
            $(".dobContainer").show();
        }
        STO.giftConfig.set("friend", obj);
    },
    events: {
        "click .selectSelf": function(){
            FB.api()
        },
        
        "click .nextScreen": function(){
            if (!STO.giftConfig.get("friend")) {
                alert("Select a friend to continue");
            }
            else {
                STO.go("selectGift");
            }
        }
    }
}))();
