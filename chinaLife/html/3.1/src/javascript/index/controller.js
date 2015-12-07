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
	var sec_adver    = $('.red-advertisements');
	var reload       = true;
	var lazy;

	// 页面布局调整
	// ------------------
	function page_view_update() {
		var prev_sec = 0;
		var _sec_adver = sec_adver;

		while(_sec_adver.prev('section').length) {
			prev_sec++;
			_sec_adver = _sec_adver.prev('section');
		}

		if(prev_sec == 1) {
			sec_adver.prev('section').removeClass('pb20').addClass('pb5');
		}
	}

	// 模拟页面滚动效果
	// ------------------
	function create_scroll() {
		iscroller = new IScroll('.scroll-view', {
			click: true,
			//mouseWheel: true,
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

	// 创建公共头尾
	// ------------------
	function loadJdHeadAndFooter() {
		tool.loadJdHeadAndFooter(iscroller);
	}

	// 构造顶部滑动tab
	// ------------------
	function create_tab() {
		var this_swiper  = $('#red-nav');
		var navSwiper = new Swiper('.red-mobile-nav',{
			slidesPerView : 'auto',
			loop: false,
			preventClicks : false
		});
		var active_slider = $('.swiper-slide.active', this_swiper).get(0);

		slide_to(navSwiper, active_slider, this_swiper, 600);
	};

	// swiper slideTo
	// ------------------
	function slide_to(swiper, active_slider, swiper_box, time) {
		var li_fix            = $('#red-nav .nav-fix-item');
		var swiper_width_half = parseInt(swiper_box.width() / 2, 10);
		var offset_left       = active_slider.offsetLeft + li_fix.width();
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
		var slider_config = {};

		if($('.red-slider-wraper li').length > 1) {
			slider_config = {
	            loop: true,
	            autoplay: 5000,
	            autoplayDisableOnInteraction: false,
	            pagination : '.red-slider-pagination',
	            onImagesReady: function() {
	            }
	        };
		}

		if($('.red-slider-wraper').length) {
			var sliderSwiper = new Swiper('.red-slider-wraper', slider_config);
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
			setTimeout(function() {
				go_top_btn.addClass('none');
			}, 500);
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

			if(item_count_inview >= 8) {
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

			if(item_count_inview >= 8) {
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
		lazy = tool.lazyload.init({
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
						logo_img.attr('src', logo_url);
					}

					Img.onerror = function() {
						logo_img.attr('src', assist.error_img_url.ader_logo_index());
					}

					Img.src = logo_url;
				}
			}
		});
	}

	// 重写所有a连接跳转行为
	// ------------------
	function rebuild_a_jump() {
		/*var body_dom = $('body');
		var vs       = body_dom.attr("data-vs");*/

		if(!window.sessionStorage) {
			return;
		}

		if(sessionStorage.getItem('index_y')) {
			iscroller.scrollTo(0, parseInt(sessionStorage.getItem('index_y'), 10));
			lazy.refreshImg();
		};

		$('#red-nav a').click(function() {
			sessionStorage.removeItem('index_y');
		});

		// 只是滚动区域区域
		var rebuilda = $('#scroll-view a[href]');

		window.onbeforeunload = function(ev) {
            if(reload) {
                sessionStorage.removeItem('index_y');
                // 如果是刷新页面，则清楚记录的偏移值
            }else{
                reload = true;
                // 则记录偏移值
            }
        };

		$.each(rebuilda, function(i, value) {
			if($(value).attr('href') == '') {
				return;
			}

			$(value).click(function() {
				reload = false;
				window.sessionStorage.setItem('index_y', iscroller.y);
			});
		});
	}

	// 对外接口
	// ------------------
	module.exports = {
		create_tab         : create_tab,
		back_to_top        : back_to_top,
		get_price_info     : get_price_info,
		get_stock_info     : get_stock_info,
		create_top_slider  : create_top_slider,
		create_goods_slider: create_goods_slider,
		create_scroll      : create_scroll,
		lazy_load          : lazy_load,
		page_view_update   : page_view_update,
		rebuild_a_jump     : rebuild_a_jump,
		loadJdHeadAndFooter: loadJdHeadAndFooter
	};
});
