/*!
 * =================================================
 * name: 商品列表页model
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/24
 * description: 负责首页数据请求
 * =================================================
 */

define(function (require,exports,module){
	var variable = require('common/variable');
    var body_dom = $('body');

	// 获取优惠券结构
	// ------------------
    function get_coupons_dom(callback) {
        var popSpecVidss = body_dom.attr('data-popspecvidss');
        var vsValue = body_dom.attr('data-vs');

        $.ajax({ 
            type : "post",
            url : variable.api.coupons_url,
            data : {"popSpecVids":popSpecVidss, "vs":vsValue},
            dataType: "html",
            beforeSend: function() {              
            },
            success:function(data){
                if(data) {
                    callback && callback(data);
                }
            }
        });
    }

    // 获取优惠券状态
    // ------------------
	function getCouponInfo(callback) {
        var sid = body_dom.attr('data-sid');

        if($("#red-coupon").length > 0) {
            if(sid != null && sid !="") {
                $.ajax({
                    type : "post",
                    url : variable.api.coupons_status_url,
                    data : {
                        "sid" : sid
                    },
                    dataType : "json",
                    success : function(data) {
                        if(data && data.length>0) {
                            callback && callback(data);
                        }
                    }
                });
            }
        }
    }

    // 获取价格信息
    // ------------------
    function get_price_info(callback) {
        var goods_list = $('#goods-list');
        var skuids = goods_list.attr('data-skuids');
        var skuidsv = goods_list.attr('data-skuidsv');

        if(skuids != "" && skuids != null) {
            $.ajax({
                url: variable.api.detail_price_url,
                data: {
                    'skuids': skuidsv, 
                    'type':1, 
                    'origin': 2
                },
                method:'get',
                dataType:'jsonp',
                jsonp: 'callback',
                success: function(data) {
                    if(data && data.length) {
                        callback && callback(data);
                    }
                }
            });
        }
    }

    // 获取库存信息
    // ------------------
    function get_stock_info(callback) {
        var skuidsv = goods_list.attr('data-skuidsv');

        if(skuidsv != "" && skuidsv != null){
            $.ajax({
                type : "post",
                url : variable.api.detail_stock_url,
                data : {"skuids": skuidsv},
                dataType: "json",
                success:function(data) {
                    if(data) {
                        callback && callback(data);
                    }
                }
            });
        }
    }

	module.exports = {
		get_coupons_dom: get_coupons_dom,
        getCouponInfo  : getCouponInfo,
        get_price_info : get_price_info,
        get_stock_info : get_stock_info
	};
});