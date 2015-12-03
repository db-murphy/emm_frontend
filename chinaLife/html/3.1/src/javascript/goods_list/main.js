/*!
 * =================================================
 * name: 商品列表 main文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/18
 * description: 列表页程序入口文件
 * =================================================
 */

define(function (require, exports, module){
	var controller = require('goods_list/controller');

	// 模拟页面滚动效果
	// ------------------
	controller.create_scroll();

	// 创建公共头尾
	// ------------------
	controller.loadJdHeadAndFooter();

	// 筛选栏吸顶效果
	controller.filter_fix();

	// 回到顶部按钮
	// ------------------
	controller.back_to_top();

	// 图片懒加载
	// ------------------
	controller.lazy_load();

	// 商品列表翻页
	// ------------------
	controller.get_more_page();

	// 筛选类型选择
	// ------------------
	controller.filter_type();

	// 筛选模态框逻辑
	// ------------------
	controller.filter_modal_event();

	// 倒计时
	// ------------------
	controller.count_down();

	// 获取优惠券
	// ------------------
	controller.get_coupons();

	// 获取价格信息
	// ------------------
	controller.get_price_info();

	// 获取库存信息
	// ------------------
	controller.get_stock_info();

});
