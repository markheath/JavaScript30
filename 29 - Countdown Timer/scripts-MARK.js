const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = Array.from(document.querySelectorAll('[data-time]'));
let countdown;

function timer(seconds) {
    const now = Date.now(); // a new static method
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);
    if (countdown) clearInterval(countdown);
    countdown = setInterval(function() {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function pad2(n) {
    return (n < 10 ? '0' : '') + n;
}

function displayTimeLeft(secondsLeft) {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    //console.log({minutes, seconds});
    const display = `${minutes}:${pad2(seconds)}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${pad2(minutes)}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(b => b.addEventListener('click', startTimer));
// name property means we don't need selector
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = parseInt(this.minutes.value);
    timer(mins * 60);
    this.reset();

});