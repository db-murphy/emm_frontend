define(function (require,exports,module){
	function Layzr(options) {
	    // debounce
	    this._lastScroll = 0;
	    this._ticking    = false;

	    // options
	    options = options || {};

	    this._optionsSelector   = options.selector || '[data-layzr]';
	    this._optionsAttr       = options.attr || 'data-layzr';
	    this._optionsAttrRetina = options.retinaAttr || 'data-layzr-retina';
	    this._optionsAttrBg     = options.bgAttr || 'data-layzr-bg';
	    this._optionsAttrHidden = options.hiddenAttr || 'data-layzr-hidden';
	    this._optionsThreshold  = options.threshold || 0;
	    this._optionsCallback   = options.callback || null;

	    // properties
	    this._retina  = window.devicePixelRatio > 1;
	    this._srcAttr = this._retina ? this._optionsAttrRetina : this._optionsAttr;

	    // nodelist
	    this._nodes = document.querySelectorAll(this._optionsSelector);

	    // call to create
	    this._create();
	  }

	  // DEBOUNCE HELPERS
	  // adapted from: http://www.html5rocks.com/en/tutorials/speed/animations/

	  Layzr.prototype._requestScroll = function() {
	    this._lastScroll = window.scrollY || window.pageYOffset;
	    this._requestTick();
	  };

	  Layzr.prototype._requestTick = function() {
	    if(!this._ticking) {
	      requestAnimationFrame(this.update.bind(this));
	      this._ticking = true;
	    }
	  };

	  // OFFSET HELPER
	  // borrowed from: http://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document

	  Layzr.prototype._getOffset = function(element) {
	    var offsetTop = 0;

	    do {
	      if(!isNaN(element.offsetTop)) {
	        offsetTop += element.offsetTop;
	      }
	    } while(element = element.offsetParent);

	    return offsetTop;
	  };

	  // LAYZR METHODS

	  Layzr.prototype._create = function() {
	    // fire scroll event once
	    this._requestScroll();

	    // bind scroll and resize event
	    window.addEventListener('scroll', this._requestScroll.bind(this), false);
	    window.addEventListener('resize', this._requestScroll.bind(this), false);
	  };

	  Layzr.prototype._destroy = function() {
	    // possibly remove attributes, and set all sources?

	    // unbind scroll and resize event
	    window.removeEventListener('scroll', this._requestScroll.bind(this), false);
	    window.removeEventListener('resize', this._requestScroll.bind(this), false);
	  };

	  Layzr.prototype._inViewport = function(node) {
	    // get viewport top and bottom offset
	    var viewportTop = this._lastScroll;
	    var viewportBottom = viewportTop + window.innerHeight;

	    // get node top and bottom offset
	    var elementTop = this._getOffset(node);
	    var elementBottom = elementTop + node.offsetHeight;

	    // calculate threshold, convert percentage to pixel value
	    var threshold = (this._optionsThreshold / 100) * window.innerHeight;

	    // return if element in viewport
	    return elementBottom >= viewportTop - threshold
	        && elementTop <= viewportBottom + threshold
	        && !node.hasAttribute(this._optionsAttrHidden);
	  };

	  Layzr.prototype._reveal = function(node) {
	    // get node source
	    var source = node.getAttribute(this._srcAttr) || node.getAttribute(this._optionsAttr);
	    var img = new Image();
	    var _this = this;

	    img.onload = function() {
            // set node src or bg image
		    if(node.hasAttribute(_this._optionsAttrBg)) {
		      node.style.backgroundImage = 'url(' + source + ')';
		    }
		    else {
		      node.setAttribute('src', source);
		    }

		    // call the callback
		    if(typeof _this._optionsCallback === 'function') {
		      // "this" will be the node in the callback
		      _this._optionsCallback.call(node, _this._nodes);
		    }

		    // remove node data attributes
		    node.removeAttribute(_this._optionsAttr);
		    node.removeAttribute(_this._optionsAttrRetina);
		    node.removeAttribute(_this._optionsAttrBg);
		    node.removeAttribute(_this._optionsAttrHidden);
        }

        img.src = source;
	  };

	  Layzr.prototype.updateSelector = function() {
	    // update cached list of elements matching selector
	    this._nodes = document.querySelectorAll(this._optionsSelector);
	  };

	  Layzr.prototype.update = function() {
	    // cache nodelist length
	    var nodesLength = this._nodes.length;

	    // loop through nodes
	    for(var i = 0; i < nodesLength; i++) {
	      // cache node
	      var node = this._nodes[i];

	      // check if node has mandatory attribute
	      if(node.hasAttribute(this._optionsAttr)) {
	        // check if node in viewport
	        if(this._inViewport(node)) {
	          // reveal node
	          this._reveal(node);
	        }
	      }
	    }

	    // allow for more animation frames
	    this._ticking = false;
	  };

	function create_pic_move(a, b, c) {
	    var g = function(j) {
	        return "string" == typeof j ? document.getElementById(j) : j
	    };
	    var d = function(j, l) {
	        for (var k in l) {
	            j[k] = l[k]
	        }
	        return j
	    };
	    var f = function(j) {
	        return j.currentStyle || document.defaultView.getComputedStyle(j, null)
	    };
	    var i = function(l, j) {
	        var k = Array.prototype.slice.call(arguments).slice(2);
	        return function() {
	            return j.apply(l, k.concat(Array.prototype.slice.call(arguments)))
	        }
	    };
	    var e = {
	        Quart: {
	            easeOut: function(k, j, m, l) {
	                return - m * ((k = k / l - 1) * k * k * k - 1) + j
	            }
	        },
	        Back: {
	            easeOut: function(k, j, n, m, l) {
	                if (l == undefined) {
	                    l = 1.70158
	                }
	                return n * ((k = k / m - 1) * k * ((l + 1) * k + l) + 1) + j
	            }
	        },
	        Bounce: {
	            easeOut: function(k, j, m, l) {
	                if ((k /= l) < (1 / 2.75)) {
	                    return m * (7.5625 * k * k) + j
	                }
	                else {
	                    if (k < (2 / 2.75)) {
	                        return m * (7.5625 * (k -= (1.5 / 2.75)) * k + 0.75) + j
	                    }
	                    else {
	                        if (k < (2.5 / 2.75)) {
	                            return m * (7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375) + j
	                        }
	                        else {
	                            return m * (7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375) + j
	                        }
	                    }
	                }
	            }
	        }
	    };
	    var h = function(k, n, m, l) {
	        this._slider = g(n);
	        this._container = g(k);
	        this._originHTML = this._slider.innerHTML;
	        this._slideItemList = this._container.querySelectorAll('li'); //轮播帧
	        this._resetSlideFlag = false;//是否需要无缝重置
	        this._timer = null;
	        this._count = Math.abs(m); //�ֲ�ͼ֡��
	        this._target = 0;
	        this._t = this._b = this._c = 0;
	        this.Index = 0;
	        this.SetOptions(l);
	        this.Auto = !!this.options.Auto;
	        this.Duration = Math.abs(this.options.Duration);
	        this.Time = Math.abs(this.options.Time);
	        this.Pause = Math.abs(this.options.Pause);
	        this.Tween = this.options.Tween;
	        this.onStart = this.options.onStart;
	        this.onFinish = this.options.onFinish;
	        var j = !!this.options.Vertical;
	        this._css = j ? "top" : "left";
	        var o = f(this._container).position;
	        o == "relative" || o == "absolute" || (this._container.style.position = "relative");
	        this._container.style.overflow = "hidden";
	        this._slider.style.position = "absolute";
	        this.Change = this.options.Change ? this.options.Change : this._slider[j ? "offsetHeight" : "offsetWidth"] / this._count
	    };
	    h.prototype = {
	        SetOptions: function(j) {
	            this.options = {
	                Vertical: true,
	                Auto: true,
	                Change: 0,
	                Duration: 50,
	                Time: 10,
	                Pause: 4000,
	                onStart: function() {}, onFinish: function() {}, Tween: e.Quart.easeOut
	            };
	            d(this.options, j || {}
	            )
	        },
	        Run: function(j) {
	        	
	            j == undefined && (j = this.Index);
	            //在这里面处理了index
	            j <= -2  && (j = this._count - 2) || j > this._count && (j = 0);
	            if(this.Index === -1) {
	                this._target = 0;
	            } else {
	                this._target = -Math.abs(this.Change) * (this.Index = j);
	            }

	            this._t = 0;
	            this._b = parseInt(f(this._slider)[this.options.Vertical ? "top" : "left"]);
	            this._c = this._target - this._b;

	            this.onStart();            
	            this.Move();


	        },
	        Move: function() {
	            clearTimeout(this._timer);
	            if (this._c && this._t < this.Duration) {
	                this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
	                this._timer = setTimeout(i(this, this.Move), this.Time)
	            }
	            else {
	                this.MoveTo(this._target);
	                this.Auto && (this._timer = setTimeout(i(this, this.Next), this.Pause))
	            }

	        },
	        MoveTo: function(j) {
	            this._slider.style[this._css] = j + "px"
	        },
	        firstScrollPrepare: function() {
	            var lastItem = this._slideItemList[this._count - 1];
	            var temp = lastItem.cloneNode(true);
	            this._slider.style.width = (this._count+1)+ '00%';
	            lastItem.parentNode.insertBefore(temp, this._slideItemList[0]);
	            this._slider.style.left = -this.getSize(lastItem).width + 'px';;

	        },
	        lastScrollPrepare: function() {
	            // 把第一帧放到最后面
	           var firstItem = this._slideItemList[0];
	           var temp = firstItem.cloneNode(true);
	           this._slider.style.width = (this._count+1)+ '00%';
	           this._slider.appendChild(temp);
	        },
	        resetSlide: function() {
	            var itemList, target;
	            if(this.Index >= this._count) {
	                itemList = this._container.querySelectorAll('li');
	                target = itemList[itemList.length - 1];
	                target.parentNode.removeChild(target);
	                this.Index = 0;
	                this._slider.style.left = 0;//- this.getSize(itemList[0]).width + 'px';
	            }
	            if(this.Index  <= -1) {
	                itemList = this._container.querySelectorAll('li');
	                target = itemList[0];
	                target.parentNode.removeChild(target);
	                this.Index = this._count - 1;
	                this._slider.style.left = (- this.getSize(itemList[itemList.length - 1]).width * (this._count-1))  + 'px';
	            }
	            this._resetSlideFlag = false;
	        },
	        getSize:function(element) {
	            var box = element.getBoundingClientRect();
	            return {
	                width: box.width || (box.right - box.left),
	                height: box.height || (box.bottom - box.top)
	            }
	        },
	        //换一下 Next
	        Next: function() {

	            if(this._resetSlideFlag) {
	                this.resetSlide();
	            }
	            //无疑最后切换
	            if(this.Index + 1 >= this._count) {
	                this.lastScrollPrepare();
	                this._resetSlideFlag = true;
	            }

	            this.Run(++this.Index);
	        },
	        Previous: function() {
	            if(this._resetSlideFlag) {
	                this.resetSlide();
	            }

	            if(this.Index - 1 <= -1) {
	                this.firstScrollPrepare();
	                this._resetSlideFlag = true;
	            }

	            this.Run(--this.Index);
	        },
	        Stop: function() {
	            clearTimeout(this._timer);
	            this.MoveTo(this._target) ;
	        }
	    };
	    return new h(a, b, c, {
	        Vertical: false
	    })
	}

	module.exports = {
		Layzr: Layzr,
		create_pic_move: create_pic_move
	};
});