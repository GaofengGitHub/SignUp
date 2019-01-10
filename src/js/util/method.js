/*
 * 说明：常用方法工具类
 * 创建人：ch
 * 创建时间：2018/3/6 11:19
 * 修改人：ch
 * 修改时间：2018/3/6 11:19
 */
(function(c) {

	/*
	 * 调用相机
	 * @param callBack 拍照成功回调函数
	 */
	function getCamera(callBack) {
		var camera = plus.camera.getCamera();
		camera.captureImage(function(path) {
			callBack(path);
		}, function(error) {
			console.log(error.message);
		}, {
			filename: "_doc/camera/",
			index: 1
		})
	}

	/*
	 * 压缩图片
	 * @param src 文件路径
	 * @param dst 压缩后路径
	 * @quality 图片质量
	 */
	function compressImage(src, dst, sCallBack, fCallBack, quality) {
		quality = quality || 40;
		plus.zip.compressImage({
			src: src,
			dst: dst,
			overwrite: true,
			quality: quality
		}, function(event) {
			sCallBack && sCallBack(event);
		}, function() {
			fCallBack && fCallBack();
		});
	}

	/*
	 * 图片上传
	 * @param path 图片路径
	 * @param callBack 回调函数
	 */
	function uploadImage(path, callBack) {
		var task = plus.uploader.createUpload(c.IMAGE_UPLOAD_CONFIG, {
			method: "POST"
		}, function(t, status) {
			console.log(JSON.stringify(t))
			if(status == 200) {
				var result = JSON.parse(t.responseText);
				callBack(result);
			} else {
				plus.nativeUI.toast('图片上传失败');
			}
		});
		task.addFile(path, {
			key: "files"
		});
		task.start();
	}

	/*
	 * 验证token是否失效
	 * @param xhr type err => ajax的error回调参数
	 * @param callBack 回调函数
	 */
	function checkToken(xhr, type, err, callBack) {
		console.log("checktoken")
		if(xhr.status == 599) { //599 token过期
			console.log("599")
			plus.nativeUI.closeWaiting();
			var main = plus.webview.getWebviewById('main');
			mui.fire(main, 'destroyTokenTimer');
			mui.toast('身份验证过期，请重新登录');
			c.webviewUtil.show('login', null, null, null, null)
		} else {
			console.log("callback before"+xhr.status)
			callBack && callBack(xhr, type, err);
		}
	}

	/*
	 * emoji表情过滤
	 * @param content 需过滤的内容
	 */
	function filterEmoji(content) {
		for(var i = 0; i < content.length; i++) {
			var hs = content.charCodeAt(i);
			if(0xd800 <= hs && hs <= 0xdbff) {
				if(content.length > 1) {
					var ls = content.charCodeAt(i + 1);
					var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
					if(0x1d000 <= uc && uc <= 0x1f77f) {
						plus.nativeUI.toast("不能输入emoji表情!");
						return false;
					}
				}
			} else if(content.length > 1) {
				var ls = content.charCodeAt(i + 1);
				if(ls == 0x20e3) {
					plus.nativeUI.toast("不能输入emoji表情!");
					return false;
				}
			} else {
				if(0x2100 <= hs && hs <= 0x27ff) {
					plus.nativeUI.toast("不能输入emoji表情!");
					return false;
				} else if(0x2B05 <= hs && hs <= 0x2b07) {
					plus.nativeUI.toast("不能输入emoji表情!");
					return false;
				} else if(0x2934 <= hs && hs <= 0x2935) {
					plus.nativeUI.toast("不能输入emoji表情!");
					return false;
				} else if(0x3297 <= hs && hs <= 0x3299) {
					plus.nativeUI.toast("不能输入emoji表情!");
					return false;
				} else if(hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 ||
					hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b ||
					hs == 0x2b50) {
					plus.nativeUI.toast("不能输入emoji表情!");
					return false;
				}
			}
		}
		return true;
	}

	/*
	 * 获取token令牌
	 */
	function token() {
		if(plus.storage.getItem('userInfo')) {
			return JSON.parse(plus.storage.getItem('userInfo')).token
		}
		return ''
	}

	/*
	 * 获取完整的图片url
	 * 
	 */
	function getImage(id, w, h) {
		w = w || 100;
		h = h || 100
		return c.IMAGE_GET_CONFIG + id + '?renditions=fill-' + w + 'x' + h
	}
	/*
	 * 说明：解决ios上点击提交后键盘收起并马上弹出的问题
	 * 备注：目前并不适用页面内原本就有readonly的表单控件，只是做了一个简单的封装
	 * 
	 */

	function solveSoftKeyboard() {
		var inputs = document.querySelectorAll('input');
		var textareas = document.querySelectorAll('textarea');

		if(inputs) {
			for(var i = 0; i < inputs.length; i++) {
				inputs[i].readOnly = true;
			}

			setTimeout(function() {
				for(var i = 0; i < inputs.length; i++) {
					inputs[i].readOnly = false;
				}
			}, 1000)
		}
		if(textareas) {
			for(var i = 0; i < textareas.length; i++) {
				textareas[i].readOnly = true;
			}
			setTimeout(function() {
				for(var i = 0; i < textareas.length; i++) {
					textareas[i].readOnly = false;
				}
			}, 1000)
		}
	}

	/*
	 * 说明：获取当前登录的角色，表现为是少先队还是凝聚青春
	 * 备注：需要在plusready下执行
	 */

	function getRole() {
		var ret = "0";
		var roleRef = {
			'1bcfc6cc201542ab8947d5d7c7ca40d5': '0', //智慧少先队角色ID
			'e8919206b423421184d5ee2da1c1e938': '1' //凝聚青春角色ID
		};
		var userInfo;

		if(plus && plus.storage && plus.storage.getItem) {
			userInfo = JSON.parse(plus.storage.getItem('userInfo'));
			if(userInfo && userInfo.rolerId) {
				ret = roleRef[userInfo.rolerId] || '0';
			}
		}
		return ret;

	}

	/*
	 * 说明：判断应用是否获取了定位权限并作出相应处理
	 * 备注：Android表现形式多样，ios直接打开应用设置页面,简单封装，后面精简代码
	 * 
	 */
	function judgeAuthorityandDealt() {
		openedActions2 = plus.navigator.checkPermission('LOCATION');

		if(mui.os.ios) {
			var ios = plus.navigator.checkPermission('LOCATION');
			switch(ios) {
				case 'authorized': //定位服务开					
					break;
				default: //没有开启定位服务
					mui.confirm('您没有开启定位，是否去设置？', '提示', ['确认', '取消'], function(e) {
						if(e.index == 1 || e.index == -1) {
							plus.webview.currentWebview().close();
						} else {
							plus.runtime.openURL("app-settings:");
							return;
						}
					})
					break;
			}
		} else {
			var context = plus.android.importClass("android.content.Context");
			var locationManager = plus.android.importClass("android.location.LocationManager");
			var main = plus.android.runtimeMainActivity();
			var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
			androidIsOpen = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
			if(!androidIsOpen) { //没有开启定位
				mui.confirm('您没有开启定位，是否去设置？', '提示', ['确认', '取消'], function(e) {
					if(e.index == 1 || e.index == -1) {
						return
					} else {
						var main = plus.android.runtimeMainActivity(); //获取activity
						var Intent = plus.android.importClass('android.content.Intent');
						var Settings = plus.android.importClass('android.provider.Settings');
						var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); //可设置表中所有Action字段
						main.startActivity(intent);
						return;
					}
				})
			}
		}

	}

	
	/*
	 * 说明：刷新token定时器
	 * 
	 */
	function refreshTokenTimer() {
		// 重置token换新定时器
		var main = plus.webview.getWebviewById('main');
		mui.fire(main, 'resetTokenTimer')
	}

	c.methodUtil = {
		getCamera: getCamera,
		uploadImage: uploadImage,
		checkToken: checkToken,
		filterEmoji: filterEmoji,
		compressImage: compressImage,
		token: token,
		getImage: getImage,
		solveSoftKeyboard: solveSoftKeyboard,
		getRole: getRole,
		judgeAuthorityandDealt: judgeAuthorityandDealt,
		refreshTokenTimer: refreshTokenTimer
	};
}(window));