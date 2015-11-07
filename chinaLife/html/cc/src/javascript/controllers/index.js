define(function (require, exports, module){

	var model        = require('models/index');
	var view         = require('views/index');
	var tool         = require('common/tool');
	var common_model = require('common/model');
	var common_view  = require('common/view');
	
	// 创建头部
	// ------------------
	function create_header() {
		common_model.get_header_html(function(data) {
			common_view.render_header(data);
		});
	};

	// 创建尾部
	// ------------------
	function create_footer() {
		common_model.get_footer_html(function(data) {
			common_view.render_footer(data);
		});
	};

	// 生成列表
	// ------------------
	function create_list() {
		model.get_list(function(data) {
			view.render_list(data);
		});
	}

	// 构造顶部滑动tab
	// ------------------
	var tran;
	function create_tab() {
		var f = {};
	    var data = [];
	    var tabObj = $(".tabs-wp .tab-bd");

	    var startTime, endTime;
	    var moveLength;
	    var distance;

	    initTabs();

	    tabObj.on("touchstart", function(e) {
	        var myDate = new Date();
	        startTime = myDate.getTime();

	        if(tran == undefined) {
	            tran = 0;
	        } 
	        f.startX = e.touches[0].clientX;
	        f.endX = e.touches[0].clientX;
	        f.prevX = f.startX;
	        f.prevY = e.touches[0].clientY

	    }).on("touchmove", function(e) {
	        tabObj.css({
	            "-moz-transition": "none",
	            "-webkit-transition": "none",
	            "-o-transition": "none",
	            "-ms-transition": "none",
	            "transition": "none"
	        });

	        f.endX = e.touches[0].clientX;
	        f.deltaX = e.touches[0].clientX - f.startX + tran;
	        f.directionX = e.touches[0].clientX - f.prevX > 0 ? "right" : "left";
	        f.directionY = e.touches[0].clientY - f.prevY > 0 ? "bottom" : "top";

	        if(f.directionY == "top" || f.directionY == "bottom") {
	            e.preventDefault();
	        }

	        var width = $(".tabs-wp .tab-bd").width() * -1;
	        var offsetWidth = $(".tabs-wp .tab-bd").parent().width();
	        moveLength = Math.sqrt(Math.pow(Math.abs(f.deltaX), 2));

	        if(f.deltaX > 0) {
	            tabObj.css({
	                "transform": "translate("+ f.deltaX/2 +"px, 0px)",
	                "-ms-transform": "translate("+ f.deltaX/2 +"px, 0px)",     /* IE 9 */
	                "-moz-transform": "translate("+ f.deltaX/2 +"px, 0px)",    /* Firefox */
	                "-webkit-transform": "translate("+ f.deltaX/2 +"px, 0px)", /* Safari 和 Chrome */
	                "-o-transform": "translate("+ f.deltaX/2 +"px, 0px)"
	            });
	        } else if((f.deltaX-offsetWidth) < width) { 
	            var dx = width + offsetWidth;
	            var movX = f.deltaX - (f.deltaX - dx)/2;
	            tabObj.css({
	                "transform": "translate("+ movX +"px, 0px)",
	                "-ms-transform": "translate("+ movX +"px, 0px)",     /* IE 9 */
	                "-moz-transform": "translate("+ movX +"px, 0px)",    /* Firefox */
	                "-webkit-transform": "translate("+ movX +"px, 0px)", /* Safari 和 Chrome */
	                "-o-transform": "translate("+ movX +"px, 0px)"
	            });
	        } else {
	            tabObj.css({
	                "transform": "translate("+ f.deltaX +"px, 0px)",
	                "-ms-transform": "translate("+ f.deltaX +"px, 0px)",     /* IE 9 */
	                "-moz-transform": "translate("+ f.deltaX +"px, 0px)",    /* Firefox */
	                "-webkit-transform": "translate("+ f.deltaX +"px, 0px)", /* Safari 和 Chrome */
	                "-o-transform": "translate("+ f.deltaX +"px, 0px)"
	            });
	        }

	    }).on("touchend", function(e) {
	        distance = Math.sqrt(Math.pow(Math.abs(f.endX - f.startX), 2));

	        var myDate = new Date();
	        endTime = myDate.getTime();

	        var timeDiff = endTime - startTime;

	        var speed = 0;
	        if(distance) {
	            speed = distance / timeDiff;
	        }
	        
	        var realMov = f.deltaX;
	        var totalDis;
	        if(speed > 0.3) {
	            speed += 4;
	            totalDis = distance * speed;
	            if(f.directionX == "right") {
	                realMov = f.deltaX + totalDis;

	                tabObj.css({
                        "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
                    }).css({
                        "transform": "translate("+ realMov +"px, 0px)",
                        "-ms-transform": "translate("+ realMov +"px, 0px)",     /* IE 9 */
                        "-moz-transform": "translate("+ realMov +"px, 0px)",    /* Firefox */
                        "-webkit-transform": "translate("+ realMov +"px, 0px)", /* Safari 和 Chrome */
                        "-o-transform": "translate("+ realMov +"px, 0px)"
                    });

	                f.deltaX = _bounce(realMov, e);
	                
	            } else if(f.directionX == "left") {
	                realMov = f.deltaX - totalDis;

	                tabObj.css({
	                    "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                    "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                    "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                    "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                    "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
	                }).css({
	                    "transform": "translate("+ realMov +"px, 0px)",
	                    "-ms-transform": "translate("+ realMov +"px, 0px)",     /* IE 9 */
	                    "-moz-transform": "translate("+ realMov +"px, 0px)",    /* Firefox */
	                    "-webkit-transform": "translate("+ realMov +"px, 0px)", /* Safari 和 Chrome */
	                    "-o-transform": "translate("+ realMov +"px, 0px)"
	                });

	                f.deltaX = _bounce(realMov, e);
	            }
	        } else {
	            f.deltaX = _bounce(realMov, e);
	        }
	        
	        tran = f.deltaX;
	        data = [];

	    });
	};

	function _bounce(deltaX, e) {
	    var width = $(".tabs-wp .tab-bd").width() * -1;
	    var offsetWidth = $(".tabs-wp .tab-bd").parent().width();
	    if(deltaX > 0) {
	        $(".tabs-wp .tab-bd").css({
	                "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
	            }).css({
	                "transform": "translate(0px, 0px)",
	                "-ms-transform": "translate(0px, 0px)",     /* IE 9 */
	                "-moz-transform": "translate(0px, 0px)",    /* Firefox */
	                "-webkit-transform": "translate(0px, 0px)", /* Safari 和 Chrome */
	                "-o-transform": "translate(0px, 0px)"
	            });
	        return 0;
	    } else if((deltaX-offsetWidth) < width) {
	        var dx = width + offsetWidth;
	        $(".tabs-wp .tab-bd").css({
	                "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
	                "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
	            }).css({
	                "transform": "translate("+ dx +"px, 0px)",
	                "-ms-transform": "translate("+ dx +"px, 0px)",     /* IE 9 */
	                "-moz-transform": "translate("+ dx +"px, 0px)",    /* Firefox */
	                "-webkit-transform": "translate("+ dx +"px, 0px)", /* Safari 和 Chrome */
	                "-o-transform": "translate("+ dx +"px, 0px)"
	            });
	        return dx;
	    } else {
	        return deltaX;
	    }
	}

	function initTabs() {
	    var tabObj = $(".tabs-wp .tab-bd");

	    if($(".tab-new").hasClass("active")) {
	        $(".tabs-wp .tab-bd").css("visibility", "visible");
	    }

	    tabObj.children().each(function() {
	        if($(this).hasClass("active")) {

	            var oleft = $(this).offset().left;
	            var bdLeft = oleft - $(".tabs-wp .tab-new").width();
	            var movLeft = bdLeft - ($(".tabs-wp .tab-cnt").width())/2 + ($(this).width())/2;

	            var deltaX = movLeft * -1;


	            var width = $(".tabs-wp .tab-bd").width() * -1;
	            var offsetWidth = $(".tabs-wp .tab-bd").parent().width();

	            if(deltaX > 0) {
	                deltaX = 0;
	            } if((deltaX-offsetWidth) < width) {
	                deltaX = width + offsetWidth;
	            }

	            $(".tabs-wp .tab-bd").css({
	                "transform": "translate("+ deltaX +"px, 0px)",
	                "-ms-transform": "translate("+ deltaX +"px, 0px)",     /* IE 9 */
	                "-moz-transform": "translate("+ deltaX +"px, 0px)",    /* Firefox */
	                "-webkit-transform": "translate("+ deltaX +"px, 0px)", /* Safari 和 Chrome */
	                "-o-transform": "translate("+ deltaX +"px, 0px)"
	            });

	            tran = deltaX;
	            $(".tabs-wp .tab-bd").css("visibility", "visible");
	        }
	    });
	    
	}

	// 顶部tab切换
	// ------------------
	function tab_check() {
		var filterClose=null;
		var filter=$("#J_filter");
		var tab=$("#J_tab");
		var sortRes=$("#J_sortRes");
		var tabContent=$('.J_tabitem');
		var preItem = null;

		//tab页切换
		var tablength=tab.children('.item').length;
		tab.on("click",".item",function(){
		    var tabItem=$(this);
		    var itemIndex=tabItem.index();
		    if(itemIndex==(tablength-1)){
		        //添加on类
		        //显示分类筛选
		        if(filter.hasClass('show')){
		            filter.removeClass('show');
		            if(sortRes.text() == "分类"){
		                tabItem.removeClass('on');
		                if(preItem){
		                    preItem.addClass("on");
		                }
		            }
		            
		        }else{
		            preItem = tabItem.siblings(".on");
		            tabItem.addClass('on').siblings().removeClass('on');
		            filter.addClass('show');
		        }
		        
		        
		        return;
		    }else{
		        //重置分类标签内容
		         sortRes.text("分类");
		        //重置分类筛选内容
		         filter.children('.item').removeClass('on');
		        //关闭筛选栏
		        filter.removeClass('show');
		        //添加on类
		        tabItem.addClass('on').siblings().removeClass('on');
		    }
		});
	}

	// 回到顶部按钮
	// ------------------
	function back_to_top() {
		$(document).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var wHeight = $(window).height();
			var back_top = $(".shangou_backtop");
			if(scrollTop >= wHeight){
				$("#backToTop").attr("style","display:block;");
				if(back_top){
					back_top.addClass("shangou_backtop_show");
				}
			}else{
				if(back_top){
					back_top.removeClass("shangou_backtop_show");
				}
				$("#backToTop").attr("style","display:none;");
			}
		});
	}

	// 获取价格信息
	// ------------------
	function get_price_info() {
		var skuidsv = '';
		if(skuidsv != "" && skuidsv != null) {
	        var strs = skuidsv.split(",");
	        var len = strs.length;
	        
	        var requestStrs = "";
	        for(var index = 0 ; index < len ; index++) {
	            requestStrs += "," + strs[index];
	        }
	        var reqString = requestStrs.substring(1,requestStrs.length);
	        var arg = {'skuids' : reqString, 'type':1, "origin":2};

	        model.get_price_data(arg, function(data) {
	        	view.render_price(data);
	        });
	    }
	}

	// 获取库存信息
	// ------------------
	function get_stock_info() {
		var skuidsv = '';
		if(skuidsv != "" && skuidsv != null){
			model.get_stock_data({"skuids": skuidsv}, function(data) {
				view.render_stock(data);
			});
	   }
	}

	// 懒加载init
	// ------------------
	function layzr_init() {
		var layzr = new tool.Layzr({
		  callback: function(nodes) {
		  	this.classList.add('fadeIn');
		  }
		});
	}

	// 对外接口
	// ------------------
	module.exports = {
		create_header : create_header,
		create_footer : create_footer,
		create_list   : create_list,
		create_tab    : create_tab,
		tab_check     : tab_check,
		back_to_top   : back_to_top,
		get_price_info: get_price_info,
		get_stock_info: get_stock_info,
		layzr_init    : layzr_init
	};
});