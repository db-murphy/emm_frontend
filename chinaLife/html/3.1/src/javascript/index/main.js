/*!
 * =================================================
 * name: 首页main文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 首页程序入口文件
 * =================================================
 */

define(function (require, exports, module){
	var controller = require('index/controller');

	// 页面布局调整
	// ------------------
	controller.page_view_update();
	
	// 模拟页面滚动效果
	// ------------------
	controller.create_scroll();

	// 创建头部
	// ------------------
	controller.create_header();

	// 创建尾部
	// ------------------
	controller.create_footer();

	// 获取价格信息
	// ------------------
	controller.get_price_info();

	// 获取库存信息
	// ------------------
	controller.get_stock_info();

	// 构造顶部滑动tab
	// ------------------
	controller.create_tab();

	// 构造顶部轮播图
	// ------------------
	controller.create_top_slider();

	// 构造好货推荐轮播图
	// ------------------
	controller.create_goods_slider();

	// 回到顶部按钮
	// ------------------
	controller.back_to_top();

	// 图片懒加载
	// ------------------
	controller.lazy_load();

	// 重写所有a连接跳转行为
	// ------------------
	controller.rebuild_a_jump();
});