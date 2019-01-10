/*
 *	说明：注册逻辑
 * 	时间：2018/3/13
 * 	创建：ch
 */
var register = (function(c, $) {
	var encrypt = new JSEncrypt(); //初始化字符串加密对象
	encrypt.setPublicKey(c.GLOBAL_CONFIG.publicKey); //设置公钥
	var remainTime = 60; //剩余时间 单位s => 用于设置按钮的是否禁用
	var timer = null; //定时器
	var areaList = [], //区域数据
		schoolList = [], //学校数据
		classList = [], //班级数据
		areaListPicker = new mui.PopPicker(),
		schoolListPicker = new mui.PopPicker(),
		classListPicker = new mui.PopPicker();
	var obj = {
		parentId: '', //父母账号关联ID(用户ID)
		name: '', //学生姓名
		schoolId: '', //学校ID
		schoolName: '', //学校名
		classId: '', //班级ID
		className: '', //班级名
		areaId: '', //区域id
		areaName: '', //区域名
	}
	var ui = {
		getVerification: document.getElementById("getVerification"),
		registerBtn: document.getElementById("registerBtn"),
		toLogin: document.getElementById("toLogin"),
		area: document.getElementById("area"),
		school: document.getElementById("school"),
		className: document.getElementById('className'),
		infoRegister: document.getElementById("infoRegister"),
		infoConfirm: document.getElementById("infoConfirm"),
		confirmBtn: document.getElementById("confirmBtn"),
		phoneNum: document.getElementById("phoneNum"),
		password: document.getElementById("password"),
		pwdConfirm: document.getElementById("pwdConfirm"),
		verificationCode: document.getElementById("verificationCode"),
		areaInput: document.getElementById("areaInput"),
		schoolInput: document.getElementById("schoolInput"),
		classInput: document.getElementById("classInput"),
		studentName: document.getElementById("studentName"),
		tips: document.getElementById("tips"),
		tologin: document.getElementById("tologin")
	}
	var isRegistering = true; //防止重复注册标识
	//设置定时器
	function setTimer() {
		if(timer) {
			c.clearTimeout(timer);
		}
		ui.getVerification.disabled = true;
		ui.getVerification.innerText = remainTime + '秒';
		remainTime--;
		if(remainTime === -1) {
			ui.getVerification.disabled = false;
			ui.getVerification.innerText = '发送验证码';
			c.clearTimeout(timer);
			remainTime = 60;
			return;
		}
		timer = setTimeout(setTimer, 1000);
	}

	//设置picker 默认值
	function setSeletedIndex(picker, index) {
		picker.pickers[0].setSelectedIndex(index, 200)
	}

	//获取学校和班级数据
	function getChildList(parentId, type) {
		if(!parentId) {
			return;
		}
		c.dataUtil.getLinkage(parentId, function(res) {
			console.log('===学校/班级列表==' + JSON.stringify(res));
			if(res.SystemCode == 1) {
				if(type) {
					schoolList = [];
					res.data.forEach(function(item, idx, arr) {
						schoolList.push({
							value: item.id,
							text: item.orgName,
							index: idx
						})
					})
				} else {
					classList = [];
					res.data.forEach(function(item, idx, arr) {
						classList.push({
							value: item.id,
							text: item.orgName,
							index: idx
						})
					})
				}
			} else if(res.SystemCode == 10001) {
				if(type) {
					schoolList = [];
				} else {
					classList = [];
				}
			}

		}, function(xhr, type, err) {
			console.log('获取相关数据失败');
		})
	}

	//绑定事件
	function bindEvents() {
		//点击我要登录
		ui.toLogin.addEventListener('tap', function() {
			plus.webview.currentWebview().close();
		})
		ui.tologin.addEventListener('tap', function() {
			plus.webview.currentWebview().close();
		})

		//点击选择区域
		ui.area.addEventListener('tap', function() {
			document.activeElement.blur();
			if(!areaList || areaList.length == 0) {
				return;
			}
			areaListPicker.show(function(selectItems) {
				ui.areaInput.value = selectItems[0].text;
				ui.schoolInput.value = '';
				ui.classInput.value = '';
				obj.areaId = selectItems[0].value;
				obj.areaName = selectItems[0].text;
				getChildList(selectItems[0].value, true);
				setSeletedIndex(areaListPicker, selectItems[0].index);
			});

		});

		//点击选择学校
		ui.school.addEventListener('tap', function() {
			document.activeElement.blur();
			if(schoolList.length == 0) {
				return;
			}
			if(!ui.areaInput.value.trim()) {
				$.toast('请先选择区域');
				return;
			}
			if(!schoolList || schoolList.length == 0) {
				return;
			}
			schoolListPicker.setData(schoolList);
			schoolListPicker.show(function(selectItems) {
				ui.schoolInput.value = selectItems[0].text;
				ui.classInput.value = '';
				obj.schoolId = selectItems[0].value;
				obj.schoolName = selectItems[0].text;
				getChildList(selectItems[0].value, false);
				setSeletedIndex(schoolListPicker, selectItems[0].index);
			});
		})

		//点击选择班级
		ui.className.addEventListener('tap', function() {
			document.activeElement.blur();
			if(!ui.areaInput.value.trim() || !ui.schoolInput.value.trim()) {
				$.toast('请先选择区域或学校');
				return;
			}
			if(!classList || classList.length == 0) {
				return;
			}
			classListPicker.setData(classList);
			classListPicker.show(function(selectItems) {
				ui.classInput.value = selectItems[0].text;
				obj.classId = selectItems[0].value;
				obj.className = selectItems[0].text;
				setSeletedIndex(classListPicker, selectItems[0].index);
			});
		})

		//点击注册按钮
		ui.registerBtn.addEventListener('tap', function() {
			document.activeElement.blur();
			var network = plus.networkinfo.getCurrentType(); //获取网络
			if(network == 1) { //1没有网
				$.toast("网络链接失败，请检查网络");
				return;
			}
			//			c.methodUtil.solveSoftKeyboard();
			if(!ui.phoneNum.value.trim()) {
				$.toast('请输入手机号码');
				return;
			}
			if(!/^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/.test(ui.phoneNum.value.trim())) {
				$.toast('请输入正确的手机号')
				return;
			}
			if(!ui.password.value.trim() || !ui.pwdConfirm.value.trim()) {
				$.toast('两次密码需填写完整');
				return;
			}
			if(ui.password.value.trim().length < 6 || ui.password.value.trim().length > 18) {
				$.toast('密码长度为6~18位');
				return;
			}
			if(ui.pwdConfirm.value.trim().length < 6 || ui.pwdConfirm.value.trim().length > 18) {
				$.toast('密码长度为6~18位');
				return;
			}
			if(ui.password.value.trim() !== ui.pwdConfirm.value.trim()) {
				$.toast('两次密码不一致');
				return;
			}
			if(!/^[a-zA-Z0-9]+$/.test(ui.password.value.trim()) || !/^[a-zA-Z0-9]+$/.test(ui.pwdConfirm.value.trim())) {
				$.toast('密码不能含有特殊字符');
				return;
			}

			if(!ui.verificationCode.value.trim()) {
				$.toast('请输入验证码');
				return;
			}

			//还应调取后台接口验证验证码的正确性
			//			var userPassword = encrypt.encrypt(ui.password.value.trim()); //对密码进行加密操作 => 弃用
			//			plus.nativeUI.showWaiting('提交中...');
			//			c.dataUtil.userRegister(ui.phoneNum.value.trim(), ui.verificationCode.value.trim(), ui.password.value.trim(), function(res) {
			//				plus.nativeUI.closeWaiting();
			//				console.log('===用户注册===' + JSON.stringify(res));
			//				if(res.SystemCode == 1) { //注册成功
			//					$.toast('注册成功，请登录');
			//					setTimeout(function() {
			//						plus.webview.currentWebview().close();
			//					}, 1000)
			//				} else if(res.SystemCode == 1007) { //注册成功待审核状态 => 跳班级选择页
			//					obj.parentId = res.data.id;
			//					ui.infoRegister.style.display = 'none';
			//					ui.infoConfirm.style.display = 'block';
			//					$.toast('请填写确认信息');
			//				} else if(res.SystemCode == 10005) { //验证码过期
			//					$.toast('验证码过期');
			//				} else if(res.SystemCode == 10006) { //手机号和验证码不匹配
			//					$.toast('验证码错误');
			//				} else {
			//					$.toast(c.ERROR_CONFIG[res.SystemCode]);
			//				}
			//			}, function(xhr, type, err) {
			//				plus.nativeUI.closeWaiting();
			//				$.toast('服务器异常，请稍后重试');
			//			});
			//		})
			plus.nativeUI.showWaiting('提交中...');
			if(isRegistering) {
				isRegistering = false;
				c.dataUtil.userRegisterNjqc(ui.phoneNum.value.trim(), ui.verificationCode.value.trim(), ui.password.value.trim(), function(res) {
					plus.nativeUI.closeWaiting();
					isRegistering = true;
					console.log('===用户注册===' + JSON.stringify(res));
					if(res.SystemCode == 1) { //注册成功
						$.toast('注册成功，请登录');
						setTimeout(function() {
							plus.webview.currentWebview().close();
						}, 1000)
					} else if(res.SystemCode == 10007) { //注册成功
						$.toast('用户名重复');
					} else if(res.SystemCode == 10005) { //验证码过期
						$.toast('验证码过期');
					} else if(res.SystemCode == 10006) { //手机号和验证码不匹配
						$.toast('验证码错误');
					} else {
						$.toast(c.ERROR_CONFIG[res.SystemCode]);
					}
				}, function(xhr, type, err) {
					plus.nativeUI.closeWaiting();
					isRegistering = true;
					$.toast('服务器异常，请稍后重试');
				});
			}

		})

		//点击确认信息按钮
		ui.confirmBtn.addEventListener('tap', function() {
			document.activeElement.blur();
			//此处验证表单值的合法性
			if(!ui.studentName.value.trim() || ui.studentName.value.trim() == '') {
				$.toast('请输入学生姓名');
				return;
			}
			if(ui.areaInput.value.trim() == '' || obj.areaId == '' || obj.areaName == '') {
				$.toast('请选择区域');
				return;
			}
			if(ui.schoolInput.value.trim() == '' || obj.schoolId == '' || obj.schoolName == '') {
				$.toast('请选择学校');
				return;
			}
			if(ui.classInput.value.trim() == '' || obj.classId == '' || obj.className == '') {
				$.toast('请选择班级');
				return;
			}
			//此处应该向后端提交数据

			plus.nativeUI.showWaiting('提交中...');
			obj.name = ui.studentName.value.trim();
			console.log('===向后台提交的数据===' + JSON.stringify(obj));
			c.dataUtil.saveStudent(obj, function(res) {
				console.log('===保存学生信息===' + JSON.stringify(res));
				plus.nativeUI.closeWaiting();
				if(res.SystemCode == 1) {
					ui.infoConfirm.style.display = 'none';
					ui.tips.style.display = 'block';
				} else {
					$.toast(c.ERROR_CONFIG[res.SystemCode]);
				}
			}, function(xhr, type, err) {
				$.toast('服务器异常，请稍后重试');
				plus.nativeUI.closeWaiting();
			})

		})

		//点击获取验证码按钮
		ui.getVerification.addEventListener('tap', function(e) {
			e.stopPropagation();
			var network = plus.networkinfo.getCurrentType(); //获取网络
			if(network == 1) { //1没有网
				$.toast("网络链接失败，请检查网络");
				return;
			}
			//			c.methodUtil.solveSoftKeyboard();
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

			c.dataUtil.sendCheckMsg(ui.phoneNum.value.trim(), '1', function(res) {
				console.log('===发送短信===' + JSON.stringify(res));
				if(res.SystemCode == 1) { //发送成功
					$.toast('发送成功');
				} else if(res.SystemCode == 10005) { //短信还在有效期内

				}
			}, function(xhr, type, err) {
				$.toast('服务器异常，请稍后重试');
			})
		})
	}

	return {
		init: function() {
			bindEvents();
			//获取南京市各区域
			c.dataUtil.getAreaList(function(res) {
				console.log('===南京市各个区域数据===' + JSON.stringify(res));
				if(res.SystemCode == 1) { //有数据
					res.data.dirstricts.forEach(function(item, idx, arr) {
						areaList.push({
							value: item.id,
							text: item.orgName,
							index: idx
						})
					})
					console.log(JSON.stringify(areaList))
					areaListPicker.setData(areaList);
				}
			}, function(xhr, type, err) {
				console.log('获取区域失败');
			})
		}
	}
}(window, mui));

