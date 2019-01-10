/*
 * 说明:找回密码
 * 创建:ch
 * 时间：2018/5/5 15:50
 * 
 */
var forgotPwd = (function(c, $) {
	var encrypt = new JSEncrypt(); //初始化字符串加密对象
	encrypt.setPublicKey(c.GLOBAL_CONFIG.publicKey); //设置公钥
	var remainTime = 60; //剩余时间 单位s => 用于设置按钮的是否禁用
	var timer = null; //定时器

	var ui = {
		getVerification: document.getElementById("getVerification"),
		phoneNum: document.getElementById("phoneNum"),
		password: document.getElementById("password"),
		pwdConfirm: document.getElementById("pwdConfirm"),
		verificationCode: document.getElementById("verificationCode"),
		done: document.getElementById("done"),
	}

	//事件绑定
	function bindEvents() {
		//获取验证码
		ui.getVerification.addEventListener('tap', function(e) {
			e.stopPropagation();
			//判断手机号是否合法，合法则调取短信，不合法return
			var regTel = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
			if(!ui.phoneNum.value.trim()) {
				$.toast('请输入手机号')
				return;
			}
			if(!regTel.test(ui.phoneNum.value.trim())) {
				$.toast('请输入正确的手机号');
				return;
			}

			setTimer();
			c.dataUtil.sendCheckMsg(ui.phoneNum.value.trim(), '2', function(res) {
				console.log('===发送找回短信===' + JSON.stringify(res));
				if(res.SystemCode == 1) { //发送成功
					$.toast('发送成功');
				} else if(res.SystemCode == 10005) { //短信还在有效期内

				}
			}, function(xhr, type, err) {
				$.toast('服务器异常，请稍后重试');
			})
		})

		ui.done.addEventListener('tap', function() {
			document.activeElement.blur();
			if(!ui.phoneNum.value.trim()) {
				$.toast('请输入手机号码');
				return;
			}
			if(!/^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(ui.phoneNum.value.trim())) {
				$.toast('请输入正确的手机号')
				return;
			}
			if(!ui.password.value.trim() || !ui.pwdConfirm.value.trim()) {
				$.toast('请输入密码');
				return;
			}
			if(ui.password.value.length < 6 || ui.password.value.length > 18) {
				$.toast('密码长度不符合要求');
				return;
			}
			if(ui.password.value.trim() !== ui.pwdConfirm.value.trim()) {
				$.toast('两次密码不一致');
				return;
			}
			if(!ui.verificationCode.value.trim()) {
				$.toast('请输入验证码');
				return;
			}
//			var userPassword = encrypt.encrypt(ui.password.value.trim()); //对密码进行加密操作
			plus.nativeUI.showWaiting('找回中...')
			c.dataUtil.forgotPwd(ui.verificationCode.value.trim(), ui.phoneNum.value.trim(), ui.password.value.trim(), function(res) {
				console.log('===找回密码===' + JSON.stringify(res));
				plus.nativeUI.closeWaiting();
				if(res.SystemCode == 1) {
					$.toast('修改成功');
					plus.webview.currentWebview().close();
				} else if(res.SystemCode == 1003) {
					$.toast('用户不存在');
				} else if(res.SystemCode == 10005) {
					$.toast('验证码超时');
				} else if(res.SystemCode == 10006) {
					$.toast('验证码错误');
				} else {
					$.toast(c.ERROR_CONFIG[res.SystemCode]);
				}
			}, function() {
				$.toast('操作失败，稍后重试');
				plus.nativeUI.closeWaiting();
			})
		})

		//重写mui.back
		$.back = function() {
			$.confirm('是否放弃找回密码', '提示', ['确认', '取消'], function(e) {
				if(e.index == 1 || e.index == -1) {
					return;
				} else {
					plus.webview.currentWebview().close();
				}
			})
		}
	}
	//设置定时器
	function setTimer() {
		if(timer) {
			window.clearTimeout(timer);
		}
		ui.getVerification.disabled = true;
		ui.getVerification.innerText = remainTime + '秒';
		remainTime--;
		if(remainTime === -1) {
			ui.getVerification.disabled = false;
			ui.getVerification.innerText = '发送验证码'
			window.clearTimeout(timer);
			remainTime = 60;
			return;
		}
		timer = setTimeout(setTimer, 1000);
	}

	return {
		init: function() {
			bindEvents();
		}
	}
}(window, mui));