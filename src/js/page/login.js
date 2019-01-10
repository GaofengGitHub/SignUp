/*
 * 说明：登录逻辑
 * 时间：2018-3-7 8：42
 * 创建： ch
 */
(function(c, $) {
	var encrypt = new JSEncrypt(); //初始化字符串加密对象
	encrypt.setPublicKey(c.GLOBAL_CONFIG.publicKey); //设置公钥
	var userInfo, //用户信息
		isGestureLogin = true, //是否手势登录：是=>true 否=>false
		isLogining = false; //是否正在登录， false表示未发起登录请求；防止多次重复提交
	var ui = {
		loginBtn: document.getElementById("loginBtn"),
		user: document.getElementById("userName"),
		password: document.getElementById("password"),
		shiftLogin: document.getElementById("shiftLogin"),
		passwordLogin: document.getElementById("passwordLogin"),
		holder: document.getElementById("holder"),
		gestureLogin: document.getElementById("gestureLogin"),
		accountLogin: document.getElementById("accounttLogin"),
		reg: document.getElementById("reg"),
		forgot: document.getElementById("forgot"),
	}
	//事件绑定
	function bindEvents() {
		//点击注册
		ui.reg.addEventListener('tap', function() {
			c.webviewUtil.show('register', null, null, null, null);
		})
		//忘记密码
		ui.forgot.addEventListener('tap', function() {
			c.webviewUtil.show('forgotPwd', null, null, null, null);
		})
		//点击登录按钮
		ui.loginBtn.addEventListener('tap', function() {
			console.log("点击登录按钮==")
			c.methodUtil.solveSoftKeyboard();
			console.log("点击登录按钮1==")
			var network = plus.networkinfo.getCurrentType(); //获取网络
			if(network == 1) { //1没有网
				$.toast("没有网络或未授权网络");
				return;
			}
			document.activeElement.blur(); //收起软键盘
			if(!isLogining) {
				isLogining = true;
				var userName = ui.user.value.trim(),
					password = ui.password.value.trim();
				if(checkFormData(userName, password)) {
					password = encrypt.encrypt(password); //对密码进行加密操作
					plus.nativeUI.showWaiting('登录中...');
										console.log("点击登录按钮2==")
					c.dataUtil.login(userName, password, '', function(res) {
						console.log('===用户账号密码登录===' + JSON.stringify(res));
						plus.nativeUI.closeWaiting();
						isLogining = false;
						if(res.SystemCode == 1) { //登录验证通过
							userInfo = res.data;
							loginSuccess(userInfo);
						} else if(res.SystemCode == 1008) {
							$.toast('该用户正在等待审核');
							return;
						} else {
							$.toast(c.ERROR_CONFIG[res.SystemCode]);
						}
					}, function(xhr, type, error) {
						plus.nativeUI.closeWaiting();
						$.toast('服务器异常，请稍后重试！');
						isLogining = false;
					})
				}
			}
		})

		//点击切换手势登录方式
		ui.shiftLogin.addEventListener('tap', function() {
			ui.passwordLogin.style.display = 'none';
			ui.gestureLogin.style.display = 'block';
		})
		
		//点击切换账号登录
		ui.accountLogin.addEventListener('tap', function() {
			ui.passwordLogin.style.display = 'block';
			ui.gestureLogin.style.display = 'none';
		})
		
		//手势密码事件处理
		ui.holder.addEventListener('done', function(e) {
			var rs = e.detail;
			if(rs.points.length == 0) { //没有point
				return;
			}
			if(isGestureLogin) { //手势登录
				if(rs.points.length < 4 && rs.points.length > 0) {
					$.toast("密码错误");
					rs.sender.clear();
					return;
				}
				var gPassword = rs.points.join(''), //手势密码数据
					userInfo = JSON.parse(plus.storage.getItem('userInfo')); //缓存中的用户信息
				var userName;	
				if(!userInfo) {
					$.toast('您还未设置使用手势登录');
					rs.sender.clear();
					return;
				} else {
					userName = userInfo.userName
				}
				gPassword = encrypt.encrypt(gPassword); //手势密码加密	
				plus.nativeUI.showWaiting('登录中...');
				c.dataUtil.login(userName, '', gPassword, function(res) {
					rs.sender.clear();
					plus.nativeUI.closeWaiting();
					console.log('===用户手势登录===' + JSON.stringify(res));
					if(res.SystemCode == 1) { //登录成功
						loginSuccess(res.data);
					} else {
						$.toast(c.ERROR_CONFIG[res.SystemCode]);
						return;
					}
				}, function(xhr, type, error) {
					plus.nativeUI.closeWaiting();
					$.toast('服务器异常，请稍后重试！');
					rs.sender.clear();
				})
			} 
		})
	}
	
	//登录成功
	function loginSuccess(userInfo) {
		plus.storage.setItem('userInfo', JSON.stringify(userInfo)); //存贮用户信息在本地
		setTimeout(function() {
			initApp();
			c.webviewUtil.show('main', 'none'); //打开首页
			$.toast('登录成功');
		}, 200)
	}

	//初始化应用
	function initApp() {
		var views=['mainIdx','youthApplicationIdx','mineIdx','messageIdx'];
		views.forEach(function(e) {
			setTimeout(function(){
				$.fire(plus.webview.getWebviewById(e),'login',{});
			},300);
		});
		/*绑定推送事件从此处开始*/
	}

	//检测用户名和密码是否合法
	function checkFormData(userName, password) {
		//var regTel = /^0?1[2|3|4|5|6|7|8|9][0-9]\d{8}$/;
		var regPwd = /^[a-zA-Z0-9]+$/;
		if(userName == "" || password == "") {
			$.toast('用户名或密码不能为空');
			isLogining = false;
			return;
		}
//		if(!regTel.test(userName)) {
//			$.toast('请输入正确的手机号码');
//			isLogining = false;
//			return;
//		}
		if(!regPwd.test(password)) {
			$.toast('密码不能有特殊字符');
			isLogining = false;
			return;
		}
		if(password.length < 6) {
			$.toast('密码错误');
			isLogining = false;
			return;
		}
		if(password.length > 18) {
			$.toast('密码错误');
			isLogining = false;
			return;
		}
		return true
	}
	//判断登录方式 => 弃用
//	function judgeLoginMethod () {
//		var userInfo = JSON.parse(plus.storage.getItem('userInfo')), //用户信息
//			useGestureLogin = plus.storage.getItem('useGestureLogin'); //是否使用手势登录标识
//		if(userInfo && userInfo.hasgPassWord == 1 && useGestureLogin && useGestureLogin.split('-')[1] == 'true' && userInfo.userName == useGestureLogin.split('-')[0]) {
//			//有登录过且有手势密码且设置了使用手势密码登录且 本次登录和上次登录是同一个人
//			togglePanel(true);
//		} else {
//			togglePanel(false);
//		}
//	}
	//切换登录方式 => 长登录弃用
//	function togglePanel(isGLogin) {
//		if(isGLogin) {
//			ui.passwordLogin.style.display = 'none';
//			ui.gestureLogin.style.display = 'block';
//		} else {
//			ui.passwordLogin.style.display = 'block';
//			ui.gestureLogin.style.display = 'none';
//		}
//	}
	$.plusReady(function() {
//		judgeLoginMethod ();
		bindEvents();
		//延迟预加载主页面
//		setTimeout(function() {
//			c.webviewUtil.create(c.VIEW_CONFIG['main']);
//		}, 200);
	})
}(window, mui));

