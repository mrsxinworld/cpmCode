var commonJs = {
	autoScrollTop: function() { //打开页面自动回顶
		$('html,body').animate({
			'scrollTop': 0
		});
	},
	gotoTop: function() {  //返回顶部
		$('body').append('<div id="go_top" style="position:fixed;right:20px;bottom:20px;"><img alt="返回顶部" />返回顶部</div>')
		$("#go_top").hide();
		//检测屏幕高度
		// var height=$(window).height();
		//滚动事件
		$(window).scroll(function() {
			if ($(window).scrollTop() > 100) {
				$("#go_top").fadeIn(500);
			} else {
				$("#go_top").fadeOut(500);
			}
		});
		$("#go_top").click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 100);
			return false;
		});
	},
}