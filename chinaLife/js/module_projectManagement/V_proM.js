define(function (require,exports,module){

	/**
	* 依赖模块
	**/
	var oUtil = require('module_utils/utils');

	function createListScc(data,fn){
		if(data != null && "undefined" != data && undefined != data){
			if(data.status.code === 0){

				var list = data.dataList;
				var strHtml = '';
				var htmlArr = [];
				var strProjectType = '';

				if(list.length > 0){
					for(var i = 0; i < list.length; i++){
						var item = list[i];
						
						if(oUtil.NullToStr(item.appType)!=""){
							strProjectType = oUtil.NullToStr(item.appType.typeName);
						}else{
							strProjectType = '暂无';
						};

						htmlArr = htmlArr.concat([
							'<tr>',
					  			'<td align="center">'+(i + 1)+'</td>',
					  			'<td>'+item.name+'</td>',
					  			'<td>'+strProjectType+'</td>',
					  			'<td>'+oUtil.NullToStr(item.remark)+'</td>',
					  			'<td>'+oUtil.UnixToDate(item.createTime)+'</td>',
					  			'<td align="center">',
					  				'<a href="appList.html?projectId='+ item.id +'">应用</a>|',
					  				'<a href="appProjectEdit.html?id='+ item.id +'&name='+item.name+'">编辑</a>|',
					  				'<a href="#" class="font-red">删除</a>',
					  			'</td>',
					  		'</tr>'
						]);
					}
				};

				fn && fn(data.pageCount);
				strHtml = htmlArr.join('');
				$("#id_grid_list").html(strHtml);
			}else{
				showAlert(data.status.msg,'','');
			}
		}
	};

	module.exports = {
		createListScc:createListScc
	};

});