var addWork = (function(c, $) {
	var activityId = '';
	var ui = {
			addCirclePhotoBtn: document.getElementById("addCirclePhotoBtn"),
			done: document.getElementById("done"),
			txt: document.getElementById("work-text"),
			title: document.getElementById("work-title"),
			addr: document.getElementById("work-addr"),
			startTime: document.getElementById("startTime"),
			endTime: document.getElementById("endTime"),
			overTime: document.getElementById("overTime"),
			addCircleVideoBtn: document.getElementById("addCircleVideoBtn"),
			pageTitle: document.querySelector('.mui-title'),
		},
		selectedPicNum = 0, //已经选择的图片数
		selctedVideoNum = 0; //已选择的视频数
	var maxNum = 6,
		videoMaxNum = 1;
	var photoChanged = false;
	var initPhotoInfo = [];
	var photoListId = "publishPhotoList";
	var ableUpload = true;

	var createPreview = function(opt, type,domId) {
		var photoWrap ;
		if(type!="audio"&&type!="video"){
			photoWrap = document.getElementById(opt.photoListId);
		}else{
			console.log()
			photoWrap = document.querySelector("#"+domId+" ."+opt.photoListId);
		}
		var newNode = document.createElement("li");
		var src = opt.src;
		console.log('11111' + type)
		if(type == 'video') {
			newNode.className = 'video_li';
		}else if(type == 'audio'){
			newNode.className = 'audio_li';
		}
		
		if(src && type == 'image') {
			newNode.innerHTML = '<img class="icon-remove" src="../../assets/images/squadron/cancel.png" /><img class="circle-photo-item" src="' +
				src + '"/>';

			photoWrap.insertBefore(newNode, ui.addCirclePhotoBtn);
		} else if(type=='video'){
			newNode.innerHTML = '<img class="icon-remove icon-remove-video" src="../../assets/images/squadron/cancel.png" /><div class="video_target" data-target="' + src + '"><img class="video-item" src="../../assets/images/space/play.png"/></div>';
			photoWrap.insertBefore(newNode, document.querySelector("#"+domId+" .addCircleFileBtn"));
		}else if(type=='audio'){
			newNode.innerHTML = '<img class="icon-remove icon-remove-audio" src="../../assets/images/squadron/cancel.png" /><div class="audio_target" data-target="' + src + '"><img class="video-item" src="../../assets/images/space/play.png"/></div>';
			photoWrap.insertBefore(newNode, document.querySelector("#"+domId+" .addCircleFileBtn"));
		}

	};
	/* var onNumChange = function(){

	 	ui.addCirclePhotoBtn.style.display = selectedPicNum>=maxNum ? 'none':'';
	 };*/
	var addOnePhoto = function(src, type,domId) {
		type = type || 'image';
		photoListId = (type != "image")? "publishFileList":"publishPhotoList";
		createPreview({
			photoListId: photoListId,
			src: src

		}, type,domId);
		type == 'image' ? selectedPicNum++ : selctedVideoNum++

	};
	var setPhotoStatus = function(val) {
		photoChanged = val;
	};

	var fillPage = function(data) {
		ui.txt.value = data.txt;
		ui.title.value = data.title;
		ui.addr.value = data.addr;
		ui.startTime.value = data.startTime;
		ui.endTime.value = data.endTime;
		ui.overTime.value = data.overTime;
		if(data.src.length>0){
			for(var i=0;i<data.src.length;i++){
				addOnePhoto(data.src[i]);
			}
		}
		
	};

	var initPage = function(activityId) {
		var videoNum=0
		ableUpload = true;
		if(activityId!=''){
			c.dataUtil.getActivityDetail(activityId, function(res) {
				console.log('===获取要编辑活动信息===' + JSON.stringify(res));
				if(res.SystemCode == 1) {
					var initPhotoInfoMap;
					if(res.data.activityImg){
						for(var i=0;i<res.data.activityImg.length;i++){
							initPhotoInfo.push(res.data.activityImg[i]);
						}
						initPhotoInfoMap = initPhotoInfo.map(function(value){
							value=c.IMAGE_GET_CONFIG+value;
							return value;
						})
					}else{
						initPhotoInfoMap=[];
					}
					
					
					var src =
						fillPage({
							txt: res.data.content || '',
							title: res.data.title || '',
							addr: res.data.address || '',
							startTime: res.data.activityStart || '',
							endTime: res.data.activityEnd || '',
							overTime: res.data.applyEnd || '',
							src: initPhotoInfoMap
						});
				} else {
					$.toast(c.ERROR_CONFIG[res.data.SystemCode]);
				}
			}, function(xhr, type, err) {
				$.toast('获取活动信息失败，请稍后重试')
			})
		}
		/*if(plus.storage.getItem('HOMEWORK')&&plus.storage.getItem('HOMEWORK')!=''){
			var data= JSON.parse(plus.storage.getItem('HOMEWORK'));
			for(var i=0;i<data.attachment.length;i++){
				if(data.attachment[i].type=='image'){
					initPhotoInfo.push(data.attachment[i].attachment);
				}else if(data.attachment[i].type=='video'){
					addOnePhoto(data.attachment[i].attachment, 'video');
					videoNum=1;
				}
			}

			var src =
				fillPage({
					txt: data.homeworkDetail.content || '',
					title: data.homeworkDetail.title || '',
					src: initPhotoInfo
				});
			return videoNum;
		}*/
	};

	var addWork = function(sendObj) {
		console.log("上传作业参数：" + JSON.stringify(sendObj));
		plus.nativeUI.showWaiting('发布中...');
		c.dataUtil.addWork(JSON.stringify(sendObj), function(res) {
			plus.nativeUI.closeWaiting();
			console.log('===新增作业===' + JSON.stringify(res));
			res = res || {};
			res.data = res.data || {};
			if(res.data.SystemCode == 1) {
				$.toast('提交成功');
				$.fire(plus.webview.currentWebview().opener(), 'addSuccess', {});
//				$.fire(plus.webview.getWebviewById('squadronIdx'), 'afterAdd', {});
//				$.fire(plus.webview.getWebviewById('spaceIdx'), 'afterAdd', {});
//				$.fire(plus.webview.getWebviewById('signIdx'),'afterSubmitWork', {});
				setTimeout(function() {
					plus.webview.currentWebview().close(); //关闭页面
				}, 50);
			} else {
				$.toast(c.ERROR_CONFIG[res.data.SystemCode]);
			}
		}, function(xhr, type, err) {
			console.log("uploaderror" + JSON.stringify(err));
			console.log(type);
			plus.nativeUI.closeWaiting();
			$.toast('提交失败，请稍后重试')
		})
	}

	//事件绑定 
	function bindEvents() {

		//点击上传图片
		ui.addCirclePhotoBtn.addEventListener('tap', function() {
			document.activeElement.blur();
			console.log("点击添加：" + selectedPicNum);
			if(!ableUpload) return;

			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: [{
						title: "从相册选择"
					},
					{
						title: "拍照"
					}
				]
			}, function(sheetEvent) { // 谈出框选择后回调
				if(sheetEvent.index == 1) { //从相册选择
					if(selectedPicNum >= maxNum) {
						plus.nativeUI.toast('最多只能选取' + maxNum + '张图片');
						return;
					}
					plus.gallery.pick(function(gEvent) {
						for(var i = 0; i < gEvent.files.length; i++) {
							var dst = "_downloads/camera/" + gEvent.files[i].substring(gEvent.files[i].lastIndexOf('/'));
							c.methodUtil.compressImage(gEvent.files[i], dst, function(zipEvent) {
								addOnePhoto(zipEvent.target);
								setPhotoStatus(true);

							}, function() {
								plus.nativeUI.toast("操作失败");
								return;
							}, 20)
						}

					}, function() {
						return;
					}, {
						filter: 'image',
						multiple: true,
						maximum: (maxNum - selectedPicNum),
						system: false,
						onmaxed: function() {
							if(selectedPicNum == 0) {
								plus.nativeUI.toast('最多只能选取' + maxNum + '张图片');
							} else {
								plus.nativeUI.toast('已有' + selectedPicNum + '张图片待上传，最多只能选取' + (maxNum - selectedPicNum) + '张图片');
							}
						}
					});

				} else if(sheetEvent.index == 2) { //拍照
					if(selectedPicNum >= maxNum) {
						plus.nativeUI.toast('最多只能选取' + maxNum + '张图片');
						return;
					}
					c.methodUtil.getCamera(function(path) {
						c.methodUtil.compressImage(path, "_downloads/camera/" + path.substring(path.lastIndexOf('/')), function(zipEvent) {

							addOnePhoto(zipEvent.target);
							setPhotoStatus(true);
						}, function() {
							plus.nativeUI.closeWaiting();
							plus.nativeUI.toast("操作失败");
							return;
						}, 20)
					});

				} 
			});
		});
		
		ui.startTime.addEventListener('tap',function(){
			var dtPicker = new mui.DtPicker(); 
			var _this=this;
		    dtPicker.show(function (selectItems) {
		        _this.value =  selectItems.text;
				dtPicker.dispose();
				dtPicker = null;
		    })
		});
		ui.endTime.addEventListener('tap',function(){
			var dtPicker = new mui.DtPicker(); 
			var _this=this;
		    dtPicker.show(function (selectItems) {
		        _this.value =  selectItems.text;
				dtPicker.dispose();
				dtPicker = null;
		    })
		});
		ui.overTime.addEventListener('tap',function(){
			var dtPicker = new mui.DtPicker(); 
			var _this=this;
		    dtPicker.show(function (selectItems) {
		        _this.value =  selectItems.text;
				dtPicker.dispose();
				dtPicker = null;
		    })
		});
		
		//上传视频新
//		document.getElementById('videoUploadInput').addEventListener('change',function(){
//			console.log(this.files[0]);
//		})
		
		//点击上传视频
//		ui.addCircleVideoBtn.addEventListener('tap',function(){
//			document.activeElement.blur();
//			console.log("点击添加：" + selctedVideoNum);
//			if(!ableUpload) return;
//			
//			if(selctedVideoNum >= videoMaxNum) {
//				plus.nativeUI.toast('最多只能选取' + videoMaxNum + '个视频');
//				return;
//			}
//			plus.gallery.pick(function(e) {
//				plus.io.resolveLocalFileSystemURL(e, function(entry) {
//					entry.file(function(file) {
//						console.log('file=' + JSON.stringify(file))
//						console.log(file.size + '--' + file.name);
//						//判断文件大小
//						var limitSize = 100 * 1024 * 1024;
//						if(limitSize <= file.size) {
//							$.toast('视频太大啦');
//							plus.zip.compress(file.fullPath, '/storage/emulated/0/DCIM/Camera/', function(zipEvent) {
//								console.log(zipEvent);
//								addOnePhoto(zipEvent.target);
//
//							}, function() {
//								plus.nativeUI.toast("操作失败");
//								return;
//							});
//						}else{
//							addOnePhoto('file://' + file.fullPath, 'video');
//						}
//						
//
//					});
//				}, function(error) {
//					console.log("Request file system failed:" + error.message);
//				})
//
//			}, function() {
//				return;
//			}, {
//				filter: 'video',
//				multiple: false,
//				maximum: (videoMaxNum - selctedVideoNum),
//				system: false,
//				onmaxed: function() {
//					if(selectedPicNum == 0) {
//						plus.nativeUI.toast('最多只能选取' + selctedVideoNum + '个视频');
//					} else {
//						plus.nativeUI.toast('已有' + selctedVideoNum + '个视频待上传，最多只能选取' + (videoMaxNum - selctedVideoNum) + '个视频');
//					}
//				}
//			});
//		})
//		
		//删除图片
		$("#publishPhotoList").on('tap', '.icon-remove', function() {
			console.log(this.parentNode.className);
			selectedPicNum--;
			this.parentNode.remove();
			setPhotoStatus(true);
		});
		
	

		//发表作业
		ui.done.addEventListener('tap', function() {
			document.activeElement.blur();
			c.methodUtil.solveSoftKeyboard();
			var txtVal = ui.txt.value;
			var titleVal = ui.title.value;
			var addr = ui.addr.value;
			var startTime = Date.parse(ui.startTime.value);
			var endTime = Date.parse(ui.endTime.value);
			var overTime = Date.parse(ui.overTime.value);
			var regString = /[a-zA-Z]+/;     //验证大小写26个字母任意字母最少出现1次。
			console.log(startTime + '123');
			console.log(endTime + '456');
			console.log(plus.storage.getItem('CPT')+'提交后输出cpt');
			
			if(titleVal == "" || txtVal == ""|| addr == "") {
				$.toast("标题、地址和内容请输入完整");
				return;
			}else if(regString.test(titleVal)){
				$.toast("标题中不能含有字母");
				return;
			}else if(titleVal.length > 30) {
				$.toast("标题不能超过30字");
				return;
			}
			else if(txtVal.length > 1000) {
				$.toast("活动内容不能超过1000");
				return;
			}
			else if(startTime == "" || endTime == ""|| overTime == "") {
				$.toast("活动时间请输入完整");
				return;
			}else if(startTime >= endTime){
				$.toast("活动结束时间必须晚于活动开始时间");
				return;
			}else if(overTime >= endTime){
				$.toast("报名截止时间必须在活动结束时间之前");
				return;
			}
			else if(!c.methodUtil.filterEmoji(txtVal) || !c.methodUtil.filterEmoji(titleVal) || !c.methodUtil.filterEmoji(addr)) { //有emoji表情
				return;
			} else if(txtVal.length > 4000) {
				$.toast("活动详情内容不能超过3000字");
				return;
			}else if(plus.storage.getItem('UPLOADVIDEOBOXCPTFILE')&&plus.storage.getItem('UPLOADVIDEOBOXCPTFILE')!=''){
				$.toast("请等待视频上传完成");
				return;
			}else if(plus.storage.getItem('UPLOADAUDIOBOXCPTFILE')&&plus.storage.getItem('UPLOADAUDIOBOXCPTFILE')!=''){
				$.toast("请等待音频上传完成");
				return;
			}
			//验证通过
			$.confirm('是否确认发布，一旦发布不可修改', '提示', ['确认', '取消'], function(e) {
				document.activeElement.blur(); //收回软键盘
				console.log(e.index);
				if(e.index == 1 || e.index == -1) {
					return;
				} else {
					console.log("第二步");
					//					plus.nativeUI.showWaiting('发布中...');
					var photos = []; //上传图片地址
					var photosPath = []; //返回图片地址
					$('.circle-photo-item').each(function() {
						photos.push(this.getAttribute('src'));
					});
					var i = 0;
					var length = photos.length;
					plus.nativeUI.showWaiting(length ? '上传中...' : '提交中...');
					//递归上传图片
					var loop = function(i, callBack) {
						if(photoChanged) {
							if(i < length) {
								if(photos[i].indexOf("file://") == -1){
									console.log("鬼啊"+photos[i].substring(photos[i].lastIndexOf("/")));
									photosPath.push(photos[i].substring(photos[i].lastIndexOf("/")+1));
									i++;
									loop(i, callBack);
								}else{
									c.methodUtil.uploadImage(photos[i], function(res) {
										console.log("什么鬼啊"+photos[i]);
										console.log("什么鬼"+JSON.stringify(res))
										photosPath.push(res.data[0]);
										//									console.log(JSON.stringify(res))
										i++;
										loop(i, callBack);
									});
								}

							} else {
								callBack();
							}
						} else {
							photosPath = initPhotoInfo;
							callBack();
						}
					};
					loop(i, function() {
						var paths = photosPath.length > 0 ? photosPath : []; //图片路径
						var sendObj = {
							content: ui.txt.value,
							title: ui.title.value,
							activityImg: paths,
							address :ui.addr.value,
							activityStart :ui.startTime.value,
							activityEnd : ui.endTime.value,
							applyEnd : ui.overTime.value,
							id: activityId,
							video: ''
						}; //传给后台的参数
						console.log(JSON.stringify(photosPath));
						if(document.querySelector(".video_target")) { //有视频
							console.log(document.querySelector(".video_target").dataset.target);
//							c.methodUtil.uploadVideo(document.querySelector(".video_target").dataset.target, function(res) {
//								console.log('===视频上传===' + JSON.stringify(res));
//								if(res.SystemCode == 1) {
//									sendObj.video = res.data.url;
//									addWork(sendObj);
//								} else {
//
//								}
//							})
							var ossUrl=c.OSS_URL_TEST;
							if(c.HOST_CONFIG=="http://47.102.23.142:8080/zhsxd/"){
								//生产环境
								ossUrl=c.OSS_URL;
							}
							sendObj.video =ossUrl+plus.storage.getItem('UPLOADVIDEOBOXFILENAME');
							console.log(sendObj.video);
							addWork(sendObj);
						} else if(document.querySelector(".audio_target")) { //有音频
							console.log(document.querySelector(".audio_target").dataset.target);
//							c.methodUtil.uploadVideo(document.querySelector(".audio_target").dataset.target, function(res) {
//								console.log('===音频上传===' + JSON.stringify(res));
//								if(res.SystemCode == 1) {
//									sendObj.video = res.data.url;
//									addWork(sendObj);
//								} else {
//
//								}
//							})
							var ossUrl=c.OSS_URL_TEST;
							if(c.HOST_CONFIG=="http://47.102.23.142:8080/zhsxd/"){
								//生产环境
								ossUrl=c.OSS_URL;
							}
							sendObj.audio =ossUrl+plus.storage.getItem('UPLOADAUDIOBOXFILENAME');
							console.log(sendObj.audio);
							addWork(sendObj);
						}else { //没有视频和音频
							addWork(sendObj);
						}
					});
				}
			})

		})

	}

	return {
		init: function() {
			activityId = plus.webview.currentWebview().actId ? plus.webview.currentWebview().actId : '';
			var videoNum=initPage(activityId);
			bindEvents();
			return videoNum;
		},
		addOnePhoto:addOnePhoto
	}
}(window, mui));