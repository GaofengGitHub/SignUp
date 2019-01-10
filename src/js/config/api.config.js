/*
 * 说明：接口配置文件
 * 创建人：ch
 * 创建时间：2018/3/6 11:00
 * 修改人：ch                                                                                                                  
 * 修改时间：2018/3/6 11:25
 */
(function(c) {
	/*主机地址*/

//		c.HOST_CONFIG =  'http://192.168.241.199:8080/gljyj/'; //桂程
	//	c.HOST_CONFIG =  'http://192.168.241.17:8080/gljyj/';//丁辉
	//  c.HOST_CONFIG = "http://192.168.241.42:8088/gljyj/"; //陆佳欣
	//	c.HOST_CONFIG = 'http://192.168.241.12:8080/gljyj/'; //李树春
//	  c.HOST_CONFIG =  "http://192.168.31.188:8080/gljyj/"; //俞俊杰
//		c.HOST_CONFIG = "http://192.168.241.53:8080/gljyj/"; //李志伟
//		c.HOST_CONFIG = 'http://192.168.241.48:8081/gljyj/'; //内网测试
//		c.HOST_CONFIG = 'http://101.132.222.139:8080/gljyj/'; //外网测试 
//		c.HOST_CONFIG = 'http://192.168.241.40:8080/gljyj/'; //黄梦舒
//		c.HOST_CONFIG = 'http://120.55.168.21:38080/gljyj/'; //预生产
		c.HOST_CONFIG = 'http://47.102.23.142:8280/gljyj/'; //负载均衡
//		c.HOST_CONFIG = 'http://47.100.233.72:8080/gljyj/'; //阿里服务器

	/*图片服务器*/
//		c.IMAGE_SERVER = 'http://192.168.241.48:8069/fileServer/api/'; //测试图片服务
	c.IMAGE_SERVER = 'http://101.132.222.139:8086/fileServer/api/'; //外网测试

	/*图片操作*/
	c.IMAGE_GET_CONFIG = c.IMAGE_SERVER + 'getFile/'; //获取图片
	c.IMAGE_UPLOAD_CONFIG = c.IMAGE_SERVER + 'uploadImage/'; //上传图片
	c.IMAGE_GET_THUMB = c.IMAGE_SERVER + 'getThumb/';

	//自动更新地址
	c.APP_UPDATE_SERVER = 'http://cneecf.com/qgzb-qr/update_njqc.json';

	/*接口地址*/
	c.API_CONFIG = {
		//登录
		login: c.HOST_CONFIG + 'mobile/login/userLogin',
		//天气
		getWeather: c.HOST_CONFIG + 'mobile/weather/getWeather',
		//活动列表
		getActivityList: c.HOST_CONFIG + 'mobile/activity/getActivity',
		//培训列表
		getTrainList: c.HOST_CONFIG + 'mobile/activity/getTrain',
		//活动详情
		getActivityDetail: c.HOST_CONFIG + 'mobile/activity/activityDetail',
		//发送短信验证码
		sendCheckMsg: c.HOST_CONFIG + 'mobile/login/sendCheckMsg',
		//主页面推荐列表
		getListRecommend: c.HOST_CONFIG + 'mobile/info/listRecommend',
		//主页面新闻列表
		getNewsList: c.HOST_CONFIG + 'mobile/info/listNews',
		//主页面文章列表
		getArticleList: c.HOST_CONFIG + 'mobile/info/listArticle',
		//文章和新闻获详情
		getNewsDetail: c.HOST_CONFIG + 'mobile/info/getId',
		//查看文章和新闻的评论
		getNewsComment: c.HOST_CONFIG + 'mobile/info/listComment',
		//注册提交
		userRegister: c.HOST_CONFIG + 'mobile/login/userRegister',
		//获取区域
		getAreaList: c.HOST_CONFIG + 'mobile/login/getAreaList',
		//获取学校or班级数据
		getLinkage: c.HOST_CONFIG + 'mobile/login/getLinkage',
		//修改密码
		updatePassword: c.HOST_CONFIG + 'mobile/login/updatePassword',
		//清空手势密码
		closeGpassword: c.HOST_CONFIG + 'mobile/login/closeGpassword',
		//注册提交确认信息
		saveStudent: c.HOST_CONFIG + 'mobile/login/saveStudent',
		//公告
		getAnnoucementList: c.HOST_CONFIG + 'mobile/info/listAnnouncement',
		//对咨询添加评论
		addComment: c.HOST_CONFIG + 'mobile/info/addComment',
		//收藏新闻和活动
		collectActivity: c.HOST_CONFIG + 'mobile/activity/collectActivity',
		//取消收藏
		cancelCollect: c.HOST_CONFIG + 'mobile/activity/cancelCollect',
		//我的中队列表
		squadronIdxList: c.HOST_CONFIG + 'squadron/listData',
		//提交签到
		signIn: c.HOST_CONFIG + 'mobile/mine/signIn',
		//获取签到信息
		getSignInInfo: c.HOST_CONFIG + 'mobile/mine/getSignInInfo',
		//忘记密码
		forgotPwd: c.HOST_CONFIG + 'mobile/login/rememberPassword',
		//新增圈子
		addSquadron: c.HOST_CONFIG + 'mobile/squadron/save',
		//收藏列表
		collectList: c.HOST_CONFIG + 'mobile/mine/getMyCollect',
		//新闻点赞
		addNewsPraise: c.HOST_CONFIG + 'mobile/info/newsPraise',
		//活动报名
		activitySignIn: c.HOST_CONFIG + 'mobile/activity/activityApplyOption',
		//中队圈列表
		circleList: c.HOST_CONFIG + 'mobile/squadron/listData',
		//删除圈子
		delCircleItem: c.HOST_CONFIG + 'mobile/squadron/delete',
		//圈子点赞
		praiseCircleItem: c.HOST_CONFIG + 'mobile/squadron/admireInsert',
		//取消圈子点赞
		cancelPraise: c.HOST_CONFIG + 'mobile/squadron/admireDelete',
		//我的反馈列表
		getFeedbackList: c.HOST_CONFIG + 'mobile/feedback/feedbackList',
		//添加反馈
		addFeedback: c.HOST_CONFIG + 'mobile/feedback/addFeedback',
		//评论列表
		listData: c.HOST_CONFIG + 'mobile/newsComment/listData',
		//我的活动
		myActivity: c.HOST_CONFIG + 'mobile/activity/myActivity',
		//我的活动作品页面
		myActivityDetail: c.HOST_CONFIG + 'mobile/activity/myActivityDetail',
		//获取作品详情
		myWork: c.HOST_CONFIG + 'mobile/homework/getByActId',
		//提交作业
		uploadWork: c.HOST_CONFIG + 'mobile/activity/upload',
		//积分详情
		getMyPoints: c.HOST_CONFIG + 'mobile/mine/getMyPoints',
		//token旧换新
		tokenExchange: c.HOST_CONFIG + 'mobile/login/changToken',
		//景点介绍
		listScenic: c.HOST_CONFIG + 'mobile/tourist/listScenic',
		//获取区域列表
		getAreaSenseList: c.HOST_CONFIG + 'mobile/tourist/list',
		//景点详情
		listScenicDetail: c.HOST_CONFIG + 'mobile/tourist/listScenicDetail',
		//旅游路线列表
		listRoute: c.HOST_CONFIG + 'mobile/tourist/listRoute',
		//旅游路线详情
		listRouteDetail: c.HOST_CONFIG + 'mobile/tourist/listRouteDetail',
		//最新活动接口
		getNewActivityList: c.HOST_CONFIG + 'mobile/activity/getNewActivity',
		//注册接口
		userRegisterNjqc: c.HOST_CONFIG + 'mobile/login/userRegisterNjqc',
		//获取用户信息
		getUserInfo: c.HOST_CONFIG + 'mobile/userDetail/getByUserId',
		//提交修改用户信息
		saveUserInfo: c.HOST_CONFIG + 'mobile/userDetail/save',
		//修改用户头像
		changeImage: c.HOST_CONFIG + 'mobile/userDetail/changeImage',
		//MD5加密
		MD5String: c.HOST_CONFIG + 'mobile/tourist/MD5String',
		//获取活动报名列表
		getNameList: c.HOST_CONFIG + 'mobile/activity/listData',
		//删除活动
		deleteActivity: c.HOST_CONFIG + 'mobile/activity/delActivity',
		//获取签到列表
		getExchangeList: c.HOST_CONFIG + 'mobile/activity/getSignIn',
		//扫码签到
		scanCode: c.HOST_CONFIG + 'mobile/activity/signIn',
	};

}(window));