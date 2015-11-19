/*!
 * =================================================
 * name: 闪购首页 controller文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * =================================================
 */

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
	function create_tab() {
		var navSwiper = new Swiper('.red-mobile-nav',{
			slidesPerView : 'auto',
			loop: false,
			onTap: function(swiper) {
				var click_slider = swiper.clickedSlide;
				var this_swiper  = $(click_slider).closest('.swiper-container');

				this_swiper.find('.swiper-slide').removeClass('active');
				$(click_slider).addClass('active');

				var swiper_width_half = parseInt(this_swiper.width() / 2, 10);
				var offset_left       = click_slider.offsetLeft;
				var max_translate     = swiper.maxTranslate();
				var min_translate     = swiper.minTranslate();
				var translate_to      = swiper_width_half - offset_left - click_slider.offsetWidth / 2;

				if(translate_to > min_translate) {
					translate_to = min_translate;
				}else if(translate_to < max_translate) {
					translate_to = max_translate;
				}
				swiper.setWrapperTransition(800);
				swiper.setWrapperTranslate(translate_to);
			}
		});
	};

	//首页轮播效果
	// ------------------
	function create_top_slider() {
		if($('.red-slider-wraper').length) {
			var sliderSwiper = new Swiper('.red-slider-wraper',{
	            loop: true,
	            pagination : '.red-slider-pagination',
	            onImagesReady: function() {
	            }
	        });
		}
	}

	// 好货推荐slider
	// ------------------
	function create_goods_slider() {
		if($('.goods-rec-slider-wrap').length) {
			var goods_slider = Swiper('.goods-rec-slider-wrap',{
	            loop: false,
	            slidesPerView : 3,
	            slidesPerGroup : 3,
	            pagination : '.goods-pagination',
	            onImagesReady: function() {
	            }
	        });
		}
	}

	// 模拟页面滚动效果
	// ------------------
	function create_scroll() {
		var iscroller = new IScroll('.red-mobile-page');
	}

	// 回到顶部按钮
	// ------------------
	function back_to_top() {
		$(document).scroll(function(){
			var scrollTop = $(window).scrollTop();
			var wHeight   = $(window).height();
			var back_top  = $(".shangou_backtop");

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
	        var len  = strs.length;
	        
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
		create_header      : create_header,
		create_footer      : create_footer,
		create_list        : create_list,
		create_tab         : create_tab,
		back_to_top        : back_to_top,
		get_price_info     : get_price_info,
		get_stock_info     : get_stock_info,
		layzr_init         : layzr_init,
		create_top_slider  : create_top_slider,
		create_goods_slider: create_goods_slider,
		create_scroll      : create_scroll
	};
});