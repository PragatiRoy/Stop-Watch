let display = document.getElementById('display');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsList = document.getElementById('laps');

let startTime, updatedTime, difference;
let interval;
let paused = true;
let laps = [];

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

function startTimer() {
  if (paused) {
    paused = false;
    startTime = new Date().getTime() - (difference || 0);
    interval = setInterval(updateDisplay, 10);
  }
}

function pauseTimer() {
  if (!paused) {
    paused = true;
    clearInterval(interval);
    difference = new Date().getTime() - startTime;
  }
}

function resetTimer() {
  paused = true;
  clearInterval(interval);
  startTime = null;
  updatedTime = null;
  difference = null;
  laps = [];
  display.innerHTML = '00:00:00.000';
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (!paused) {
    laps.push(display.innerHTML);
    updateLaps();
  }
}

function updateDisplay() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
  return number.toString().padStart(digits, '0');
}

function updateLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const li = document.createElement('li');
    li.innerText = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(li);
  });
}

