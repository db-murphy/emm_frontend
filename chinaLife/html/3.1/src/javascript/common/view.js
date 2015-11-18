define(function (require,exports,module){
	
	// 渲染头部
	// ---------------------
	function render_header(data) {
		$("body").prepend(data);
		$(".header").css({
			"position": "relative"
		});
		$(".content-wp").css({
			"margin-top": 0
		});

		$(window).scroll(function(){
			var top = $("body").scrollTop();
			if(top >= 44) {
				$(".header").css({
					"position": "fixed"
				});
				$(".content-wp").css({
					"margin-top": "2.15rem"
				});
			} else if(top < 44) {
				$(".header").css({
					"position": "relative"
				});
				$(".content-wp").css({
					"margin-top": 0
				});
			}
		});
	}

	// 渲染尾部
	// ---------------------
	function render_footer(data) {
		$("body").append(data);
	}

	module.exports = {
		render_header: render_header,
		render_footer: render_footer
	};
});