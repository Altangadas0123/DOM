const colors = document.getElementById("colors");
const statusElement = document.getElementById("status");
const shufflePalettes = document.getElementById("shuffle-colors");


const lightness = [94, 86, 76, 64, 52, 43, 35, 27, 20, 12];
const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const families = [
  { name: "red", hue: 0, saturation: 85 },
  { name: "lime", hue: 82, saturation: 76 },
  { name: "sky", hue: 199, saturation: 90 },
  { name: "gray", hue: 220, saturation: 9 },
  { name: "zinc", hue: 240, saturation: 5 },
  { name: "stone", hue: 30, saturation: 6 },
  { name: "teal", hue: 174, saturation: 72 },
  { name: "cyan", hue: 189, saturation: 86 },
  { name: "blue", hue: 217, saturation: 88 },
  { name: "pink", hue: 330, saturation: 80 },
  { name: "rose", hue: 347, saturation: 86 },
  { name: "neutral", hue: 0, saturation: 0 },
  { name: "amber", hue: 40, saturation: 94 },
  { name: "orange", hue: 25, saturation: 92 },
  { name: "yellow", hue: 52, saturation: 90 },
  { name: "green", hue: 142, saturation: 68 },
  { name: "slate", hue: 215, saturation: 20 },
  { name: "indigo", hue: 239, saturation: 80 },
  { name: "violet", hue: 258, saturation: 84 },
  { name: "purple", hue: 271, saturation: 82 },
  { name: "emerald", hue: 160, saturation: 76 },
  { name: "fuchsia", hue: 292, saturation: 82 },
];

let selectedFamilies = ["red", "amber", "emerald", "sky", "violet", "pink"].map((name) => families.find((family) => name === family.name));



const hslToHex = ({ hue, saturation, lightness }) => {
  const l = lightness / 100;
  const s = saturation / 100;
  const amplitude = s * Math.min(l, 1 - l);

  const channel = (offset) => {
    const position = (offset + hue / 30) % 12;
    const value = l - amplitude * Math.max(-1, Math.min(position - 3, 9 - position, 1));
    return Math.round(255 * value)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${channel(0)}${channel(8)}${channel(4)}`.toUpperCase();
};



colors.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-hex]");

  if (!button) return;

  navigator.clipboard.writeText(button.dataset.hex);
});

const renderColors = () => {
  colors.innerHTML = '';

  selectedFamilies.forEach(({ name, hue, saturation}) => {
    const colorButtons = shades.map((shade, index) => {
      const hex = hslToHex({ hue, saturation, lightness: lightness[index] });

      return `<button type="button" data-hex="${hex}" class="w-[113.2px] h-[107px] flex flex-col items-center">
              <div style="background-color: ${hex}" class="w-[113.2px] h-[64px] rounded-xl hover:-translate-y-1"></div>
              <div class="w-[38px] h-[43px] flex flex-col items-center gap-[4px] pt-[8px] pb-[4px]">
                <p class="w-[22px] h-[15px] font-medium text-xs text-[#D4D4D8]">${shade}</p>
                <p class="w-[38px] h-[12px] font-normal text-[9px] text-[#A1A1AA] font-['Roboto_Mono',_monospace]">${hex}</p>
              </div>
            </button>`;
    }).join("");


    const template = `
    <div class="w-[1240px] h-[136px] flex flex-col gap-[12px]">

  <p class="w-[27px] h-[17px] flex items-center font-semibold capitalize text-sm text-[#E4E4E7]">${name}</p>
  <div class="w-[1240px] h-[107px] flex gap-[12px]">
    ${colorButtons}
  </div>

</div>
    `;
    colors.innerHTML += template;
  });
};

 
shufflePalettes.addEventListener("click", ()=>{
  const remaining = [...families];
  selectedFamilies = [];

  for(let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    selectedFamilies.push(remaining[randomIndex]);

    remaining.splice(randomIndex, 1);
  }


  statusElement.textContent = "6 palettes · 60 shades. Click to copy a HEX background color."
  statusElement.className = "w-fit h-[15px] font-normal text-xs text-[#A1A1AA]";

  renderColors();
  })


renderColors();