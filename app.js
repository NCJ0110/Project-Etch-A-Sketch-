const container = document.querySelector('.container');
const gridSizeBtn = document.querySelector('.grid-size-btn');
const gridSlider = document.querySelector('.slider');
const gridSliderIncrement = document.querySelector('.slider-increment');
const blackBtn = document.querySelector('.black-btn');
const randomBtn = document.querySelector('.random-btn');
const eraseBtn = document.querySelector('.erase-btn');
const fadeBtn = document.querySelector('.fade-btn');
const clearAllBtn = document.querySelector('.clear-all-btn');
const colorPicker = document.querySelector('.color-picker');

const containerWidth = container.clientWidth;
let cells;
let sliderIncrementArr = [8, 16, 32, 64];
gridSlider.value = 2;

function cellAmount(amount = 32) {
  createGrid(amount, amount);
}

function createGrid(x, y) {
  container.innerHTML = '';
  let cellSize = containerWidth / x;
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cells = document.querySelectorAll('.cell');
      container.appendChild(cell);
    }
  }
}

function createRandomColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  const rgb = { red, green, blue };

  return rgb;
}

function applyColorToCells(e) {
  let chosenColor = e.target.value;
  cells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
      console.log(e.value);
      e.target.style.backgroundColor = chosenColor;
    });
  });
}

function applyRainbowToCells() {
  cells.forEach((cell) => {
    const rgb = createRandomColor();
    cell.addEventListener('mouseover', (e) => {
      e.target.style.backgroundColor = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    });
  });
}

function eraseColor() {
  cells.forEach((cell) => {
    cell.addEventListener('mouseover', (e) => {
      e.target.style.backgroundColor = 'white';
    });
  });
}

function fadeColor() {
  cells.forEach((cell) => {
    let currentShade = 0.1;
    cell.addEventListener('mouseover', (e) => {
      e.target.style.backgroundColor = `rgba(0,0,0,${currentShade})`;
      currentShade += 0.1;
    });
  });
}

function clearAll() {
  cells.forEach((cell) => {
    cell.style.backgroundColor = 'white';
  });
}

cellAmount();

gridSlider.addEventListener('input', (e) => {
  gridSliderIncrement.innerHTML = sliderIncrementArr[e.target.value];
  cellAmount(gridSliderIncrement.innerHTML);
});

colorPicker.addEventListener('click', applyColorToCells);
colorPicker.addEventListener('input', applyColorToCells);

randomBtn.addEventListener('click', applyRainbowToCells);

eraseBtn.addEventListener('click', eraseColor);

fadeBtn.addEventListener('click', fadeColor);

clearAllBtn.addEventListener('click', clearAll);
