/*
 * 说明：视图配置文件
 * 创建人：ch
 * 创建时间：2018/3/6 14:50
 * 修改人：ch
 * 修改时间：2018/3/7 10:45
 */
(function(c) {
	//视图配置
	c.VIEW_CONFIG = {
		main: { //主面板父容器
			url: '../main/parent_container.html',
			id: 'main'
		},
		
		scanCode: { //扫描签到二维码
			url: '../activityNew/scanCode.html',
			id: 'scanCode'
		},
		nameList:{//活动报名名单列表
			url: '../activityNew/name_list.html',
			id: 'nameList'
		},
		editActivity:{//编辑活动，发布活动
			url: '../activityNew/editActivity.html',
			id: 'editActivity'
		},
		login: { //登录首页
			url: '../login/login.html',
			id: 'login'
		},
		privacyAct:{//隐私协议
			url: '../user/privacy_act.html',
			id: 'privacyAct'
		},
		mainIdx: { //首页
			url: '../signPage/sign_list.html',
			id: 'mainIdx'
		},
		squadronIdx: { //我的中队
			url: '../squadron/index.html',
			id: 'squadronIdx'
		},
		addSquadron: { //我的中队
			url: '../squadron/add.html',
			id: 'addSquadron'
		},
		mineIdx: { //我的
			url: '../user/index.html',
			id: 'mineIdx'
		},
		register: { //注册
			url: '../login/register.html',
			id: 'register'
		},
		activityIdx: { //活动首页
			url: '../activity/index.html',
			id: "activityIdx"
		},
		activityDetail: { //活动详情
			url: '../activity/detail.html',
			id: 'activityDetail'
		},
		articleDetail: { //文章详情
			url: '../article/detail.html',
			id: 'articleDetail'
		},
		newsDetail: { //新闻详情
			url: '../news/detail.html',
			id: "newsDetail"
		},
		spaceIdx: { //我的空间
			url: '../space/index.html',
			id: 'spaceIdx'
		},
		spaceDetail: { //我的空间
			url: '../space/detail.html',
			id: 'spaceDetail'
		},
		annoucementDetatil: { //公告
			url: '../annoucement/detail.html',
			id: "annoucementDetatil"
		},
		myCollection: { //我的收藏
			url: '../user/collect.html',
			id: 'myCollection'
		},
		myComment: { //我的评论
			url: '../user/comment.html',
			id: 'myComment'
		},
		feedBack: { //意见反馈
			url: '../user/feedback.html',
			id: 'feedBack'
		},
		modifyPwd: { //修改密码
			url: '../user/resetPassword.html',
			id: 'modifyPwd'
		},
		setting: { //设置
			url: '../user/setting.html',
			id: 'setting'
		},
		myFeedBack: { //我的反馈
			url: '../user/suggestion.html',
			id: 'myFeedBack'
		},
		resetGesture: { //重置手势密码
			url: '../user/reset_gesture.html',
			id: 'resetGesture'
		},
		articleComment: { //文章添加评论
			url: '../article/feedback.html',
			id: 'articleComment'
		},
		activityNewDetail: { //活动新详情
			url: '../activity/new_detail.html',
			id: 'activityNewDetail'
		},
		signIdx: { //每日签到首页
			url: '../sign/index.html',
			id: 'signIdx'
		},
		integralExchange: { //积分兑换
			url: '../sign/integral.html',
			id: 'integralExchange'
		},
		inergralDetail: { //积分明细
			url: '../sign/detail.html',
			id: 'inergralDetail'
		},
		forgotPwd: { //忘记密码
			url: '../login/setPassword.html',
			id: 'forgotPwd'
		},
		senseIdx: { //感知南京
			url: '../sense/index.html',
			id: 'senseIdx'
		},
		youthApplicationIdx: { //凝聚青春应用页面
			url: '../application/youth.html',
			id: 'youthApplicationIdx'
		},
		myWorkIdx: { //添加作业页面
			url: '../space/add.html',
			id: 'myWorkIdx'
		},
		practiceIdx: { //实习岗位首页
			url: '../practice/index.html',
			id: 'practiceIdx'
		},
		practiceDetail: { //实习岗位详情
			url: '../practice/detail.html',
			id: 'practiceDetail'
		},
		messageIdx: { //消息
			url: '../message/index.html',
			id: 'messageIdx'
		},
		areaInfo: { //县区详情
			url: '../sense/area_info.html',
			id: 'areaInfo'
		},
		spotDetail: { //景点详情
			url: '../sense/detail.html',
			id: 'spotDetail'
		},
		tourismRoute: { //旅游线路
			url: '../studyTourism/route.html',
			id: 'tourismRoute'
		},
		tourismRouteDetail: { //线路详情
			url: '../studyTourism/routeDetail.html',
			id: 'tourismRouteDetail'
		},
		third_party: { //第三方链接展示页面
			url: '../third_party/index.html',
			id: 'third_party'
		},
		editInfo: { //编辑资料
			url: '../user/editor.html',
			id: 'editInfo'
		},
		more: { //更多
			url: '../more/more.html',
			id: 'more'
		},
		cutImg: { //头像裁剪上传
			url: '../user/cutimg.html',
			id: 'cutImg'
		},
		process: { //房租补贴审核流程
			url: '../supplement/process.html',
			id: 'process'
		},
		supplementIdx: {
			url: '../supplement/index.html',
			id: 'supplementIdx'
		},
		supplementContact: { //联系方式
			url: '../supplement/contact.html',
			id: 'supplementContact'
		},
	};
}(window));