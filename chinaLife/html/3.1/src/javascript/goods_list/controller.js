/*!
 * =================================================
 * name: 商品列表 controller文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/18
 * =================================================
 */

define(function (require, exports, module){
	var common_model = require('common/model');
	var common_view  = require('common/view');
	var variable     = require('common/variable');
	var tool         = require('common/tool');
	var goods_model  = require('goods_list/model');
	var goods_view   = require('goods_list/view');

	var iscroller    = null;
	var fix_top_hiden= $('#fix-top-hiden');
	var filter_box   = $('#filter-box');
	var view_scroll  = $('#view-scroller');
	var goods_list   = $('#goods-list');
	var goods_items  = $('#goods-list a');
	var go_top_btn   = $('#go-top');
	var filter_modal = $('#filter-modal');
	var filter_mask  = $('#filter-mask');
	var filter_btn   = $('.filter_btn');
	var has_gods_btn = $('.has-goods-btn');
	var price_sort   = $('.price-sort-btn');
	var red_coupon   = $('#red-coupon');
	var body_dom     = $('body');
	var fisrt_item   = goods_items.eq(0);

	// 模拟页面滚动效果
	// ------------------
	function create_scroll() {
		iscroller = new IScroll('#scroll-view', {
			click: true,
			probeType: 3,
			tap: true
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
			pos_filter();
			$('#btnJdkey').click(pos_filter);
		}else{
			common_model.get_header_html(function(data) {
				common_view.render_header(data);
				iscroller._resize();
				$('#btnJdkey').click(pos_filter);
			});
		}
	};

	// 定位隐藏筛选条纵坐标
	// ------------------
	function pos_filter() {
		var jd_nav = $('#jd-nav');
		var jd_nav_height = jd_nav.height();

		fix_top_hiden.css('top', jd_nav_height + 'px');
	}

	// 筛选栏吸顶效果
	// ------------------
	function filter_fix() {
		var filter_y;

		iscroller.on('beforeScrollStart', function() {
			filter_y = filter_box.offset().top - view_scroll.offset().top;
		});

		iscroller.on('scroll', function() {
			if(this.y + filter_y <= 0) {
				fix_top_hiden.removeClass('fix-top-hiden');
			}else{
				fix_top_hiden.addClass('fix-top-hiden');
			}
		});
	}

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

		// 商品总数
		total_text.text(goods_items.length);

		// 回到顶部
		go_top_btn.tap(function() {
			iscroller.scrollTo(0, 0);
			go_top_btn.addClass('none');
			fix_top_hiden.addClass('fix-top-hiden');
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

			if(item_count_inview > Math.ceil(goods_items.length / 2)) {
				item_count_inview = goods_items.length;
			}

			if(item_count_inview >= 2) {
				if(item_count_inview * 2 > goods_items.length) {
					count_now.text(goods_items.length);
				}else{
					count_now.text(item_count_inview * 2);
				}
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

			if(item_count_inview > Math.ceil(goods_items.length / 2)) {
				item_count_inview = goods_items.length;
			}

			if(item_count_inview >= 2) {
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

	// 懒加载
	// ------------------
	function lazy_load() {
		tool.lazyload.init({
			iscroller: iscroller,
			load_sucess: function(img) {
				img.classList.add('fadeIn');
			}
		});
	}

	// 商品列表翻页
	// ------------------
	function get_more_page() {
		var item_count_inview, wrapper_height, item_height, first_item_top, scroll_view_top;

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

			if(item_count_inview >= Math.ceil(goods_items.length / 2)) {
				
			}
		});
	}

	// 筛选类型选择
	// ------------------
	function filter_type() {
		var t_start = null;

		// 点击筛选按钮
		filter_btn.tap(function() {
			if (t_start == null){
		    	t_start = new Date().getTime();
		    }else{
		    	var t_end = new Date().getTime();
			    if(t_end - t_start < 300){
				    t_start = t_end;
				    return;
			    }else{
			    	t_start = t_end;
			    }
		    }
			filter_modal.addClass('filter-content-show');
			filter_mask.removeClass('none');
		});

		// 点击显示有货
		has_gods_btn.tap(function() {
			if (t_start == null){
		    	t_start = new Date().getTime();
		    }else{
		    	var t_end = new Date().getTime();
			    if(t_end - t_start < 300){
				    t_start = t_end;
				    return;
			    }else{
			    	t_start = t_end;
			    }
		    }

			var _this = $(this);

			if(_this.hasClass('active')) {
				body_dom.attr('data-stock-flag', '0');
				has_gods_btn.removeClass('active');
			}else{
				body_dom.attr('data-stock-flag', '1');
				has_gods_btn.addClass('active');
			}

			// 商品排序
			if(variable.config.debug) {
				return;
			}
			goods_model.sort_goods(function(data) {
				goods_list.html(data);
				get_price_info();
				get_stock_info();
				iscroller.scrollTo(0, 0);
				iscroller._resize();
			});
		});

		// 点击价格排序
		price_sort.tap(function() {
			if (t_start == null){
		    	t_start = new Date().getTime();
		    }else{
		    	var t_end = new Date().getTime();
			    if(t_end - t_start < 300){
				    t_start = t_end;
				    return;
			    }else{
			    	t_start = t_end;
			    }
		    }

		    var _this = $(this);

		    if(!_this.hasClass('sort-up') && !_this.hasClass('sort-down')) {
		    	// 升序
		    	body_dom.attr('data-sort-flag', '1');
		    	price_sort.addClass('sort-down');
		    }else if(_this.hasClass('sort-down')) {
		    	// 降序
		    	body_dom.attr('data-sort-flag', '2');
		    	price_sort.removeClass('sort-down');
		    	price_sort.addClass('sort-up');
		    }else if(_this.hasClass('sort-up')) {
		    	// 无序
		    	body_dom.attr('data-sort-flag', '0');
		    	price_sort.removeClass('sort-up');
		    }

		    // 商品排序
		    if(variable.config.debug) {
				return;
			}
			goods_model.sort_goods(function(data) {
				goods_list.html(data);
				get_price_info();
				get_stock_info();
				iscroller.scrollTo(0, 0);
				iscroller._resize();
			});
		});
	}

	// 筛选模态框逻辑
	// ------------------
	function filter_modal_event() {
		var modal_scroller = new IScroll('#filter-content-box', {
			click: true
		});

		// 旋转设备时重新计算滚动区域尺寸
		$(window).bind('orientationchange', function() {
			modal_scroller._resize();
		});

		// 取消筛选
		$('#filter-modal .btn-3d.fl').tap(function() {
			filter_modal.removeClass('filter-content-show');
			setTimeout(function() {
				filter_mask.addClass('none');
			}, 500);
		});

		// 确认筛选
		$('#filter-modal .btn-3d.fr').tap(function() {
			filter_modal.removeClass('filter-content-show');

			if(!$('#type-group li.all').hasClass('selected')) {
				filter_btn.addClass('active');
			}else{
				filter_btn.removeClass('active');
			}
			setTimeout(function() {
				filter_mask.addClass('none');
			}, 500);

			// 发送筛选请求
			if(variable.config.debug) {
				return;
			}
			goods_model.filter_confirm(function(data) {
				goods_list.html(data);
				get_price_info();
				get_stock_info();
				iscroller.scrollTo(0, 0);
				iscroller._resize();
			});
		});

		// 多选按钮点击事件
		$('#type-group').click(function(ev) {
			var target = $(ev.target);
			var li = target.closest('li');

			if(li.length && !li.hasClass('disable')) {
				if(li.hasClass('all')) {
					$('#type-group li:not(.all)').removeClass('selected').removeClass('disable');
					li.addClass('selected');
				}else{
					if(li.hasClass('selected')) {
						li.removeClass('selected');
						if(!$('#type-group li.selected').length) {
							$('#type-group li.all').addClass('selected');
						}
					}else{
						$('#type-group li.all').removeClass('selected');
						li.addClass('selected');
					}
				}

				if($('#type-group li.selected').length == 3) {
					$('#type-group li:not(.selected)').addClass('disable');
					$('#type-group li.all').removeClass('disable');
				}else{
					$('#type-group li.disable').removeClass('disable');
				}
			}
		});
	}

	// 倒计时
	// ------------------
	function count_down() {
		var count_down_obj = new tool.Countdown();

		count_down_obj.initCurrentPage();
	}

	// 获取优惠券
	// ------------------
	function get_coupons() {
		if(variable.config.debug) {
			return;
		}
		setTimeout(function() {
			// 获取优惠券状态
			goods_model.getCouponInfo(function(data) {
				goods_view.render_coupons_status(data);
			});
		}, 20000);

		setTimeout(function() {
			// 获取优惠券状态
			goods_model.getCouponInfo(function(data) {
				goods_view.render_coupons_status(data);
			});
		}, 40000);

		// 获取优惠券dom
		goods_model.get_coupons_dom(function(data) {
			// 插入优惠券dom
			red_coupon.html(data);

			// 获取优惠券状态
			goods_model.getCouponInfo(function(data) {
				goods_view.render_coupons_status(data);
			});
		});
	}

	// 获取价格信息
	// ------------------
	function get_price_info() {
		if(variable.config.debug) {
			return;
		}

		goods_model.get_price_info(function(data) {
			goods_view.render_price(data);
		});
	}

	// 获取库存信息
	// ------------------
	function get_stock_info() {
		if(variable.config.debug) {
			return;
		}

		goods_model.get_stock_info(function(data) {
			goods_view.render_stock(data);
		});
	}

	// 对外接口
	// ------------------
	module.exports = {
		create_scroll     : create_scroll,
		create_header     : create_header,
		create_footer     : create_footer,
		filter_fix        : filter_fix,
		back_to_top       : back_to_top,
		lazy_load         : lazy_load,
		get_more_page     : get_more_page,
		filter_type       : filter_type,
		filter_modal_event: filter_modal_event,
		count_down        : count_down,
		get_coupons       : get_coupons,
		get_price_info    : get_price_info,
		get_stock_info    : get_stock_info
	};
});