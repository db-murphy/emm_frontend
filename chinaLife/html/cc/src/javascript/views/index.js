define(function (require,exports,module){
	function render_list(data) {
		console.log(data);
	}

	// 处理价格信息
	// ---------------------
	function render_price(data) {
		for(var i = 0; i < data.length; i++){
	        var jdPrice = "";
	        var oldPrice="";
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
	            
	            var jdPriceDoms = $("span[id='jd_price_" +tempSku+"']");
	            var oldPriceDoms = $("span[id='old_price_" +tempSku+"']");
	            
	            var goodItem = $("div[id='"+keyItem+"']");
	            
	            if(jdPrice == "暂无价格"){
	                for(var index=0;index<goodItem.length;index++){
	                    $(goodItem[index]).append("<span class='layer yahei'>已抢光<br><span class='arial en'>SOLDOUT</span></span>");
	                }
	                for(var index=0;index<jdPriceDoms.length;index++){
	                    $(jdPriceDoms[index]).text("已下架");
	                }
	            }else{
	                for(var index=0;index<jdPriceDoms.length;index++){
	                    $(jdPriceDoms[index]).html("<span class='rmb_ico'>¥</span><span>"+jdPrice+"</span>");
	                    $(oldPriceDoms[index]).html("<span class='rmb_ico'>¥</span><span>"+oldPrice+"</span>");
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
                            var goodItem = $("div[id='"+keyItem+"']");
                            for(var index=0;index<goodItem.length;index++){
                                $(goodItem[index]).append("<span class='layer yahei'>已抢光<br><span class='arial en'>SOLDOUT</span></span>");
                            }
                        }
                    }
                }
            }
        }
	}

	module.exports = {
		render_list: render_list,
		render_price: render_price,
		render_stock: render_stock
	};
});