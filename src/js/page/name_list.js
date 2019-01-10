/*
 * 说明：我的反馈
 * 时间：2018/3/30/ 13:15
 * 创建：lj
 */
//获取反馈列表
var getNameList = (function(c, $) {
	var nextUrl = ""; //下一页
	var ui = {
		suggestContent: document.getElementById("suggestContent"),
//		editBtn: document.getElementById("editBtn"),
	}
	var id;

	//获取列表数据
	function nameList(isRefresh) {
		console.log(id)
		var refreshBlock = $('#flistBlock').pullRefresh();
		if(isRefresh) { //下拉刷新
			c.dataUtil.getNameList('',id, function(res) {
				console.log('【===活动报名列表===】' + JSON.stringify(res));
				refreshBlock.endPulldown(); //结束下拉	
				if(res.SystemCode == 1) {
					nextUrl = res.nextUrl;
					if(res.varList) {
						ui.suggestContent.innerHTML = template('suggestContentTmpl', {
							List: res.varList,
						});
					} else {
						ui.suggestContent.innerHTML = '<div class="no-data" style="margin-top: 160px;width:100%;height:100%;"><img src="../../assets/images/404/no-data.png" style="width: 200px;height: 150px;"/><div>暂时没有数据</div></div>';
					}

					if(nextUrl == '') { //无下一页数据
						refreshBlock.disablePullupToRefresh(); //禁用上拉
					} else {
						refreshBlock.enablePullupToRefresh(); //启用上拉
						refreshBlock.refresh(true); //重置上拉
					}
				} else {
					$.toast(ERROR_CONFIG[res.SystemCode]);
					refreshBlock.disablePullupToRefresh(); //禁用上拉
					return;
				}
			}, function(xhr, type, err) { //error
				refreshBlock.endPulldown(); //结束下拉
				refreshBlock.disablePullupToRefresh(); //禁用上拉
				$.toast('服务器异常，请稍后重试！');
				return;
			});
		} else { //上拉加载
			if(nextUrl == '') {
				refreshBlock.endPullupToRefresh(true);
				return;
			} else {
				refreshBlock.enablePullupToRefresh(); //启用上拉
				refreshBlock.refresh(true); //重置上拉
			}
			c.dataUtil.getNameList(HOST_CONFIG + nextUrl,id, function(res) {
				console.log('【===活动报名列表 下一页===】' + JSON.stringify(res));
				if(res.SystemCode == 1) {
					nextUrl = res.nextUrl;
					ui.suggestContent.innerHTML += template('suggestContentTmpl', {
						List: res.varList,
					});
					if(nextUrl == '') {
						refreshBlock.endPullupToRefresh(true);
					} else {
						refreshBlock.endPullupToRefresh(false);
					}
				} else {
					$.toast(ERROR_CONFIG[data.SystemCode]);
					refreshBlock.endPullupToRefresh(true);
					return;
				}
			}, function(xhr, type, err) { //error
				refreshBlock.endPulldown(); //结束下拉
				refreshBlock.disablePullupToRefresh(); //禁用上拉
				$.toast('服务器异常，请稍后重试！');
				return;
			});
		}
	}

	//事件绑定
	function bindEvents() {
		//右标跳转"添加评论"下级页面
//		ui.editBtn.addEventListener('tap', function() {
//			c.webviewUtil.show('feedBack', null, null, null, null);
//		})
		//自定义事件 => 刷新列表
		window.addEventListener('addSuccess', function(e) {
			nameList(true);
		})
	}

	return {
		init: function() {
			//			plus.nativeUI.showWaiting('加载中...');
			id=mui.currentWebview.actId;
			bindEvents();
		},
		nameList: nameList
	}
})(window, mui);