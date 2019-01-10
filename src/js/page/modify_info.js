/*
 * 说明：修改用户信息
 * 时间：2018/4/23 16:46
 * 创建：ch
 * 
 */
var editUserInfo = (function(c, $) {

	var ui = {
			name: document.getElementById("realName"),
			nickName: document.getElementById("nickName"),
			phone: document.getElementById("telephone"),
			email: document.getElementById("email"),
			wechat: document.getElementById("wechat"),
			qq: document.getElementById("QQ"),
			content: document.querySelector(".mui-content"),
			done: document.getElementById("done"),
			idNum: document.getElementById("idNum")
		},
		userId;

	var info_arr = ['name', 'nickName','phone', 'email', 'wechat', 'qq', 'idNum'];

	function bindEvents() {
		//点击提交
		ui.done.addEventListener('tap', function() {
			var obj = {};
			obj.userId = userId;
			for(var i = 0; i < info_arr.length; i++) {
				obj[info_arr[i]] = ui[info_arr[i]].value
			}
			console.log(JSON.stringify(obj));
			if(obj.email != '' && !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(obj.email)) {
				$.toast('邮箱格式不正确');
				return;
			}
			if(obj.name == '') {
				$.toast('请输入真实姓名');
				return;
			}
			if(obj.phone == '') {
				$.toast('请输入手机号');
				return;
			}
			if(obj.idNum == '') {
				$.toast('请输入身份证号');
				return;
			}
			if(obj.phone != '' && !/^1[34578]\d{9}$/.test(obj.phone)) {
				$.toast('请输入正确的手机号');
				return;
			}
			if(obj.idNum != '' && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(obj.idNum)) {
				$.toast('请输入正确的身份证号');
				return;
			}
			if(obj.nickName == '') {
				$.toast('请输入昵称');
				return;
			}
			$.confirm('是否确认提交？', '提示', ['确认', '取消'], function(e) {
				if(e.index == 1 || e.index == -1) {
					return;
				} else {
					console.log(JSON.stringify(obj));
					plus.nativeUI.showWaiting('提交中...');
					c.dataUtil.saveUserInfo(obj, function(res) {
						plus.nativeUI.closeWaiting();
						console.log('===提交修改===' + JSON.stringify(res));
						if(res.SystemCode == 1) {
							if(obj.nickName != '') {
								$.fire(plus.webview.currentWebview().opener(), 'afterModify', {
									nickName : obj.nickName
								})
							}
							$.toast('提交成功');
						} else {
							$.toast(c.ERROR_CONFIG[res.SystemCode]);
						}
					}, function(xhr, type, err) {
						plus.nativeUI.closeWaiting();
						$.toast('提交失败');
					})
				}
			})
		})
	}

	return {
		init: function() {
			plus.nativeUI.showWaiting('加载中...');
			userId = JSON.parse(plus.storage.getItem('userInfo')).userId;
			c.dataUtil.getUserInfo(userId, function(res) {
				console.log('===用户信息===' + JSON.stringify(res));
				if(res.SystemCode == 1) {
					ui.content.style.display = 'block';
					for(var i = 0; i < info_arr.length; i++) {
						if(res.data[info_arr[i]]) {
							ui[info_arr[i]].value = res.data[info_arr[i]];
						} else {
							ui[info_arr[i]].value = '';
						}
						
					}
				}
				plus.nativeUI.closeWaiting();
			}, function(xhr, type, err) {
				plus.nativeUI.closeWaiting();
				$.toast('获取信息失败，请稍后重试');
			});

			bindEvents();
		}
	}
}(window, mui));