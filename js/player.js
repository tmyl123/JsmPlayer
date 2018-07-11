var vue = new Vue({
    el: '#main',
    data: {
        slider: {
            start: 2,
            min: 0,
            max: 10,
            connect: [true, false]
        },
        showUI: true,
        isFullscreen: false,
        isMute: false,
        isIdle: false,
        timeoutID: "",
        playing: "",
        player: null,
        lastVol: [],
    },
    created() {
        screenfull.onchange(function() {
            this.isFullscreen = !this.isFullscreen;
        });
    },
    mounted() {
        var self = this;
        this.initPlayer();
        this.initSlider();
        this.player.pause();

        this.setup();

    },
    methods: {
        initPlayer() {

           this.player = new JSMpeg.Player(this.urlParams.ws, { canvas: this.canvas });

        },
        initSlider() {
            noUiSlider.create(this.Slider, {
                start: this.slider.start,
                connect: [this.slider.connect[0], this.slider.connect[1]],
                range: {
                    'min': this.slider.min,
                    'max': this.slider.max
                }
            });
            this.Slider.noUiSlider.on('slide', function(values, handle) {
                vue.player.setVolume(values[handle]);
                if (values[handle] > 0) {
                    vue.$data.isMute = false;
                } else {
                    vue.$data.isMute = true;
                }
            });
        },

        unLock() {
          //this.player.audioOut.unlock(function() {
          //  alert("unlock IPHONE audio");
          //});
        },

        togglePlay() {
            console.log(this.player.isPlaying);
            if (!this.player.isPlaying) {
                this.player.play();
                this.playing = true;
            } else {
                this.player.pause();
                this.playing = false;
            }
        },
        toggleVolume() {
            this.isMute = !this.isMute;
                this.lastVol.push(vue.player.getVolume());
                if (this.lastVol.length > 2) {
                  this.lastVol.shift();
                }
            if (this.lastVol[1] !== 0) {
                slider.noUiSlider.set(0);
                vue.player.setVolume(0);
            } else {
                console.log('setting volume to ' + this.lastVol[0]);
                slider.noUiSlider.set(this.lastVol[0]);
                vue.player.setVolume(this.lastVol[0]);
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
                alert("Your browser not support fullscreen");
            }
        },
        clickActive() {
            if (this.showUI) {
                this.togglePlay();
            }
            if (this.isFullscreen) {
                this.showUI = true;
            }
        },
        startTimer() {
            this.timeoutID = window.setTimeout(this.goInactive, 3000);
        },
        goInactive() {
            this.isIdle = true;
        },
        resetTimer(e) {
            window.clearTimeout(this.timeoutID);

            this.goActive();
        },
        goActive() {
            this.isIdle = false;
            this.startTimer();
        },
        setup() {
            window.addEventListener("mousemove", this.resetTimer, false);
            window.addEventListener("mousedown", this.resetTimer, false);
            window.addEventListener("keypress", this.resetTimer, false);
            window.addEventListener("DOMMouseScroll", this.resetTimer, false);
            window.addEventListener("mousewheel", this.resetTimer, false);
            window.addEventListener("touchmove", this.resetTimer, false);
            window.addEventListener("MSPointerMove", this.resetTimer, false);

            this.startTimer();
        },
        getPlaystat() {
          if (this.player.isPlaying) {
            console.log('playing');
            return 'fa fa-pause fa-2x';
          } else {
            console.log('not playing');
            return 'fa fa-play fa-2x';
          }
        }
    },
    computed: {
      canvas() {
        return document.getElementById('video-canvas');
      }, 
      Slider() {
        return document.getElementById('slider');
      },
      //player() {
      //  return new JSMpeg.Player(this.url, { canvas: this.canvas });
      //},
      isMac() {
        var macUser = navigator.userAgent.indexOf('Mac') >= 0; 
        return (macUser) ? true : false;
      },
      urlParams() {
        var search = window.location.href;
        let hashes = search.slice(search.indexOf('?') + 1).split('&');
        let params = {};
        hashes.map(hash => {
            let [key, val] = hash.split('=');
            params[key] = decodeURIComponent(val);
        });
        return params;
      }
    }
});
