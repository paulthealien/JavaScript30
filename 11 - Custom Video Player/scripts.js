const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenBtn = player.querySelector('.fullscreen');

// let intervalID; 
function togglePlayer() {
  // if(video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function handleProgressBar() {
  // const duration = video.duration;
  // const currentTime = video.currentTime;
  // progressBar.style.flex = (currentTime/duration);
  const percent = (video.currentTime/video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function handleRange() {
  video[this.name] = this.value;
}

function handleSkip() {
  // const skipValue = event.target.dataset.skip;
  // const currentTime = video.currentTime;
  // if (skipValue > 0) {
  //   video.currentTime += skipValue;
  //   handleProgressBar();
  // } else {
  //   video.currentTime -= Math.abs(skipValue);
  //   handleProgressBar();
  // }
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen() {
  video.webkitRequestFullscreen();
}

video.addEventListener('click', togglePlayer);
toggle.addEventListener('click', togglePlayer);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgressBar);
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));
skipButtons.forEach(btn => btn.addEventListener('click', handleSkip));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e) );
progress.addEventListener('mousedown', () => mousedown = true );
progress.addEventListener('mouseup', () => mousedown = false );
fullScreenBtn.addEventListener('click', toggleFullscreen);

