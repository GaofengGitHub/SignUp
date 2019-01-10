/*
 * 说明：裁剪上传头像
 * 创建：ch
 * 时间：2018/04/24 10:10
 * 
 */
var UploadImg = (function(c) {


	function _cuting() {
		window.addEventListener('path', function(e) {
			var token = event.detail.token;
			var path = event.detail.path;
			document.getElementById('image').src = plus.io.convertLocalFileSystemURL(path);
			var self = plus.webview.currentWebview(),
				opener = self.opener(),
				$image = $('#image'),
				$button = $('#button_ing'),
				croppable = false;
			$image.cropper({
				aspectRatio: 1,
				viewMode: 1,
				ready: function() {
					croppable = true;
				}
			});
			$button.on('click', function() {
				plus.nativeUI.showWaiting('上传中...');
				var cropeddata = $image.cropper('getData');
				var sourceImgDate = $image.cropper('getImageData');
				var containerData = $image.cropper('getContainerData');
				var cropData = $image.cropper('getCropBoxData');
				var canversData = $image.cropper('getCanvasData');
				var ClipImageOptions = {
					top: cropeddata.y, //(String 类型 )图片裁剪区域与原图片上边界的偏移距离
					//支持像素值（如"10px"）、百分比（如"10%"）；默认值为"0px"。 注意：如果top值超出原图片高度，则图片裁剪失败。

					left: cropeddata.x, //(Stirng 类型 )图片裁剪区域与原图片左边界的偏移距离
					//支持像素值（如"10px"）、百分比（如"10%"）；默认值为"0px"。 注意：如果left值超出原图片宽度，则图片裁剪失败。

					width: cropeddata.width, //(String 类型 )图片裁剪区域的宽度
					//支持像素值（如"100px"）、百分比（如"50%"）、自动计算（如"auto"，即从left位置到图片右边界的宽度）；默认值为"auto"。 注意：如果left值加width值超出原图片宽度，则使用"auto"值进行裁剪。

					height: cropeddata.height //(String 类型 )图片裁剪区域的高度
					//支持像素值（如"100px"）、百分比（如"50%"）、自动计算（如"auto"，即从top位置到图片下边界的高度）；默认值为"auto"。 注意：如果top值加height值超出原图片高度，则使用"auto"值进行裁剪。
				}
				//处理旋转角度，因为5+api不接受负值
				var rotate = 0; //默认值
				if(cropeddata.rotate >= 0) {
					rotate = cropeddata.rotate;
				} else {
					switch(cropeddata.rotate) {
						case -90:
							rotate = 270;
							break;
						case -180:
							rotate = 180;
							break;
						case -270:
							rotate = 90;
							break;
						default:
							rotate = 0;
					}
				}

				//获取图片格式                
				var format = image.src.substring(image.src.lastIndexOf(".") + 1);
				console.log(format);
				//根据日期生成图片名称
				var d = new Date();
				var picName = d.getFullYear() + "" + (d.getMonth() + 1) + "" + d.getDate() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();
				var fullname = picName + "." + format;
				console.log(fullname); //完整图片名称
				var imgOption = {
					src: path, //原始图片路径
					dst: "_doc/" + fullname, //(String 类型 )压缩转换目标图片的路径,这里保存到 私有目录doc
					//如“/sdcard/Android/data/io.dcloud.HBuilder/.HBuilder/apps/HBuilder/doc”。
					overwrite: true, //覆盖生成新文件
					format: '', //(String 类型 )压缩转换后的图片格式,支持"jpg"、"png",如果未指定则使用源图片的格式。
					quality: 50, //(Number 类型 )压缩图片的质量,可以自己调整
					//取值范围为1-100，1表示使用最低的图片质量（转换后的图片文件最小）、100表示使用最高的图片质量（转换后的图片文件最大）； 默认值为50。
					width: 'auto', //(String 类型 )缩放图片的宽度
					//支持像素值（如"100px"）、百分比（如"50%"）、自动计算（如"auto"，即根据height与源图高的缩放比例计算，若未设置height则使用源图高度）； 默认值为"auto"。 注意：若设置了width属性值不合法（如"0px"），则不对图片进行缩放操作。

					height: 'auto', //(String 类型 )缩放图片的高度
					//支持像素值（如"100px"）、百分比（如"50%"）、自动计算（如"auto"，即根据width与源图宽的缩放比例计算，若未设置width则使用源图高度）； 默认值为"auto"。 注意：若设置了height属性值不合法（如"0px"），则不对图片进行缩放操作。

					rotate: rotate, //(Number 类型 )旋转图片的角度
					//支持值：90-表示旋转90度；180-表示旋转180度；270-表示旋转270度。 注意：若设置rotate属性值不合法，则不对图片进行旋转操作。
					clip: ClipImageOptions //(ClipImageOptions 类型(json对象) )裁剪图片的区域
					//值参考ClipImageOptions定义，若设置clip属性值不合法，则不对图片进行裁剪操作。
				}
				console.log(JSON.stringify(imgOption));
				plus.zip.compressImage(
					imgOption, //JSON对象，配置图片压缩转换的参数
					function() {
						//console.log(imgOption.dst);                       
						//如果想要绝对路径
						var path = plus.io.convertLocalFileSystemURL(imgOption.dst);
						var task = plus.uploader.createUpload(c.IMAGE_UPLOAD_CONFIG, {
								method: "POST"
							},
							function(t, status) {
								if(status == 200) {
									var result = JSON.parse(t.responseText);
									console.log("success: " + JSON.stringify(result))
									plus.nativeUI.closeWaiting();
									var photoId = result.data[0];
									var obj = {
										userId: JSON.parse(plus.storage.getItem('userInfo')).userId,
										photo: photoId
									}
									//post发送photoId
									c.dataUtil.saveUserInfo(obj, function(res) {
										console.log("更改头像" + JSON.stringify(res))
										mui.fire(opener, 'cutsrc', {
											photoId: photoId
										});
										mui.toast('上传成功');
									}, function(xhr, type, err) {
										console.log('xhr' + xhr.status)
										mui.toast('上传失败');
									});
									plus.webview.currentWebview().close();
								} else {
									plus.nativeUI.toast('上传失败');
									console.log("Upload failed: " + status);
								}
							}
						);
						task.addFile('file://' + path, {
							key: "files"
						});
						task.start();
					},
					function(error) {
						plus.nativeUI.closeWaiting();
						mui.toast('上传失败，请退出应用重试');
						console.log("压缩失败" + JSON.stringify(error));
					}
				);

			});

		});

	}
	return {
		init: function() {
			_cuting();
		}
	};
}(window));