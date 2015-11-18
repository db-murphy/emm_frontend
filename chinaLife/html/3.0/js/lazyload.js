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
            
            function inViewport(el) {
                var top = window.pageYOffset
                var btm = window.pageYOffset + window.innerHeight
                var elTop = $(el).offset().top;
                return elTop >= top && elTop - 400 <= btm
            }
            
            $(window).bind('scroll', function() {
                $('img.lazy').each(function(index, node) {
                    var $this = $(this)
                    if (!$this.attr('dataimg')) {
                        return
                    }
                    if (!inViewport(this))
                        return
                    act($this)
                
                })
            }).trigger('scroll')
            
            function act(_self) {
                if (_self.attr('loaded'))
                    return;
                var img = new Image(), original = _self.attr('dataimg')
                img.onload = function() {
                    _self.attr('src', original).removeClass('lazy');
                    n.anim && _self.css({opacity: .2}).animate({opacity: 1}, 280);
                }
                original && (img.src = original);
                _self.attr('loaded', true);
            }
        }
    }
};