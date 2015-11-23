/*!
 * =================================================
 * name: 商品列表 main文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/18
 * description: 列表页程序入口文件
 * =================================================
 */

define(function (require, exports, module){
	var controller = require('controllers/goods_list');

	// 模拟页面滚动效果
	// ------------------
	controller.create_scroll();

	// 创建头部
	// ------------------
	controller.create_header();

	// 创建尾部
	// ------------------
	controller.create_footer();

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

	// 点击筛选弹出模态框
	// ------------------
	controller.show_filter_modal();

	// 模态框滚动
	// ------------------
	controller.scroll_modal();
});