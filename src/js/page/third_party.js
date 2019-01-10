/*
 * 说明：第三方页面加载
 * 时间：2018 / 5/16 11:14
 * 创建：ch
 * 
 */
var third_party = (function() {

	function ShowSubViews(url, topPx) {
		var subView = plus.webview.create(url, null, {
			top: topPx,
			bottom: '0'
		});
		plus.webview.currentWebview().append(subView);
		subView.show();

		var old_back = mui.back;
		mui.back = function() {
			subView.canBack(function(e) {
				var canBack = e.canBack;
				if(canBack) {
					subView.back();
				} else {
					// 执行重写前的back方法
					old_back();
				}
			});
		}
	}

	return {
		init: function() {
			var url = plus.webview.currentWebview().url;
			var isIphoneX = /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
			if(isIphoneX) {
				var topPx = '85px';
			} else {
				var topPx = '60px';
			}

			document.getElementById("title").innerText = plus.webview.currentWebview().text;
			if(plus.webview.currentWebview().text == '南京U+') {
				var userInfo = JSON.parse(plus.storage.getItem('userInfo')),
					avatar = window.IMAGE_GET_CONFIG + userInfo.photo || window.IMAGE_GET_CONFIG + userInfo.portrait || window.IMAGE_GET_CONFIG + '0',
					nickname = userInfo.nickName || userInfo.userName,
					realname = userInfo.realName || userInfo.userName,
					uid = userInfo.userId;

				var obj = {
					avatar: avatar,
					nickname: nickname,
					realname: realname,
					uid: uid
				}
				window.dataUtil.MD5String(obj, function(res) {
					console.log(JSON.stringify(res));
					url = url + '?avatar=' + avatar + '&nickname=' + nickname + '&realname=' + realname + '&uid=' + uid + '&sign=' + res.data;
					ShowSubViews(url, topPx);
					
				}, function() {
					return;
				})
			} else {
				ShowSubViews(url, topPx);
			}
		}
	}
}())