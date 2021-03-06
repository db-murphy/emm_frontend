/*!
 * =================================================
 * name: 常量申明文件
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 申明一些常量，例如接口地址
 * =================================================
 */

define(function (require,exports,module){
	/**
	 * 接口地址
	 * ----------------------------------------
	 * @ api.head_url           请求头部地址
	 * @ api.footer_url         请求尾部地址
	 * @ api.price_info_url     请求首页价格地址
	 * @ api.stock_info_url     请求首页库存地址
	 * @ api.coupons_url        请求优惠券结构地址
	 * @ api.coupons_status_url 请求优惠券状态地址
	 * @ api.detail_price_url   请求详情页价格地址
	 * @ api.detail_stock_url   请求详情页库存地址
	 * @ api.filter_comfirm_url 筛选商品地址
	 * ----------------------------------------
	 */
	var api = {
		head_url          : "//m.jd.com/app/header.action",
		footer_url        : "//m.jd.com/app/footer.action",
		price_info_url    : "//pm.3.cn/prices/mgets",
		stock_info_url    : "/sg4jdappjson/checkStockBySkuids.html",
		coupons_url       : "//m.red.jd.com/sg4jdapp/detailCouponNew.html",
		coupons_status_url: "/sg4jdappjson/checkUserCoupon.html",
		detail_price_url  : "//pm.3.cn/prices/mgets",
		detail_stock_url  : "/sg4jdappjson/checkStockBySkuids.html",
		filter_comfirm_url: "/sg4jdapp/filterNew.html"
	};

	var userAgent = navigator.userAgent;
	var is_ios = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
	var is_uc = userAgent.indexOf('UCBrowser') != -1;

	/**
	 * 配置参数
	 * ---------------------------
	 * @ config.debug 是否是测试状态
	 * ---------------------------
	 */
	var config = {
		debug: red_debug,
		is_ios: is_ios,
		is_uc: is_uc
	};

	var header_html = '<script>function _toggleJdKey(){if(document.getElementById("jdkey").style.display=="none"){document.getElementById("jdkey").style.display="";}else{document.getElementById("jdkey").style.display="none";}}function _pageBack(){var currentLocation = window.location.href;if(/#top/.test(currentLocation)){window.history.go(-2);window.location.load(window.location.href);}else{window.history.back();window.location.load(window.location.href);}}</script>';

	header_html += '<style type="text/css">.new-header-append{line-height:1.25em;min-width:320px;font-size:1em;font-family:"microsoft yahei",Verdana,Arial,Helvetica,sans-serif;color:#000;-webkit-text-size-adjust:none}.new-header-append,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,input,legend,li,ol,p,select,table,td,textarea,th,ul{margin:0;padding:0}.new-tbl-type{display:table;width:100%}.new-tbl-cell{display:table-cell}.new-jd-logo{position:relative;padding:0 10px}.new-hlogo-btn{position:absolute;top:0;right:10px}.new-m-cart,.new-m-myjd{display:inline-block;width:30px;height:39px}.new-m-cart span,.new-m-myjd span{display:inline-block;width:26px;height:21px;margin-top:13px;background:url(http://st.360buyimg.com/m/images/touch2013/icon2b.png?v=jd2015111918) 4px 0 no-repeat;background-size:180px 180px;text-indent:-9999px}.new-m-cart span{width:24px;height:21px;background-position:-24px 0}.new-header{position:relative;z-index:8888;height:44px;background:#e4393c}.new-a-back,.new-a-back2,.new-a-home,.new-a-out{position:absolute;top:6px}.new-header-v1{background:#edecec}.new-header h2{height:44px;line-height:44px;font-weight:400;font-size:16px;color:#fff;text-align:center}.new-header-v1 h2{color:#000}.new-a-edit,.new-a-home{line-height:32px;color:#6e6e6e;font-size:14px}.new-a-home{left:6px;width:56px;height:32px;background:url(http://st.360buyimg.com/m/images/touch2013/icon.png?v=jd2015111918) no-repeat;text-indent:18px}.new-a-back span,.new-a-back2,.new-a-edit,.new-a-jd span,.new-a-out{text-indent:-9999px}.new-a-out{right:12px;width:32px;height:30px;background:url(http://st.360buyimg.com/m/images/touch2013/icon.png?v=jd2015111918) -23px -1474px}.new-a-out .new-logo{display:inline-block;width:52px;height:29px;background:url(http://st.360buyimg.com/m/images/touch2013/icon.png?v=jd2015111918) 1px -546px no-repeat}.new-a-back{left:6px;width:30px;height:32px}.new-a-back span{display:inline-block;width:10px;height:18px;margin-top:6px;background:url(http://st.360buyimg.com/m/images/touch2013/icon2b.png?v=jd2015111918) -60px 0 no-repeat;background-size:180px 180px}.new-a-back2{background:url(http://st.360buyimg.com/m/images/touch2013/icon.png?v=jd2015111918) 3px -1431px no-repeat;height:32px;left:6px;width:30px}.new-a-edit,.new-a-jd{top:6px;width:37px;height:30px;position:absolute}.new-a-back-v1{background-position:3px -1431px}.new-a-edit{right:12px;background:url(http://st.360buyimg.com/m/images/touch2013/icon.png?v=jd2015111918) 7px -669px no-repeat;text-align:center}.new-a-jd{right:7px}.new-a-jd span{display:inline-block;width:21px;height:21px;margin:5px 0 0 8px;background:url(http://st.360buyimg.com/m/images/touch2013/icon2b.png?v=jd2015111918) -125px -24px no-repeat;background-size:180px 180px}.new-a-edit{background-position:16px -605px}.new-header .new-srch-box{width:auto;margin:0 70px 0 12px;padding-right:90px;background-color:#fff}.new-header .new-srch-box-v1{width:84%;margin-left:40px;padding-right:0}.new-header .new-srch-box-v2{padding-right:30px}.new-header .new-srch-box-v3{width:62%;margin-left:40px;padding-right:30px}.new-header .new-srch-box-v1 .new-srch-input{margin-right:0}.new-header .new-srch-lst{position:absolute;top:31px;left:-1px;z-index:100;width:100%}.new-a-cancel{position:absolute;top:0;left:0;width:40px;height:44px;line-height:44px;font-size:14px;color:#fff;text-align:center}.new-header .new-s-close{right:3px}.new-header .new-s-close-v1{right:55px}.new-a-search{position:absolute;top:6px;right:16px;width:37px;height:30px;line-height:30px;font-size:16px;font-weight:700;color:#fff}.new-jd-tab{border-bottom:1px solid #d0cece;background-color:#fff}.new-jd-tab .new-tbl-cell{width:25%;padding:9px 0;font-size:12px;color:#fff;text-align:center}.new-jd-tab .new-tbl-cell span{vertical-align:text-top}.new-jd-tab .new-tbl-cell .icon,.new-jd-tab .new-tbl-cell .icon2,.new-jd-tab .new-tbl-cell .icon3,.new-jd-tab .new-tbl-cell .icon4{display:inline-block;width:22px;height:22px;background:url(http://st.360buyimg.com/m/images/touch2013/icon2b.png?v=jd2015111918) -60px -25px no-repeat;background-size:180px 180px;text-indent:-9999px}.new-jd-tab .new-tbl-cell .icon2{width:26px;background-position:0 -25px}.new-jd-tab .new-tbl-cell .icon3{width:25px;background-position:-29px -25px}.new-jd-tab .new-tbl-cell .icon4{width:22px;background-position:-85px -25px}.new-jd-tab .new-tbl-cell .icon.on{background-position:-157px 0}.new-jd-tab .new-tbl-cell .icon2.on{background-position:-154px -24px}.new-jd-tab .new-tbl-cell .icon3.on{background-position:-154px -49px}.new-jd-tab .new-tbl-cell .icon4.on{background-position:-155px -74px}.new-jd-tab .new-tbl-cell .txt{display:block}.new-header-download-con{bottom:0;position:fixed;width:100%;z-index:11109}.new-header-download-con .new-header-down_app{background:rgba(68,68,79,.95);display:block;height:4.4em;line-height:4.285em;margin:0 auto;max-width:640px;min-width:320px;position:relative;vertical-align:middle;width:100%}</style>';

	header_html += '<div class="new-header new-header-append">'+
				    	'<a href="javascript:_pageBack();" class="new-a-back"><span>返回</span></a>'+
				    	    		'<h2>京东闪购·品牌特卖</h2>'+
				    	        '<a href="javascript:void(0)" id="btnJdkey" onclick="_toggleJdKey()" class="new-a-jd"><span>京东键</span></a>'+
				    '</div>';

	header_html += '<div class="new-jd-tab new-header-append" style="display: none" id="jdkey">'+
				    	'<div class="new-tbl-type">'+
				            '<a href="http://m.jd.com/index.html?sid=5e71d8c420e33238e15c022c6f15347a" class="new-tbl-cell">'+
				            	'<span class="icon">首页</span>'+
				    			'<p style="color:#6e6e6e;">首页</p>'+
				            '</a>'+
				            '<a href="http://m.jd.com/category/all.html?sid=5e71d8c420e33238e15c022c6f15347a" class="new-tbl-cell">'+
				            	'<span class="icon2">分类搜索</span>'+
				    			'<p style="color:#6e6e6e;">分类搜索</p>'+
				            '</a>'+
				            '<a href="http://m.jd.com/cart/cart.action?sid=5e71d8c420e33238e15c022c6f15347a" id="html5_cart" class="new-tbl-cell">'+
				            	'<span class="icon3">购物车</span>'+
				    			'<p style="color:#6e6e6e;">购物车</p>'+
				            '</a>'+
				            '<a href="http://m.jd.com/user/home.action?sid=5e71d8c420e33238e15c022c6f15347a" class="new-tbl-cell">'+
				            	'<span class="icon4">我的京东</span>'+
				    			'<p style="color:#6e6e6e;">我的京东</p>'+
				            '</a>'+
				        '</div>'+
				    '</div>'; 

	var footer_html = '<footer><div class="new-footer"><div class="new-f-login"><a href="https://passport.m.jd.com/user/login.action?sid=68a96e2af6ec34b75b92cade95cb806e">登录</a><span class="new-bar2">|</span><a href="https://passport.m.jd.com/user/mobileRegister.action?sid=68a96e2af6ec34b75b92cade95cb806e">注册</a><span class="new-back-top"><a href="http://m.jd.com/showvote.html?sid=68a96e2af6ec34b75b92cade95cb806e">反馈</a><span class="new-bar2">|</span><a href="#top">回到顶部</a></span></div><div class="new-f-section"><span id="clientArea"><a href="http://m.jd.com/download/downApp.html?sid=68a96e2af6ec34b75b92cade95cb806e" id="toClient" class="openJD" style="color:#6e6e6e">客户端</a></span><a href="javascript:void(0)" class="on">触屏版</a><a onclick="skip();" href="javascript:void(0);">电脑版</a></div><div class="new-f-section2">Copyright © 2012-2015  京东JD.com 版权所有</div></div></footer>';

	footer_html += '<script>function skip(){addCookie("pcm","1",3,"","jd.com");var e=document.location.href;if(0==e.indexOf("http://m.jd.com/sale/mall")){var t=e.replace("http://m.jd.com/sale/mall","http://sale.jd.com/mall");t+="#m",window.location.href=t}else if(0==e.indexOf("http://m.jd.com/sale/act")){var t=e.replace("http://m.jd.com/sale/act","http://sale.jd.com/act");t+="#m",window.location.href=t}else window.location.href="http://www.jd.com/#m"}function addCookie(e,t,a,n,o){var c=e+"="+escape(t);if(""!=a){var i=new Date;i.setTime(i.getTime()+24*a*3600*1e3),c+=";expires="+i.toGMTString()}""!=n&&(c+=";path="+n),""!=o&&(c+=";domain="+o),document.cookie=c}!function(){function e(e,t,a){var n=document.getElementsByTagName("script");for(i=0;i<n.length;i++)if(n[i].src&&-1!=n[i].src.indexOf(e))return void n[i].addEventListener("load",function(){a&&a()},!1);var o=document.createElement("script"),c={type:"text/javascript",charset:"utf-8"};t=t||{};for(var i in t)c[i]=t[i];o.src=e;for(var i in c)o.setAttribute(i,c[i]);o.addEventListener("load",function(){a&&a()},!1),document.getElementsByTagName("head")[0].appendChild(o)}e("http://st.360buyimg.com/m/js/2013/installapp.js?v=jd2015111918",{},function(){window.downcheck("#clientArea",!1)})}();</script>';
	footer_html += '<style type="text/css">.new-footer{margin-top:10px;background-color:#f3f2f2;font-size:14px;color:#6e6e6e;text-align:center}.new-footer .new-f-login{position:relative;padding:0 12px;background-color:#a8a8a8;line-height:27px;color:#fff;text-align:left;heigth:27px}.new-footer .new-f-login .new-back-top{position:absolute;right:12px}.new-footer .new-f-login .new-bar2{margin:0 5px}.new-footer .new-f-login a{color:#fff}.new-footer .new-f-section a{margin-left:20px;color:#6e6e6e}.new-footer .new-f-section .on{color:#c30202}.new-footer .new-f-section a:first-child{margin-left:0}.new-banner-img,.new-banner-img2,.new-banner-img3,.new-download-app{width:320px;height:61px;margin:0 auto}.new-bl{padding:0 15px}.new-footer .new-f-section,.new-footer .new-f-section2{padding:10px 0}.new-footer .new-f-section2{padding-top:0;font-size:12px;color:#6e6e6e}.new-f-banner{background-color:#fff}.new-banner-img,.new-banner-img2{background:url(http://st.360buyimg.com/m/images/touch2013/banner_footer.gif?v=jd2015111918) #fff}.new-banner-img2{background:url(http://st.360buyimg.com/m/images/touch2013/banner_footer.gif?v=jd2015111918)}.new-banner-img3{background:url(http://st.360buyimg.com/m/images/touch2013/banner_footer.gif?v=jd2015111918) no-repeat #fff}.new-download-app{display:block;border-bottom:1px solid #dad4cf;border-top:1px solid #fcfaf9;background-color:#fff;font-size:.875em;line-height:44px;text-align:center}</style>';

	var goods_lists = '<a href="javascript:;">' +
	                        '<div class="goods-img">' +
	                            '<div class="goods-waring"><p>仅&nbsp;剩</p><p class="waring-number">3</p></div>' +
	                            '<img src="../dist/images/goods_list_default.jpg" class="animated" data-layzr="../dist/images/goods5.jpg" alt="商品图片">' +
	                        '</div>' +
	                        '<p class="goods-name">纯棉印花袖口里寸方领长袖寸衫</p>' +
	                        '<p class="new-price"><span class="price-type">&yen;</span><span class="new-price-number">1856</span><span class="discount">2.3折</span></p>'
	                        '<p class="old-price"><span class="old-price-info">吊牌价</span>&yen;&nbsp;9540</p>'
	                    '</a>';

	module.exports = {
		api: api,
		config: config,
		header_html: header_html,
		footer_html: footer_html,
		goods_lists: goods_lists
	};
});