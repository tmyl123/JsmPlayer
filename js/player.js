// 初始化 DOM



var slider = document.getElementById('slider');

var initVol = 2;

noUiSlider.create(slider, {
	start: initVol,
	connect: [true, false],
	range: {
		'min': 0,
		'max': 10
	}
});

var curVol = [0, initVol];

slider.noUiSlider.on('slide', function(values, handle) {
    player.setVolume(values[handle]);
    if (values[handle] == 0) {
       player.setVolume(0);
       slider.noUiSlider.set(0);
       $("#vol-btn").addClass("fa-volume-off").removeClass("fa-volume-up");
    } else {
       $("#vol-btn").addClass("fa-volume-up").removeClass("fa-volume-off");
    }
});

$(document).ready(function(){
player.pause();
setup();
    // 播放切換
    $("#play-btn, #video-canvas").click(function(){
        if (player.isPlaying) {
           player.pause();
           $("#play-btn").addClass("fa-play").removeClass("fa-pause");
        } else {
           player.play();
           $("#play-btn").addClass("fa-pause").removeClass("fa-play");
        }
    });

    // 音量切換
    $("#vol-btn").click(function(){
        curVol.push(player.getVolume());
        curVol.shift();
        console.log(curVol);
        if (player.getVolume() !== 0) {
           player.setVolume(0);
           slider.noUiSlider.set(0);
           $("#vol-btn").addClass("fa-volume-off").removeClass("fa-volume-up");
        } else {
           player.setVolume(curVol[0]);
           slider.noUiSlider.set(curVol[0]);
           $("#vol-btn").addClass("fa-volume-up").removeClass("fa-volume-off");
        }
    });

    // 全屏切換
    $("#full-btn").click(function(){
        screenfull.toggle();
        if (!screenfull.isFullscreen) {
           $("#JSMplayer").addClass("player-isfull").removeClass("player");
           $("#video-canvas").addClass("player-media-isfull").removeClass("player-media");
        } else {
           $("#JSMplayer").removeClass("player-isfull").addClass("player");
           $("#video-canvas").removeClass("player-media-isfull").addClass("player-media");
        }
    });
});



var timeoutId = "";

// UI 計時器
function startTimer() {
    timeoutID = window.setTimeout(goInactive, 2000);
}
function goInactive() {
    $(".player-UI").fadeOut("fast");
}
function resetTimer(e) {
    window.clearTimeout(timeoutID);

    goActive();
}
function goActive() {
    $(".player-UI").fadeIn("fast");
    startTimer();
}
function setup() {
    canvas.addEventListener("mousemove", resetTimer, false);
    canvas.addEventListener("mousedown", resetTimer, false);
    canvas.addEventListener("keypress", resetTimer, false);
    canvas.addEventListener("DOMMouseScroll", resetTimer, false);
    canvas.addEventListener("mousewheel", resetTimer, false);
    canvas.addEventListener("touchmove", resetTimer, false);
    canvas.addEventListener("MSPointerMove", resetTimer, false);

    startTimer();
}
