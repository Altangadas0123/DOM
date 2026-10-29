const password = document.getElementById("randorPassword");
const hint = document.getElementById("copied");
const lengthText = document.getElementById("passLength");
const circle = document.getElementById("circle");
const circleLine = document.getElementById("circleLine");
const track = circle.parentElement;

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";
let length = 16;

function generate() {
  const random = crypto.getRandomValues(new Uint32Array(length));
  password.textContent = Array.from(random, (n) => characters[n % characters.length]).join("");
  hint.textContent = "Uses letters, numbers, and symbols.";
}

function setLength(clientX) {
  const rect = track.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  const newLength = Math.round(8 + ratio * 16);
  if (newLength === length) return;
  length = newLength;

  const x = ((length - 8) / 16) * 448;
  circle.style.left = x - 8 + "px";
  circleLine.style.width = x + "px";
  lengthText.textContent = length;
  generate();
}

let dragging = false;
track.style.cursor = "pointer";
track.style.touchAction = "none";
track.addEventListener("pointerdown", (e) => {
  dragging = true;
  track.setPointerCapture(e.pointerId);
  setLength(e.clientX);
});
track.addEventListener("pointermove", (e) => dragging && setLength(e.clientX));
track.addEventListener("pointerup", () => (dragging = false));

document.getElementById("generatePassButton").addEventListener("click", generate);

const copyButton = document.getElementById("copyButton");
let copyTimer;

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(password.textContent);
    copyButton.textContent = "Copied!";
    hint.textContent = "Password copied to clipboard.";
  } catch {
    copyButton.textContent = "Failed";
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => {
    copyButton.textContent = "Copy";
    hint.textContent = "Uses letters, numbers, and symbols.";
  }, 2500);
});

generate();