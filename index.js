$(function () {
	var isplay = true;
	var isfull = false;
	var ison = true;
	var video = $("video")[0];
	var time = 0;
	var widt = $(".main").width();
	var hei = $(".main").height();
	var vidwid = $(video).width();
	var vidhei = $(video).height();
	//播放
	$("#play").click(function () {
		if(!isplay){
			video.play();
			$("#play").html("&#xe61d;")
			isplay = true;
		}else{
			video.pause();
			$("#play").html("&#xe61c;")
			isplay = false;
		}
	});
	//时间
	function getTime () {
		video.oncanplay = function () {
			time = video.duration;
			var minute = parseInt(time/60);
			var second = parseInt(time%60);
			if(minute<10){
				minute = "0"+minute;
			}
			if(second<10){
				second = "0"+second;
			}
			$(".toatime").find("span").html(minute);
			$(".toatime").find("i").html(second);
		}
	}
	getTime()
	//时间条
	function updata () {
		var protime = video.currentTime;
		var minute = parseInt(protime/60);
		var second = parseInt(protime%60);
		if(minute<10){
			minute = "0"+minute;
		}
		if(second<10){
			second = "0"+second;
		}
		$(".protime").find("span").html(minute);
		$(".protime").find("i").html(second);
	    var ratio = video.currentTime/time;
	    $(".pro").css("width",$(".time").width()*ratio);
	}
	video.addEventListener("timeupdate",updata);
	//进度调整
	var wid = 100;
	$(".time").click(function (e) {
		var newwidth = e.clientX-$(".time").offset().left;
		$(".pro").css("width",newwidth);
		video.currentTime= parseInt(newwidth/$(".time").width()*time);
	});
	//进度拖拽
	$(".drugtime").mousedown(function () {
		var newwidth = 0;
		document.addEventListener("mousemove",move);
		function move (e) {
			var e = e||event;
			video.removeEventListener("timeupdate",updata)
			newwidth = e.clientX-$(".time").offset().left;
			$(".pro").width(newwidth);
		}
		$(document).mouseup(function () {
			document.removeEventListener("mousemove",move);
			video.currentTime= parseInt(newwidth/$(".time").width()*time);
		});
	});
	//音量调整
	$(".volumebox").click(function (e) {
		var newwidth = e.clientX-$(".volumebox").offset().left;
		$(".volume").width(newwidth);
		wid = newwidth;
		video.volume = parseFloat(wid/$(".volumebox").width());
		if(wid/$(".volumebox").width()<=0.01){
			$("#volumebtn").html("&#xe6be;");
			ison = false;
		}else{
			$("#volumebtn").html("&#xe62a;");
			ison = true;
		}
	});
	//音量开关
	$("#volumebtn").click(function () {
		if(ison){
			$("#volumebtn").html("&#xe6be;");
			ison = false;
			video.volume = 0;
			$(".volume").width(0);
		}else{
			$("#volumebtn").html("&#xe62a;");
			$(".volume").width(wid);
			video.volume = parseFloat(wid/$(".volumebox").width());
			ison = true;
		}
	});
	//全屏
	$(".full").click(function () {
		if(!isfull){
			document.getElementsByClassName("main")[0].webkitRequestFullScreen();
			$(".main").width(screen.width);
			$(".main").height(screen.height);
			$(".full").html("&#xe552;");
			isfull = true;
		}else{
			document.webkitCancelFullScreen();
			$(".main").width(widt);
			$(".main").height(hei);
			/*$(video).width(vidwid);
			$(video).height(vidhei);*/
			$(".full").html("&#xe551;");
			isfull = false;
		}
	});
	//鼠标一段时间内不移动就隐藏时间条
	var ismove = true;
	$(document).mousemove(function () {
		ismove = true;
		$(".playerbox").fadeIn(300);
		$(".main").css("cursor","default");
	})
	var timer = setInterval(function () {
		if(!ismove&&isfull){
			$(".playerbox").fadeOut(300);
			$(".main").css("cursor","none");
		}
		ismove = false;
	},2000);
})