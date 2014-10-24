define(function (require,exports,module){

	/**
	*登陆请求
	**/
	function loginActive(send_msg,httpType,url,dataFormat,fnScc){
		common.https(send_msg,httpType,url,dataFormat,fnScc);
	};

	module.exports = {

		loginActive:loginActive
		
	};
});