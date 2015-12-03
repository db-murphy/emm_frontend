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
	        this.op = op;
	        return that.img.init(op);
	    },

	    img_each: function(img_lazy) {
	    	var _this = this;

	    	img_lazy.each(function(index, node) {
                if (!this.dataset.layzr) {
                    return;
                }

                if (!_this.inViewport(this)) {
                	return
                }

                _this.act(this);
            });
	    },
	    
	    act: function(_self) {
	    	var $_self = $(_self);
	    	var _this = this;

            if ($_self.attr('loaded')) {
                return;
            }
            var img = new Image(), original = _self.dataset.layzr;

            img.onload = function() {
                $_self.attr('src', original).removeAttr('data-layzr');
                _this.op.load_sucess && _this.op.load_sucess(_self);
            }
            img.onerror = function() {
            	var error_type = _self.dataset.error;

            	switch(error_type) {
            		case 'adver':
            			$_self.attr('src', adver_error_img_url());
            			break;

            		case 'adver-logo':
            			$_self.attr('src', ader_logo_error_img());
            			break;
            	}	

            	_this.op.load_sucess && _this.op.load_sucess(_self);
            	//$_self.attr('src', _self.dataset.layzr);
            }

            original && (img.src = original);
            $_self.attr('loaded', true);
	    },

	    inViewport: function(el) {
	    	var top       = this.img.scroll_view.offset().top;
            var btm       = top + this.op.iscroller.wrapperHeight;
            var el_bottom = $(el).offset().top;

            //return el_bottom >= top && el_bottom <= btm;
            return el_bottom <= btm;
	    },

	    refreshImg: function() {
	    	this.img.imgs = $('img[data-layzr]');
	    	this.img_each(this.img.imgs);
	    },

	    img: {
	    	imgs: $('img[data-layzr]'),
	    	scroll_view: $('#scroll-view'),
	        init: function(n) {
	        	var _this = this;

	            n.iscroller.on('scroll', function() {
	            	lazyload.img_each(_this.imgs);
	            });
	            lazyload.img_each(_this.imgs);
	            return lazyload;
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

	            tick_run(CD, lables, spans, i);
	            
	            i.countDownInterval = window.setInterval(function () {
	                tick_run(CD, lables, spans, i);
	            }, 1000);
	        });

			function tick_run(CD, lables, spans, i) {
				CD.tick(-1);
                if (CD.secondCount > 0) {
                    if(CD.day > 0){
                        spans[0].innerHTML = CD.day;
                    }else{
                        $(lables[0]).remove();
                        $(spans[0]).remove();
                        $(i).addClass("waring");
                    }
                    
                    if(CD.hour > 0 || (CD.hour == 0 && CD.day>0)){
                        spans[1].innerHTML = CD.hour;
                    }else{
                        $(lables[1]).remove();
                        $(spans[1]).remove();
                    }
                    
                    if(CD.minute > 0 ||(CD.minute == 0 && CD.hour>0) || (CD.minute == 0 && CD.day>0)){
                        spans[2].innerHTML = CD.minute;
                    }else{
                        $(lables[2]).remove();
                        $(spans[2]).remove();
                    }
                    
                    spans[3].innerHTML = CD.second;

                } else {
                    $(i).html("<span>活动已结束</span>");
                }
			}
	    };
	};

	function loadJdHeadAndFooter(iscroller, pos_filter){
		var body_dom     = $('body');
		var vs           = body_dom.attr("data-vs");
		var header       = $('#header');
		var tip          = $('#jd-tip');
		var jd_header    = $('#jd-header');
		var header_ready = false;
		var scroll_top;
		var timer;
		
		if(null == vs || undefined == vs || "jdapp" == vs || "weixin" == vs || typeof MCommonHeaderBottom == 'undefined'){
			scroll_top = header.height();
			$('#scroll-view').css('top', scroll_top + 'px');
			iscroller._resize();
			pos_filter && pos_filter();
			return;
		}

	    var mchb      = new MCommonHeaderBottom();
	    var sid       = body_dom.attr("data-sid");
	    var showTitle = body_dom.attr("data-title");

	    /*公共头部*/
	    var headerArg = {
	    	hrederId : 'jd-header', 
	    	title:showTitle, 
	    	sid : sid, 
	    	isShowShortCut : false, 
	    	selectedShortCut : '4',
	    	call: function() {
	    		//refresh_header_height(iscroller);
	    	}
	    }

	    mchb.header(headerArg);

	    /*app下载*/
	    var tipArg = {tipId : 'jd-tip', sid : sid, isfloat: false, isAlwayShow : true,
	        onClickTrynow: function(){

	        },
	        onClickTipX: function(){
	        	
	        },
	        call: function() {
	        	//refresh_header_height(iscroller);
	        },
	        downloadAppPlugIn:{sourceType:'Sale',sourceValue:'sale-act', downAppURl  : 'http://h5.m.jd.com/active/download/download.html?channel=jd-mxz2'}
	    };

	    mchb.jdTip(tipArg);
	    timer = setInterval(function() {
	    	refresh_header_height(iscroller);
	    }, 100)

	    /**公共尾部**/
	    var footerPlatforms3 = mchb.platformEnum('http://www.jd.com/#m',sid).enum3;//标准版 触屏版 电脑版 客户端 4个    
	    var bottomArg = {bottomId : 'jd-footer', sid : sid, pin : "" ,footerPlatforms : footerPlatforms3, call: function() {

	    }};
	    mchb.bottom(bottomArg);

	    function refresh_header_height(iscroller) {
	    	if(header_ready) {
	    		clearInterval(timer);
	    		timer = null;
	    	}

			if(tip.children().length && jd_header.children().length && !header_ready) {
				scroll_top = header.height();
				$('#scroll-view').css('top', scroll_top + 'px');
				iscroller._resize();
				pos_filter && pos_filter();

				$('#jd-nav div[report-eventid="MDownLoadFloat_Close"]').click(function() {
					scroll_top = header.height();
					$('#scroll-view').css('top', scroll_top + 'px');
					iscroller._resize();
					pos_filter && pos_filter();
				});

				$('#jd-nav div[report-eventid="MCommonHead_NavigateButton"]').click(function() {
					scroll_top = header.height();
					$('#scroll-view').css('top', scroll_top + 'px');
					iscroller._resize();
					pos_filter && pos_filter();
				});

				header_ready = true;
			}
		}
	}

	module.exports = {
		lazyload: lazyload,
		Countdown: Countdown,
		loadJdHeadAndFooter: loadJdHeadAndFooter
	};
});