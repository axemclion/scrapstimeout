STO.Views.send = new (Backbone.View.extend({
    el: "#send",
    initialize: function(){
        STO.getDecoration().prependTo(this.el);
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
        this.template = _.template(this.$el.find(".swfpreviewTemplate").html());
    },
    
    getSwfUrl: function(){
        return $.Deferred(function(dfd){
            var model = STO.giftConfig;
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
                    y: model.get("date").y,
                    m: model.get("date").m,
                    d: model.get("date").d,
                    hour: model.get("time").hour,
                    min: model.get("time").min
                };
                var url = window.location.href;
                url = url.substring(0, url.lastIndexOf("/")) + "/swf/general.swf?" + $.param(params);
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
            this.getSwfUrl().then(function(url){
                FB.ui({
                    method: 'feed',
                    link: url,
                    picture: 'http://www.cornonthejob.com/wp-content/uploads/2011/12/Gift-Box.jpg',
                    name: "Here is a surprise for you !!",
                    caption: STO.giftConfig.get("msg").start,
                    description: 'Using Dialogs to interact with users.',
                    to: STO.giftConfig.get("friend").uid
                }, function(response){
                    if (response) {
                        STO.go("done");
                    }
                    else {
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
            this.getSwfUrl().then(function(url){
                var width = me.$el.find(".content").width();
                var height = me.$el.find(".content").height();
                console.log(width, height)
                me.$el.find(".swfpreview").empty().html(me.template({
                    "height": (width < height ? width : height) * 0.5,
                    "width": (width < height ? width : height) * 0.5,
                    "swf": url
                }));
            });
        }
    }
}))();
