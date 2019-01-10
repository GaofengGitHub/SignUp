/*
 * 说明：主页面预加载逻辑
 * 
 */
var Main = (function(c, $) {
	var refreshTokenTimer = null; //token定时器

	//设置token刷新定时器
	function setTokenRefreshTimer() {
		refreshTokenTimer = refreshTokenTimer ? window.clearInterval(refreshTokenTimer) : null; // 若定时器已存在，先清空
		refreshTokenTimer = setInterval(function() {
			c.dataUtil.tokenExchange(function(res) {
				console.log('===token置换（main）===' + JSON.stringify(res));
				if(res.SystemCode == 1) {
					var userInfo;
					if(plus.storage.getItem('userInfo')) {
						userInfo = JSON.parse(plus.storage.getItem('userInfo'))
					} else {
						userInfo = {};
					}
					userInfo.token = res.token;
					plus.storage.setItem('userInfo', JSON.stringify(userInfo));
				} else {
					c.webviewUtil.show('login', null, null, null, null)
				}
			}, function(xhr, type, err) {
				console.log('====' + xhr.status)
			});
		}, 82800000);
	}

	//事件绑定
	function bindEvents() {
		setTokenRefreshTimer();
		//重置定时器
		c.addEventListener('resetTokenTimer', function() {
			setTokenRefreshTimer();
		});

		// 自定义事件——清除定时器c
		c.addEventListener('destroyTokenTimer', function() {
			refreshTokenTimer = refreshTokenTimer ? c.clearInterval(refreshTokenTimer) : null;
		});

	}

	return {
		init: function() {
			document.activeElement.blur(); //关闭软键盘
			var views = [
				VIEW_CONFIG['messageIdx'],
				VIEW_CONFIG['mineIdx'],
				VIEW_CONFIG['mainIdx'],
				VIEW_CONFIG['youthApplicationIdx'],
			]
			c.webviewUtil.create(views, 'main');
			bindEvents();
			if(plus.webview.currentWebview().isChang) {
				var views = ['mainIdx', 'youthApplicationIdx', 'mineIdx', 'messageIdx'];
				views.forEach(function(e) {
					setTimeout(function() {
						$.fire(plus.webview.getWebviewById(e), 'login', {});
					}, 300)
				});
			}
		}
	}
})(window, mui);