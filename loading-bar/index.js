const number = document.getElementById("number")
const text = document.getElementById("text")
const loading = document.getElementById("loading")

let timestamp = null;
const LOADING_DURATION_MS = 5000;
const messages = ["Preparing your space", "Bringing everything together", "Adding the finishing touches", "All set. Welcome in!"];

const renderProcess = (percent) => {
  number.textContent = Math.round(percent);
  loading.style.width = percent + "%";

  //0-99%, last one100%
  const index = percent >= 100 ? messages.length - 1 : Math.floor((percent / 100) * (messages.length - 1));
  if (text.textContent !== messages[index]) {
    text.textContent = messages[index];
  }
};

const updateProcess = (n) => {
  if (timestamp === null) timestamp = n;

  const elapsed = n - timestamp;
  const percent = Math.min((elapsed / LOADING_DURATION_MS) * 100, 100);

  renderProcess(percent);

  if (percent < 100) {
    requestAnimationFrame(updateProcess);
  }

  console.log(percent);
}

renderProcess(0);
requestAnimationFrame(updateProcess);
