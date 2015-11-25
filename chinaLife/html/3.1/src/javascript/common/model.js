/*!
 * =================================================
 * name: 公共model
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 负责公共数据请求, 例如头部请求, 脚部请求
 * =================================================
 */

define(function (require,exports,module){
	var variable = require('common/variable');
	
	var body_dom = $('body');
	var vs = body_dom.attr("data-vs");
	var not_load_heade = body_dom.attr('data-notload-header');

	// 请求头部结构
	// ---------------------------
	function get_header_html(callback) {
		if(not_load_heade || not_load_heade == 1) {
			return;
		}
		
		if(null == vs || undefined == vs || "jdapp" == vs || "weixin" == vs || '' == vs){
			var header     = $('#header');
			var scroll_top = header.height();

			$('#scroll-view').css('top', scroll_top + 'px');
			$(window).bind('orientationchange', function() {
				scroll_top = header.height();
				$('#scroll-view').css('top', scroll_top + 'px');
			});
			return;
		}

		get_header_footer_html(variable.api.head_url, callback);
	};

	// 请求尾部结构
	// ---------------------------
	function get_footer_html(callback) {
		if(not_load_heade || not_load_heade == 1) {
			return;
		}

		if(null == vs || undefined == vs || "jdapp" == vs || "weixin" == vs || '' == vs){
			return;
		}

		get_header_footer_html(variable.api.footer_url, callback);
	};

	function get_header_footer_html(url, callback) {
		var param = {};
		var vs = body_dom.attr("data-vs");
		var sid = body_dom.attr("data-sid");
		var title = body_dom.attr("data-title");
		var link = body_dom.attr("data-link");

		if(null != sid && sid.length>0){
			param.sid = sid;
		}
		if(null != title && title.length>0){
			param.title = title;
		}
		if(null != link && link.length>0){
			param.link = link;
		}

		$.ajax({
			"url" : url,
			"type" : "post",
			"data" : param,
			"success" : function(data){
				callback && callback(data);
			}
		});
	};

	module.exports = {
		get_header_html: get_header_html,
		get_footer_html: get_footer_html
	};
});