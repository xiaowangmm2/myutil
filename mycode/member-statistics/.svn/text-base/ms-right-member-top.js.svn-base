define(["../data-statis-common"], function(require, exports, module) {
    //会员报表公共逻辑
    var msCommon = require("../data-statis-common");
    var msTopChart;
    var msRightMemberMode = Backbone.Model.extend({
        getMemberData: function(eventname, data) {
            var data = {};
            //ajax请求
            window.PubSub.publish("memberDataCallback", data);
        },
        getMemberCallback: function(eventname, data) {
            //赋值
            //生成chart表
            var data = 30;
            var option = msCommon.msPieChartOption(data, "#21c0e2");
            msTopChart = window.App.util.creatCharts("ms-transform-top-chart", option, msTopChart);
        }
    });
    var msRightMemberView = Backbone.View.extend({
        el: "#ms-member-top",
        token: [],
        initialize: function() {
            //时间控件初始化
            this.initTime();
            //模块初始化
            this.module = new msRightMemberMode();
            //事件订阅
            var leftAddressClick = window.PubSub.subscribe("leftAddressClick", this.module.getMemberData);
            var memberDataCallback = window.PubSub.subscribe("memberDataCallback", this.module.getMemberCallback);
            var msLeftStoreClick = window.PubSub.subscribe("msLeftStoreClick", this.module.getMemberAddData);
            this.token.push(leftAddressClick);
            this.token.push(memberDataCallback);
            this.token.push(msLeftStoreClick);
        },
        events: {
            "click #ms-time-one a": "msTimeOneChange"
        },
        initTime: function() {
            var _this = this;
            $("#ms-report-type-day1 input").click(function() {
                WdatePicker({
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    firstDayOfWeek: 1,
                    onpicked: _this.module.getMemberData
                });
            });
            $("#ms-report-type-custom-start-day1 input").click(function() {
                WdatePicker({
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    firstDayOfWeek: 1
                });
            });
            $("#ms-report-type-custom-end-day1 input").click(function() {
                WdatePicker({
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    firstDayOfWeek: 1,
                    onpicked: _this.module.getMemberData
                });
            });
            $("#ms-report-type-week1 input:text").click(function() {
                var $input = $(this);
                WdatePicker({
                    el: 'pa-report-type-week1-hidden',
                    firstDayOfWeek: 1,
                    isShowWeek: true,
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    onpicked: function() {
                        msCommon.weekChangeEvent($input, $('#pa-report-type-week1-hidden'));
                        _this.module.getMemberData
                    }
                });
            });
            $("#ms-report-type-month1 input").click(function() {
                WdatePicker({
                    firstDayOfWeek: 1,
                    isShowClear: false,
                    maxDate: '%y-%M-%d',
                    dateFmt: 'yyyy-MM',
                    onpicked: _this.module.getMemberData
                });
            });
            $("#ms-report-type-year1 input").click(function() {
                WdatePicker({
                    firstDayOfWeek: 1,
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    dateFmt: 'yyyy',
                    onpicked: _this.module.getMemberData
                });
            });
            //时间控件赋值
            var day = window.App.util.dateToString($.now());
            var month = day.slice(0, 7);
            var year = day.slice(0, 4);
            //日赋值
            $("#ms-report-type-day1 input").val(day);
            $("#ms-report-type-custom-start-day1 input").val(day);
            $("#ms-report-type-custom-end-day1 input").val(day);
            //月赋值
            $("#ms-report-type-month1 input").val(month);
            //周赋值
            var weekDate = new Date();
            var weekTime = weekDate.getTime();
            var weekDay = weekDate.getDay() || 7;
            var beginWeekTime = window.App.util.dateToString(weekTime - 24 * 60 * 60 * 1000 * (weekDay - 1));
            var endWeekTime = window.App.util.dateToString(weekTime + 24 * 60 * 60 * 1000 * (7 - weekDay));
            $("#ms-report-type-week1 input:text").val(beginWeekTime + '至' + endWeekTime);
            $('#ms-report-type-week1-hidden').val(beginWeekTime);
            //年赋值
            $("#ms-report-type-year1 input").val(year);
        },
        msTimeOneChange: function(e) {
            var eventEl = $(e.currentTarget);
            eventEl.addClass('active').siblings().removeClass('active');
            msCommon.timeChange(eventEl.data("value"), 1, "ms");
        },
        remove: function(){
            if(msTopChart){
                msTopChart.clear();
                msTopChart.dispose();
                msTopChart=null;
            }
            this.$el.remove();
            this.stopListening();
            return this;
        }
    });
    module.exports = msRightMemberView;
});
