$("input[name='passwd']").bind('input propertychange', function () {
	var password=$(this).val();
	if (password.length==0) {
		$("#qiangdu").val("密码强度");
	}
	if (password.length>6) {
		if (password.length>12) {
			if ($(this).next()[0].tagName!="P") {
				$(this).after("<p id='tishi'>密码过长</p>");
			}
		}else if (password.length<8) {
			if ($(this).next()[0].tagName=="P") {
				$(this).next().remove();
			}
			$("#qiangdu").val("弱");
			
		}else if (password.length>8&&password.length<10) {
			if ($(this).next()[0].tagName=="P") {
				$(this).next().remove();
			}
			$("#qiangdu").val("中");
		}else if (password.length>10&&password.length<12) {
			if ($(this).next()[0].tagName=="P") {
				$(this).next().remove();
			}
			$("#qiangdu").val("强");
		}
	}
});

$("input[name='repeatpasswd']").bind('input propertychange', function(){
	var repeatpassword=$("input[name='repeatpasswd']").val();
	var password=$("input[name='passwd']").val();
	if (repeatpassword!=password) {
		if ($(this).next()[0].tagName!="P") {
			$(this).after("<p id='tishi'>两次输入密码不一致</p>");

		}
	}else {
		if ($(this).next()[0].tagName=="P") {
			$(this).next().remove();
		}
	}
	$(this).HTML("<p>11111</p>");
});

$("input[name='username']").bind('input propertychange', function(){
	var username=$(this).val();
	if (!(username.length>6&&/[a-zA-Z]/.test(username)&&/[0-9]/.test(username))) {
		if ($(this).next()[0].tagName!="P") {
			$(this).after("<p id='tishi'>用户名不合法,请输入长度大于6的字母和数字的组合</p>");	
		}
	}else {
		if ($(this).next()[0].tagName=="P") {
			$(this).next().remove();
		}
	}
});


