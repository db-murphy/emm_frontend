define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var common = require('module_common/common');
	var V = require('./V_proM');
	var M = require('module_msg/Model');
	var variables = require('module_variables/variables');

	/**
	 *开始获取所有项目列表,
	 */
	var appTotal;
	var send_msg = {
		pageSize:1
	};
	function create_List(){

		/**
		 *先取第一页列表
		 */
		M.httpActive(send_msg,'GET',variables.httpPort.projectUrl,'json',function(data){
			V.createListScc(data,function(appTotalCount){
				/**
				 *取完列表之后，跟新翻页状态信息
				 */
				updateListMsg(send_msg.pageSize,appTotalCount);
			});
			
		});

		/**
		 *点击翻页按钮
		 */
		$('#pagination').click(function(ev){
			var oTarget = $(ev.target);
			var clickLi = oTarget.closest('li')
		
			/**
			 *如果按钮不可点击
			 */
			if(clickLi.hasClass('disabled')){
				return;
			};

			/**
			 *clone对象
			 */
			var want_msg = cloneJson(send_msg);

			if(clickLi.hasClass('backBtn')){
				want_msg.pageSize--;
			}else{
				want_msg.pageSize++;
			};

			M.httpActive(want_msg,'GET',variables.httpPort.projectUrl,'json',function(data){
				V.createListScc(data,function(appTotalCount){
					/**
					 *取完列表之后，跟新翻页状态信息
					 */
					updateListMsg(want_msg.pageSize,appTotalCount);
				});
				
			});

		});
	};

	/**
	 *刷新翻页状态
	 */
	function updateListMsg(page_count,appTotalCount){
		$('.min_app_count').text((page_count-1)*10+1);
		$('.max_app_count').text((page_count-1)*10 + appTotalCount%10);
		$('.app_total').text(appTotalCount);

		appTotal = appTotalCount;
		send_msg.pageSize = page_count;

		if(send_msg.pageSize <= 1){
			$('.backBtn').addClass('disabled');
		}else{
			$('.backBtn').removeClass('disabled');
		};

		var max_page = Math.ceil(appTotalCount/10);
		
		if(send_msg.pageSize >= max_page){
			$('.fowrdBtn').addClass('disabled');
		}else{
			$('.fowrdBtn').removeClass('disabled');
		};
	};

	module.exports = {
		create_List:create_List
	};
});