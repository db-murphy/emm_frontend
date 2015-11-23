/*!
 * =================================================
 * name: 首页view
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 负责首页数据渲染
 * =================================================
 */

define(function (require,exports,module){
	// 处理价格信息
	// ---------------------
	function render_price(data) {
		for(var i = 0; i < data.length; i++){
	        var jdPrice = "";
	        var oldPrice = "";

	        if(data[i].p > 0) {
	            jdPrice = formatPrice(data[i].p);
	            oldPrice = formatPrice(data[i].m);
	        } else {
	            jdPrice = "暂无价格";
	        }
	        
	        var value = data[i].id.split('_');

	        if(value.length == 1) {
	            var tempSku = value[0];
	            var keyItem = "goodItem_" + tempSku;
	            var goodItem = $("#goods-rec-wrapper li[data-goods-id='"+keyItem+"']");
	            
	            if(jdPrice == "暂无价格"){
	                for(var index=0; index < goodItem.length; index++){
	                	// 已抢光
	                	$('.goods-img', goodItem.eq(index)).addClass('dry-up');

	                	// 已下架
	                	$('.goods-price', goodItem.eq(index)).html('<p class="under-carriage">已下架</p>');
	                }
	            }else{
	                for(var index=0; index < goodItem.length; index++){
	                	$('.new-price-num', goodItem.eq(index)).text(jdPrice);
	                	$('.old-price-num', goodItem.eq(index)).text(oldPrice);
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

	function render_stock(data) {
		if(data) {
            for(var key in data) {
                if(key && key=="stockSoldOutList") {
                    if(data[key] && data[key].length > 0) {
                        var list = data[key];
                        for(var i=0, t=list.length; i<t; i++) {
                            var ss = list[i];
                            var keyItem = "goodItem_" + ss;
                            var goodItem = $("#goods-rec-wrapper li[data-goods-id='"+keyItem+"']");

                            for(var index=0; index<goodItem.length; index++){
                                // 已抢光
	                			$('.goods-img', goodItem.eq(index)).addClass('dry-up');
                            }
                        }
                    }
                }
            }
        }
	}

	module.exports = {
		render_price: render_price,
		render_stock: render_stock
	};
});