const clickButton = document.getElementById("click-button");
const lastAttempt = document.getElementById("last-attempt");
const bestAttempt = document.getElementById("best-this-session");

const icon = document.getElementById("icon");
const h2 = document.getElementById("h2-text");
const p = document.getElementById("p-text");

let gameState = "ready"; // "ready", "waiting", "press", "result"
let timeoutId = null;
let startTime = null;
let bestScore = null;





