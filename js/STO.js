var STO = (function($){

    var Config = {
        staticUrl: "."
    };
    
    var cube = new Cube($(".cube-container").hide());
    window.axe = cube;
    var stage = {
        "getStarted": 1,
        "selectFriend": 2,
        "selectGift": 3,
        "send": 4,
        "done": 5,
        "configure": 6
    }
    
    function init(){
        $(".cube-container").show();
        STO.go("getStarted");
    }
    
    window.fbAsyncInit = function(){
        FB.init({
            appId: '246040222182849',
            channelUrl: '//nparashuram.com/tickingsurprises/channel.html', // Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true // parse XFBML
        });
        init();
        Backbone.history.start();
    };
    
    // Load the SDK Asynchronously
    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));
    
    function loadScripts(scripts, callback){
        //Check this out later: infold
        (function addScript(i){
            if (i >= scripts.length) {
                typeof callback === "function" && callback();
                return;
            }
            var x = document.createElement("script");
            x.type = "text/javascript";
            x.src = scripts[i].src;
            document.body.appendChild(x);
            x.onload = function(){
                addScript(i + 1);
            }
        })(0);
    }
    
    var router = new (Backbone.Router.extend({
        routes: {
            "*actions": "defaultRoute"
        },
        defaultRoute: function(loc){
            console.log("Need to goto ", loc);
            this.checkPreConditions(loc).then(function(action){
                console.log("Going to " + action);
                window.location = "#" + action;
                var location = stage[action];
                var url = [Config.staticUrl, "/pages/", action, ".html"].join("");
                var el = $(".cube-container").children().children(":eq(" + (location - 1) + ")");
                if (el.html().trim() === "") {
                    el.load(url, function(){
                        $.event.trigger(action);
                    });
                }
                else {
                    $.event.trigger(action);
                }
                cube.showFace(stage[action]);
            });
        },
        
        checkPreConditions: function(loc){
            return $.Deferred(function(dfd){
                if (!loc || !stage[loc]) {
                    dfd.resolve("getStarted");
                    return;
                }
                FB.getLoginStatus(function(resp){
                    if (resp.status !== "connected") {
                        dfd.resolve("getStarted");
                    }
                    else {
                        var stageNum = stage[loc];
                        if (stageNum > stage["selectFriend"] && !STO.giftConfig.get("friend")) {
                            dfd.resolve("selectFriend");
                        }
                        else 
                            if (stageNum > stage["selectGift"] && !STO.giftConfig.get("gift")) {
                                dfd.resolve("selectGift");
                            }
                            else {
                                dfd.resolve(loc);
                            }
                    }
                });
            });
        }
    }))();
    
    return {
        go: function(loc){
            router.navigate(loc, {
                trigger: true
            });
        },
        
        getDecoration: function(){
            return $(".decorations.template").clone().removeClass("template").show();
        },
        Views: {},
    }
}(window.jQuery));

STO.giftConfig = new (Backbone.Model.extend({
    defaults: {
        date: {
            d: 14,
            m: 7,
            y: 2012
        },
        time: {
            hour: 0,
            min: 0
        },
        msg: {
            start: "",
            end: ""
        }
    }
}))();
