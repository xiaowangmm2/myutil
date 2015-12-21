define([], function(require, exports, module) {
    var msRightNavView = Backbone.View.extend({
        el: ".ms-fix-module",
        token: [],
        initialize: function() {
            var leftAddressClick = window.PubSub.subscribe("leftAddressClick", this.msChangeTitle);
            var msLeftStoreClick = window.PubSub.subscribe("msLeftStoreClick", this.msChangeTitle);
            this.token.push(leftAddressClick);
            this.token.push(msLeftStoreClick);
        },
        events: {
            "click #ms-top": "msTopLocation",
            "click #ms-sub-btn" : "msSubListShow",
            "click .ms-fix-sub-list a": "msFixSubLocation"
        },
        msChangeTitle: function(eventname, data){
            $("#ms-fix-title").html(data.name);
        },
        msTopLocation: function() {
            $(".ms-fix-sub-list a").eq(0).trigger("click");
        },
        msSubListShow: function(){
        	$(".ms-fix-sub-list").show();
        },
        msFixSubLocation: function(e) {
            $(e.currentTarget).addClass('active').siblings().removeClass('active');
            var moduleId = $(e.currentTarget).data('id');
            var scrolltop = $("#" + moduleId).position().top;
            $(".ms-menu-center").scrollTop(scrolltop + $(".ms-menu-center").scrollTop() - 40);
        }
    });
    module.exports = msRightNavView;
});
