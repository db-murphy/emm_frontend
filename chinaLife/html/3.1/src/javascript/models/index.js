/*!
 * =================================================
 * name: 首页model
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 负责首页数据请求
 * =================================================
 */

define(function (require,exports,module){
	var variable = require('common/variable');

	function get_list(callback) {
		callback && callback('我是数据');
	}

	// 获取价格数据
	// ------------------
	function get_price_data(arg, callback) {
		$.ajax({
            url: variable.api.price_info_url,
            data : arg,
            method:'get',
            dataType:'jsonp',
            jsonp: 'callback',
            success: function(data) {
            	callback && callback(data);
            }
        });
	};

	// 获取库存数据
	// ------------------
	function get_stock_data(arg, callback) {
		$.ajax({
            type : "post",
            url : variable.api.stock_info_url,
            data : arg,
            dataType: "json",
            success:function(data) {
            	callback && callback(data);
            }
        });
	}

	module.exports = {
		get_list: get_list,
		get_price_data: get_price_data,
		get_stock_data: get_stock_data
	};
});