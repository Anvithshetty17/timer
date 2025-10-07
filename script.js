// Simple timer logic (hours, minutes, seconds)
let timer = { hours: 0, minutes: 0, seconds: 0 };
let interval = null;
let isPaused = false;

function updateDisplay() {
  document.getElementById('hours').textContent = String(timer.hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(timer.minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(timer.seconds).padStart(2, '0');
}

function tick() {
  if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
    clearInterval(interval);
    interval = null;
    return;
  }
  if (timer.seconds > 0) {
    timer.seconds--;
  } else if (timer.minutes > 0) {
    timer.minutes--;
    timer.seconds = 59;
  } else if (timer.hours > 0) {
    timer.hours--;
    timer.minutes = 59;
    timer.seconds = 59;
  }
  updateDisplay();
}

document.getElementById('startBtn').onclick = function() {
  if (interval || (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0)) return;
  if (isPaused) {
    isPaused = false;
  }
  interval = setInterval(tick, 1000);
};

document.getElementById('pauseBtn').onclick = function() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    isPaused = true;
  }
};

document.getElementById('setBtn').onclick = function() {
  let h = prompt('Set hours:', timer.hours);
  let m = prompt('Set minutes:', timer.minutes);
  let s = prompt('Set seconds:', timer.seconds);
  timer.hours = Math.max(0, parseInt(h) || 0);
  timer.minutes = Math.max(0, Math.min(59, parseInt(m) || 0));
  timer.seconds = Math.max(0, Math.min(59, parseInt(s) || 0));
  updateDisplay();
};

updateDisplay();
