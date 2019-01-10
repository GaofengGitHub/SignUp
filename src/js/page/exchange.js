/*
 * 说明：我的反馈
 * 时间：2018/3/30/ 13:15
 * 创建：lj
 */
//获取反馈列表
var getExList = (function(c, $) {
	var nextUrl = ""; //下一页
	var ui = {
		listBlock: document.getElementById("listBlock")
	},
	qrcode = new QRCode('qrcode'),
	userId = null;
	
	var bindEvents = function() {
		$('body').on('tap', '.order_num', function() {
			var activityId = this.dataset.activityId;
			var activityEnd = this.dataset.activityEnd;
			var activityStart = this.dataset.activityStart;
			var certificate = this.dataset.certificate;
			if((new Date(activityStart.replace(/-/g,  "/")).getTime()-600000)<new Date().getTime()){
				var scanObj = {
					activityEnd:activityEnd,//二维码有效期
					userId:userId, //默认用户id
					activityId:activityId //活动id
				}
				console.log(JSON.stringify(scanObj));
				qrcode.makeCode(JSON.stringify(scanObj));
				document.getElementById("preview").innerText = this.dataset.title;
				document.getElementById("qrcode_container").style.display = 'block';
			}else{
				$.toast("活动开始时间提前十分钟才可以生成签到二维码进行签到哦")
			}
			
			
			
		});
		
		document.getElementById("qrcode_container").addEventListener('tap', function() {
			document.getElementById("qrcode_container").style.display = 'none';
			qrcode.clear();
		})
		
		window.addEventListener("refreshSignPage",function(){
			console.log("====签到列表刷新====")
			exchangeList(true);
		})
		
		
	}

	//获取列表数据
	function exchangeList(isRefresh) {
		var refreshEl = $('#refreshContainer').pullRefresh();
		if(isRefresh) { //下拉刷新
			c.dataUtil.getExchangeList(function(res) {
				console.log('===签到列表===' + JSON.stringify(res));
				refreshEl.endPulldown(); //结束下拉	
				if(res.SystemCode == 1 || res.success) {
					nextUrl = res.nextUrl;
					userId = res.userId;
					if(res.data && res.data.length) {
						ui.listBlock.innerHTML = template('exchangeContainerTmpl', {
							List: res.data,
							picHost: c.IMAGE_GET_CONFIG
						});
					} else {
						ui.listBlock.innerHTML = '<div class="no-data" style="margin-top: 160px;width:100%;height:100%;"><img src="../../assets/images/404/no-data.png" style="width: 200px;height: 150px;"/><div>暂时没有数据</div></div>';
					}

//					if(nextUrl == '') { //无下一页数据
//						refreshEl.disablePullupToRefresh(); //禁用上拉
//					} else {
//						refreshEl.enablePullupToRefresh(); //启用上拉
//						refreshEl.refresh(true); //重置上拉
//					}
				} else {
					$.toast(ERROR_CONFIG[res.SystemCode]);
//					refreshEl.disablePullupToRefresh(); //禁用上拉
					return;
				}
			}, function(xhr, type, err) { //error
				refreshEl.endPulldown(); //结束下拉
//				refreshEl.disablePullupToRefresh(); //禁用上拉
				$.toast('服务器异常，请稍后重试！');
				return;
			});
		} 
	}

	return {
		init: function() {
			bindEvents();
			//			plus.nativeUI.showWaiting('加载中...');
		},
		exchangeList: exchangeList
	}
})(window, mui);