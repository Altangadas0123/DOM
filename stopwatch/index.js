const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let elapsed = 0;
let startedAt = 0;
let timerId = null;



const pad = (n) => String(n).padStart(2, "0");

function currentElapsed() {
  return timerId === null ? elapsed : elapsed + (performance.now() - startedAt);
}

function render() {
  const total = Math.floor(currentElapsed() / 1000);
  hoursEl.textContent = pad(Math.floor(total / 3600));
  minutesEl.textContent = pad(Math.floor((total % 3600) / 60));
  secondsEl.textContent = pad(total % 60);
}

function setState(state) {
  const labels = { ready: "Ready", running: "Running", paused: "Paused" };
  statusEl.textContent = labels[state];
  startBtn.textContent = state === "paused" ? "Resume" : "Start";
  startBtn.disabled = state === "running";
  pauseBtn.disabled = state !== "running";
  resetBtn.disabled = state === "ready";
}

function start() {
  if (timerId !== null) return;
  startedAt = performance.now();
  timerId = setInterval(render, 200);
  setState("running");
}

function pause() {
  if (timerId === null) return;
  elapsed = currentElapsed();
  clearInterval(timerId);
  timerId = null;
  render();
  setState("paused");
}

function reset() {
  clearInterval(timerId);
  timerId = null;
  elapsed = 0;
  render();
  setState("ready");
}





startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);

render();
setState("ready");