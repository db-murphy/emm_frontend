function priceInfo(){if(""!=skuids&&null!=skuids){var a=new Array;a=skuidsv.split(",");for(var b=a.length,c="",d=1;b>=d;d++)if(c+=","+a[d-1],d%50==0||d==b){c+=","+a[d-1];var e=c.substring(1,c.length-1),f={skuids:e,type:1,origin:2};$.ajax({url:"http://pm.3.cn/prices/mgets?callback=callBackPriceService",data:f,method:"get",dataType:"jsonp"}),c=""}}}function callBackPriceService(a){for(var b=0;b<a.length;b++){var c="",d="",e="";a[b].p>0?(c=formatPrice("&yen;"+a[b].p),d=formatPrice("&yen;"+a[b].m),e=accDiv(a[b].p,a[b].m)+"折"):c="暂无价格";var f=a[b].id.split("_");if(1==f.length){var g=f[0],h="goodItem_"+g,i="discount_"+g,j=$("p[id='jd_price_"+g+"']"),k=$("p[id='old_price_"+g+"']"),l=$("a[id='"+h+"']"),m=$("p[id='"+i+"']");if("暂无价格"==c)for(var n=0;n<l.length;n++)$(l[n]).remove();else{for(var n=0;n<j.length;n++)$(j[n]).html(c),$(k[n]).html(d);if(""!=e&&void 0!=e&&null!=e)for(var o=checkDiscount(e),n=0;n<m.length;n++)o?$(m[n]).html(e):($(m[n]).hide(),k&&k[n]&&$(k[n]).html("&nbsp;").css("text-decoration","none"));checkMobileOnly(g)}}}}function checkDiscount(a){try{var b=a.replace(/[^0-9\.]/gi,"");return b&&b>0&&9.9>b?!0:!1}catch(c){return!0}}function checkMobileOnly(a){a="J_"+a,$.ajax({url:"http://p.3.cn/prices/mgets?callback=mobileOnlyCallback",data:{skuids:a,type:1},method:"get",context:this,dataType:"jsonp"})}function mobileOnlyCallback(a){if(a){var b=formatPrice(a[0].p),c=a[0].id.split("_")[1],d=$("#jd_price_"+c).html();if(d&&(d=d.substring(1,d.length)),b!=d)for(var e=$("p[id='mobile_tag_"+c+"']"),f=0;f<e.length;f++)$(e[f]).show()}}function formatPrice(a){var b=a.split(".");return 2==b.length?"00"==b[1]?b[0]:b[1].indexOf("0")==b[1].length-1?a.substring(0,a.length-1):a:a}function accDiv(a,b){var c=new Number(a)/new Number(b),d=window.parseInt(1e3*c)%10;d>0&&1>c+.01&&(c+=.01);var e=c>=1?1:(10*c+"").substring(0,3);e+="";var f;return f=1==e.length?e+".0":e+"",a==b&&(f="10.0"),f}function getStockInfo(){""!=skuidsv&&null!=skuidsv&&$.ajax({type:"post",url:"/sg4jdappjson/checkStockBySkuids.html",data:{skuids:skuidsv},dataType:"json",success:function(a){var b=$(".con_btns a").eq(1).hasClass("set");if(a)for(var c in a)if(c&&"stockTensionsList"==c){if(a[c]&&a[c].length>0)for(var d=a[c],e=0,f=d.length;f>e;e++){var g=d[e],h=$("#stock_tag_"+g);h.length>0?h.show():h.hide()}}else if(c&&"stockSoldOutList"==c&&a[c]&&a[c].length>0)for(var d=a[c],e=0,f=d.length;f>e;e++){var g=d[e],i="goodItem_"+g,j=$("a[id='"+i+"']");if(b)for(var k=0;k<j.length;k++)$(j[k]).remove();else for(var l="<div class='soldout' id='soldout_tag_"+g+"'></div>",k=0;k<j.length;k++)$(j[k]).append(l)}}})}function filterGood(a){a.page=1,$("#page").val(1),$.ajax({type:"post",url:"/sg4jdapp/filter.html",data:a,dataType:"html",success:function(a){$(".event_list").html(a),priceInfo(),getStockInfo(),panda(function(a){switchImgN()})}})}function getCouponInfo(){if($(".coupon_wrapper").length>0){var a=$("#sid").val();null!=a&&""!=a&&$.ajax({type:"post",url:"/sg4jdappjson/checkUserCoupon.html",data:{sid:a},dataType:"json",success:function(a){if(a&&a.length>0)for(var b=0;b<a.length;b++){var c="coupon_"+a[b].batchId,d=$("#"+c);if(d.length>0){var e=d.attr("takerule");4==e?a[b].createTime==a[b].now&&(d.hasClass("disabled")||(d.addClass("disabled"),d.removeAttr("onclick"),d.children(".getBtn").attr("src","/img/4jdapp/v2/already-btn.png"))):d.hasClass("disabled")||(d.addClass("disabled"),d.removeAttr("onclick"),d.children(".getBtn").attr("src","/img/4jdapp/v2/already-btn.png"))}}}})}}function CountDown(a){this.secondCount=a||0,this.day=0,this.hour=0,this.minute=0,this.second=0,this.daySecond=86400,this.hourSecond=3600,this.tick=function(a){this.secondCount+=a||0,this.secondCount<=0&&(this.secondCount=0),this.day=parseInt(this.secondCount/this.daySecond),this.hour=parseInt(this.secondCount%this.daySecond/this.hourSecond),this.minute=parseInt(this.secondCount%this.hourSecond/60),this.second=parseInt(this.secondCount%60/1)},this.initCurrentPage=function(){var a=$("[secondCount]");a.each(function(a,b){$(b).attr("start","1");var c=$(b).attr("secondCount");c=window.parseInt(c);var d=new CountDown(c),e=$(b).find("em"),f=$(b).find("label");b.countDownInterval=window.setInterval(function(){d.tick(-1),d.secondCount>0?(d.day>0?e[0].innerHTML=d.day:($(f[0]).remove(),$(b).removeClass("type4").addClass("type5")),d.hour>0||0==d.hour&&d.day>0?e[1].innerHTML=d.hour:$(f[1]).remove(),d.minute>0||0==d.minute&&d.hour>0||0==d.minute&&d.day>0?e[2].innerHTML=d.minute:$(f[2]).remove(),e[3].innerHTML=d.second):$(b).html("活动已结束")},1e3)})}}function getSelectedCateIdStr(){var a="",b=new Array;if($(".selected").each(function(){a+=","+$(this).attr("id")}),""==a)return a;a=a.substring(1,a.length),b=a.split(",");for(var c=b.length,d="",e=0;c>e;e++)d+=","+b[e].split("_")[1];return d.substring(1,d.length)}function getDisableCateIdStr(){var a="",b=new Array;if($(".disable").each(function(){a+=","+$(this).attr("id")}),""==a)return a;a=a.substring(1,a.length),b=a.split(",");for(var c=b.length,d="",e=0;c>e;e++)d+=","+b[e].split("_")[1];return d.substring(1,d.length)}function filterCate(){$(".filter-panel").removeClass("active"),$("body").removeClass("scroll-no");var a=getSelectedCateIdStr();$("#cateIdStr").val(a),$("#cateIdStrDisable").val(getDisableCateIdStr()),$.ajax({type:"post",url:"/sg4jdapp/filter.html",data:{cateIdStr:a,sortFlag:$("#sortFlag").val(),vs:$("#vs").val(),actId:$("#actId").val()},dataType:"html",success:function(a){$(".event_list").html(a),priceInfo(),getStockInfo(),panda(function(a){switchImgN()})}})}setTimeout(function(){getCouponInfo()},2e4),setTimeout(function(){getCouponInfo()},4e4);var loading=!1;$(document).scroll(function(){var a=$(window).scrollTop(),b=$(document).height(),c=$(window).height();if(a>=b-c-500){var d=parseInt($("#page").val())+1,e=$("#totalPage").val();if(d>e||loading)return;loading=!0,$.ajax({type:"post",url:"/sg4jdapp/filter.html",data:{stockFlag:$("#stockFlag").val(),sort:$("#sort").val(),actId:$("#actId").val(),page:d,vs:$("#vs").val(),preview:$("#preview").val()},dataType:"html",success:function(a){$(".event_list").append(a),$("#page").val(d),priceInfo(),getStockInfo(),loading=!1,panda(function(a){switchImgN()})}})}}),(new CountDown).initCurrentPage(),$(function(){"jdapp"==$("#vs").val()&&$(".filter-panel").css("top","-1px");var a=$(".filter-panel"),b=($(".mask"),$(".J-filter-item .item.all")),c=$(".J-filter-item .item.sub");$(".J_profilter").tap(function(){var b=$("#cateIdStr").val(),c=new Array;c=b.split(",");var d=$("#cateIdStrDisable").val(),e=new Array;return e=d.split(","),$(".J-filter-item").children("span").each(function(){for(var a=0;a<c.length;a++)$(this).attr("id")=="cate_"+c[a]&&$(this).addClass("selected");for(var a=0;a<e.length;a++)$(this).attr("id")=="cate_"+e[a]&&$(this).addClass("disable")}),a.addClass("active"),$("body").addClass("scroll-no"),$("#J_conbar").hide(),$("#J_goodlist").hide(),$("footer").hide(),$(".new-header").hide(),!1}),$(".J-btn-cancle").on("tap",function(){setTimeout(function(){$("#J_conbar").show(),$("#J_goodlist").show(),$("footer").show(),$(".new-header").show(),a.removeClass("active"),$("body").removeClass("scroll-no"),$(".J-filter-item").children("span").each(function(){$(this).hasClass("selected")?$(this).removeClass("selected"):$(this).hasClass("disable")&&$(this).removeClass("disable")})},300)}),$(".J-btn-confirm").click(function(){filterCate(),"0"==$("#cateIdStr").val()?$(".J_profilter").hasClass("J_profilter_active")&&$(".J_profilter").removeClass("J_profilter_active"):$(".J_profilter").hasClass("J_profilter_active")||$(".J_profilter").addClass("J_profilter_active"),$("#J_conbar").show(),$("#J_goodlist").show(),$("footer").show(),$(".new-header").show()}),b.click(function(){var a=$(this);c.removeClass("selected"),c.removeClass("disable"),a.addClass("selected")}),c.click(function(){var a=$(this);a.hasClass("disable")||(a.hasClass("selected")?(3==$(".J-filter-item .item.sub.selected").length?$(".J-filter-item .item.sub").not(".selected").removeClass("disable"):1==$(".J-filter-item .item.sub.selected").length&&b.addClass("selected"),a.removeClass("selected")):(b.hasClass("selected")&&b.removeClass("selected"),a.addClass("selected"),3==$(".J-filter-item .item.sub.selected").length&&$(".J-filter-item .item.sub").not(".selected").addClass("disable")))});var d=$("#preview").val();(void 0==d||null==d||1!=d)&&($(".con_btns a").eq(1).click(function(){var a=getSelectedCateIdStr();$(this).hasClass("set")?($(this).removeClass("set"),$("#stockFlag").val(0),$(this).attr("report-eventparam","0"),filterGood({sortFlag:$("#sortFlag").val(),stockFlag:$("#stockFlag").val(),vs:$("#vs").val(),actId:$("#actId").val(),cateIdStr:a})):($(this).addClass("set"),$("#stockFlag").val(1),$(this).attr("report-eventparam",1),$(".soldout").each(function(){$(this).parent().remove()}))}),$(".con_btns a").eq(2).click(function(){var a=getSelectedCateIdStr(),b="",c=0;$(this).addClass("set"),$(this).siblings().each(function(){"avaliable"!=$(this).attr("id")&&$(this).removeClass("set inc dec")}),c=$(this).hasClass("inc")?1:2,"price-asc"==b?$(this).attr("report-eventparam","asc"):$(this).attr("report-eventparam","desc"),$(this).hasClass("inc")?$(this).removeClass("inc").addClass("dec"):$(this).removeClass("dec").addClass("inc"),$("#sortFlag").val(c),filterGood({sortFlag:c,stockFlag:$("#stockFlag").val(),vs:$("#vs").val(),actId:$("#actId").val(),cateIdStr:a})})),loadJdHeadAndFooter(),priceInfo(),getStockInfo(),getCouponInfo()});