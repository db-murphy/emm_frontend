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
	var variable     = require('common/variable');
	var iscroller    = null;

	// 模拟页面滚动效果
	// ------------------
	function create_scroll() {
		iscroller = new IScroll('.scroll-view', {
			click: true,
			probeType: 3
		});

		iscroller.on('beforeScrollStart', function() {
			iscroller._resize();
		});

		iscroller.on('scrollEnd', function() {
			$('#go-top .count').addClass('none');
			$('#go-top .back').removeClass('none');
		});

		iscroller.on('transition', function() {
			console.log(this.y);
			$('#go-top .count').removeClass('none');
			$('#go-top .back').addClass('none');
		});
	}
	
	// 创建头部
	// ------------------
	function create_header() {
		common_model.get_header_html(function(data) {
			common_view.render_header(data);
		});
		common_view.render_header(variable.header_html);
		
	};

	// 创建尾部
	// ------------------
	function create_footer() {
		common_model.get_footer_html(function(data) {
			common_view.render_footer(data);
		});
		common_view.render_footer(variable.footer_html);
	};

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

	// 回到顶部按钮
	// ------------------
	function back_to_top() {
		$('#go-top').click(function() {
			iscroller.scrollTo(0, 0);
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
		create_tab         : create_tab,
		back_to_top        : back_to_top,
		get_price_info     : get_price_info,
		get_stock_info     : get_stock_info,
		create_top_slider  : create_top_slider,
		create_goods_slider: create_goods_slider,
		create_scroll      : create_scroll
	};
});