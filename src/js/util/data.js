/*
 * 说明：获取数据工具类
 * 创建人：ch
 * 创建时间：2018/3/6 11:30
 * 修改人：ch kwy 
 * 修改时间：2018/3/6 11:30
 */
(function(c) {

	/*
	 *	登录
	 * @param {String} userName 用户名
	 * @param {String} password 密码
	 * @param {String} gPassword 手势密码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function login(userName, password, gPassword, successCB, errorCB) {
		console.log("login in")
		mui.ajax(c.API_CONFIG.login, {
			data: {
				userName: userName,
				passWord: password,
				gPassWord: gPassword
			},
			type: 'POST',
			dataType: 'json',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				console.log("login success")
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				console.log("login error")
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		});
	}

	/*
	 *	获取天气
	 * @param {String} cityName 城市名称
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getWeather(cityName, successCB, errorCB) {
		mui.ajax({
			url: c.API_CONFIG.getWeather,
			headers: {
				'token': c.methodUtil.token()
			},
			type: "POST",
			dataType: "json",
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				cityName: cityName
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取活动列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getActivityList(nextUrl, isEnd,successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getActivityList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				isEnd: isEnd
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
				
			}
		})
	}
	/* 
	 * 获取活动报名列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getNameList(nextUrl,activityId,successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getNameList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data:{
				activityId:activityId
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				console.log("getnamelist err"+error)
				c.methodUtil.checkToken(xhr, type, error, errorCB);
				
			}
		})
	}
	/* 
	 * 获取培训列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getTrainList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getTrainList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * 获取推荐列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getListRecommend(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getListRecommend;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * 获取新闻列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getNewsList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getNewsList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取文章列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getArticleList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getArticleList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取活动详情
	 * @param {String} id 主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getActivityDetail(id, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getActivityDetail, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				id: id
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取新闻和文章详情
	 * @param {String} id 主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getNewsDetail(id, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getNewsDetail, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				id: id
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取新闻和文章详情
	 * @param {String} id 主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getNewsComment(newsId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getNewsComment, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				newsId: newsId
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 发送手机短信验证码
	 * @param {String} phone 手机号码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function sendCheckMsg(phone, smsType, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.sendCheckMsg, {
			dataType: 'json',
			type: 'POST',
			data: {
				phone: phone,
				smsType: smsType
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				errorCB
			}
		})
	}
	/* 
	 * 用户注册
	 * @param {String} phone 手机号码
	 * @param {String} verificationCode 验证码
	 * @param {String} userPassword 密码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function userRegister(phone, verificationCode, userPassword, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.userRegister, {
			dataType: 'json',
			type: 'POST',
			data: {
				phone: phone,
				verificationCode: verificationCode,
				userPassword: userPassword
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				errorCB
			}
		})
	}
	/* 
	 * 获取区域列表
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getAreaList(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getAreaList, {
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				errorCB
			}
		})
	}
	/* 
	 * 获取班级
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getLinkage(parentId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getLinkage, {
			dataType: 'json',
			type: 'POST',
			data: {
				parentId: parentId
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				errorCB
			}
		})
	}

	/* 
	 * 修改文本密码和手势密码
	 * @param {String} userName 用户名
	 * @param {String} passWord 原密码
	 * @param {String} newPassWord 新密码
	 * @param {String} newgPassWord 新手势密码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function updatePassword(userName, passWord, newPassWord, newGPassWord, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.updatePassword, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				userName: userName,
				passWord: passWord,
				newPassWord: newPassWord,
				newGPassWord: newGPassWord
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取公告列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getAnnoucementList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getAnnoucementList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 清空手势密码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function closeGpassword(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.closeGpassword, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 提交学生信息
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function saveStudent(obj, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.saveStudent, {
			dataType: 'json',
			type: 'POST',
			data: obj,
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				errorCB
			}
		})
	}
	/* 
	 * 提交咨询的评论
	 * @param {String} newsId 咨询主键id
	 * @param {String} content 评论内容
	 * @param {String} ReplyId 对评论再评论时的id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function addComment(newsId, content, ReplyId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.addComment, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				newsId: newsId,
				content: content,
				ReplyId: ReplyId
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 收藏新闻文章活动
	 * @param {String} newsId 咨询主键id
	 * @param {String} activityOrInfo 收藏类型 1活动 2咨询
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function collectActivity(id, activityOrInfo, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.collectActivity, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				id: id,
				activityOrInfo: activityOrInfo
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 取消收藏
	 * @param {String} collectionId 咨询主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function cancelCollect(collectionId, activityOrInfo, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.cancelCollect, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				collectionId: collectionId,
				activityOrInfo: activityOrInfo
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取签到信息
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getSignInInfo(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getSignInInfo, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * 提交签到
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function signIn(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.signIn, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取签到列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getSignList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getSignList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 活动报名
	 * @param {String} activityId 活动ID
	 * @param {String} status 状态  
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function activitySignIn(activityId, status, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.activitySignIn, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				activityId: activityId,
				status: status
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * 忘记密码
	 * @param {String} verificationCode 验证码
	 * @param {String} loginName 手机号
	 * @param {String} userPassword 密码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function forgotPwd(verificationCode, loginName, userPassword, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.forgotPwd, {
			dataType: 'json',
			type: 'POST',
			data: {
				verificationCode: verificationCode,
				loginName: loginName,
				userPassword: userPassword
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				errorCB
			}
		})
	}
	//点赞
	/* @param {String} newsId 活动ID
	 * @param {String} delFlag 状态  
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function addNewsPraise(newsId, delFlag, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.addNewsPraise, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				newsId: newsId,
				delFlag: delFlag
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * 我的收藏
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function collectList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.collectList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * 新增校园圈
	 * @param {String} circleType 发布类型 1政府 2个人
	 * @param {String} content 发布内容
	 * @param {String} attList 附件 json形式字符串
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function addSquadron(param, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.addSquadron, {
			headers: {
				'token': c.methodUtil.token()
			},
			data: param,
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 我的中队列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function circleList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.circleList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 删除圈子
	 * @param {String} id 主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function delCircleItem(id, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.delCircleItem, {
			headers: {
				'token': c.methodUtil.token()
			},
			data: {
				id: id
			},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 点赞圈子
	 * @param {String} circleId 主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function praiseCircleItem(circleId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.praiseCircleItem, {
			headers: {
				'token': c.methodUtil.token()
			},
			data: {
				circleId: circleId
			},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 取消点赞圈子
	 * @param {String} circleId 主键id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function cancelPraise(circleId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.cancelPraise, {
			headers: {
				'token': c.methodUtil.token()
			},
			data: {
				circleId: circleId
			},
			dataType: 'json',
			type: 'POST',
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取反馈列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getFeedbackList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getFeedbackList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 添加反馈
	 * @param {String} content 反馈内容
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function addFeedback(content, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.addFeedback, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				content: content
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 我的评论列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getListData(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.listData;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取我参与的活动详情
	 * @param {String} id 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getActivityWorksDetail(id, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.myActivityDetail, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				id: id
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取作业详情
	 * @param {String} id 活动id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getWorkInfo(activityId, successCB, errorCB) {
		console.log("getWorkInfo:activityId" + activityId);
		mui.ajax(c.API_CONFIG.myWork, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				activityId: activityId
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 上传作业
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function addWork(param, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.uploadWork, {
			headers: {
				'token': c.methodUtil.token()
			},
            contentType :'application/json',		//在 ajax 中 contentType 设置为 false 是为了避免 JQuery 对其操作，从而失去分界符，而使服务器不能正常解析文件。
            processData : false,
			data:param,
			
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 获取积分详情
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getMyPoints(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getMyPoints;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}

	/* 
	 * token以旧换新
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function tokenExchange(successCB, errorCB) {
		console.log(c.API_CONFIG.tokenExchange)
		console.log(c.API_CONFIG.tokenExchange)
		mui.ajax(c.API_CONFIG.tokenExchange, {
			headers: {
				'token': c.methodUtil.token(),
				'Access-Control-Allow-Origin': '*'
			},
			dataType: 'json',
			type: 'POST',
			timeout: 5000,
			crossDomain:true,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 我的活动
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function myActivity(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.myActivity, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 区域介绍
	 * @param {String} areaId 对应景点分页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getListScenic(areaId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.listScenic, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				areaId: areaId
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 删除活动
	 * @param {String} activityId 对应景点分页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function deleteActivity(activityId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.deleteActivity, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				id: activityId
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 景点详情
	 * @param {String} id 景点id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function listScenicDetail(id, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.listScenicDetail, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				id: id
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 旅游路线列表
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function listRoute(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.listRoute, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/* 
	 * 旅游路线详情
	 * @param {String} routeId 路线id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function listRouteDetail(routeId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.listRouteDetail, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			data: {
				routeId: routeId
			},
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	
	/* 
	 * 获取最新活动列表
	 * @param {String} nextUrl 下一页地址
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getNewActivityList(nextUrl, successCB, errorCB) {
		nextUrl = nextUrl || c.API_CONFIG.getNewActivityList;
		mui.ajax(nextUrl, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	
	/* 
	 * 获取区域列表
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getAreaSenseList(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getAreaSenseList, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	
	/* 
	 * 获取签到列表
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 */
	function getExchangeList(successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getExchangeList, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				c.methodUtil.refreshTokenTimer();
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
				c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	
	/*
	 * 注册
	 * @param {String} phone 手机号码
	 * @param {String} verificationCode 验证码
	 * @param {String} userPassword 密码
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 * 
	 */
	function userRegisterNjqc(phone, verificationCode, userPassword, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.userRegisterNjqc, {
			dataType: 'json',
			type: 'POST',
			data: {
				phone: phone,
				verificationCode: verificationCode,
				userPassword: userPassword
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
			 	errorCB
			}
		})
	}
	
	/*
	 * 获取用户信息
	 * @param {String} userId 用户id
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 * 
	 */
	function getUserInfo(userId, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.getUserInfo, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data: {
				userId: userId
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
			 	c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	
	/*
	 * 用户信息提交修改
	 * @param {Object} obj 用户信息json串
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 * 
	 */
	function saveUserInfo(obj, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.saveUserInfo, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data:obj,
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
			 	c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/*
	 * 扫码签到
	 * @param {Object} obj 用户信息json串
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 * 
	 */
	function scanCode(obj, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.scanCode, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data:obj,
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
			 	c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	
	/*
	 * 用户信息提交修改
	 * @param {Object} obj 用户信息json串
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 * 
	 */
	function changeImage(userId,photo, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.changeImage, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data:{
				userId:userId,
				photo:photo
			},
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
			 	c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	/*
	 * MD5加密
	 * @param {Object} obj 用户信息json串
	 * @param {Function} successCB 成功回调
	 * @param {Function} errorCB 失败回调
	 * 
	 */
	function MD5String(obj, successCB, errorCB) {
		mui.ajax(c.API_CONFIG.MD5String, {
			headers: {
				'token': c.methodUtil.token()
			},
			dataType: 'json',
			type: 'POST',
			data:obj,
			timeout: c.GLOBAL_CONFIG.timeOut,
			success: function(data) {
				successCB && successCB(data);
			},
			error: function(xhr, type, error) {
			 	c.methodUtil.checkToken(xhr, type, error, errorCB);
			}
		})
	}
	c.dataUtil = {
		login: login,
		getWeather: getWeather,
		getActivityList: getActivityList,
		getTrainList: getTrainList,
		getActivityDetail: getActivityDetail,
		sendCheckMsg: sendCheckMsg,
		getListRecommend: getListRecommend,
		getNewsList: getNewsList,
		getArticleList: getArticleList,
		getNewsComment: getNewsComment,
		getNewsDetail: getNewsDetail,
		userRegister: userRegister,
		getAreaList: getAreaList,
		getLinkage: getLinkage,
		updatePassword: updatePassword,
		closeGpassword: closeGpassword,
		saveStudent: saveStudent,
		getAnnoucementList: getAnnoucementList,
		addComment: addComment,
		collectActivity: collectActivity,
		cancelCollect: cancelCollect,
		getSignInInfo: getSignInInfo,
		signIn: signIn,
		getSignList: getSignList,
		activitySignIn: activitySignIn,
		forgotPwd: forgotPwd,
		collectList: collectList,
		addNewsPraise: addNewsPraise,
		addSquadron: addSquadron,
		delCircleItem: delCircleItem,
		praiseCircleItem: praiseCircleItem,
		cancelPraise: cancelPraise,
		getFeedbackList: getFeedbackList,
		addFeedback: addFeedback,
		circleList: circleList,
		getListData: getListData,
		getActivityWorksDetail: getActivityWorksDetail,
		addWork: addWork,
		getWorkInfo: getWorkInfo,
		getMyPoints: getMyPoints,
		tokenExchange: tokenExchange,
		myActivity: myActivity,
		getListScenic: getListScenic,
		listScenicDetail: listScenicDetail,
		listRoute: listRoute,
		listRouteDetail: listRouteDetail,
		getNewActivityList: getNewActivityList,
		getAreaSenseList:getAreaSenseList,
		userRegisterNjqc:userRegisterNjqc,
		getUserInfo:getUserInfo,
		saveUserInfo:saveUserInfo,
		changeImage:changeImage,
		MD5String:MD5String,
		getNameList:getNameList,
		deleteActivity:deleteActivity,
		getExchangeList:getExchangeList,
		scanCode:scanCode,
	}
}(window));