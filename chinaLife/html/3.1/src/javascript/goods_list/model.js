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
        var vsValue      = body_dom.attr('data-vs');

        $.ajax({
            type : "post",
            url : variable.api.coupons_url,
            data : {
                "popSpecVids": popSpecVidss,
                "vs"         : vsValue
            },
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
        var goods_list = $('.goods-list-data').last();
        var skuids     = goods_list.attr('data-skuids');
        var skuidsv    = goods_list.attr('data-skuidsv');

        if(skuids != "" && skuids != null) {
            $.ajax({
                url: variable.api.detail_price_url,
                data: {
                    'skuids': skuidsv,
                    'type'  : 1,
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
        var goods_list = $('.goods-list-data').last();
        var skuidsv = goods_list.attr('data-skuidsv');

        if(skuidsv != "" && skuidsv != null){
            $.ajax({
                type : "post",
                url : variable.api.detail_stock_url,
                data : {
                    "skuids": skuidsv
                },
                dataType: "json",
                success:function(data) {
                    if(data) {
                        callback && callback(data);
                    }
                }
            });
        }
    }

    // 发送筛选请求
    // ------------------
    function filter_confirm(callback) {
        var cateIdStr = getSelectedCateIdStr();

        $.ajax({
            type : "post",
            url : variable.api.filter_comfirm_url,
            data : {
                "cateIdStr" : cateIdStr,
                "sortFlag"  : body_dom.attr('data-sort-flag'),
                "vs"        : body_dom.attr('data-vs'),
                "actId"     : body_dom.attr('data-actid')
            },
            dataType: "html",
            success:function(data){
                if(data) {
                    callback && callback(data);
                }
            }
        });
    }

    function getSelectedCateIdStr() {
        var cateIdStr ="";
        var cateIdArray = [];

        $("#type-group .selected").each(function() {
            cateIdStr += "," + $(this).attr("data-type-id");
        });
        if(cateIdStr == "") {
            return cateIdStr;
        }
        cateIdStr = cateIdStr.substring(1, cateIdStr.length);
        cateIdArray = cateIdStr.split(",");
        var length = cateIdArray.length;

        var cateId = "";
        for(var i=0; i<length; i++) {
            cateId += "," + cateIdArray[i].split("_")[1];
        }
        return cateId.substring(1, cateId.length);
    }

    // 商品排序
    // ------------------
    function sort_goods(callback) {
        var cateIdStr = getSelectedCateIdStr();

        $.ajax({
            type : "post",
            url : variable.api.filter_comfirm_url,
            data : {
                "sortFlag"  : body_dom.attr('data-sort-flag'),
                "stockFlag" : body_dom.attr('data-stock-flag'),
                "vs"        : body_dom.attr('data-vs'),
                "actId"     : body_dom.attr('data-actid'),
                "cateIdStr" : cateIdStr
            },
            dataType: "html",
            success:function(data){
                if(data) {
                    callback && callback(data);
                }
            }
        });
    }

	// 翻页查询
    // ------------------
	function get_more(callback) {
		var page_now   = parseInt(body_dom.attr('data-page'), 10) + 1;
		var page_total = parseInt(body_dom.attr('data-total-page'), 10);

		if(page_now > page_total){
            return;
        }

		$.ajax({
            type : "post",
            url : variable.api.filter_comfirm_url,
            data : {
                "stockFlag" : body_dom.attr('data-stock-flag'),
                "sort" : body_dom.attr('data-sort'),
                "actId" : body_dom.attr('data-actid'),
                "page" : page_now,
                "vs" : body_dom.attr('data-vs'),
                "preview" : body_dom.attr('data-preview')
            },
            dataType: "html",
            success:function(data){
				if(data) {
					body_dom.attr('data-page', page_now);
					callback && callback(data);
				}
            }
        });
	}

	module.exports = {
		get_coupons_dom: get_coupons_dom,
        getCouponInfo  : getCouponInfo,
        get_price_info : get_price_info,
        get_stock_info : get_stock_info,
        filter_confirm : filter_confirm,
        sort_goods     : sort_goods,
		get_more       : get_more
	};
});
