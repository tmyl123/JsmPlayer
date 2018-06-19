Vue.component('Jsmplayer', {

    data() {
      return {
				slider: {
          start: 2,
          min: 0,
          max: 10,
          connect: [true, false]
        },
        playing: false,
        showUI: true,
        isFullscreen: false,
        isMute: false,
        isIdle: false,
				timeoutID: ""
      }
    },

    props: [],

    template: 
        `<div :class="{'player': !isFullscreen, 'player-isfull': isFullscreen}" id="JSMplayer" @mouseover="onMouseShow" @mouseleave="onMouseHide">
            <canvas id="video-canvas" :class="{'player-media': !isFullscreen, 'player-media-isfull': isFullscreen}" @click="clickActive">
            </canvas>
            <transition name="fade">
                <div class="player-UI" v-show="showUI && !isIdle">
                    <i :class="{'fa fa-pause fa-2x': playing, 'fa fa-play fa-2x': !playing}" @click="togglePlay"></i>
                    <i :class="{'fa fa-volume-up fa-2x': !isMute, 'fa fa-volume-off fa-2x': isMute}" @click="toggleVolume"></i>
                    <div id="slider"></div>
                    <i @click="screenFull" class="fa icon-fullscreen fa-2x"></i>
                </div>
            </transition>
        </div>`,

	  created() {},
		mounted() {
			  var self = this
        self.jsmegInstant()
        player.pause();
        screenfull.onchange(function() {
            self.isFullscreen = !self.isFullscreen;
        });

        this.setup();

		},
    methods: {
			jsmegInstant() {
				 var self = this
         player = new JSMpeg.Player(this.url, {
             canvas: this.canvas
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
                 //vue.$data.isMute = false;
                 self.isMute = false;
             } else {
                 //vue.$data.isMute = true;
                 self.isMute = true;
             }
         });
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

      },
      setup() {
        this.$el.addEventListener("mousemove", this.resetTimer, false);
        this.$el.addEventListener("mousedown", this.resetTimer, false);
        this.$el.addEventListener("keypress", this.resetTimer, false);
        this.$el.addEventListener("DOMMouseScroll", this.resetTimer, false);
        this.$el.addEventListener("mousewheel", this.resetTimer, false);
        this.$el.addEventListener("touchmove", this.resetTimer, false);
        this.$el.addEventListener("MSPointerMove", this.resetTimer, false);

        this.startTimer();
      },
			startTimer() {
        this.timeoutID = window.setTimeout(this.goInactive, 3000);
			},
			resetTimer() {
        window.clearTimeout(this.timeoutID);

        this.goActive();
			},
			goActive() {
        //vue.$data.isIdle = false;
        this.isIdle = false;
        this.startTimer();
			},
			goInactive() {
        //vue.$data.isIdle = true;
        this.isIdle = true;
			}
    },
		computed: {
	    canvas() {
				var canvas = document.getElementById('video-canvas')
				return canvas
			},
			url() {
		    var url = 'ws://' + document.location.hostname + ':8082/'	
				return url
			},
			//Slider() {
			//	var Slider = document.getElementById('slider')
			//	return Slider
			//}
		}
})

new Vue({
    el: '#root'
});
