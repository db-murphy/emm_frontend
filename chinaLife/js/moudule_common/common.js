define(function (require,exports,module){

	var variables = require('../moudule_variables/variables.js');

	/**
	 * ajax全局拦截
	 */
	$.ajaxSetup({
		timeout : 3000,
		global : true,
		error : function(xhr, status, e) {
			showAlert('请求出错','','');
		},
		complete : function(xhr, status) {
			// 隐藏Loading框
			hideLoading();
		},
		beforeSend : function(request) {

			var tokenId = window.sessionStorage.getItem('TOKENID');
			if (NullToStr(tokenId) == "") {
				var url = window.location.href;
				if(url.indexOf("login.html")<0){
					window.location.href = "login.html";
				}			
			}
			request.setRequestHeader('TOKENID', tokenId);
			// 显示Loading框
			var divList = $(".modal-backdrop");
			if(divList.length<=0){
				showLoading();
				var bl = $("#loadingModalMes").attr("isShow");
				if(Boolean(bl) && bl!="false"){
					// 显示Loading框
				}
			};
		},
		success : function(data, textStatus, jqXHR) {
			verification(data, textStatus, jqXHR);
		}
	});

	

	/**
	 * 获取URL参数
	 */
	function getUrlParam(param) {
		var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
		var url = window.location.search.substr(1).match(reg);
		if (url != null)
			return decodeURIComponent(url[2]);
		return null;
	};

	function menuActive() {
		var mid = getUrlParam("mid");
		var length = variables.menuJson.length;
		var menuHtml = '';
		for (var i = 0; i < length; i++) {
			var menu = variables.menuJson[i];
			if (menu.leaf) {
				if (menu.id === mid) {
					menuHtml += '<li id="menu_' + menu.id + '" class="active" >'
				} else {
					menuHtml += '<li id="menu_' + menu.id + ' ">'
				};

				menuHtml += '<a href="javascript:gotoUrl(\'' + menu.id + '\',\''
						+ menu.url + '\');">' + menu.text + '</a>';
				menuHtml += '</li>';
			}
		}
		return menuHtml;
	}

	function gotoUrl(id, url) {
		location.href = url + "?mid=" + id;
	};

	/**
	* 创建顶部导航栏
	**/
	function create_header(){
		var topMenuHTML = "";
			topMenuHTML += '<nav class="navbar navbar-default" role="navigation">';
			topMenuHTML += '<div class="container-fluid">';
			topMenuHTML += '<div class="navbar-header">';
			topMenuHTML += '<button data-target="#bs-example-navbar-collapse-1" data-toggle="collapse" class="navbar-toggle" type="button">';
			topMenuHTML += '<span class="sr-only">Toggle navigation</span>';
			topMenuHTML += '<span class="icon-bar"></span>';
			topMenuHTML += '<span class="icon-bar"></span>';
			topMenuHTML += '<span class="icon-bar"></span>';
			topMenuHTML += '</button>';
			topMenuHTML += '<a href="main.html" class="navbar-brand">NQSky EMM</a>';
			topMenuHTML += '</div>';
			topMenuHTML += '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">';
			topMenuHTML += '<ul class="nav navbar-nav">';
			var menuHtml = menuActive();
			topMenuHTML += menuHtml;
			topMenuHTML += '</ul>';
			topMenuHTML += '<ul class="nav navbar-nav navbar-right">'
			topMenuHTML += '<li>';
			topMenuHTML += '<p class="navbar-text">';
			topMenuHTML += '当前登录用户：';
			topMenuHTML += '</p>';
			topMenuHTML += '</li>';

			topMenuHTML += '<li id="menu_right" class="dropdown">';
			topMenuHTML += '<a id="a_userName" href="#" class="dropdown-toggle" data-toggle="dropdown"></a>';
			topMenuHTML += '<ul class="dropdown-menu">';

			topMenuHTML += '<li id="menu_right_1">';
			topMenuHTML += '<a href="service.html?mr=1">服务管理</a>';
			topMenuHTML += '</li>';
			topMenuHTML += '<li class="divider"></li>';
			topMenuHTML += '<li id="menu_right_2">';
			topMenuHTML += '<a href="#" role="button" data-toggle="modal" data-target="#changePswModal" onclick="modelChangePsws()">修改密码</a>';
			topMenuHTML += '</li>';
			topMenuHTML += '<li class="divider"></li>';
			topMenuHTML += '<li onclick="logout();">';
			topMenuHTML += '<a href="javascript:logout();">注销</a>';
			topMenuHTML += '</li>';
			topMenuHTML += '</ul>';
			topMenuHTML += '</li>';
			topMenuHTML += '</ul>';
			topMenuHTML += '</div>';
			topMenuHTML += '</div>';
			topMenuHTML += '</nav>';
			$('body').prepend(topMenuHTML);
	};

	/**
	* 生成页脚
	**/
	function create_footer() {
		var arr =[
			'<footer class="bs-footer" role="contentinfo">',
				'当前版本:V 0.5.2.80',
			'</footer>'
		]; 
		var html = arr.join('');
		$('body').append(html);
	};

	module.exports = {

		create_header:create_header,
		create_footer:create_footer
		
	};

});