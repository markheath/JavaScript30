const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = Array.from(player.querySelectorAll('[data-skip]'));
const ranges = Array.from(player.querySelectorAll('.player__slider'));

function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}
function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function handleRangeUpdate() {
    //console.log(this.name, this.value);
    // this.name is volume or playbackRate
    video[this.name] = this.value;
}
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(s => s.addEventListener('click', skip));
ranges.forEach(r => r.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
