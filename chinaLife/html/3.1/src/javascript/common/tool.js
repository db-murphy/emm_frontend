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
	            var that        = this;
	            var img_lazy    = $('img[data-layzr]');
	            var scroll_view = $('#scroll-view');
	            
	            function inViewport(el) {
	                var top       = scroll_view.offset().top;
	                var btm       = top + n.iscroller.wrapperHeight;
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

	function Countdown(secondCount) {
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
	        var countDownDoms = $("[secondcount]");

	        countDownDoms.each(function (n, i) {
	            $(i).attr("start","1");
	            var second = $(i).attr("secondcount");
	            second = window.parseInt(second);
	            var CD = new Countdown(second);
	            var spans = $(i).find("em");
	            var lables = $(i).find("label");

	            i.countDownInterval = window.setInterval(function () {
	                CD.tick(-1);
	                if (CD.secondCount > 0) {
	                    if(CD.day > 0){
	                        spans[0].innerHTML = CD.day;
	                    }else{
	                        $(lables[0]).remove();
	                        $(i).addClass("waring");
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
	                    $(i).html("<span>活动已结束</span>");
	                }
	            }, 1000);
	        });
	    };
	};

	module.exports = {
		lazyload: lazyload,
		Countdown: Countdown
	};
});