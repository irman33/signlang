let app = {
  backAlphabet: ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o",
    "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"],
  activeIndex: 0,
  prevIndex: null,

  cacheDom: function () {
    this.keys = document.querySelectorAll(".key");
    this.video1 = document.querySelector(".video1");
    this.video2 = document.querySelector(".video2");
    this.video3 = document.querySelector(".video3");
    this.snare = document.querySelector("audio"); //snare = document.querySelector(`audio[data-key="74"]`);
  },

  bindEvents: function () {
    this.keys.forEach(key => {
      key.addEventListener("transitionend", this.removeTransition);
      key.addEventListener("click", this.playVideoOnClick.bind(this));
    });
    window.addEventListener("keydown", this.playVideoOnKeydown.bind(this));
  },

  render: function () {
    console.log("Render -----");
    let activeIndex = this.activeIndex;
    let prevIndex = this.prevIndex;

    let prevKey = document.querySelector(
      `div[data-key="${this.backAlphabet[prevIndex]}"]`
    );

    if (prevKey) {
      prevKey.classList.remove("active");
    }

    let key = document.querySelector(
      `div[data-key="${this.backAlphabet[activeIndex]}"]`
    );
    key.classList.add("active");

    this.video1.src = `./videos/${this.backAlphabet[activeIndex].toUpperCase()}-o.mp4`;
    this.video2.src = `./videos/${this.backAlphabet[activeIndex].toUpperCase()}-f.mp4`;
    this.video3.src = `./videos/${this.backAlphabet[activeIndex].toUpperCase()}-o.mp4`;

  },

  pause: function () {
    this.video2.pause();
    this.video3.pause();
    this.video1.pause();
  },

  play: function () {
    const playPromise1 = this.video1.play();
    const playPromise2 = this.video2.play();
    const playPromise3 = this.video3.play();

    if (playPromise1 !== undefined) {
      playPromise1.then(_ => { }).catch(error => {
        console.log("Error: Multiple keys pressed!");
      });
    }
    if (playPromise2 !== undefined) {
      playPromise2.then(_ => { }).catch(error => {
        console.log("Error: Multiple keys pressed!");
      });
    }
    if (playPromise3 !== undefined) {
      playPromise3.then(_ => { }).catch(error => {
        console.log("Error: Multiple keys pressed!");
      });
    }
  },

  playVideoOnClick: function (e) {
    if (e.target.className === "key" || e.target.className === "key active") return;

    this.prevIndex = this.activeIndex;
    this.activeIndex = this.backAlphabet.indexOf(
      e.target.innerText.toLowerCase()
    );

    this.pause();
    this.render();
    this.play();
  },

  playVideoOnKeydown: function (e) {
    if (e.keyCode === 37) {
      // backward
      if (this.activeIndex >= 1) {
        this.prevIndex = this.activeIndex;
        this.activeIndex--;

        this.pause();
        this.render();
        this.play();
      } else {
        this.playSnare();
      }
    }
    if (e.keyCode === 39) {
      // forward
      if (this.activeIndex <= 24) {
        this.prevIndex = this.activeIndex;
        this.activeIndex++;
        this.pause();
        this.render();
        this.play();
      } else {
        this.playSnare();
      }
    }
    if (e.keyCode === 38) {
      // up (play current)
      this.pause();
      this.render();
      this.play();
      return;
    }
    if (e.keyCode < 65 || e.keyCode > 90) return;

    this.prevIndex = this.activeIndex;
    this.activeIndex = this.backAlphabet.indexOf(e.key);

    this.pause();
    this.render();
    this.play();
  },

  removeTransition: function (e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
    this.parentNode.classList.remove("playing");
  },

  playSnare: function () {
    this.snare.currentTime = 0;
    this.snare.play();
    console.log("Reachged the end");
  },

  init: function () {
    this.cacheDom();
    this.render();
    this.bindEvents();
  }
};

app.init();
