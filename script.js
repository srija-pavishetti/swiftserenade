const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Wildest Dreams',

    artist: 'Taylor Swift',
  },
  {
    name: 'lovestory',
    displayName: 'Love Story',
   
    artist: 'Taylor Swift',
  },
  {
    name: 'paperrings',
    displayName: 'Paper Rings',
    artist: 'Taylor Swift',
  },
  {
    name: 'badblood',
    displayName: 'Bad Blood',
    artist: 'Taylor Swift',
  },
  {
    name: 'delicate',
    displayName: 'Delicate',
    artist: 'Taylor Swift',
  },
  {
    name: 'readyforit',
    displayName: 'Ready for it',
    artist: 'Taylor Swift',
  },
  {
    name: 'midnightrain',
    displayName: 'Midnight Rain',
    artist: 'Taylor Swift',
  },
  {
    name: 'blankspace',
    displayName: 'Blank Space',
    artist: 'Taylor Swift',
  },
  {
    name: 'lookwhatyoumademedo',
    displayName: 'Look What You Made Me Do',
    artist: 'Taylor Swift',
  },
  {
    name: 'august',
    displayName: 'August',
    artist: 'Taylor Swift',
  },
  {
    name: '22',
    displayName: '22',
    artist: 'Taylor Swift',
  },
  {
    name: 'backtodecember',
    displayName: 'Back to December',
    artist: 'Taylor Swift',
  },
  {
    name: 'wearenevergettingbacktogether',
    displayName: 'We Are Never Ever Getting Back Together',
    artist: 'Taylor Swift',
  },
  {
    name: 'ikt',
    displayName: 'I Knew You Were Trouble',
    artist: 'Taylor Swift',
  },
  {
    name: 'ybu',
    displayName: 'You Belong With Me',
    artist: 'Taylor Swift',
  },











  {
    name: 'style',
    displayName: 'Style',
    artist: 'Taylor Swift',
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);