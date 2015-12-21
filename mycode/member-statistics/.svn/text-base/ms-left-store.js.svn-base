define(["/rmp/views/common/js/shop-address"], function(require, exports, module) {
    //地址类定义
    var shopAddress;
    var msLeftStoreMode = Backbone.Model.extend({
        /**
         * [getLeftAddress description]左边的地址控件
         * @author wanghaiyan
         * @date   2015-12-14
         * @return {[type]}   [description]
         */
        getLeftAddress: function() {
            $.ajax({
                url: basePath + '/lsStore/getStoreCityListDto.action',
                type: 'POST',
                dataType: 'json',
                mask: false,
                success: function(data) {
                    var shopAddress = require("/rmp/views/common/js/shop-address");
                    var leftAddress = new shopAddress("#ms-address", data);
                    leftAddress.init();
                }
            });
        },
        /**
         * [getLeftShop description]左边的门店列表
         * @author wanghaiyan
         * @date   2015-12-15
         * @param  {[type]}   eventname [description]事件名称
         * @param  {[type]}   data [description]事件回调参数
         * @return {[type]}      [description]
         */
        getLeftShop: function(eventname,data) {
            //左边的头部地址名更改
            if(data.name){
                $(".ms-jiantou-shop").html(data.name);
            }
            //查询
            var searchKey = $("#ms-shop-serech").val();
            var id = data.id;
            $.ajax({
                type: "POST",
                url: basePath + '/lsStore/getStoreDTONoCityList.aciton',
                data: $.param({
                    controlOrRegionStr: id,
                    name: searchKey
                }, true),
                dataType: 'json',
                mask: false,
                success: function(data) {
                    window.PubSub.publish("leftShopCallback", data);
                }
            });
        },
        getLeftShopCallback: function(eventname,data){
            $('.ms-address-module').empty();
            var addModuleArr = [];
            $.each(data, function(i, item) {
                var pinYin = item.pinYin;
                addModuleArr.push('<ul class="pa-city-' + pinYin + '">');
                $.each(item.data, function(j, index) {
                    if (j == 0) {
                        addModuleArr.push('<li title="' + index.name + '"  data-id="' + index.id + '" data-type="' + index.type + '" data-text="span"><span class="ms-py">' + index.pinYin + '</span><span name="storeName">' + index.name + '</span></li>')
                    } else {
                        addModuleArr.push('<li title="' + index.name + '"  data-id="' + index.id + '" data-type="' + index.type + '" data-text="span"><span class="ms-py"></span><span name="storeName">' + index.name + '</span></li>');
                    }
                });
                addModuleArr.push('</ul>');
            });
            $('.ms-address-module').html(addModuleArr.join(''));
        }
    });
    var msLeftStoreView = Backbone.View.extend({
        el: "#ms-store-left",
        token: [],
        initialize: function() {
            this.module = new msLeftStoreMode();
            this.module.getLeftAddress();
            //事件订阅
            var leftAddressClick = window.PubSub.subscribe("leftAddressClick", this.module.getLeftShop);
            var leftShopCallback = window.PubSub.subscribe("leftShopCallback", this.module.getLeftShopCallback);
            this.token.push(leftAddressClick);
            this.token.push(leftShopCallback);
        },
        events: {
            "click .ms-jiantou-shop": "msAddressShow", //点击地址框出现
            "mouseleave .ms-dis-module": "msAddressHide", //鼠标移开地址控件消失
            "click #ms-search-btn": "msShopSearch",//门店过滤
            "click #ms-address li": "msAddressChange", //点击地址的省市区
            "click .ms-address-module li": "msShopChange" //点击门店
        },
        msAddressShow: function() {
            $("#ms-address").show();
        },
        msAddressHide: function() {
            $("#ms-address").hide();
        },
        msShopSearch: function(){
            var dataId = $(".ms-jiantou-shop").data("id");
            this.module.getLeftShop("",{id: dataId});
        },
        msAddressChange: function(e) {
            //样式更改,id绑定
            var currentEl = $(e.currentTarget);
            currentEl.addClass('active').siblings().removeClass('active');
            $(".pa-jiantou-shop").data('id', currentEl.data('id'));
            //发布事件
            var dataType = currentEl.data('type');
            var dataId = currentEl.data('id');
            var dataName = currentEl.find(".ls-add-pin-text").html();
            var param = {id: dataId,type: dataType,name:dataName};
            window.PubSub.publish("leftAddressClick", param);
        },
        msShopChange: function(e) {
            //发布事件
            var param = {
            	id: $(e.currentTarget).data("id"),
            	type: $(e.currentTarget).data("type"),
                name: $(e.currentTarget).find("[name='storeName']").html()
            }
            window.PubSub.publish("msLeftStoreClick", param);
        }
    });
    module.exports = msLeftStoreView;
});
