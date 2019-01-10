/*
 * 说明：修改文本密码
 * 时间：2018/3/21 11:48
 * 创建：ch
 */
var modifyPassword = (function(c, $) {
	var encrypt = new JSEncrypt(); //初始化字符串加密对象
	encrypt.setPublicKey(c.GLOBAL_CONFIG.publicKey); //设置公钥
	var ui = {
		done: document.getElementById("done"),
		oldPwd: document.getElementById("oldPwd"),
		newPwd: document.getElementById("newPwd"),
		newConfirm: document.getElementById("newConfirm"),
	}
	//事件绑定
	function bindEvents() {

		//完成提交
		ui.done.addEventListener('tap', function() {
			document.activeElement.blur(); //收起软键盘
			if(isValid(ui.oldPwd.value.trim(), ui.newPwd.value.trim(), ui.newConfirm.value.trim())) {

				var userName = JSON.parse(plus.storage.getItem('userInfo')).userName;
				plus.nativeUI.showWaiting('提交中...');
				c.dataUtil.updatePassword(userName, encrypt.encrypt(ui.oldPwd.value.trim()), encrypt.encrypt(ui.newPwd.value.trim()), '',
					function(res) {
						plus.nativeUI.closeWaiting();
						console.log('===修改文本密码===' + JSON.stringify(res));
						if(res.SystemCode == 1) { //修改成功
							$.toast('修改成功，请牢记您的新密码');
							plus.webview.currentWebview().close();
						} else if(res.SystemCode == 1004) { //
							$.toast('原密码错误，修改失败');
							return;
						}
					},
					function(xhr, type, err) {
						plus.nativeUI.closeWaiting();
						$.toast('服务器异常，请稍后重试');
						return;
					})
			}
		})
	}
	//验证表单的合法性
	function isValid(oldPwd, newPwd, newConfirm) {
		if(!oldPwd || oldPwd.length == 0 || oldPwd == '') {
			$.toast('请输入原密码');
			return false;
		}
		if(!newPwd || newPwd.length == 0 || newPwd == '') {
			$.toast('请输入新密码');
			return false;
		}
		if(!newConfirm || newConfirm.length == 0 || newConfirm == '') {
			$.toast('请输入确认密码');
			return false;
		}
		if(oldPwd == newPwd) {
			$.toast('新旧密码不能相同');
			return;
		}
		if(!/^[a-zA-Z0-9]+$/.test(newConfirm) || !/^[a-zA-Z0-9]+$/.test(oldPwd)) {
			$.toast('密码不能含有特殊字符')
		}
		if(newPwd.length < 6 || newPwd.length > 18 || newConfirm.length < 6 || newConfirm.length > 18) {
			$.toast('密码的长度是6~18位');
			return false
		}
		if(newConfirm !== newPwd) {
			$.toast('两次密码不一致');
			return false;
		}
		return true
	}

	return {
		init: function() {
			bindEvents();
		}
	}
}(window, mui));