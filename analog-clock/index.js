const markers = document.getElementById("markers");
const numbers = document.getElementById("numbers");

const hourHand = document.getElementById("hour-hand");
const minuteHand = document.getElementById("minute-hand");
const secondHand = document.getElementById("second-hand");

const START_HOUR = 305.25;
const START_MINUTE = 63;
const START_SECOND = 180;


for(let i = 0; i < 60; i++) {
  const marker = document.createElement("div");
  marker.className = "absolute inset-0";
  marker.style.transform = `rotate(${i * 6}deg)`;

  const tick = document.createElement("span");
  const tickType = i % 5 === 0 ? "w-0 h-3 border border-[#657666]" : "w-[0.63px] h-[5.97px] border-[0.5px] border-[#C9CEC1]";

  tick.className = `absolute top-[11px] left-1/2 -translate-x-1/2 rounded-full ${tickType}`;

  marker.appendChild(tick);
  markers.appendChild(marker);
}

for(let i = 1; i <= 12; i++) {
  const number = document.createElement("span");
  number.textContent = i;
  const angle = (i * Math.PI) / 6;

  number.className = "absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-['Noto_Serif',serif]";

  // number.style.left = `${50 + 38 * Math.sin(angle)}%`;
  // number.style.top = `${50 - 38 * Math.cos(angle)}%`;

  // ================================================
const RADIUS = 136.8;

number.style.left = `calc(50% + ${RADIUS * Math.sin(angle)}px)`;
number.style.top = `calc(50% + ${-RADIUS * Math.cos(angle)}px)`;
  // ================================================

  numbers.appendChild(number);
}

const runtime = () => {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = now.getHours() + minutes / 60;

  hourHand.style.transform = `rotate(${(hours % 12) * 30 - START_HOUR}deg)`;
  minuteHand.style.transform = `rotate(${minutes * 6 - START_MINUTE}deg)`;
  secondHand.style.transform = `rotate(${seconds * 6 - START_SECOND}deg)`;

  requestAnimationFrame(runtime);
};

runtime();