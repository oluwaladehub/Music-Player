/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Clash",
          artist: "Dave ft Stomzy",
          cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyZPnNVY-4gufeheTpp_y7PqQ1V8bbmk5lZA&usqp=CAU",
          source: "https://www.boomplay.com/embed/65040892/MUSIC?colType=1&colID=34351763",
          url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
          favorited: false
        },
        {
          name: "Lazarus",
          artist: "Dave ft BOJ",
          cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTs8bYd7ou__L1jv71AIQ8nbK8vlvHXXGtWQ&usqp=CAU",
          source: "https://github.com/oluwaladehub/Music-Player/raw/main/music%20player/mp3/Dave-ft-BOJ-Lazarus-(TrendyBeatz.com).mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true
        },
        {
          name: "Propeller",
          artist: "JAE5 ft Dave",
          cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKu6C36a6cKQdwKCF7V6PgMgXS91-iEo2lkQ&usqp=CAU",
          source: "https://github.com/oluwaladehub/Music-Player/raw/main/music%20player/mp3/JAE5-Ft-Dave-and-BNXN-Propeller-New-Song-(TrendyBeatz.com).mp3",
          url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
          favorited: false
        },
        {
          name: "Hate Me",
          artist: "Olamide ft Wande Coal",
          cover: "https://i0.wp.com/xclusiveloaded.com/wp-content/uploads/2022/02/Olamide-%E2%80%93-Hate-Me-Ft.-Wande-Coal-932x1024-1.jpg?fit=932%2C1024&ssl=1",
          source: "https://github.com/oluwaladehub/Music-Player/raw/main/music%20player/mp3/Olamide_Ft_Wande_Coal_-_Hate_Me.mp3",
          url: "https://youtu.be/s4Ghxkl1oXQ",
          favorited: false
        },
        {
          name: "The Final Victory",
          artist: "Haggard",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/5.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true
        },
        {
          name: "Soso",
          artist: "Omah Lay",
          cover: "https://leadership.ng/wp-content/uploads/2023/04/e702a7aa-a0f5-4807-8d11-d73581ba4696.jpeg",
          source: "https://github.com/oluwaladehub/Music-Player/raw/main/music%20player/mp3/Omah-Lay-Soso.mp3",
          url: "https://www.youtube.com/watch?v=k6eE3c70hgg",
          favorited: false
        },
        {
          name: "Sability",
          artist: "Ayra Starr",
          cover: "https://guardian.ng/wp-content/uploads/2022/10/Ayra-rush-1062x598.jpg",
          source: "https://cdn.trendybeatz.com/audio/Ayra-Starr-Sability-(TrendyBeatz.com).mp3",
          url: "https://www.youtube.com/watch?v=KYn3k8dpRJI",
          favorited: false
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
