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

	var go_top_btn   = $('#go-top');
	var items        = $('.red-advertisements-item');
	var fisrt_item   = items.eq(0);
	var view_scroll  = $('#view-scroller');

	// 模拟页面滚动效果
	// ------------------
	function create_scroll() {
		iscroller = new IScroll('.scroll-view', {
			click: true,
			probeType: 3
		});

		// 每次滚动前重新计算滚动区域尺寸
		iscroller.on('beforeScrollStart', function() {
			iscroller._resize();
		});
	}
	
	// 创建头部
	// ------------------
	function create_header() {
		common_model.get_header_html(function(data) {
			common_view.render_header(data);
		});
		common_view.render_header(variable.header_html);
		iscroller._resize();
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
		/**
		 * @item_height       单个活动区域高度
		 * @wrapper_height    滚动wraper高度
		 * @first_item_top    第一个活动相对纵坐标
		 * @item_count_inview 滑过可视区的活动个数
		 * @count_text        计数器dom
		 * @back_text         回到顶部文字dom
		 * @count_now         当前是第几个活动
		 * @scroll_view_top   滚动wraper相对纵坐标
		 */
		var count_text     = $('#go-top .count');
		var count_now      = $('.now', count_now);
		var back_text      = $('#go-top .back');
		var item_count_inview, wrapper_height, item_height, first_item_top, scroll_view_top;

		// 回到顶部
		go_top_btn.tap(function() {
			iscroller.scrollTo(0, 0);
			go_top_btn.addClass('none');
		});

		// 滚动之前(手指已经与屏幕接触)
		iscroller.on('beforeScrollStart', function() {
			wrapper_height = iscroller.wrapperHeight;
			item_height    = fisrt_item.height();
			first_item_top = fisrt_item.offset().top;
			scroll_view_top = view_scroll.offset().top;
			first_item_top = first_item_top - scroll_view_top;
		});

		// 滚动时
		iscroller.on('scroll', function() {
			item_count_inview = Math.floor((wrapper_height + Math.abs(this.y) - first_item_top) / item_height);

			if(item_count_inview >= 1) {
				count_now.text(item_count_inview);
				go_top_btn.removeClass('none');
			}else{
				go_top_btn.addClass('none');
			}

			// 显示计数器
			count_text.removeClass('none');
			back_text.addClass('none');

		});

		// 滚动停止时
		iscroller.on('scrollEnd', function() {
			item_count_inview = Math.floor((wrapper_height + Math.abs(this.y) - first_item_top) / item_height);

			if(item_count_inview >= 1) {
				go_top_btn.removeClass('none');
			}else{
				go_top_btn.addClass('none');
			}

			// 隐藏计数器
			count_text.addClass('none');
			back_text.removeClass('none');
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