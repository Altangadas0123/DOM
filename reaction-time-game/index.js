const clickButton = document.getElementById("click-button");
const lastAttempt = document.getElementById("last-attempt");
const bestAttempt = document.getElementById("best-this-session");

const icon = document.getElementById("icon");
const h2 = document.getElementById("h2-text");
const p = document.getElementById("p-text");
// "ready", "waiting", "press", "result"
let gameState = "ready";
let timeoutId = null;
let startTime = null;
let bestScore = null;

const svg = icon.innerHTML;
const dot = `
  <span class="text-4xl">...</span>
`;
const mark = `
  <span class="text-4xl text-[black]">!</span>
`;
const tooSoon = `
  <span class="text-4xl">↻</span>
`;
const correct = `
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check preview-icon"><path d="M20 6 9 17l-5-5"/></svg>
`;

clickButton.addEventListener("click", () => {
  if (gameState === "ready" || gameState === "result") {
    gameState = "waiting";

    clickButton.classList.remove("bg-[#27272A]"); //grey
    clickButton.classList.add("bg-[#66141b]"); //red

    icon.innerHTML = dot;

    h2.textContent = "Wait for green";

    p.textContent = "Not yet. Stay ready.";
    p.classList.remove("w-[85px]");
    p.classList.add("w-fit");

    let randomDelay = 5001;
    while (randomDelay < 1000 || randomDelay > 5000) {
      randomDelay = Math.random() * 10000;
    }
    console.log(randomDelay);

    timeoutId = setTimeout(() => {
      gameState = "press";

      clickButton.classList.remove("bg-[#66141b]"); //red
      clickButton.classList.add("bg-[#c6f562]"); //green

      icon.innerHTML = mark;

      h2.textContent = "Click now!";
      h2.classList.remove ("text-[#F4F4F5]");
      h2.classList.add ("text-[black]");

      p.textContent = "Go, go, go!";
      p.classList.remove ("text-[#F4F4F5]");
      p.classList.add ("text-[black]");

      startTime = Date.now();
    }, randomDelay);
  } else if (gameState === "waiting") {
    gameState = "result";

    clickButton.classList.remove("bg-[#66141b]"); //red
    clickButton.classList.add("bg-[#27272A]"); //grey

    icon.innerHTML = tooSoon;

    h2.textContent = "Too soon!";
    h2.classList.remove ("text-[black]");
    h2.classList.add ("text-[#F4F4F5]");

    p.textContent = "Click to try again";
    p.classList.remove ("text-[black]");
    p.classList.add ("text-[#F4F4F5]");
    startTime = null;

  } else if (gameState === "press") {
    gameState = "result";
    const endTime = Date.now();
    const reactionTime = endTime - startTime;


    clickButton.classList.remove("bg-[#c6f562]"); //green
    clickButton.classList.add("bg-[#27272A]"); //grey

    icon.innerHTML = correct;

    h2.textContent = `${reactionTime} ms`;
    h2.classList.remove ("text-[black]");
    h2.classList.add ("text-[#F4F4F5]");

    p.textContent = "Click to play again";
    p.classList.remove ("text-[black]");
    p.classList.add ("text-[#F4F4F5]");

    lastAttempt.textContent = `${reactionTime} ms`;

    if (reactionTime < bestScore || bestScore === null) {
      bestScore = reactionTime;
      bestAttempt.textContent = `${reactionTime} ms`;
    }
  }
});
