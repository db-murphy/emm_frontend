/*!
 * =================================================
 * name: 商品页view
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/24
 * description: 负责商品页数据渲染
 * =================================================
 */

define(function (require,exports,module){
	// 渲染优惠券状态信息
	// ---------------------
	function render_coupons_status(data) {
		for(var i = 0; i < data.length; i++) {
            var couponKey = "coupon_" + data[i].batchId;
            var couponDiv = $('#red-coupon a[data-coupon-id="' + couponKey + '"]');
            
            if(couponDiv.length > 0) {
                var takeRule = couponDiv.attr("data-takerule");

                if(takeRule == 4) {
                    if(data[i].createTime == data[i].now) {
                        if(!couponDiv.hasClass("timeout")) {
                            couponDiv.addClass("timeout");
                            couponDiv.attr("href", "javascript:;");
                        }
                    }
                } else {
                    if(!couponDiv.hasClass("timeout")) {
                        couponDiv.addClass("timeout");
                        couponDiv.attr("href", "javascript:;");
                    }
                }
            }
        }
	}

	// 渲染价格信息
	// ---------------------
	function render_price(data) {
		var jdPrice;
        var oldPrice;
        var tempSale;

		for(var i = 0; i < data.length; i++){
	        jdPrice  = "";
	        oldPrice = "";
	        tempSale = "";

	        if(data[i].p > 0){
	            jdPrice  = formatPrice("&yen;"+data[i].p);
	            oldPrice = formatPrice("&yen;"+data[i].m);
	            tempSale = accDiv(data[i].p, data[i].m) + "折";
	        }else{
	            jdPrice = "暂无价格";
	        }

	        var value = data[i].id.split('_');

	        if(value.length == 1){
	            var tempSku  = value[0];
	            var keyItem  = "goodItem_" + tempSku;
	            var goodItem = $("a[data-goods-id='"+keyItem+"']");
	            
	            if(jdPrice == "暂无价格"){
	                goodItem.remove();
	            }else{
	            	$('.new-price-number', goodItem).html(jdPrice);
	            	$('.old-price-number', goodItem).html(oldPrice);

	                // 如果有折扣
	                if(tempSale !="" && tempSale != undefined && null != tempSale){
                        var isShow = checkDiscount(tempSale);

                        if(isShow) {
                        	$('.discount', goodItem).text(tempSale);
                        }else{
                        	$('.discount', goodItem).remove();
                        }
	                }
	            }
	        }
	    }
	}

	function formatPrice(price){
	    var arr = price.split(".");

	    if(arr.length == 2){
	        if(arr[1] == "00"){
	            return arr[0];
	        }else if(arr[1].indexOf("0") == arr[1].length-1){
	            return price.substring(0,price.length -1);
	        }else{
	            return price;
	        }
	    }else{
	        return price;
	    }
	}

	//获取字符串中的数字及小数点
	function checkDiscount(text){
	    try{
	        var value = text.replace(/[^0-9\.]/ig,"");
	        if(value && value>0 && value<9.9){
	            return true;
	        }else{
	            return false;
	        }
	    } catch (e){
	        return true;
	    }
	}

	function accDiv(arg1, arg2) {
	    var discount = new Number(arg1) / new Number(arg2);
	    var th3 = window.parseInt((discount * 1000)) % 10;
	    if (th3 > 0) {
	        if(discount+0.01<1) {
	            discount += 0.01;
	        }
	        
	    }

	    var _discount = discount >= 1 ? 1 : (discount * 10 + "").substring(0, 3);
	    _discount=_discount+"";
	    var _html;
	    if (_discount.length == 1) {
	        _html = _discount + ".0";
	    } else {
	        _html = _discount + "";
	    }

	    if (arg1 == arg2) {
	        _html = "10.0";
	    }

	    return _html;
	}

	// 渲染库存信息
    // ------------------
    function render_stock(data) {
    	// 是否显示有货
    	var stockFilterFlag = $("#filter-box .has-goods-btn").hasClass("active");

    	for(var key in data) {
            if(key && key=="stockSoldOutList") {
            	// 库存为0 抢光
                if(data[key] && data[key].length > 0) {
                    var list = data[key];

                    for(var i = 0, t = list.length; i < t; i++) {
                        var ss = list[i];
                        var keyItem = "goodItem_" + ss;
                        var goodItem = $("#goods-list a[data-goods-id='"+keyItem+"']");

                        if(stockFilterFlag) {
                        	// 如果只显示有货列表，那么直接把没货的商品remove
                            goodItem.remove();
                        }else{
                        	// 否则如果此商品没货，给它打一个已抢光标签
                        	$('.goods-img', goodItem).addClass('dry-up');
                        }
                    }
                }
            }else if(key && key=="stockOnlyOne") {
            	// 仅剩一件的商品
                waring_stock(data, 1)
            }else if(key && key=="stockOnlyTwo") {
            	// 仅剩两件
            	waring_stock(data, 2)
            }else if(key && key=="stockOnlyThree") {
            	// 仅剩三件
            	waring_stock(data, 3)
            }else{
            	return;
            }
        }
    }

    function waring_stock(data, count) {
    	if(data[key] && data[key].length > 0) {
            var list = data[key];

            for(var i = 0, t = list.length; i < t; i++) {
                var ss = list[i];
                var keyItem = "goodItem_" + ss;
                var goodItem = $("#goods-list a[data-goods-id='"+keyItem+"']");

                $('.goods-waring', goodItem).removeClass('none');
                $('.waring-number', goodItem).text(count);
            }
        }
    }

	module.exports = {
		render_coupons_status: render_coupons_status,
		render_price         : render_price,
		render_stock         : render_stock
	};
});