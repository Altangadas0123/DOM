const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const displaySecunds = document.getElementById("seconds");
const displayMinutes = document.getElementById("minutes");
const displayHours = document.getElementById("hours");
const state = document.getElementById("status");


let intervalId = "";

let startTime = 0;



// funstions

// tsagiig haruulna. buh tootsoo end yvna
const formatTime = (startTime) => {
  const seconds = Math.floor(startTime % 60).toString().padStart(2, "0");
  const minutes = Math.floor(startTime % 3600 / 60).toString().padStart(2, "0");
  const hours = Math.floor(startTime / 3600).toString().padStart(2, "0");
  
  displaySecunds.textContent = seconds;
  displayMinutes.textContent = minutes;
  displayHours.textContent = hours;
};


// start button darhad
const startTimer = () => {
  intervalId = setInterval(() => {
    startTime++;


    formatTime(startTime);
  }, 1000);
  


  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  state.textContent = "Running";
  
};


// pause button darhad
const pauseTimer = () => {
  clearInterval(intervalId);


  startBtn.disabled = false;
  pauseBtn.disabled = false;
  state.textContent = "Paused";
  startBtn.textContent = "Resume"
};


// reset button darhad
const resetTimer = () => {
  clearInterval(intervalId);

  startTime = 0;
  formatTime(startTime);

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  state.textContent = "Ready";
  startBtn.textContent = "Start"
};





// listeners

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

