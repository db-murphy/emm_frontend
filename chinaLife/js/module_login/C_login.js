define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var common = require('module_common/common.js');
	var variables = require('module_variables/variables.js');
	var M = require('module_msg/Model.js');
	var V_login = require('module_login/V_login.js');
	var createSendMsg = require('module_send_msg/send_msg.js');

	/**
	* 创建Loading模块标签,并且追加到页面最下方
	**/
	function createLoadingBox(){
		common.createLoadingDiv();
	};

	/**
	* 输入框获取焦点
	**/
	function giveInputFocus(){
		$(".username").focus();
	};

	/**
	* 回车键提交数据
	**/
	function keyReturnActive(){
		$(document).keydown(function(ev) {
			var oEvent = ev || event;
			var iCode = oEvent.keyCode;

			if (iCode == 13) {
				$("#submitBtn").click();
				return false;
			}
		});
	};
	
	/**
	* 输入密码时实时判断密码长度
	**/
	function listenPwdLength(){
		$('#password').keydown(function(){
			passwordLength();
		});
	};

	/**
	* 点击文本框改变颜色
	**/
	function giveInputColor(){
		$('.username').click(function(){
			$('.username').attr("style","");
			$('#username').html('');
			$('#mes').html('');
		});
		$('.password').click(function(){
			$('.passwords').attr("style","");
			$('#passwords').html('');
		});
	};
	

	/**
	* 点击登陆按钮
	**/
	function loginSubmit(){
		$('#submitBtn').click(function() {
			var user_name = $('.username').val();
	        var pwd = $('.password').val();
			if($.trim(user_name)==='' && $.trim(pwd)===''){
				$('.username').attr("style","border-color:#f00;border-bottom-color:#f00;");
				$('.password').attr("style","border-color:#f00;border-bottom-color:#f00;");
				$('#username').html('用户名不能为空');
				$('#passwords').html('请输入密码');
				return false;
			}
			if($.trim(user_name)===''){
				$('.username').attr("style","border-color:#f00;border-bottom-color:#f00;");
				$('#username').html('用户名不能为空');
				return false;
			}
			if($.trim(pwd)===''){
				$('.password').attr("style","border-color:#f00;border-bottom-color:#f00;");
				$('#passwords').html('请输入密码');
				return false;
			}

			/**
			*登陆请求
			**/
			var send_msg = createSendMsg.login_send_msg();
			M.httpActive(send_msg,'POST',variables.httpPort.loginUrl,'json',function(data){
				V_login.loginActiveScc(data);
			});

	    });
	};
	
	
	/**
	* 判断密码长度
	**/
	function passwordLength(){
		var pwd = $('.password').val();
		$('#password').html('');
		$('#mes').html('');
		if($.trim(pwd).length + 1 >= 6){
			$('.password').attr("style","");
		}else if($.trim(pwd).length < 6){
			$('.password').attr("style","border-color:#f00;border-bottom-color:#f00;");
		}
	};

	module.exports = {
		createLoadingBox:createLoadingBox,
		giveInputFocus:giveInputFocus,
		keyReturnActive:keyReturnActive,
		listenPwdLength:listenPwdLength,
		giveInputColor:giveInputColor,
		loginSubmit:loginSubmit
	};
});
