const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let intervalID; 
function togglePlayer() {
  if(video.paused) {
    video.play();
    intervalID = setInterval(() => { handleProgressBar();}, 10);
  } else {
    video.pause();
    clearInterval(intervalID);
  }
}

function handleProgressBar() {
  const duration = video.duration;
  const currentTime = video.currentTime;
  progressBar.style.flex = (currentTime/duration);
}

function handleRange() {
  const name = this.name;
  video[name] = this.value;
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

video.addEventListener('click', togglePlayer);
toggle.addEventListener('click', togglePlayer);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
ranges.forEach(range => range.addEventListener('change', handleRange));
skipButtons.forEach(btn => btn.addEventListener('click', handleSkip));

