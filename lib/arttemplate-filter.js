/*
 * 说明：art-tempalte常用过滤器
 * 创建人：ch
 * 创建时间：2018/3/6 9:30
 * 修改人：ch
 * 修改时间：2018/3/6 13:30
 */
(function() {
	//创建到现在多长时间
	template.defaults.imports.timeFromnow = function(value) {
		if(String(value).search(/-/g) > -1) { //有‘-’
			value = value.replace(/-/g, "/"); //兼容ios
		}
		var date = moment(new Date(value), "YYYYMMDD").fromNow();
		return date;
	};

	//上下午
	template.defaults.imports.timeStamp = function(value) {
		if(String(value).search(/-/g) > -1) { //有‘-’
			value = value.replace(/-/g, "/"); //兼容ios
		}
		var daytime = moment(new Date(value)).utc().utcOffset(8).format('a');
		return daytime;
	};

	//截取时间
	template.defaults.imports.Hour = function(value) {
		return value.slice(11);
	};
	//天数
	template.defaults.imports.timesDay = function(value) {
		var days = value / 1000 / 60 / 60 / 24;
		days = days.toFixed();
		return days + "天";
	};

	//日期格式化01
	template.defaults.imports.dateFormat = function(value) {
		if(String(value).search(/-/g) > -1) { //有‘-’
			value = value.replace(/-/g, "/"); //兼容ios
		}
		return moment(new Date(value)).utc().utcOffset(8).format("YYYY-MM-DD HH:mm");
	};
	//日期格式化03
	template.defaults.imports.dateListFormat = function(value) {
		//		value = value.replace(/-/g, "/"); //兼容ios
		if(String(value).search(/-/g) > -1) { //有‘-’
			value = value.replace(/-/g, "/"); //兼容ios
		}
		return moment(new Date(value)).utc().utcOffset(8).format("YYYY-MM-DD");
	};
	//日期格式化02
	template.defaults.imports.getDate = function(value) {
		if(String(value).search(/-/g) > -1) { //有‘-’
			value = value.replace(/-/g, "/"); //兼容ios
		}
		return moment(new Date(value)).utc().utcOffset(8).format("YYYY/MM/DD");
	};

	//from now
	template.defaults.imports.fromCurrent = function(val) {
		return moment(val).startOf('minutes').fromNow();
	};

	//格式化字符串
	template.defaults.imports.json = function(obj) {
		return JSON.stringify(obj);
	};

	//替换换行
	template.defaults.imports.parseNewLine = function(val) {
		var vals = val.split('\n'),
			res = "";
		vals.forEach(function(e) {
			res += '<p>' + e + '</p>';
		});
		return res;
	};

	//星期六 = > 周六
	template.defaults.imports.replaceWeek = function(val) {
		return val.replace(/星期/g, "周")
	}
	//去除标签
	template.defaults.imports.delTag = function(val) {
		var desc = val.replace(/<[^>img]+>/g, "\n");
		var vals = desc.split('\n'),
			res = "";
		vals.forEach(function(e) {
			res += '<p>' + e + '</p>';
		});
		return res;
	}
	template.defaults.imports.delTag2 = function(val) {
		var desc = val.replace(/<[^>]+>/g, "\n");
		var vals = desc.split('<br />'),
			res = "";
//		vals.forEach(function(e) {
//			res += '<p>' + e + '</p>';
//		});
		return vals;
	}
	//显示字段显示隐藏
	template.defaults.imports.circleMore = function(value) {
		if(value.length > 70) {
			return 'block';
		} else {
			return 'none';
		}
	};
	
}());