var brandOccupiedImg = "";
var actOccupiedImg = getActOccupiedImg();
var forecastOccupiedImg = getForecastOccupiedImg();
(function(){
    $.each($(".cover"),function(i,n){
        if(i>2){
            $(this).attr("src",actOccupiedImg);
        }
      
    });
})();

var pageModle = {
    config: {
        index: 1,
        url: null,
        oldUrl: null
    },
    init: function() {
        var self = this;
        
        self.config.oldUrl = location.href;
        self.refer = location.referer
        self.handle();
    },
    handle: function() {
        var self = this;
        $(".event_list .banner_info").on("click", function(e) {
            e.preventDefault(e);
            self.config.url = $(this).attr("href");
            self.showPage(self.config.url);

            if (e && /\d/.test(e.button)) {   

                

                var refer = location.href;
                var stateObject = {
                    refer: refer
                };
                var title ="22";
                var detailUrl = self.config.url;

                history.pushState(stateObject,title,detailUrl);
            }
        });

        $(window).bind('popstate', function(e) {
            if(e.state) {
                console.log("refer:" + e.state.refer);
            }
            if(self.config.index === 1) {
                self.showPage(self.config.url);
            } else if(self.config.index > 1) {
                self.removePage(self.config.oldUrl);
            }
        });
    },
    showPage: function(url) {
        var self = this;
        $(".header").addClass("hide");
        $(".content-wp").addClass("hide");


        self.config.index += 1;

        //ajax

        var div_page = $('<div class="cj-page"></div>');
        $(".content-wp").after(div_page);
    },
    removePage: function(url) {
        var self = this;
        $(".header").removeClass("hide");
        $(".content-wp").removeClass("hide");

        var refer = url;
        var stateObject = {
            refer: refer
        };
        var title ="22";
        var detailUrl = url;
        window.history.replaceState(stateObject,title,detailUrl);

        $(".cj-page").remove();

        self.config.index -= 1;
    }
}

$(function(){
    // var cntHeight = $(".tab_content").height() + $(".mod_slider").height();
    // $(".content-wp").css("height", cntHeight);
    handleTabs();
    loadJdHeadAndFooter();
    //pageModle.init();
    //活动轮播图
    var pics = $("#idSlider").find(".item");
    var picCount = pics.length;
    $("#idSlider").css("width", picCount * 100 + "%");
    
    if(picCount > 1){
        var forEach = function(array, callback){
            for (var i = 0, len = array.length; i < len; i++) { callback.call(this, array[i], i); }
        };
        // forEach(pics, function(node, index){
        //     $(node).css({"float": "left", "width": Math.floor($("#idSlider").width() / picCount) + "px"});
        // });
        var st = createPicMove("idContainer", "idSlider", picCount);  //图片数量更改后需更改此数值
        var nums = [];
        //插入数字
        document.getElementById("idNum").innerHTML = "";
        for(var i = 0, n = st._count - 1; i <= n;i++){
            var li = document.createElement("li");
            li.className = "cur";
            nums[i] = document.getElementById("idNum").appendChild(li);
        }
        //设置按钮样式
        st.onStart = function(){
            forEach(nums, function(o, i){
                if(st.Index == nums.length && i== 0){
                    o.className = "cur";
                }else{
                    o.className = st.Index == i ? "cur" : "";
                }
            });
        };
        // 重新设置浮动
        $("#idSlider").css("position","relative");
        
        var _initX = 0;
        var _finishX = 0;
        var _startX = 0;
        var _startY = 0;
        function touchStart(event) {
            _startX = event.touches[0].clientX;
            _startY = event.touches[0].clientY;
            _initX = _startX;
        }
        function touchMove(event) {
            var touches = event.touches;
            var _endX = event.touches[0].clientX;
            var _endY = event.touches[0].clientY;
            if(Math.abs(_endY - _startY) > Math.abs(_endX - _startX)){
                return;     
            }
            event.preventDefault();
            _finishX = _endX;
            var _absX = Math.abs(_endX - _startX);
            var lastX = $('#idSlider').css('left').replace('px','');
            if(_startX>_endX){
                st.Stop();
                $('#idSlider').css('left',(parseInt(lastX) - _absX)+'px');
            }else{
                st.Stop();
                $('#idSlider').css('left',(parseInt(lastX) + _absX)+'px');
            } 
            _startX = _endX;
        }
        //触屏  离开屏幕事件
        function touchEnd(event) {
            if(_finishX == 0){
                return;
            }
            if(_initX > _finishX){
                bindEvent(_initX, _finishX);
            }else if(_initX < _finishX){
                bindEvent(_initX, _finishX);
            }
            _initX = 0;
            _finishX = 0;
        }

        var cont = document.getElementById("idContainer");
        cont.addEventListener("touchstart", touchStart, false);
        cont.addEventListener("touchmove", touchMove, false);
        cont.addEventListener("touchend", touchEnd, false);

        /**
         *  绑定触屏触发事件
         * @param start
         * @param end
         */
        function bindEvent(start,end){
             if (start >= end) {
               st.Next();
            } else {
                st.Previous();
            }
        }
        st.Run();
        
        //记录系统屏幕宽度，避免高度变化时从新计算轮播图。仅正对左右移动有效，如果动画是上下滑动或者淡入淡出，则不需要改优化。
          window.screenSize = null;
          var sizeChanged = function(){
            if(window.screenSize == $("#idContainer").width()){
              return;
            }
            window.screenSize = $("#idContainer").width();
            st.Stop();
            var sliderWidth = $("#idContainer").width();
            var currentIndex = (st.Index - 1) % st._count;
            //reset all slider to wrapper width(normal is screen width)
            $("#idSlider li").css("width", sliderWidth + "px");
            //在屏幕变化后，把从新定位当前轮播图，这个轮播图使用的是经典的实现规则，每一个li及每一张图片横着并排，
            //父容器向左偏移。在尺寸变化时，终止动画，从新定位轮播图，然后修正偏移量后再开始动画。
            // $("#idSlider").css("left", (-1 * sliderWidth * currentIndex) + "px");
            $("#idSlider").css("left", 0);
            //st.Change 是每一次滚动动画位移值,在这里等于屏幕宽度，屏幕尺寸变化后修正每次需要偏移的宽度
            st.Change = sliderWidth;
            st.Run();
          };
          window.addEventListener("resize",sizeChanged);
          window.addEventListener("orientationchange",sizeChanged);
          sizeChanged();
    }
    
    var iScroll3 = function(el,nav,num,loop){
        var eleUl = $("."+el),
        _init = function(){
            eleUl.each(function(i){
                var _this = $(this),
                length = 0,
                sTep = 0,
                ulWidth = 0,
                allLength = 0,
                num3 = Math.floor(num),
                leftw = 0,
                slideNav = _this.find("."+nav),
                navLi = "",
                slideUl = _this.find("ul"),
                slideLi = slideUl.find("li");
                if(slideLi.length == 1){
                    slideLi.eq(0).children("div").addClass("curr");
                }else{
                    if(loop){
                        slideUl.append(slideUl.find("li").clone());
                    }
                    slideLi = slideUl.find("li");
                    length = slideLi.length;
                    if(!loop && length%num3 != 0){
                        length = num3*Math.ceil(length/num3)
                    }
                }
                if(length > 1){
                    ulWidth = Math.ceil(_this.width()/num);
                    allLength = Math.ceil((ulWidth+1)*length);
                    //循环滚动，初始化时，向左移动距离
                    if(loop){
                        leftw = -ulWidth*length/2;
                        sTep = Math.ceil(length/2/num3);
                    }else{
                        sTep = Math.ceil(length/num3);
                    }
                    if(num3 == 1 && num/num3 != 1){
                        leftw += ulWidth*(num-1)/2;
                        if(loop){
                            slideLi.eq(length/2).children("div").addClass("curr");
                        }else{
                            slideLi.eq(0).children("div").addClass("curr");
                        }
                    }
                    slideUl.css({"width":allLength+"px","-webkit-Transform":"translate3d("+leftw+"px,0px,0px)","transition":"all 0ms ease-out"});
                    slideLi.css({"width":ulWidth+"px"});
                    //选中第一个
                    for(var j=0;j<sTep;j++){
                        if(j == 0){
                            navLi += '<li class="curr"></li>'
                        }else{
                            navLi += "<li></li>"
                        }
                    }
                    slideNav.html(navLi);
                    //滑动效果
                    _touchSupport(slideUl,slideNav,ulWidth,sTep,length,num3);
                }
            }).removeClass(el)
        },
        _touchSupport = function(obj,navobj,uw,leng,length,num3){
            var startX = 0,
                startY = 0,
                nowindex = 0,
                slidetime = 500,
                T = false,
                S = false,
                X = 0;
            if(loop){
               nowindex = length/2
            }
            obj.bind("touchstart",__touchStart);
            obj.bind("touchmove",__touchMove);
            obj.bind("touchend",__touchEnd);
            function __touchStart(e){
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
                T = false;
                S = false;
                X = 0;
                obj.css("transition","0ms");
            }
            function __touchMove(e){
                X = e.touches[0].pageX - startX;
                if(!T){
                    S = Math.abs(X) < Math.abs(e.touches[0].pageY - startY);
                    T = true;
                }
                if(!S){
                    e.stopPropagation();
                    e.preventDefault();
                    var Xuw = X - nowindex * uw;
                    if(num3 == 1 && num/num3 != 1){
                        Xuw = X - nowindex * uw + uw*(num-1)/2;
                    }
                    if(!loop && nowindex == 0 && X > 0 || !loop && nowindex == (length-num3) && X < 0){

                    }else{
                        obj.css({"-webkit-Transform":"translate3d("+ Xuw +"px,0,0)"});
                    }
                }
            }
            function __touchEnd(e){
                if(!S){
                    var distance = 40,
                    stepLength = X <= -distance ? 1 : (X > distance) ? -1 : 0;
                    __endAction(nowindex +stepLength*num3)
                }
            }
            var __endAction = function(index){
                if(leng > 1){
                    if(!loop){
                        if(index >= length || index < 0){
                            return
                        }else{
                            goTo()
                        }
                    }else{
                        if(index >= length-num3){
                            index = length/2-num3;
                            obj.css({"transition":"0ms","-webkit-Transform":"translate3d(-"+uw*(length/2-num3*2)+"px,0px,0px)"});
                            setTimeout(goTo,20)
                        }else if(index < 1){
                            index = length/2;
                            obj.css({"transition":"0ms","-webkit-Transform":"translate3d(-"+ uw*(length/2+num3) +"px,0px,0px)"});
                            setTimeout(goTo,20)
                        }else{
                            goTo()
                        }
                    }
                    function goTo(){
                        var leftwid = - uw*index,navNum = index/num3-leng;
                        if(num3/num != 1){
                            leftwid += uw*(num-1)/2;
                            navNum = index - leng;
                        }
                        navobj.find("li").removeClass("curr").eq(navNum).addClass("curr");
                        obj.find("li").children("div").removeClass("curr").eq(index).addClass("curr");
                        obj.css({"transition":slidetime+"ms ease-out","-webkit-Transform":"translate3d("+ leftwid +"px,0px,0px)"});
                        nowindex = index;
                    };
                }
            }
        };
        _init()
    }
    iScroll3("j-focus","pagi",3);
    
    priceInfo();
    getStockInfo();
});

function priceInfo(){
    if(skuidsv != "" && skuidsv != null) {
        var strs= new Array();
        strs = skuidsv.split(",");
        var len = strs.length;
        
        var requestStrs = "";
        for(var index = 0 ; index < len ; index++) {
            requestStrs += "," + strs[index];
        }
        var reqString = requestStrs.substring(1,requestStrs.length);
        var arg = {'skuids' : reqString, 'type':1, "origin":2};
        $.ajax({
            url:'//pm.3.cn/prices/mgets?callback=callBackPriceService',
            data : arg,
            method:'get',
            dataType:'jsonp'
        });
    }
}

function callBackPriceService(data){

     for(var i=0;i<data.length;i++){
     
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

function getStockInfo(){
    if(skuidsv != "" && skuidsv != null){
        $.ajax({
            type : "post",
            url : '/sg4jdappjson/checkStockBySkuids.html',
            data : {"skuids":skuidsv},
            dataType: "json",
            success:function(data) {
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
        });
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

function loadActList(){
    $(".ending").hide();
    $(".loading").show();
    $.ajax({
        type : "post",
        url : '/sg4jdapp/actList.html',
        data : {
            "vs" : $("#vs").val(),
            "sid" : $("#sid").val()
        },
        dataType: "html",
        success:function(data){
            $(".brand_list").append(data);
            $(".ending").show();
            $(".loading").hide();
            $.each($(".logo"),function(i,n){
                $(this).attr("src",brandOccupiedImg);
            });
            $.each($(".cover"),function(i,n){
                $(this).attr("src",actOccupiedImg);
            });
            panda(function(require) {
                switchCompressionRatio();
                panda.widget.manager.get(require("widget.ResponseLazyLoad"), {
                    target : panda('.brand_list img[srcset]')
                });
            });
        }
    });
}

function toFinal(obj){
    $(".mod_slider").remove();
    $(".J_tabitem").empty();
    $.ajax({
        type : "post",
        url : '/sg4jdapp/finalSale.html',
        data : {
            "vs" : $("#vs").val(),
            "sid" : $("#sid").val()
        },
        dataType: "html",
        success:function(data){
            $(".J_tabitem").html(data);
            $.each($(".brand"),function(i,n){
                $(this).attr("src",brandOccupiedImg);
            });
            $.each($(".cover"),function(i,n){
                $(this).attr("src",actOccupiedImg);
            });
            panda(function(require) {
                switchCompressionRatio();
                /*
                panda.widget.manager.get(require("widget.ResponseLazyLoad"), {
                    target : panda('.J_tabitem img[srcset]')
                });
                */
            });
        }
    });
}

function toForeshow(obj){
    $(".mod_slider").remove();
    $(".J_tabitem").empty();
    $.ajax({
        type : "post",
        url : '/sg4jdapp/foreshow.html',
        data : {
            "vs" : $("#vs").val(),
            "sid" : $("#sid").val()
        },
        dataType: "html",
        success:function(data){
            $(".J_tabitem").html(data);
            $.each($(".brand"),function(i,n){
                $(this).attr("src",brandOccupiedImg);
            });
            $.each($(".cover"),function(i,n){
                $(this).attr("src",forecastOccupiedImg);
            });
            panda(function(require) {
                switchCompressionRatio();
                /*
                panda.widget.manager.get(require("widget.ResponseLazyLoad"), {
                    target : panda('.J_tabitem img[srcset]')
                });
                */
            });
        }
    });
}

function showTypeAct(cid,obj){
        $(".mod_slider").remove();
        $(".J_tabitem").empty();
        $.ajax({
            type : "post",
            url : '/sg4jdapp/typeActList.html',
            data : {
                "cid":cid,
                "vs" : $("#vs").val(),
                "sid" : $("#sid").val()
            },
            dataType: "html",
            success:function(data){
                $(".J_tabitem").html(data);
                $.each($(".J_tabitem .cover"),function(i,n){
                  $(this).attr("src",actOccupiedImg);
                });
                panda(function(require) {
                    switchCompressionRatio();
                });
            }
        });
}
var tran;
function handleTabs() {
    var f = {};
    var data = [];
    var tabObj = $(".tabs-wp .tab-bd");

    var startTime, endTime;
    var moveLength;
    var distance;

    initTabs();

    tabObj.on("touchstart", function(e) {
        var myDate = new Date();
        startTime = myDate.getTime();

        if(tran == undefined) {
            tran = 0;
        } 
        f.startX = e.touches[0].clientX;
        f.endX = e.touches[0].clientX;
        f.prevX = f.startX;
        f.prevY = e.touches[0].clientY

    }).on("touchmove", function(e) {
        tabObj.css({
            "-moz-transition": "none",
            "-webkit-transition": "none",
            "-o-transition": "none",
            "-ms-transition": "none",
            "transition": "none"
        });

        f.endX = e.touches[0].clientX;
        f.deltaX = e.touches[0].clientX - f.startX + tran;
        f.directionX = e.touches[0].clientX - f.prevX > 0 ? "right" : "left";
        f.directionY = e.touches[0].clientY - f.prevY > 0 ? "bottom" : "top";

        if(f.directionY == "top" || f.directionY == "bottom") {
            e.preventDefault();
        }

        var width = $(".tabs-wp .tab-bd").width() * -1;
        var offsetWidth = $(".tabs-wp .tab-bd").parent().width();
        moveLength = Math.sqrt(Math.pow(Math.abs(f.deltaX), 2));

        if(f.deltaX > 0) {
            tabObj.css({
                "transform": "translate("+ f.deltaX/2 +"px, 0px)",
                "-ms-transform": "translate("+ f.deltaX/2 +"px, 0px)",     /* IE 9 */
                "-moz-transform": "translate("+ f.deltaX/2 +"px, 0px)",    /* Firefox */
                "-webkit-transform": "translate("+ f.deltaX/2 +"px, 0px)", /* Safari 和 Chrome */
                "-o-transform": "translate("+ f.deltaX/2 +"px, 0px)"
            });
        } else if((f.deltaX-offsetWidth) < width) { 
            var dx = width + offsetWidth;
            var movX = f.deltaX - (f.deltaX - dx)/2;
            tabObj.css({
                "transform": "translate("+ movX +"px, 0px)",
                "-ms-transform": "translate("+ movX +"px, 0px)",     /* IE 9 */
                "-moz-transform": "translate("+ movX +"px, 0px)",    /* Firefox */
                "-webkit-transform": "translate("+ movX +"px, 0px)", /* Safari 和 Chrome */
                "-o-transform": "translate("+ movX +"px, 0px)"
            });
        } else {
            tabObj.css({
                "transform": "translate("+ f.deltaX +"px, 0px)",
                "-ms-transform": "translate("+ f.deltaX +"px, 0px)",     /* IE 9 */
                "-moz-transform": "translate("+ f.deltaX +"px, 0px)",    /* Firefox */
                "-webkit-transform": "translate("+ f.deltaX +"px, 0px)", /* Safari 和 Chrome */
                "-o-transform": "translate("+ f.deltaX +"px, 0px)"
            });
        }

    }).on("touchend", function(e) {
        distance = Math.sqrt(Math.pow(Math.abs(f.endX - f.startX), 2));

        var myDate = new Date();
        endTime = myDate.getTime();

        var timeDiff = endTime - startTime;

        var speed = 0;
        if(distance) {
            speed = distance / timeDiff;
        }
        
        var realMov = f.deltaX;
        var totalDis;
        if(speed > 0.3) {
            speed += 4;
            totalDis = distance * speed;
            if(f.directionX == "right") {
                realMov = f.deltaX + totalDis;

                tabObj.css({
                        "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                        "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
                    }).css({
                        "transform": "translate("+ realMov +"px, 0px)",
                        "-ms-transform": "translate("+ realMov +"px, 0px)",     /* IE 9 */
                        "-moz-transform": "translate("+ realMov +"px, 0px)",    /* Firefox */
                        "-webkit-transform": "translate("+ realMov +"px, 0px)", /* Safari 和 Chrome */
                        "-o-transform": "translate("+ realMov +"px, 0px)"
                    });

                f.deltaX = _bounce(realMov, e);
                
            } else if(f.directionX == "left") {
                realMov = f.deltaX - totalDis;

                tabObj.css({
                    "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                    "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                    "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                    "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                    "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
                }).css({
                    "transform": "translate("+ realMov +"px, 0px)",
                    "-ms-transform": "translate("+ realMov +"px, 0px)",     /* IE 9 */
                    "-moz-transform": "translate("+ realMov +"px, 0px)",    /* Firefox */
                    "-webkit-transform": "translate("+ realMov +"px, 0px)", /* Safari 和 Chrome */
                    "-o-transform": "translate("+ realMov +"px, 0px)"
                });

                f.deltaX = _bounce(realMov, e);
            }
        } else {
            f.deltaX = _bounce(realMov, e);
        }
        
        tran = f.deltaX;
        data = [];

    });

    tabObj.find(".tab").on("tap", function(e) {

    });

}

function _bounce(deltaX, e) {
    var width = $(".tabs-wp .tab-bd").width() * -1;
    var offsetWidth = $(".tabs-wp .tab-bd").parent().width();
    if(deltaX > 0) {
        $(".tabs-wp .tab-bd").css({
                "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
            }).css({
                "transform": "translate(0px, 0px)",
                "-ms-transform": "translate(0px, 0px)",     /* IE 9 */
                "-moz-transform": "translate(0px, 0px)",    /* Firefox */
                "-webkit-transform": "translate(0px, 0px)", /* Safari 和 Chrome */
                "-o-transform": "translate(0px, 0px)"
            });
        return 0;
    } else if((deltaX-offsetWidth) < width) {
        var dx = width + offsetWidth;
        $(".tabs-wp .tab-bd").css({
                "-moz-transition": "-moz-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "-webkit-transition": "-webkit-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "-o-transition": "-o-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "-ms-transition": "-ms-transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s",
                "transition": "transform 0.5625s cubic-bezier(0.33, 0.66, 0.66, 1) 0s"
            }).css({
                "transform": "translate("+ dx +"px, 0px)",
                "-ms-transform": "translate("+ dx +"px, 0px)",     /* IE 9 */
                "-moz-transform": "translate("+ dx +"px, 0px)",    /* Firefox */
                "-webkit-transform": "translate("+ dx +"px, 0px)", /* Safari 和 Chrome */
                "-o-transform": "translate("+ dx +"px, 0px)"
            });
        return dx;
    } else {
        return deltaX;
    }
}

function initTabs() {
    var tabObj = $(".tabs-wp .tab-bd");

    if($(".tab-new").hasClass("active")) {
        $(".tabs-wp .tab-bd").css("visibility", "visible");
    }

    tabObj.children().each(function() {
        if($(this).hasClass("active")) {

            var oleft = $(this).offset().left;
            var bdLeft = oleft - $(".tabs-wp .tab-new").width();
            var movLeft = bdLeft - ($(".tabs-wp .tab-cnt").width())/2 + ($(this).width())/2;

            var deltaX = movLeft * -1;


            var width = $(".tabs-wp .tab-bd").width() * -1;
            var offsetWidth = $(".tabs-wp .tab-bd").parent().width();

            if(deltaX > 0) {
                deltaX = 0;
            } if((deltaX-offsetWidth) < width) {
                deltaX = width + offsetWidth;
            }

            $(".tabs-wp .tab-bd").css({
                "transform": "translate("+ deltaX +"px, 0px)",
                "-ms-transform": "translate("+ deltaX +"px, 0px)",     /* IE 9 */
                "-moz-transform": "translate("+ deltaX +"px, 0px)",    /* Firefox */
                "-webkit-transform": "translate("+ deltaX +"px, 0px)", /* Safari 和 Chrome */
                "-o-transform": "translate("+ deltaX +"px, 0px)"
            });

            tran = deltaX;
            $(".tabs-wp .tab-bd").css("visibility", "visible");
        }
    });
    
}

var filterClose=null;
var filter=$("#J_filter");
var tab=$("#J_tab");
var sortRes=$("#J_sortRes");
var tabContent=$('.J_tabitem');
var preItem = null;

filter.on("click",".item",function(){
    var filterItem=$(this);
    var itemText=filterItem.text();
    //添加on类
    filterItem.addClass('on').siblings().removeClass('on');
    sortRes.text(itemText);
    clearTimeout(filterClose);
    filterClose=setTimeout(function(){
        filter.removeClass('show');
    },1000);
    preItem = null;
    return false;
});
//tab页切换
var tablength=tab.children('.item').length;
tab.on("click",".item",function(){
    var tabItem=$(this);
    var itemIndex=tabItem.index();
    if(itemIndex==(tablength-1)){
        //添加on类
        //显示分类筛选
        if(filter.hasClass('show')){
            filter.removeClass('show');
            if(sortRes.text() == "分类"){
                tabItem.removeClass('on');
                if(preItem){
                    preItem.addClass("on");
                }
            }
            
        }else{
            preItem = tabItem.siblings(".on");
            tabItem.addClass('on').siblings().removeClass('on');
            filter.addClass('show');
        }
        
        
        return;
    }else{
        // //重置分类标签内容
         sortRes.text("分类");
        //重置分类筛选内容
         filter.children('.item').removeClass('on');
        //关闭筛选栏
        filter.removeClass('show');
        //添加on类
        tabItem.addClass('on').siblings().removeClass('on');
        //显示该tab页内容
//        tabContent.removeClass('show').eq(itemIndex).addClass('show');
    }
});
