/*!
 * =================================================
 * name: 公共view
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 公共数据页面渲染，包括渲染头部与脚部视图
 * =================================================
 */

define(function (require,exports,module){
	
	// 渲染头部
	// ---------------------
	function render_header(data, iscroller) {
		/**
		 * -----------------------------------
		 * @ jquery_dom 头部juqery对象
		 * @ head       head标签
		 * @ jd_nav     京东总部头部html
		 * @ header     页面头部区域
		 * @ scroll_top 滚动区域距离页面顶部的距离
		 * -----------------------------------
		 */
		var jquery_dom = $(data);
		var head       = $('head');	
		var jd_nav     = $('#jd-nav');
		var header     = $('#header');
		var scroll_top;

		$.each(jquery_dom, function(i, dom) {
			if(dom.tagName == 'SCRIPT') {
				dom.innerHTML = '/*我是三方头部js*/' + dom.innerHTML;
				head.append(dom);
			}else if(dom.tagName == 'STYLE') {
				dom.innerHTML = '/*我是三方头部css*/' + dom.innerHTML;
				head.append(dom);
			}else{
				jd_nav.append(dom);
			}
		});

		scroll_top = header.height();
		$('#scroll-view').css('top', scroll_top + 'px');

		$('#btnJdkey').click(function() {
			scroll_top = header.height();
			$('#scroll-view').css('top', scroll_top + 'px');
		});

		$(window).bind('orientationchange', function() {
			scroll_top = header.height();
			$('#scroll-view').css('top', scroll_top + 'px');
		});
	}

	// 渲染尾部
	// ---------------------
	function render_footer(data) {
		var jquery_dom = $(data);
		var head = $('head');
		var view_scroller = $('.view-scroller');	
		var jd_footer = $('.jd-footer');	

		$.each(jquery_dom, function(i, dom) {
			if(dom.tagName == 'SCRIPT') {
				dom.innerHTML = '/*我是三方尾部js*/' + dom.innerHTML;
				head.append(dom);
			}else if(dom.tagName == 'STYLE') {
				dom.innerHTML = '/*我是三方尾部css*/' + dom.innerHTML;
				head.append(dom);
			}else{
				jd_footer.append(dom);
			}
		});
	}

	module.exports = {
		render_header: render_header,
		render_footer: render_footer
	};
});