define(function (require,exports,module){
	
	// 渲染头部
	// ---------------------
	function render_header(data, iscroller) {
		var jquery_dom = $(data);
		var head = $('head');	
		var jd_nav = $('.jd-nav');	

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

		var scroll_top = $('header').height();

		$('.scroll-view').css('top', scroll_top + 'px');
		$('#btnJdkey').click(function() {
			scroll_top = $('header').height();
			$('.scroll-view').css('top', scroll_top + 'px');
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