define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var C_login = require('./C_login.js');

	/**
	* 创建Loading模块标签,并且追加到页面最下方
	**/
	C_login.createLoadingBox();

	/**
	* 进入登陆界面输入框获取焦点
	**/
	C_login.giveInputFocus();

	/**
	* 回车键提交数据
	**/
	//C_login.keyReturnActive();

	/**
	* 输入密码时实时判断密码长度
	**/
	C_login.listenPwdLength();

	/**
	* 点击文本框改变颜色
	**/
	//C_login.giveInputColor();

	/**
	* 点击登陆按钮
	**/
	C_login.loginSubmit();

});
