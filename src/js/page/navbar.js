/*
 * 说明：nav导航
 * 创建人：ch
 * 创建时间：2018/3/7 16:40
 * 修改人：ch
 * 修改时间：2018/3/7 16:40
 */

(function(win, $) {
	/*var dom = ['<div class="footer-item" data-target="mainIdx">',
		'<div class="item-content icon-index">首页</div>',
		'</div>',
		'<div class="footer-item" data-target="appPanel">',
		'<div class="item-content icon-app">应用</div>',
		'</div>',
		'<div class="footer-item" data-target="squadronIdx">',
		'<div class="item-content icon-class">我的中队</div>',
		'</div>',
		'<div class="footer-item" data-target="rosterIdx">',
		'<div class="item-content icon-roster">通讯录</div>',
		'</div>',
		'<div class="footer-item" data-target="mineIdx">',
		'<div class="item-content icon-mine">我的</div>',
		'</div>'
	].join('');*/
	var tmpl = '{{each list item i}}' +
		'<div class="footer-item" data-target="{{item.dataTarget}}">' +
		'<div class="item-content {{item.cls}}">{{item.text}}</div>' +
		'</div>' +
		'{{/each}}';
	var defaults = [{
		text: "资讯",
		cls: "icon-index",
		dataTarget: "mainIdx"
	}, {
		text: "应用",
		cls: "icon-app",
		dataTarget: "appPanel"
	}, {
		text: "我的中队",
		cls: "icon-class",
		dataTarget: "squadronIdx"
	}, {
		text: "通讯录",
		cls: "icon-roster",
		dataTarget: "rosterIdx"
	}, {
		text: "我的",
		cls: "icon-mine",
		dataTarget: "mineIdx"
	}];

	var youthConfig = defaults.concat();
	youthConfig.splice(0, 4, {
		text: "活动",
		cls: "icon-app",
		dataTarget: "youthApplicationIdx"
	},{
		text: "签到",
		cls: "icon-index",
		dataTarget: "mainIdx"
	}, {
		text: "发现",
		cls: "icon-message",
		dataTarget: "messageIdx"
	});
	var cfg = {
		"0": defaults,
		"1": youthConfig
	};

	var pages = {
		mainIdx: {
			normal: 'icon-index',
			active: 'icon-index-active'
		},
		appPanel: {
			normal: 'icon-app',
			active: 'icon-app-active'
		},
		youthApplicationIdx: {
			normal: 'icon-app',
			active: 'icon-app-active'
		},
		mineIdx: {
			normal: 'icon-mine',
			active: 'icon-mine-active'
		},
		squadronIdx: {
			normal: 'icon-class',
			active: 'icon-class-active'
		},
		rosterIdx: {
			normal: 'icon-roster',
			active: 'icon-roster-active'
		},
		messageIdx: {
			normal: 'icon-message',
			active: 'icon-message-active'
		},
	};

	//点击底部导航栏
	$('#navFooter').on('tap', '.footer-item', function() {
		plus.webview.getWebviewById(this.dataset.target).show();
	});

	var renderNav = function() {
		var userCode = win.methodUtil.getRole() || "0";
		var render = template.compile(tmpl);
		document.getElementById('navFooter').innerHTML = render({
//			list: cfg[userCode]
			list:cfg["1"]
		});
		var id = plus.webview.currentWebview().id;
		var currentNav = document.querySelector('.' + pages[id].normal);
		currentNav && currentNav.classList.add(pages[id].active);
	};

	//点击底部导航栏
	$('#navFooter').on('tap', '.footer-item', function() {
		plus.webview.getWebviewById(this.dataset.target).show();
		if(this.dataset.target=="mainIdx"){
			$.fire(plus.webview.getWebviewById("mainIdx"), 'refreshSignPage', {});
		}
	});
	window.addEventListener('login', function(e) {
		renderNav();
	});
	document.addEventListener('plusready', function() {
		renderNav();
	});

})(window, mui);