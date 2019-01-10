/*
 * 说明：设置
 * 时间：2018/3/14  10：47
 * 创建：ch
 */
var settings = (function(c, $) {
	var ui = {
		quit: document.getElementById("quit"),
		gSwitch: document.getElementById("switch"),
		modifyPwd: document.getElementById("modifyPwd"),
		privacyAct: document.getElementById("privacy_act"),
	}

	//事件绑定
	function bindEvents() {
		//退出登录操作
		ui.quit.addEventListener('tap', function() {
			plus.storage.removeItem('userInfo');
			plus.runtime.restart();
		})

		//自定义事件 => 设置手势成功
		c.addEventListener('setGestureSuccess', function(e) {
			ui.gSwitch.classList.add('mui-active');
		})

		//手势密码开关的操作
		ui.gSwitch.addEventListener('toggle', function(e) {
			if(e.detail.isActive) { //启动开关应该跳转手势设置的页面
				ui.gSwitch.classList.remove('mui-active');
				ui.gSwitch.querySelector('.mui-switch-handle').setAttribute('style', '');
				c.webviewUtil.show('resetGesture', null, null, null, null);
			} else { //关闭开关应该调取后端的删除手势的接口
				ui.gSwitch.classList.add('mui-active');
				c.dataUtil.closeGpassword(function(res) {
					console.log('===清空手势密码===' + JSON.stringify(res));
					if(res.SystemCode == 1) {
						ui.gSwitch.classList.remove('mui-active');
						ui.gSwitch.querySelector('.mui-switch-handle').setAttribute('style', '');
						var userInfo = JSON.parse(plus.storage.getItem('userInfo'));
						plus.storage.setItem('useGestureLogin', userInfo.userName + '-false');
					} else {
						$.toast('关闭失败')
					}
				}, function(xhr, type, err) {
					$.toast('关闭失败')
				})
			}
		})

		//修改密码跳转
//		ui.modifyPwd.addEventListener('tap', function() {
//			c.webviewUtil.show('modifyPwd', null, null, null, null);
//		})
		
		//隐私协议跳转
		ui.privacyAct.addEventListener('tap', function() {
			c.webviewUtil.show('privacyAct', null, null, null, null);
		})

	}
	return {
		init: function() {
			plus.nativeUI.showWaiting('加载中...');
			bindEvents();
			var useGestureLogin = plus.storage.getItem('useGestureLogin');
			if(useGestureLogin && useGestureLogin.split('-')[1] == 'true') {
				ui.gSwitch.classList.add('mui-active');
			}
			setTimeout(function() {
				document.querySelector('.g-setting').style.display = 'block';
				plus.nativeUI.closeWaiting();
			}, 300)
		}
	}
}(window, mui));