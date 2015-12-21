define(["LsCommon", "./member-statistics/ms-left-store",
    "./member-statistics/ms-right-nav","./member-statistics/ms-right-member-top",
    "./member-statistics/ms-right-member-add"], function(require, exports, module) {
    var memberStatisticsView = Backbone.View.extend({
        el: "#member-statistics",
        initialize: function() {
            this.memberStatiscsInit();
            var LsCommon = require("LsCommon");
            var lsCommonInstance = new LsCommon();
            lsCommonInstance.init(this.initWindow);
            var msLeftStore = require("./member-statistics/ms-left-store");
            this.msLeftStore = new msLeftStore();
            var msRightNav = require("./member-statistics/ms-right-nav");
            this.msRightNav = new msRightNav();
            var msRightMemberTop = require("./member-statistics/ms-right-member-top");
            this.msRightMemberTop = new msRightMemberTop();
            var msRightMemberAdd = require("./member-statistics/ms-right-member-add");
            this.msRightMembeAdd = new msRightMemberAdd();
            //发布事件
            var param={id:"-1",type:"",name:"所有门店"};
            window.PubSub.publish("leftAddressClick",param);
        },
        /**
         * [memberStatiscsInit description]页面初始化
         * @author wanghaiyan
         * @date   2015-12-14
         * @return {[type]}   [description]
         */
        memberStatiscsInit: function() {
            //左边的高度自适应
            $(".ms-address-module").height($.getHikHeight(149));
            //图标定位
            $("#ms-flex-left,#ms-flex-right").css('top', Math.floor($.getHikHeight(66) / 2) + "px");
        },
        events: {},
        initWindow: function() {
            $(window).off('resize').on("resize", function() {
                $(".hik-center").height($.getHikHeight(66));
                $(".ms-address-module").height($.getHikHeight(149));
                $("#ms-flex-left,#ms-flex-right").css('top', Math.floor($.getHikHeight(66) / 2) + "px");
            });
        },
        remove: function(){
            //统一删除事件订阅
            var msLeftStoreToken = this.msLeftStore.token,msRightNavToken = this.msRightNav.token,
                msRightMemberTopToken = this.msRightMemberTop.token,msRightMembeAddToken = this.msRightMembeAdd.token;
            if(msLeftStoreToken && msRightNavToken.length>0){
                $.each(msLeftStoreToken,function(index, el) {
                    window.PubSub.unsubscribe(el);
                });
            }
            if(msRightNavToken && msRightNavToken.length>0){
                $.each(msRightNavToken,function(index, el) {
                    window.PubSub.unsubscribe(el);
                });
            }
            if(msRightMemberTopToken && msRightMemberTopToken.length>0){
                $.each(msRightMemberTopToken,function(index, el) {
                    window.PubSub.unsubscribe(el);
                });
            }
            if(msRightMembeAddToken && msRightMembeAddToken.length>0){
                $.each(msRightMembeAddToken,function(index, el) {
                    window.PubSub.unsubscribe(el);
                });
            }
            //view删除
            this.msLeftStore.remove();
            this.msRightNav.remove();
            this.msRightMemberTop.remove();
            this.msRightMembeAdd.remove();
            this.$el.remove();
            this.stopListening();
            return this;
        }
    });
    module.exports = memberStatisticsView;
});
