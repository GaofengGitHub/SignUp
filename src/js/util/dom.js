/*
 * 说明：dom工具类
 * 创建人：zwz
 * 创建时间：2017/5/4 21:50
 * 修改人：ch
 * 修改时间：2018/1/30 9:50
 */
(function(c){
	//沉浸式状态栏
	var ImmersedStatusbar = (function() {
		var immersed = 0; //系统栏高度
		var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
		if(ms && ms.length >= 3){ // 当前环境为沉浸式状态栏模式
		    immersed = parseFloat(ms[2]);// 获取状态栏的高度
		}
		if(immersed > 0) {
			var header = document.querySelector('header');
			var muiContent = document.querySelector('.mui-content');
			if(window.plus) {
				plus.navigator.setStatusBarStyle( 'light' ); //设置系统状态栏的字体颜色是浅色（白）
			}
			if(header) {
				header.style.height = 44 + immersed - 5 + 'px';
				header.style.paddingTop = immersed - 5 + 'px';
			}
			if(muiContent) {
				if(!muiContent.dataset.ignore) {
					muiContent.style.paddingTop =  44 + immersed - 5 + 'px';
				}
//				muiContent.style.paddingBottom = '52px';
			}
			/*44是header本身的高度，emmm，至于为什么减10，我只是觉得他的高度太高不美观*/
		}
	}())
	
}(window));