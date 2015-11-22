/*!
 * =================================================
 * name: tool.js
 * author: cdhuangxiaolong@jd.com
 * time: 2015/11/02
 * description: 包含一些工具类函数
 * =================================================
 */

define(function (require, exports, module){
	var lazyload = {
	    init: function(opt) {
	        var that = this;
	        var op = {
	            anim: true
	        };
	        $.extend(op, opt);
	        that.img.init(op);
	    },
	    
	    img: {
	        init: function(n) {
	            var that = this;
	            var img_lazy = $('img[data-layzr]');
	            var scroll_view = $('#scroll-view');
	            
	            function inViewport(el) {
	                var top = scroll_view.offset().top;
	                var btm = top + n.iscroller.wrapperHeight;
	                var el_bottom = $(el).offset().top + $(el).offset().height;

	                return el_bottom >= top && el_bottom <= btm;
	            }

	            n.iscroller.on('scroll', img_each);
	            img_each();

	            function img_each() {
	            	img_lazy.each(function(index, node) {
	                    if (!this.dataset.layzr) {
	                        return;
	                    }

	                    if (!inViewport(this)) {
	                    	return
	                    }

	                    act(this);
	                });
	            }
	            
	            function act(_self) {
	            	var $_self = $(_self);

	                if ($_self.attr('loaded')) {
	                    return;
	                }
	                var img = new Image(), original = _self.dataset.layzr;

	                img.onload = function() {
	                    $_self.attr('src', original).removeAttr('data-layzr');
	                    n.load_sucess && n.load_sucess(_self);
	                }
	                original && (img.src = original);
	                $_self.attr('loaded', true);
	            }
	        }
	    }
	};

	module.exports = {
		lazyload: lazyload
	};
});