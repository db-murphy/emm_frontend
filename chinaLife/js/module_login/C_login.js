define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var common = require('module_common/common');
	var variables = require('module_variables/variables');
	var M = require('module_msg/Model');
	var V_login = require('./V_login');
	var createSendMsg = require('module_send_msg/send_msg');

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
		$("#username").focus();
	};
	
	/**
	* 输入密码时实时判断密码长度
	**/
	function listenPwdLength(){
		$('#passwords').keydown(function(){
			passwordLength();
		});
	};
	

	/**
	* 点击登陆按钮
	**/
	function loginSubmit(){
		$('#login_form').submit(function() {

			var bPass = false;
			var user_name = $('#username').val();
	        var pwd = $('#passwords').val();
	        var oFormListUsr = $('#username').closest('.form-group');
	        var oFormListPass = $('#passwords').closest('.form-group');

	        /**
			*校验表单
			**/
	        if($.trim(user_name)===''){
	        	oFormListUsr.addClass('has-error');
	        	bPass = false;
	        }else{
	        	oFormListUsr.removeClass('has-error');
	        	bPass = true;
	        };

	        if($.trim(pwd)===''){
	        	oFormListPass.addClass('has-error');
	        	bPass = false;

	        }else{
	        	oFormListPass.removeClass('has-error');
	        	bPass = true;
	        };

	        if(!bPass){
	        	$('#login_reminder').text('账户或密码不能为空');
	        	return false;
	        };

			/**
			*登陆请求
			**/
			var send_msg = createSendMsg.login_send_msg();
			M.httpActive(send_msg,'POST',variables.httpPort.loginUrl,'json',function(data){
				V_login.loginActiveScc(data);
			});

			return false;
	    });
	};
	
	
	/**
	* 判断密码长度
	**/
	function passwordLength(){
		var pwd = $('#passwords').val();
		var oFormListPass = $('#passwords').closest('.form-group');

		if($.trim(pwd).length + 1 >= 6){
			oFormListPass.removeClass('has-error');
		}else if($.trim(pwd).length < 6){
			oFormListPass.addClass('has-error');
		}
	};

	module.exports = {
		createLoadingBox:createLoadingBox,
		giveInputFocus:giveInputFocus,
		listenPwdLength:listenPwdLength,
		loginSubmit:loginSubmit
	};
});
