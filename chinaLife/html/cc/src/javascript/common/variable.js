define(function (require,exports,module){
	// 接口地址
	// ------------------------
	var api = {
		head_url: "//m.jd.com/app/header.action",
		footer_url: "//m.jd.com/app/footer.action",
		price_info_url: "http://pm.3.cn/prices/mgets",
		stock_info_url: "/sg4jdappjson/checkStockBySkuids.html"
	};

	module.exports = {
		api: api
	};
});