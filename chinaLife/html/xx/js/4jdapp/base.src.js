function loadJdHeadAndFooter(){
	var vs = $("#vs").val();
	if(null == vs || undefined == vs || "jdapp" == vs || "weixin" == vs){
		return;
	}
	var headUrl = "//m.jd.com/app/header.action";
	var footerUrl = "//m.jd.com/app/footer.action";
	var param = new Object();
	var sid = $("#sid").val();
	var title = $("#title").val();
	var link = $("#link").val();
	if(null != sid && sid.length>0){
		param.sid = sid;
	}
	if(null != title && title.length>0){
		param.title = title;
	}
	if(null != link && link.length>0){
		param.link = link;
	}
	if(!notLoadHead || notLoadHead!=1){
		//加载头部
		$.ajax({
			"url" : headUrl,
			"type" : "post",
			"data" : param,
			"success" : function(data){
				$("body").prepend(data);
				handleHeader();
			}
		});
	}
	//加载尾部
	$.ajax({
		"url" : footerUrl,
		"type" : "post",
		"data" : param,
		"success" : function(data){
			$("body").append(data);
		}
	});
}

function handleHeader() {
	initHeader();

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

function initHeader() {
	$(".header").css({
		"position": "relative"
	});
	$(".content-wp").css({
		"margin-top": 0
	});
}

function switchCompressionRatio(){
	if(undefined == dpi || null == dpi || "" == dpi){
		return;
	}
	var height_width = dpi.split("*");
	var device_height = height_width[0];
	var device_width = height_width[1];
	var replace_str = "!q"+$("#picQua").val()+".jpg";
	if(parseInt(device_height) > 1200 || parseInt(device_width) > 800){
		$.each($("img"),function(){
			var old_srcset = $(this).attr("srcset");
			var old_src = $(this).attr("src");
			if(old_srcset){
				$(this).attr("srcset",old_srcset.replace(replace_str,""));
			}
			
			if(old_src){
				$(this).attr("src",old_src.replace(replace_str,""));
			}
			
		});
	}
}

function switchImgN(){
	var _img_n = $("#img_n_num").val();
	if(null == _img_n || undefined == _img_n){
		return;
	}
	
	if(undefined == dpi || null == dpi || "" == dpi){
		return;
	}
	var height_width = dpi.split("*");
	var device_height = height_width[0];
	var device_width = height_width[1];
	var replace_str = "/"+_img_n+"/";
	$.each($("img[srcset]"),function(){
		var old_srcset = $(this).attr("srcset");
		if(parseInt(device_height) > 1200 || parseInt(device_width) > 800){
			$(this).attr("srcset",old_srcset.replace("/n7/",replace_str));
		}
	});
	
}

(function(){
	$(document).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var wHeight = $(window).height();
		var back_top = $(".shangou_backtop");
		if(scrollTop >= wHeight){
			$("#backToTop").attr("style","display:block;");
			if(back_top){
				back_top.addClass("shangou_backtop_show");
			}
		}else{
			if(back_top){
				back_top.removeClass("shangou_backtop_show");
			}
			$("#backToTop").attr("style","display:none;");
		}
	});
})();