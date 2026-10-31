const BASE_HOUR = 305.25;
const BASE_MINUTE = 63;
const BASE_SECOND = 180;


const fonts = document.createElement("link");
fonts.rel = "stylesheet";
fonts.href =
  "https://fonts.googleapis.com/css2?family=Inter:wght@600&family=Noto+Serif&display=swap";
document.head.appendChild(fonts);

const dial = document.getElementById("dial");
const ticks = document.getElementById("ticks");
const numerals = document.getElementById("numerals");
const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");


for (let i = 0; i < 60; i++) {
  const isHour = i % 5 === 0;

  const layer = document.createElement("div");
  layer.className = "absolute inset-0";
  layer.style.transform = `rotate(${i * 6}deg)`;

  const bar = document.createElement("div");

  bar.className = isHour
    ? "absolute top-[11px] left-[179px] h-[14px] w-[2px] rounded-full bg-[#52675c]"
    : "absolute top-[11.5px] left-[179.5px] h-[7px] w-[1px] rounded-full bg-[#aeb5aa]";

  layer.appendChild(bar);
  ticks.appendChild(layer);
}


const NUMERAL_POS = {
  1: [240.4, 44.03],
  2: [290.47, 94.1],
  3: [308.8, 162.5],
  4: [290.47, 230.9],
  5: [240.4, 280.97],
  6: [172, 299.3],
  7: [103.6, 280.97],
  8: [53.53, 230.9],
  9: [35.2, 162.5],
  10: [47.03, 94.1],
  11: [97.1, 44.03],
  12: [165.5, 25.7],
};

for (let n = 1; n <= 12; n++) {
  const [left, top] = NUMERAL_POS[n];

  const el = document.createElement("span");
  el.textContent = n;
  el.className =
    "absolute font-['Noto_Serif',serif] text-[24px] leading-[normal] font-normal whitespace-nowrap text-[#253b35]";
  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  numerals.appendChild(el);
}


let lastLabel = "";

function tick() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const s = now.getSeconds() + ms / 1000;
  const m = now.getMinutes() + s / 60;
  const h = (now.getHours() % 12) + m / 60;


  hourHand.style.transform = `rotate(${h * 30 - BASE_HOUR}deg)`;
  minuteHand.style.transform = `rotate(${m * 6 - BASE_MINUTE}deg)`;
  secondHand.style.transform = `rotate(${s * 6 - BASE_SECOND}deg)`;

  const label = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (label !== lastLabel) {
    lastLabel = label;
    dial.setAttribute("aria-label", `Analog clock, ${label}`);
  }
  requestAnimationFrame(tick);
}

tick();