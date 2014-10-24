define(function (require,exports,module){

	/**
	*登陆成功回调
	**/
	function loginActiveScc(data){
		if(data != null && "undefined" != data && undefined != data){
			if(data.status.code === 0){
				//记住用户名
				if($("#remember_btn").is(':checked')){
					window.localStorage.setItem('username',user_name);
				}
				window.sessionStorage.setItem('username',user_name);
				window.sessionStorage.setItem('id',data.data.id);
				window.sessionStorage.setItem('TOKENID',data.status.msg);
				//window.location.href = 'html/main.html';	
			}else{
				$('#mes').html('用户名/密码错误,请重新输入');
			}
		}
	};

	module.exports = {

		loginActiveScc:loginActiveScc
		
	};
});