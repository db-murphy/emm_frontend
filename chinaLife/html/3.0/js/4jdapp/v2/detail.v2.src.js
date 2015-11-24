
function priceInfo(){
    if(skuids != "" && skuids != null)
    {
        var strs= new Array();
        strs = skuidsv.split(",");
        var len = strs.length;
        
        var requestStrs = "";
        for(var index = 1 ; index <= len ; index++){
            
            requestStrs += "," + strs[index - 1];
            
            if(index % 50 == 0 || index == len){
                requestStrs += "," + strs[index - 1];
                var url = "//pm.3.cn/prices/mgets";
                var reqString = requestStrs.substring(1,requestStrs.length - 1);
                var arg = {'skuids' : reqString,'type':1, "origin":2};
                $.ajax({
                    url:'//pm.3.cn/prices/mgets?callback=callBackPriceService',
                    data : arg,
                    method:'get',
                    dataType:'jsonp'
                });
                
                requestStrs = "";
            }
        }
    
    
        
    }
}
function callBackPriceService(data){

    for(var i=0;i<data.length;i++){
     
        var jdPrice = "";
        var oldPrice="";
        var tempSale = "";
        if(data[i].p > 0)
        {
            jdPrice = formatPrice("&yen;"+data[i].p);
            oldPrice = formatPrice("&yen;"+data[i].m);
            tempSale = accDiv(data[i].p,data[i].m) + "折";
            
        }
        else
        {
            jdPrice = "暂无价格";
            
        }
        
        var value = data[i].id.split('_');
        if(value.length == 1)
        {
            var tempSku = value[0];
            var keyItem = "goodItem_" + tempSku;
            var keySale = "discount_" + tempSku;
            
            var jdPriceDoms = $("p[id='jd_price_" +tempSku+"']");
            var oldPriceDoms = $("p[id='old_price_" +tempSku+"']");
            
            var goodItem = $("a[id='"+keyItem+"']");
            
            var saleDoms =  $("p[id='"+keySale+"']");   
            
            if(jdPrice == "暂无价格"){
                for(var index=0;index<goodItem.length;index++){
                    $(goodItem[index]).remove();
                }
                
            }else{
                for(var index=0;index<jdPriceDoms.length;index++){
                    $(jdPriceDoms[index]).html(jdPrice);
                    $(oldPriceDoms[index]).html(oldPrice);
                }
                if(tempSale!="" && tempSale != undefined && null != tempSale){
                        var isShow=checkDiscount(tempSale);
                        for(var index=0;index<saleDoms.length;index++){
                            if(isShow){
                                $(saleDoms[index]).html(tempSale);
                            }else{
                                $(saleDoms[index]).hide();
                                if(oldPriceDoms && oldPriceDoms[index]){
                                    $(oldPriceDoms[index]).html("&nbsp;").css("text-decoration", "none");
                                }
                            }
                        }
                }else{

                }
                //判断是否为移动专项价；
                checkMobileOnly(tempSku);
            }
        }
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
function checkMobileOnly(sku){
    sku = "J_"+sku;
    $.ajax({
        url:'//p.3.cn/prices/mgets?callback=mobileOnlyCallback',
        data : {
            "skuids":sku,
            "type":1
        },
        method:'get',
        context: this,
        dataType:'jsonp'
    });
}

function mobileOnlyCallback(data){
    if(data){
        var pcPrice =formatPrice(data[0].p);
        var sku = data[0].id.split('_')[1];
        var mobilePrice = $("#jd_price_"+sku).html();
        if(mobilePrice){
            mobilePrice = mobilePrice.substring(1,mobilePrice.length);
        }
        if(pcPrice != mobilePrice){
            var tags = $("p[id='mobile_tag_"+sku+"']");
            for(var index=0;index<tags.length;index++){
                $(tags[index]).show();
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

function accDiv(arg1, arg2) {
    /*
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        var tempNum = (r1 / r2) * pow(10, t2 - t1);
        var strNum = tempNum*10 +"";
        if(strNum.indexOf(".")>0){
            strNum = strNum.substring(0,strNum.indexOf(".") + 3);
            
            if(parseInt(strNum.charAt(strNum.length-1)) >0){
                strNum = (Number(strNum.substring(0,strNum.length-1)) * 10 + 1) / 10 +"";
            
            }else{
                strNum = strNum.substring(0,strNum.length-1) + "";
            }
            
            if(strNum.indexOf(".")<0){
                strNum = strNum+".0";
            }
        }
        return strNum;
    }
    */
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





//获取库存提示start
function getStockInfo(){
    if(skuidsv != "" && skuidsv != null){
        $.ajax({
            type : "post",
            url : '/sg4jdappjson/checkStockBySkuids.html',
            data : {"skuids":skuidsv},
            dataType: "json",
            success:function(data) {
                //有货且库存少于3件需要提示
//              if(data && data.length>0) {
//                 for(var s=0,t=data.length;s<t;s++){
//                     var ss=data[s];
//                     var ssNode=$('#stock_tag_'+ss);
//                     if(ssNode.length>0){
//                         ssNode.show();
//                     }else{
//                         ssNode.hide();
//                     }
//                 }
//              }
                var stockFilterFlag = $(".con_btns a").eq(1).hasClass("set");
                
                if(data) {
                    for(var key in data) {
                        if(key && key=="stockTensionsList") {
                            if(data[key] && data[key].length > 0) {
                                var list = data[key];
                                for(var i=0, t=list.length; i<t; i++) {
                                    var ss = list[i];
                                    var ssNode = $('#stock_tag_'+ss);
                                    if(ssNode.length>0) {
                                        ssNode.show();
                                    }else{
                                        ssNode.hide();
                                    }
                                }
                            }
                        } else if(key && key=="stockSoldOutList") {
                            if(data[key] && data[key].length > 0) {
                                var list = data[key];
                                for(var i=0, t=list.length; i<t; i++) {
                                    var ss = list[i];
                                    var keyItem = "goodItem_" + ss;
                                    var goodItem = $("a[id='"+keyItem+"']");
                                    if(stockFilterFlag) {
                                        for(var index=0;index<goodItem.length;index++){
                                            $(goodItem[index]).remove();
                                        }
                                    } else {
//                                      var ssNode = $('#soldout_tag_'+ss);
//                                      if(ssNode.length>0) {
//                                          ssNode.show();
//                                      }else{
//                                          ssNode.hide();
//                                      }
                                        var soldoutDiv = "<div class='soldout' id='soldout_tag_"+ss+"'></div>";
                                        for(var index=0;index<goodItem.length;index++){
                                            $(goodItem[index]).append(soldoutDiv);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
   }
}
//获取库存提示end
function filterGood(param){
    param["page"] = 1;
    $("#page").val(1);
    $.ajax({
        type : "post",
        url : '/sg4jdapp/filter.html',
        data : param,
        dataType: "html",
        success:function(data){
            $(".event_list").html(data);
            priceInfo();
            getStockInfo();
            panda(function(require) {
                switchImgN();
                /*
                panda.widget.manager.get(require("widget.ResponseLazyLoad"), {
                    target : panda('.event_list img[srcset]')
                });
                */
            });
        }
    });
}

setTimeout(function() {
    getCouponInfo();
}, 20000);

setTimeout(function() {
    getCouponInfo();
}, 40000);

function getCouponInfo() {
    if($(".coupon_wrapper").length > 0) {
        var sid = $("#sid").val();
        if(sid!=null && sid!="") {
            $.ajax({
                type : "post",
                url : '/sg4jdappjson/checkUserCoupon.html',
                data : {
                    "sid" : sid
                },
                dataType : "json",
                success : function(data) {
                    if(data && data.length>0) {
                        for(var i=0; i<data.length; i++) {
                            var couponKey = "coupon_" + data[i].batchId;
                            var couponDiv = $("#"+couponKey);
                            
                            if(couponDiv.length > 0) {
                                var takeRule = couponDiv.attr("takerule");
                                if(takeRule == 4) {
                                    if(data[i].createTime == data[i].now) {
                                        if(!couponDiv.hasClass("disabled")) {
                                            couponDiv.addClass("disabled");
                                            couponDiv.removeAttr("onclick");
                                            couponDiv.children(".getBtn").attr("src","/img/4jdapp/v2/already-btn.png");
                                        }
                                    }
                                } else {
                                    if(!couponDiv.hasClass("disabled")) {
                                        couponDiv.addClass("disabled");
                                        couponDiv.removeAttr("onclick");
                                        couponDiv.children(".getBtn").attr("src","/img/4jdapp/v2/already-btn.png");
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}

//滚动加载
var loading = false;
$(document).scroll(function(){
    var scrollTop = $(window).scrollTop();
    var dHeight = $(document).height();
    var wHeight = $(window).height();
    if(scrollTop >= dHeight-wHeight-500){
        var page = parseInt($("#page").val()) + 1;
        var totalPage = $("#totalPage").val();
        if(page > totalPage || loading){
            return;
        }
        loading = true;
        $.ajax({
            type : "post",
            url : '/sg4jdapp/filter.html',
            data : {
                "stockFlag" : $("#stockFlag").val(),
                "sort" : $("#sort").val(),
                "actId" : $("#actId").val(),
                "page" : page,
                "vs" : $("#vs").val(),
                "preview" : $("#preview").val()
            },
            dataType: "html",
            success:function(data){
                $(".event_list").append(data);
                $("#page").val(page);
                priceInfo();
                getStockInfo();
                loading = false;
                panda(function(require) {
                    switchImgN();
                    /*
                    panda.widget.manager.get(require("widget.ResponseLazyLoad"), {
                        target : panda('.event_list img[srcset]')
                    });
                    */
                });
            }
        });
    }
});

function CountDown(secondCount) {
    this.secondCount = secondCount || 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    
    this.daySecond = 60 * 60 * 24;
    this.hourSecond = 60 * 60;
    
    this.tick = function(step){
         this.secondCount += step || 0;
         if (this.secondCount <= 0) {
             this.secondCount = 0;
         }
         this.day = parseInt(this.secondCount / (this.daySecond));
         this.hour = parseInt((this.secondCount % (this.daySecond)) / (this.hourSecond));
         this.minute = parseInt((this.secondCount % (this.hourSecond)) / (60));
         this.second = parseInt((this.secondCount % 60) / (1));
    };
    
    this.initCurrentPage = function(){
        var countDownDoms = $("[secondCount]");
        countDownDoms.each(function (n, i) {
            $(i).attr("start","1");
            var second = $(i).attr("secondCount");
            second = window.parseInt(second);
            var CD = new CountDown(second);
            var spans = $(i).find("em");
            var lables = $(i).find("label");
            i.countDownInterval = window.setInterval(function () {
                CD.tick(-1);
                if (CD.secondCount > 0) {
//                  spans[0].innerHTML = CD.day;
//                  spans[1].innerHTML = CD.hour;
//                  spans[2].innerHTML = CD.minute;
                    if(CD.day > 0){
                        spans[0].innerHTML = CD.day;
                    }else{
                        $(lables[0]).remove();
                        $(i).removeClass("type4").addClass("type5");
                    }
                    
                    if(CD.hour > 0 || (CD.hour == 0 && CD.day>0)){
                        spans[1].innerHTML = CD.hour;
                    }else{
                        $(lables[1]).remove();
                    }
                    
                    if(CD.minute > 0 ||(CD.minute == 0 && CD.hour>0) || (CD.minute == 0 && CD.day>0)){
                        spans[2].innerHTML = CD.minute;
                    }else{
                        $(lables[2]).remove();
                    }
                    
                    spans[3].innerHTML = CD.second;

                } else {
                    $(i).html("活动已结束");
                }
            }, 1000);
        });
    };
}

new CountDown().initCurrentPage();

function getSelectedCateIdStr() {
    var cateIdStr ="";
    var cateIdArray = new Array();
    $(".selected").each(function() {
        cateIdStr += "," + $(this).attr("id");
    });
    if(cateIdStr == "") {
        return cateIdStr;
    }
    cateIdStr = cateIdStr.substring(1,cateIdStr.length);
    cateIdArray = cateIdStr.split(",");
    var length = cateIdArray.length;
    
    var cateId = "";
    for(var i=0; i<length; i++) {
        cateId += "," + cateIdArray[i].split("_")[1];
    }
    return cateId.substring(1,cateId.length);
}

function getDisableCateIdStr() {
    var cateIdStr ="";
    var cateIdArray = new Array();
    $(".disable").each(function() {
        cateIdStr += "," + $(this).attr("id");
    });
    if(cateIdStr == "") {
        return cateIdStr;
    }
    cateIdStr = cateIdStr.substring(1,cateIdStr.length);
    cateIdArray = cateIdStr.split(",");
    var length = cateIdArray.length;
    
    var cateId = "";
    for(var i=0; i<length; i++) {
        cateId += "," + cateIdArray[i].split("_")[1];
    }
    return cateId.substring(1,cateId.length);
}

function filterCate() {
    
    $('.filter-panel').removeClass('active');
    $("body").removeClass("scroll-no");
    
    var cateIdStr = getSelectedCateIdStr();
    $("#cateIdStr").val(cateIdStr);
    $("#cateIdStrDisable").val(getDisableCateIdStr());
    
    $.ajax({
        type : "post",
        url : '/sg4jdapp/filter.html',
        data : {
            "cateIdStr" : cateIdStr,
            "sortFlag" : $("#sortFlag").val(),
            "vs" : $("#vs").val(),
            "actId" : $("#actId").val()
        },
        dataType: "html",
        success:function(data){
            $(".event_list").html(data);
            priceInfo();
            getStockInfo();
            panda(function(require) {
                switchImgN();
            });
        }
    });
}

$(function(){
    if($("#vs").val()=="jdapp") {
        $(".filter-panel").css("top", "-1px");
    }
    
    var $filter = $('.filter-panel'),$mask = $(".mask"),$itemAll =  $(".J-filter-item .item.all"),$itemSub =  $(".J-filter-item .item.sub");
    $('.J_profilter').tap(function(){
        setTimeout(function() {
            var cateIdStr = $("#cateIdStr").val();
            var cateIdArray = new Array();

            cateIdArray = cateIdStr.split(",");
            
            var cateIdStrDisable = $("#cateIdStrDisable").val();
            var cateIdDisableArray = new Array();
            cateIdDisableArray = cateIdStrDisable.split(",");
            
            $(".J-filter-item").children("span").each(function() {
                for(var i=0; i<cateIdArray.length; i++) {
                    if($(this).attr("id") == "cate_" + cateIdArray[i]) {
                        $(this).addClass("selected");
                    }
                }
                for(var i=0; i<cateIdDisableArray.length; i++) {
                    if($(this).attr("id") == "cate_" + cateIdDisableArray[i]) {
                        $(this).addClass("disable");
                    }
                }
            });
            
            $filter.addClass('active');
            $("body").addClass("scroll-no");
            $("#J_conbar").hide();
            $("#J_goodlist").hide();
            $("footer").hide();
            $(".new-header").hide();
        }, 300);
        
        return false;
    });

    
    $(".J-btn-cancle").on("tap", function() {
        setTimeout(function(){
            $("#J_conbar").show();
            $("#J_goodlist").show();
            $("footer").show();
            $(".new-header").show();
            
            $filter.removeClass('active');
            $("body").removeClass("scroll-no");
            
            $(".J-filter-item").children("span").each(function() {
                if($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                } else if($(this).hasClass("disable")) {
                    $(this).removeClass("disable");
                }
            });
        }, 300);
    });

    $(".J-btn-confirm").click(function(){
        filterCate();
        setTimeout(function() {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            scrollTop = 0;

            $('.condition_bar').removeClass('fixed_top');

            if($("#cateIdStr").val() == "0") {
                if($(".J_profilter").hasClass("J_profilter_active")) {
                    $(".J_profilter").removeClass("J_profilter_active");
                }
            } else {
                if(!$(".J_profilter").hasClass("J_profilter_active")) {
                    $(".J_profilter").addClass("J_profilter_active");
                }
            }
            
            $("#J_conbar").show();
            $("#J_goodlist").show();
            $("footer").show();
            $(".new-header").show();
        }, 300);
    });

    $itemAll.click(function(){
        var me = $(this);
        $itemSub.removeClass("selected");
        $itemSub.removeClass("disable");
        me.addClass("selected");
    });

    $itemSub.click(function(){
        var me = $(this);
        if(!me.hasClass('disable'))  {
            if(me.hasClass("selected")) {
                if( $(".J-filter-item .item.sub.selected").length == 3 )  {
                    $(".J-filter-item .item.sub").not(".selected").removeClass("disable");
                } else if( $(".J-filter-item .item.sub.selected").length == 1 ) {
                    $itemAll.addClass("selected");
                }
                me.removeClass("selected");
            } else {
                $itemAll.hasClass("selected") && $itemAll.removeClass("selected");
                me.addClass("selected");
                if( $(".J-filter-item .item.sub.selected").length == 3 )  {
                    $(".J-filter-item .item.sub").not(".selected").addClass("disable");
                }
            }
        };
    });
    
    
    
    var preview = $("#preview").val();
    if(!(preview != undefined && preview != null && preview == 1)) {
        $(".con_btns a").eq(1).click(function(){
            var cateIdStr = getSelectedCateIdStr();
            if($(this).hasClass("set")){
                $(this).removeClass('set');
                $("#stockFlag").val(0);
                $(this).attr('report-eventparam','0');
                filterGood({"sortFlag":$("#sortFlag").val(),"stockFlag":$("#stockFlag").val(),"vs":$("#vs").val(),"actId" : $("#actId").val(), "cateIdStr" : cateIdStr});
            }else{
                $(this).addClass('set');
                $("#stockFlag").val(1);
                $(this).attr('report-eventparam',1);
                $(".soldout").each(function() {
                    $(this).parent().remove();
                });
            }
            //filterGood({"sort":$("#sort").val(),"stockFlag":$("#stockFlag").val(),"vs":$("#vs").val(),"actId" : $("#actId").val()});
        });
        $(".con_btns a").eq(2).click(function(){
            var cateIdStr = getSelectedCateIdStr();
            var sort = "";
            var sortFlag = 0;
            $(this).addClass('set');
            $(this).siblings().each(function(){
                if($(this).attr('id')!="avaliable"){
                    $(this).removeClass('set inc dec');
                }
            });
//          $(this).hasClass('inc')?sort="price-asc":sort="price-desc";
            $(this).hasClass('inc')?sortFlag=1:sortFlag=2;
            if(sort=="price-asc"){
                $(this).attr('report-eventparam','asc');
            }else{
                $(this).attr('report-eventparam','desc');
            }
            $(this).hasClass('inc')?$(this).removeClass('inc').addClass('dec'):$(this).removeClass('dec').addClass('inc');
//          $("#sort").val(sort);
            $("#sortFlag").val(sortFlag);
            filterGood({"sortFlag":sortFlag,"stockFlag":$("#stockFlag").val(),"vs":$("#vs").val(),"actId" : $("#actId").val(), "cateIdStr" : cateIdStr});
        }); 
    }
    loadJdHeadAndFooter();
    priceInfo();
    getStockInfo();
    getCouponInfo();
});
