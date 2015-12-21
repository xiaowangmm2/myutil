define(["../data-statis-common"], function(require, exports, module) {
    //会员报表公共逻辑
    var msCommon = require("../data-statis-common");
    var msMemberAddChart;
    var rmpEcharts = App.echarts;
    var msRightMemberAddMode = Backbone.Model.extend({
        getMemberAddData: function(eventname, data) {
            var data = {};
            //ajax请求
            window.PubSub.publish("memberAddDataCallback", data);
        },
        getMemberAddCallback: function(eventname, data) {
            var chartOption = {};
            //生成chart表
            chartOption.data = {
                "sxAxis": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                "dyAxis1": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
                "dyAxis2": null,
                "dyAxis3": null,
                "dyAxis4": null,
                "dyAxis5": null,
                "lyAxis1": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "lyAxis2": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "lyAxis3": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "lyAxis4": null,
                "lyAxis5": null,
                "cyAxis": null,
                "avg": null,
                "avg2": null,
                "growthRate": null,
                "hasMore": false
            };
            chartOption.legend = {
                data: ['到店会员']
            };
            chartOption.color = ['#36CBEA'];
            chartOption.yAxisFormatter = '{value}k'
            chartOption.series = [{
                name: '到店会员',
                type: 'bar',
                barWidth: rmpEcharts.barWidth,
                data: chartOption.data.lyAxis1,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'top',
                            formatter: function(params, ticket, callback) {
                                var val = params.data;
                                var index = ""
                                $.each(data.lyAxis1, function(i, item) {
                                    if (item == val) {
                                        index = i;
                                    }
                                })
                                return data.growthRate[index];
                            }
                        }
                    }
                },
                markLine: {
                    precision: 0,
                    data: [{
                        type: 'average',
                        name: '平均值',
                        itemStyle: {
                            normal: {
                                color: '#f39700'
                            }
                        }
                    }]
                }
            }];
            var option = msCommon.msBarChartOption(chartOption);
            msMemberAddChart = window.App.util.creatCharts("ms-store-in-chart", option, msMemberAddChart);
        }
    });
    var msRightMemberAddView = Backbone.View.extend({
        el: "#ms-store-in-tab",
        token: [],
        initialize: function() {
           //时间控件初始化
            this.initTime();
            //模块初始化
            this.module = new msRightMemberAddMode();
            //事件订阅
            var leftAddressClick = window.PubSub.subscribe("leftAddressClick", this.module.getMemberAddData);
            var memberDataCallback = window.PubSub.subscribe("memberAddDataCallback", this.module.getMemberAddCallback);
            var msLeftStoreClick = window.PubSub.subscribe("msLeftStoreClick", this.module.getMemberAddData);
            this.token.push(leftAddressClick);
            this.token.push(memberDataCallback);
            this.token.push(msLeftStoreClick);
        },
        events: {
            "click #ms-time-two a": "msTimeTwoChange"
        },
        initTime: function() {
            var _this = this;
            $("#ms-report-type-day2 input").click(function() {
                WdatePicker({
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    firstDayOfWeek: 1,
                    onpicked: _this.module.getMemberAddData
                });
            });
            $("#ms-report-type-custom-start-day2 input").click(function() {
                WdatePicker({
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    firstDayOfWeek: 1,
                    onpicked: _this.module.getMemberAddData
                });
            });
            $("#ms-report-type-custom-end-day2 input").click(function() {
                WdatePicker({
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    firstDayOfWeek: 1,
                    onpicked: _this.module.getMemberAddData
                });
            });
            $("#ms-report-type-week2 input:text").click(function() {
                var $input = $(this);
                WdatePicker({
                    el: 'pa-report-type-week1-hidden',
                    firstDayOfWeek: 1,
                    isShowWeek: true,
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    onpicked: function() {
                        msCommon.weekChangeEvent($input, $('#pa-report-type-week1-hidden'));
                        onpicked: _this.module.getMemberAddData
                    }
                });
            });
            $("#ms-report-type-month2 input").click(function() {
                WdatePicker({
                    firstDayOfWeek: 1,
                    isShowClear: false,
                    maxDate: '%y-%M-%d',
                    dateFmt: 'yyyy-MM',
                    onpicked: _this.module.getMemberAddData
                });
            });
            $("#ms-report-type-year2 input").click(function() {
                WdatePicker({
                    firstDayOfWeek: 1,
                    maxDate: '%y-%M-%d',
                    isShowClear: false,
                    dateFmt: 'yyyy',
                    onpicked: _this.module.getMemberAddData
                });
            });
            //时间控件赋值
            var day = window.App.util.dateToString($.now());
            var month = day.slice(0, 7);
            var year = day.slice(0, 4);
            //日赋值
            $("#ms-report-type-day2 input").val(day);
            $("#ms-report-type-custom-start-day2 input").val(day);
            $("#ms-report-type-custom-end-day2 input").val(day);
            //月赋值
            $("#ms-report-type-month2 input").val(month);
            //周赋值
            var weekDate = new Date();
            var weekTime = weekDate.getTime();
            var weekDay = weekDate.getDay() || 7;
            var beginWeekTime = window.App.util.dateToString(weekTime - 24 * 60 * 60 * 1000 * (weekDay - 1));
            var endWeekTime = window.App.util.dateToString(weekTime + 24 * 60 * 60 * 1000 * (7 - weekDay));
            $("#ms-report-type-week2 input:text").val(beginWeekTime + '至' + endWeekTime);
            $('#ms-report-type-week2-hidden').val(beginWeekTime);
            //年赋值
            $("#ms-report-type-year2 input").val(year);
        },
        msTimeTwoChange: function(e) {
            var eventEl = $(e.currentTarget);
            eventEl.addClass('active').siblings().removeClass('active');
            msCommon.timeChange(eventEl.data("value"), 2, "ms");
        },
        remove: function(){
            if(msMemberAddChart){
                msMemberAddChart.clear();
                msMemberAddChart.dispose();
                msMemberAddChart=null;
            }
            this.$el.remove();
            this.stopListening();
            return this;
        }
    });
    module.exports = msRightMemberAddView;
});
