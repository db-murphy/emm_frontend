/*!
 * =================================================
 * name: 闪购首页 controller文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 负责首页逻辑代码编写
 * =================================================
 */

define(function (require, exports, module){
	// 模块依赖
	// ------------------
	var model        = require('index/model');
	var view         = require('index/view');
	var tool         = require('common/tool');
	var common_model = require('common/model');
	var common_view  = require('common/view');
	var variable     = require('common/variable');

	/**
	 * --------------------------
	 * @ go_top_btn  回到顶部按钮
	 * @ items       活动元素dom
	 * @ fisrt_item  第一个活动dom
	 * @ view_scroll 滚动模块
	 * @ iscroller   iscroll对象
	 * --------------------------
	 */
	var go_top_btn   = $('#go-top');
	var items        = $('.red-advertisements-item');
	var fisrt_item   = items.eq(0);
	var view_scroll  = $('#view-scroller');
	var iscroller    = null;

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

		// 旋转设备时重新计算滚动区域尺寸
		$(window).bind('orientationchange', function() {
			iscroller._resize();
		});
	}
	
	// 创建头部
	// ------------------
	function create_header() {
		if(variable.config.debug) {
			common_view.render_header(variable.header_html);
			iscroller._resize();
		}else{
			common_model.get_header_html(function(data) {
				common_view.render_header(data);
				iscroller._resize();
			});
		}
	};

	// 创建尾部
	// ------------------
	function create_footer() {
		if(variable.config.debug) {
			common_view.render_footer(variable.footer_html);
			iscroller._resize();
		}else{
			common_model.get_footer_html(function(data) {
				common_view.render_footer(data);
				iscroller._resize();
			});
		}
	};

	// 构造顶部滑动tab
	// ------------------
	function create_tab() {
		var this_swiper  = $('#red-nav');
		var navSwiper = new Swiper('.red-mobile-nav',{
			slidesPerView : 'auto',
			loop: false,
			preventClicks : false,
			onTap: function(swiper) {
				var click_slider = swiper.clickedSlide;
				var href = click_slider.getElementsByTagName('a')[0].getAttribute('_href');

				this_swiper.find('.swiper-slide').removeClass('active');
				$(click_slider).addClass('active');
				slide_to(swiper, click_slider, this_swiper, 800);

				if(href) {
					setTimeout(function() {
						//window.location.href = href;
					}, 800);
				}
			}
		});
		var active_slider = $('.swiper-slide.active', this_swiper).get(0);

		slide_to(navSwiper, active_slider, this_swiper, 0);
	};

	// swiper slideTo
	// ------------------
	function slide_to(swiper, active_slider, swiper_box, time) {
		var swiper_width_half = parseInt(swiper_box.width() / 2, 10);
		var offset_left       = active_slider.offsetLeft;
		var max_translate     = swiper.maxTranslate();
		var min_translate     = swiper.minTranslate();
		var translate_to      = swiper_width_half - offset_left - active_slider.offsetWidth / 2;

		if(translate_to > min_translate) {
			translate_to = min_translate;
		}else if(translate_to < max_translate) {
			translate_to = max_translate;
		}
		swiper.setWrapperTransition(time);
		swiper.setWrapperTranslate(translate_to);
	}

	// 首页轮播效果
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
		 * ---------------------------------------
		 * @ item_height       单个活动区域高度
		 * @ wrapper_height    滚动wraper高度
		 * @ first_item_top    第一个活动相对纵坐标
		 * @ item_count_inview 滑过可视区的活动个数
		 * @ count_text        计数器dom
		 * @ back_text         回到顶部文字dom
		 * @ count_now         当前是第几个活动
		 * @ scroll_view_top   滚动wraper相对纵坐标
		 * ---------------------------------------
		 */
		var count_text     = $('#count');
		var count_now      = $('#now');
		var back_text      = $('#back');
		var total_text     = $('#total');
		var item_count_inview, wrapper_height, item_height, first_item_top, scroll_view_top;

		// 填充活动总数
		total_text.text(items.length);

		// 回到顶部
		go_top_btn.tap(function() {
			iscroller.scrollTo(0, 0);
			go_top_btn.addClass('none');
		});

		// 滚动之前(手指已经与屏幕接触)
		iscroller.on('beforeScrollStart', function() {
			wrapper_height  = iscroller.wrapperHeight;
			item_height     = fisrt_item.height();
			first_item_top  = fisrt_item.offset().top;
			scroll_view_top = view_scroll.offset().top;
			first_item_top  = first_item_top - scroll_view_top;
		});

		// 滚动时
		iscroller.on('scroll', function() {
			item_count_inview = Math.floor((wrapper_height + Math.abs(this.y) - first_item_top) / item_height);

			if(item_count_inview > items.length) {
				item_count_inview = items.length;
			}

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

			if(item_count_inview > items.length) {
				item_count_inview = items.length;
			}

			if(item_count_inview >= 1) {
				go_top_btn.removeClass('none');
			}else{
				go_top_btn.addClass('none');
			}

			// 隐藏计数器
			count_text.addClass('none');
			back_text.removeClass('none');
		});

		// scroll没有移动
		iscroller.on('scrollCancel', function() {
			// 隐藏计数器
			count_text.addClass('none');
			back_text.removeClass('none');
		});
	}

	// 获取价格信息
	// ------------------
	function get_price_info() {
		if(variable.config.debug) {
			return;
		}
		var goods_rec_wrapper = $('#goods-rec-wrapper');
		var skuidsv = goods_rec_wrapper.attr('data-skus');

		if(skuidsv != "" && skuidsv != null) {
	        var strs = skuidsv.split(",");
	        var len  = strs.length;
	        var requestStrs = "";
	        
	        for(var index = 0 ; index < len; index++) {
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
		if(variable.config.debug) {
			return;
		}
		var goods_rec_wrapper = $('#goods-rec-wrapper');
		var skuidsv = goods_rec_wrapper.attr('data-skus');

		if(skuidsv != "" && skuidsv != null){
			model.get_stock_data({"skuids": skuidsv}, function(data) {
				view.render_stock(data);
			});
	   }
	}

	// 懒加载
	// ------------------
	function lazy_load() {
		tool.lazyload.init({
			iscroller: iscroller,
			load_sucess: function(img) {
				var item        = $(img).closest('.red-advertisements-item');
				var item_detail = item.find('.advertisement-detail');
				var attention   = item.find('.attention-msg');
				var logo_img    = item.find('.commercial-logo img');
				var logo_url    = logo_img.attr('data-logo-layzr');

				// 加载logo图片
				if(logo_url) {
					var Img = new Image();

					Img.onload = function() {
						logo_img.addClass('fadeIn');
						logo_img.attr('src', logo_url);
					}

					Img.src = logo_url;
				}

				img.classList.add('fadeIn');
				if(item_detail.length) {
					item_detail.removeClass('opy0');
				}
				
				if(attention.length) {
					attention.removeClass('opy0');
				}
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
		create_scroll      : create_scroll,
		lazy_load          : lazy_load
	};
});