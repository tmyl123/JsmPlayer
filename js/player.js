var vue = new Vue({
    el: '#main',
    data: {
        slider: {
            start: 2,
            min: 0,
            max: 10,
            connect: [true, false]
        },
        playing: "",
        showUI: true,
        isFullscreen: false,
        isMute: false,
        isIdle: false
    },
    mounted() {
        var isMac = navigator.userAgent.indexOf('Mac') >= 0;
        if (isMac) {
            this.jsmegInstant()
        } else {
            //alert("Yor are not mac user!")
            this.jsmegInstant()
        };
        player.pause();
        screenfull.onchange(function() {
            vue.$data.isFullscreen = !vue.$data.isFullscreen;
        });
        var timeoutID;

        function setup() {
            this.addEventListener("mousemove", resetTimer, false);
            this.addEventListener("mousedown", resetTimer, false);
            this.addEventListener("keypress", resetTimer, false);
            this.addEventListener("DOMMouseScroll", resetTimer, false);
            this.addEventListener("mousewheel", resetTimer, false);
            this.addEventListener("touchmove", resetTimer, false);
            this.addEventListener("MSPointerMove", resetTimer, false);

            startTimer();
        }
        setup();

        function startTimer() {
            timeoutID = window.setTimeout(goInactive, 3000);
        }

        function resetTimer(e) {
            window.clearTimeout(timeoutID);

            goActive();
        }

        function goInactive() {
            vue.$data.isIdle = true;
        }

        function goActive() {
            vue.$data.isIdle = false;
            startTimer();
        }

    },


    methods: {
        jsmegInstant() {
            var canvas = document.getElementById('video-canvas');
            var url = 'ws://' + document.location.hostname + ':8082/';
            player = new JSMpeg.Player(url, {
                canvas: canvas
            });

            var Slider = document.getElementById('slider');

            noUiSlider.create(Slider, {
                start: this.slider.start,
                connect: [this.slider.connect[0], this.slider.connect[1]],
                range: {
                    'min': this.slider.min,
                    'max': this.slider.max
                }
            });
            Slider.noUiSlider.on('slide', function(values, handle) {
                player.setVolume(values[handle]);
                if (values[handle] > 0) {
                    vue.$data.isMute = false;
                } else {
                    vue.$data.isMute = true;
                }
            });
        },

        unLock() {
        },

        togglePlay() {
            if (!player.isPlaying) {
                player.play();
                this.playing = true
          player.audioOut.unlock(function() {
          //  alert("unlock IPHONE audio");
          });
            } else {
                player.pause();
                this.playing = false
            }
        },
        toggleVolume() {
            const currentVolume = slider.noUiSlider.get()
            this.isMute = !this.isMute;
            if (currentVolume != 0) {
                slider.noUiSlider.set(0)
            } else {
                slider.noUiSlider.set(4)
            }
        },
        onMouseShow() {
            if (!this.isFullscreen) {
                this.showUI = true;
            }
        },
        onMouseHide() {
            this.showUI = false;
        },
        screenFull() {
            if (screenfull.enabled) {
                screenfull.toggle(document.getElementById('JSMplayer'));
            } else {
                alert("Your browser not support fullscreen")
            }
        },
        clickActive() {
            if (this.showUI) {
                this.togglePlay();
            }
            if (this.isFullscreen) {
                this.showUI = true;
            }

        }
    }

});
