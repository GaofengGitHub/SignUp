/*
 * 说明：我的
 * 时间：2018/3/14  10：47
 * 创建：ch
 */
var mineIdx = (function(c, $) {
	var ui = {
		headImage: document.getElementById("headImage"),
		name: document.getElementById("name"),
		//		org:document.getElementById("org")
	}

	//事件绑定
	function bindEvents() {
		//自定义事件 => 更新用户头像
		window.addEventListener('cutsrc', function(event) {
			ui.headImage.src = c.IMAGE_GET_CONFIG + event.detail.photoId;
			var userData = JSON.parse(plus.storage.getItem('userInfo'))
			userData.portrait = event.detail.photoId;
			userData.photo = event.detail.photoId;
			plus.storage.setItem('userInfo', JSON.stringify(userData));
		});
		
		//自定义事件 => 提交修改资料后
		window.addEventListener('afterModify', function(e) {
			var userData = JSON.parse(plus.storage.getItem('userInfo'))
			userData.nickName = event.detail.nickName;
			plus.storage.setItem('userInfo', JSON.stringify(userData));
			ui.name.innerText = e.detail.nickName;
		})
		
		//点击跳转二级页面
		$('.user-management').on('tap', 'li', function() {
			if(this.dataset.target) {
				c.webviewUtil.show(this.dataset.target, null, null, null, null);
			}
		})

		//点击上传头像 
		ui.headImage.addEventListener('tap', function() {
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: [{
					title: "从相册选择"
				}, {
					title: "拍照"
				}]
			}, function(e) {
				switch(e.index) {
					case 1:
						//从相册选择
						c.webviewUtil.show('cutImg', null, null, null, {
							//							path:path
						});
						plus.gallery.pick(function(path) {
							var cutImg = plus.webview.getWebviewById('cutImg');
							if(path) {
								$.fire(cutImg, 'path', {
									path: path
								});
							}
						}, function(e) {
							plus.webview.getWebviewById('cutImg').close();
						}, {
							filter: 'image'
						});
						break;
					case 2:
						//拍照
						webviewUtil.show('cutImg', null, null, null, {
							//								path:path
						});
						var cmr = plus.camera.getCamera();
						cmr.captureImage(function(path) {
							var cutImg = plus.webview.getWebviewById('cutImg');
							$.fire(cutImg, 'path', {
								path: path
							});
						}, function(e) {
							plus.webview.getWebviewById('cutImg').close();
							console.log(e.message);
						})
						break;
				}
			});
		})
	}

	$.ready(function() {
		c.addEventListener('login', function(e) {
			console.log('===我的页面登录===');
			var userInfo = JSON.parse(plus.storage.getItem('userInfo'));
			ui.name.innerText = userInfo.nickName || userInfo.realName || userInfo.userName.substr(0,3) + '****' + userInfo.userName.substr(7,11);
			if(userInfo.photo != '0') {
				ui.headImage.src = (c.IMAGE_GET_CONFIG + userInfo.photo || c.IMAGE_GET_CONFIG + userInfo.portrait) + '?width=100&height=100';
			}
		})
	})
	return {
		init: function() {
			bindEvents();
		}
	}
}(window, mui));


/*
 * 说明：手势重置密码
 * 时间：2018/2/21 8:56
 * 创建：ch
 */
//var ModifyGesture = (function(c, $) {
//	var encrypt = new JSEncrypt(); //初始化字符串加密对象
//	encrypt.setPublicKey(c.GLOBAL_CONFIG.publicKey); //设置公钥
//	var isSetGesture = null; //预留修改手势的标识 
//	var ui = {
//		title: document.getElementById("title"),
//		tips: document.getElementById("tip"),
//		holder: document.getElementById("holder"),
//	}
//	var record = []; //存贮手势密码
//	/* 事件绑定 */
//	function bindEvents() {
//		/* 手势密码事件处理 */
//
//		holder.addEventListener('done', function(e) {
//			var rs = e.detail;
//			if(rs.points.length < 4) {
//
//				if(record.length == 1) { //第二次
//					//					rs.sender.clear();
//					//					return;
//				} else { //第一次
//					ui.tips.innerText = '设定的手势太简单了';
//					record = [];
//					rs.sender.clear();
//					return;
//				}
//			}
//			record.push(rs.points.join(''));
//			if(record.length >= 2) {
//				if(record[0] == record[1]) {
//					plus.nativeUI.showWaiting('设定手势中...');
//					var userInfo = JSON.parse(plus.storage.getItem('userInfo')), //缓存中的用户信息
//						userName = userInfo.userName; //用户名
//
//					//Ajax请求修改手势密码
//					c.dataUtil.updatePassword(userName, '', '', encrypt.encrypt(record[1]), function(res) { //success
//							console.log('===修改手势密码===' + JSON.stringify(res));
//							plus.nativeUI.closeWaiting();
//							if(res.SystemCode === 1) { //手势设定成功
//								//更新缓存的用户信息
//								userInfo.hasgPassWord = 1;
//								plus.storage.setItem('userInfo', JSON.stringify(userInfo));
//								//更新手势登录状态
//								plus.storage.setItem('useGestureLogin', userInfo.userName + '-true');
//								$.fire(plus.webview.currentWebview().opener(), 'setGestureSuccess', {}); //触发控制修改密码部分的显示的自定义事件
//								plus.webview.currentWebview().close();
//								$.toast('手势密码设置成功');
//							} else if(res.SystemCode === 0) {
//								ui.tips.innerText = '请重新设定';
//								$.toast('后台异常');
//								rs.sender.clear();
//								record = [];
//								return;
//							} else {
//								$.toast(c.ERROR_CONFIG[res.SystemCode]);
//								ui.tips.innerText = '请重新设定';
//								rs.sender.clear();
//								record = [];
//								return;
//							}
//						},
//						function() { //error
//							plus.nativeUI.closeWaiting();
//							ui.tips.innerText = '请重新设定';
//							$.toast('服务器异常，请稍后重试！');
//						});
//				} else {
//					ui.tips.innerText = '两次手势设定不一致';
//				}
//				rs.sender.clear();
//				record = [];
//			} else {
//				ui.tips.innerText = '请确认手势设定';
//				rs.sender.clear();
//			}
//		})
//
//		/* 手势密码事件处理 end */
//	}
//
//	return {
//		init: function() {
//			bindEvents();
//		}
//	}
//})(window, mui);












