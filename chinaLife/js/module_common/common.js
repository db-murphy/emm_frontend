define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var variables = require('module_variables/variables.js');
	var utils = require('module_utils/utils.js');

	/**
	 * ajax全局拦截
	 */
	$.ajaxSetup({
		timeout : 3000,
		global : true,
		async: true,
		error : function(xhr, status, e) {
			showAlert('请求出错','','');
		},
		complete : function(xhr, status) {
			// 隐藏Loading框
			hideLoading();
		},
		beforeSend : function(request) {

			var tokenId = window.sessionStorage.getItem('TOKENID');
			if (utils.NullToStr(tokenId) == "") {
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
	 * 显示alert提示框
	 * @param content 弹出框显示的内容
	 */
	function showAlert(content,url,event){
		$("#id_windowDiv").remove();
		createWindow(url,event);
		$("#id_window_title").html("提示:");
		$("#id_window_content").html(content);
		$('#id_window').modal('show');
		console.log(url);
	}

	/**
	 * 创建提示框Confirm和Alert的DIV标签,并且追加到页面最下方
	 */
	function createWindow(url, event) {
		var windowDiv = '<div id="id_windowDiv">'+
			'<div class="modal fade" id="id_window" tabindex="-1" role="dialog" aria-hidden="true">'+
				   '<div class="modal-dialog">'+
				      '<div class="modal-content" style="width:400px;margin-left:30%;">'+
				         '<div class="modal-header">'+
				            '<h4 class="modal-title" id="id_window_title" style="font-size:12px;"></h4>'+
				         '</div>'+
				         '<div class="modal-body" id="id_window_content" style="height:30px;font-size:16px;"></div>'+
				         '<div class="modal-footer" id="id_window_footer" style="height:50px;">';
						if(url != '' || event != ''){
							windowDiv += '<button type="button" class="btn" data-dismiss="modal" id="id_window_closeBtn" onclick="returnUrl('+url+',\''+event+'\')" style="margin-top:-10px;">关闭</button>';
						}else{
							windowDiv += '<button type="button" class="btn" data-dismiss="modal" id="id_window_closeBtn" style="margin-top:-10px;">关闭</button>';
						}
				           
						windowDiv += '</div>'+
				      '</div>'+
				   '</div>'+
			'</div></div>';
		$(document.body).append(windowDiv);
	}

	/**
	*封装http请求
	**/
	function https(json,httpType,url,dataFormat,fnScc){
		$.ajax({
			type: httpType,
			url: variables.BasePath + url,
			dataType: dataFormat,
			data: json,
			success: function(data){
				fnScc&&fnScc(data);
			}
		});
	};

	/**
	 * 创建Loading的DIV标签,并且追加到页面最下方
	 */
	function createLoadingDiv() {
		var loadDiv = '<div id="loading"><div class="modal fade  bs-example-modal-sm" isShow=true id="loadingModalMes" tabindex="-1" role="dialog" aria-labelledby="loading" aria-hidden="false">'
				+ '<div class="modal-dialog" style="width: 210px;height: 100px;margin-top:20%;">' + '<div class="modal-content" style="background-color:#000000;opacity: 0.3;">'
				+ '<div class="modal-body" id="messages">' + '<span id="mess"><img src="img/common/loader.gif"/>&nbsp;&nbsp;&nbsp;&nbsp;<font color="white">正在加载，请稍后......</font></span>'
				+ '</div></div></div></div>';
		$(document.body).append(loadDiv);
	}

	/**
	 * 显示Loading
	 */
	function showLoading() {
		$("#loadingModalMes").modal('show');
	}

	/**
	 * 隐藏Loading
	 */
	function hideLoading() {
		$("#loadingModalMes").modal('hide');
	}

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

	/**
	* 接口导出
	**/
	module.exports = {

		create_header:create_header,
		create_footer:create_footer,
		showLoading:showLoading,
		createLoadingDiv:createLoadingDiv,
		https:https
		
	};

});