define(function (require,exports,module){
	var variable = require('common/variable');

	// 请求头部结构
	// ---------------------------
	function get_header_html(callback) {
		var body_dom = $('body');
		var vs = body_dom.attr("vs");
		
		if(null == vs || undefined == vs || "jdapp" == vs || "weixin" == vs){
			return;
		}

		get_header_footer_html(variable.api.head_url, callback);
	};

	// 请求尾部结构
	// ---------------------------
	function get_footer_html(callback) {
		var body_dom = $('body');
		var vs = body_dom.attr("vs");

		if(null == vs || undefined == vs || "jdapp" == vs || "weixin" == vs){
			return;
		}

		get_header_footer_html(variable.api.footer_url, callback);
	};

	function get_header_footer_html(url, callback) {
		var param = {};
		var body_dom = $('body');
		var vs = body_dom.attr("vs");
		var sid = body_dom.attr("sid");
		var title = body_dom.attr("title");
		var link = body_dom.attr("link");

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