define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var common = require('../moudule_common/common.js');
	var variables = require('../moudule_variables/variables.js');
	var M_login = require('../moudule_login/M_login.js');
	var V_login = require('../moudule_login/V_login.js');

	/**
	 * 创建Loading的DIV标签,并且追加到页面最下方
	 */
	 common.createLoadingDiv();

	/**
	* 输入框获取焦点
	**/
	$(".username").focus();

	/**
	* 回车键提交数据
	**/
	$(document).keydown(function(ev) {
		var oEvent = ev || event;
		var iCode = oEvent.keyCode;

		if (iCode == 13) {
			$("#submitBtn").click();
			return false;
		}
	});

	$('#password').keydown(function(){
		passwordLength();
	});

	/**
	* 点击文本框改变颜色
	**/
	$('.username').click(function(){
		$('.username').attr("style","");
		$('#username').html('');
		$('#mes').html('');
	});
	$('.password').click(function(){
		$('.passwords').attr("style","");
		$('#passwords').html('');
	});

	/**
	* 点击登陆按钮
	**/
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
		*发送登陆请求
		**/
		M_login.loginActive({
				username: user_name,
				password: pwd
		},'POST',variables.loginUrl,'json',function(data){
			V_login.loginActiveScc(data);
		});

		
    });
	
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
	}
});