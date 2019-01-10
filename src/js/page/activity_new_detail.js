

var activityNewDetail = (function(c, $) {
	var pageId = ''; //由列表页或者首页传过来的详情主键id
	var dom = {
		title: document.getElementById("title"),
		//signUp: document.getElementById("signUp"),
		detailContainer: document.getElementById("detailContainer"),
		collectLi: document.getElementById('collectLi'),
		topPopover: document.getElementById("topPopover"),
		menu: document.getElementById("menu")
	}

	function collectEventHandler() {
		mui('body').on('shown', '.mui-popover', function(e) {
			dom.collectLi.addEventListener('tap', function() {
				//mui.toast("我是收藏的点击事件");
				if(dom.collectState.classList.contains('collect-state-active')) {
					var _self = this;
					c.dataUtil.cancelCollect(pageId, "1", function(res) {
						console.log('===取消收藏===' + JSON.stringify(res));
						if(res.SystemCode == 1) {
							$.toast('取消成功');
							dom.collectState.classList.remove('collect-state-active');
							dom.collectState.classList.add('collect-state');
							collectState.innerHTML = "未收藏";
							dom.collectStar.classList.remove('u-func-favor-active');
							dom.collectStar.classList.add('u-func-favor');
						} else {
							$.toast('取消失败');
						}
					}, function(xhr, type, err) {
						$.toast('取消失败，请稍后重试');
					})
				} else {
					var _self = this;
					//此处应该调取后端收藏接口
					c.dataUtil.collectActivity(pageId, '1', function(res) {
						console.log('===收藏活动===' + JSON.stringify(res));
						if(res.SystemCode == 1) {
							dom.collectState.classList.remove('collect-state');
							dom.collectState.classList.add('collect-state-active');
							collectState.innerHTML = "已收藏";
							dom.collectStar.classList.remove('u-func-favor');
							dom.collectStar.classList.add('u-func-favor-active');
							$.toast('收藏成功');
						} else {
							$.toast('收藏失败');
						}
					}, function(xhr, type, err) {
						$.toast('收藏失败，请稍后重试');
					})
				}

			})
		});
	}

	function initPage() {
		c.dataUtil.getActivityDetail(pageId, function(res) {
			plus.nativeUI.closeWaiting();
			console.log('===活动/培训详情===' + JSON.stringify(res));
			if(res.SystemCode == 1) {
				if(res.data.activityType == 1) { //活动
					dom.title.innerText = '活动详情';
//					dom.menu.style.display = 'block';
				} else { //培训
					dom.title.innerText = '培训详情'
				}
				dom.topPopover.innerHTML = template('detailStateTmpl', {
					detail: res.data,
					picHost: c.IMAGE_GET_CONFIG
				})
				dom.collectState = document.getElementById("collectState");
				dom.collectStar = document.getElementById("collectStar");
				dom.collectLi = document.getElementById("collectLi");
				dom.detailContainer.innerHTML = template('detailContainerTmpl', {
					detail: res.data,
					picHost: c.IMAGE_GET_CONFIG
				})
					//下面注掉的代码请一定要保留，因为下期会做报名，此期暂时不做
				dom.signUp = document.getElementById("signUp");

				if(res.data.isFinish == 1) {
					dom.signUp.style.display = "block";
					dom.signUp.innerHTML = '报名时间已结束';
					dom.signUp.style.background = "#cccccc";
				}
				if(res.data.isFinish == 0&&res.data.isApply == 1) {
					dom.signUp.style.display = "block";
					dom.signUp.innerHTML = '已报名';
				}

//				if(res.data.isFinish == 0 && res.data.isCeil == 1) {
//					dom.signUp.style.display = "block";
//					dom.signUp.innerHTML = '报名人数已满';
//				}

				if(res.data.isFinish == 0 && res.data.isApply == 0) {
					dom.signUp.style.display = "block";
					console.log("我是按钮"+signUp)
	//				下面注掉的代码请一定要保留，因为下期会做报名，此期暂时不做
					dom.signUp.addEventListener('tap', function() {
						plus.nativeUI.showWaiting();
						var activityId = this.dataset.id;
						console.log('活动id' + activityId);
						var status = '1';
						console.log(111);
						if(res.data.isFinish == 0 && res.data.isApply == 0 ) {
							c.dataUtil.activitySignIn(activityId, status, function(res) {
								console.log('===报名数据===' + JSON.stringify(res));
								plus.nativeUI.closeWaiting();
								if(res.SystemCode == 1) {
									$.toast('报名成功');
									//console.log("我是报名的按钮" + dom.signUp.innerHTML);
									dom.signUp.style.display = "none";
								} else if(res.SystemCode == 2) {
									dom.signUp.style.display = "none";
									$.toast('报名已达上限');
								} else {
									$.toast('报名失败');
								}
							})
						}
	
					})
				}

				

			}else {
				$.toast(c.ERROR_CONFIG[res.SystemCode]);
			}
		}, function(xhr, type, err) {
			plus.nativeUI.closeWaiting();
			$.toast('服务器异常，请稍后重试');
		})
	}

	return {
		init: function() {
			pageId = plus.webview.currentWebview().pageId;
			plus.nativeUI.showWaiting('加载中');
			initPage();
			collectEventHandler();
		}
	}
}(window, mui));