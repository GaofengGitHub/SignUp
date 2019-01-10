/*
 * 说明：活动/活动列表
 * 时间：2018/3/20 09：09
 * 创建人：kwy
 */
var activityList = (function(c, $) {
	var nextUrl = "";

	function activityHandler() {
		//跳转公告详情页
		$('#activityList').on('tap', '.mui-table-view-cell', function() {
			var obj = this.dataset.obj;
			var idx = this.dataset.idx;
			webviewUtil.show('activityNewDetail', null, null, null, {
				detail: JSON.parse(obj),
				pageId: idx
			});

		});
	}

	//获取列表数据
	function activityIndexList(isRefresh) {
		var refreshBlock = $('#listBlock').pullRefresh();
		if(isRefresh) { //下拉刷新
			c.dataUtil.getNewActivityList(null, function(res) {
				console.log('【===最新活动列表===】' + JSON.stringify(res));
				refreshBlock.endPulldown(); //结束下拉	
				if(res.SystemCode == 1) {
					nextUrl = res.data.nextUrl;
					if(res.data.varList) {
						document.getElementById('activityList').innerHTML = template('activityTemplate', {
							acList: res.data.varList,
							picHost: c.IMAGE_GET_CONFIG
						})
					} else { //没有记录
						document.getElementById('activityList').innerHTML = '<div class="no-data" style="margin-top: 160px;width:100%;height:100%;"><img src="../../assets/images/404/no-data.png" style="width: 200px;height: 150px;"/><div>暂时没有数据</div></div>';
					}
					if(nextUrl == '') { //无下一页数据
						refreshBlock.disablePullupToRefresh(); //禁用上拉
					} else {
						refreshBlock.enablePullupToRefresh(); //启用上拉
						refreshBlock.refresh(true); //重置上拉
					}
				} else {
					$.toast(ERROR_CONFIG[data.SystemCode]);
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
			c.dataUtil.getNewActivityList(HOST_CONFIG + nextUrl, function(res) {
				console.log('【===最新活动列表 下一页===】' + JSON.stringify(res));
				if(res.SystemCode == 1) {
					nextUrl = res.data.nextUrl;
					document.getElementById('activityList').innerHTML += template('activityTemplate', {
						acList: res.data.varList,
						picHost: IMAGE_GET_CONFIG
					});
					if(nextUrl == '') {
						refreshBlock.endPullupToRefresh(true);
					} else {
						refreshBlock.endPullupToRefresh(false);
					}
				} else {
					mui.toast(ERROR_CONFIG[data.SystemCode]);
					refreshBlock.endPullupToRefresh(true);
					return;
				}
			}, function(xhr, type, err) { //error
				refreshBlock.endPulldown(); //结束下拉
				refreshBlock.disablePullupToRefresh(); //禁用上拉
				mui.toast('服务器异常，请稍后重试！');
				return;
			});
		}

	}

	return {
		init: function() {
			activityHandler();
		},
		activityIndexList: activityIndexList
	}
})(window, mui);