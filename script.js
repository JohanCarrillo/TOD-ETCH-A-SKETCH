/* // using float and clear
function gridGenerator(numGrids) {
  // Creates a square matrix of numGrids**2 <div>'s
  // using float/clear

  function insertDiv(parentNode, id, numGrids) {
  // insert div element using float/clear
    const div = document.createElement('div');
    div.classList.add('grid');
    if (id % numGrids === 0) {
      div.setAttribute('style', 'clear: left');
      parentNode.appendChild(div);
      return;
    }
    div.setAttribute('style', 'clear: none');
    parentNode.appendChild(div);
    return;
  }
  const container = document.querySelector('#container');
  for (let i=0; i<numGrids**2; i++) insertDiv(container, i, numGrids);
  return;
}

gridGenerator(16);
*/

// using flex-box
function gridGenerator(numGrids){
  /* generate a square grid of numGrid*numGrids size. Each cell is a div*/

  function insertDiv(parentNode) {
    // generate a single cell
    const div = document.createElement('div');
    div.classList.add('cell');
    parentNode.appendChild(div);
    return;
  }
  
  function createRow(numGrid, parentNode) {  // generate a row
    for (let i=0; i<numGrid; i++) insertDiv(parentNode);
    return;
  }

  const container = document.querySelector('#container');
  for (let i=0; i<numGrids; i++) {  // push all the rows to create the grid
    const span = document.createElement('span');
    //span.classList.add('row')
    createRow(numGrids, span);
    container.appendChild(span);
  }
  return;
}

function changeGridSize() {
  // this function deletes the actual grid and creates a new one with the input value
  
  // delete old container
  const containerOld = document.querySelector('#container');
  containerOld.parentNode.removeChild(containerOld);
  // create new container
  const containerNew = document.createElement('div');
  containerNew.setAttribute('id', 'container')
  // append new container
  document.querySelector('body').appendChild(containerNew);

  const gridSize = document.querySelector('#size').value;;  // get new size
  gridGenerator(gridSize);  // generate new grid

  // show new gridSize
  document.querySelector('output').textContent = gridSize + 'x' + gridSize;
}

// ---------------------------- BUTTONS FUNCTIONS ------------------------------
function paintBlack() {
  // this function enables the painting black when the mouse pass over the cell

  const cellArray = Array.from(document.querySelectorAll('.cell'));
  cellArray.forEach(element => element.addEventListener('mouseover', () => {
    element.classList.remove('randomed');
    element.style.backgroundColor = 'black';
    }
  ));
}

function eraser() {
  // this function enables the painting white or "eraser" when passing over a cell

  const cellArray = Array.from(document.querySelectorAll('.cell'));
  cellArray.forEach(element => element.addEventListener('mouseover', () => {
    element.classList.remove('randomed');
    element.style.backgroundColor = 'white';
    }
  ));
}

function displayGrid(show) {
  // this function show/hide the grid

  const cellArray = Array.from(document.querySelectorAll('.cell'));
  let showNew;
  if (show === false) {
    cellArray.forEach(element => {
    element.setAttribute('style', 'border: 1px dashed grey');
    })
    showNew = true;
  } else {
      cellArray.forEach(element => {
        element.setAttribute('style', 'border: 0px');
      })
      showNew = false;
  }
  return showNew;
}

function randomColor() {
 /* this function generates a random color the first time you pass over a cell
    then reduces lightness of that color by 10% each time you pass over the cell
    until it gets completely black*/

  const cellArray = Array.from(document.querySelectorAll('.cell'));
  const colorPercentArray = new Array(cellArray.length);  // to store IDs and 10% of color (1x3) array
  
  cellArray.forEach(element => element.addEventListener('mouseover', () => {
    const cellId = cellArray.indexOf(element);  // index of each cell

    const chooseColor = () => {
      // receives a 1x3 array to store the 10% of color values. returns a random RGB color
      const r = Math.floor(Math.random() * 256);
      const g =  Math.floor(Math.random() * 256);
      const b =  Math.floor(Math.random() * 256);
      colorPercentArray[cellId] = [Math.floor(r*0.1), Math.floor(g*0.1), Math.floor(b*0.1)];  // 10% of each color
      return `rgb(${r}, ${g}, ${b})`;
    }

    const reduceColor = () => {
      // reduce each component of rgb by 10%

      // read current color
      let rgb = element.style.backgroundColor;
      // separate in components
      rgb = rgb.replace(/[^\d,]/g, '').split(',');
      // reduce intensity
      for (let i=0; i<3; i++) {
        const delta = rgb[i] - colorPercentArray[cellId][i];
        delta <= 0 ? rgb[i] = 0 : rgb[i] -= colorPercentArray[cellId][i];  // if left than zero make it black
      }
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    // check if the cell is already painted with random
    if (element.classList.contains('randomed')) {
      // reduce rgb by 10%
      const newColor = reduceColor();
      console.log('New color: ' + newColor);
      element.style.backgroundColor = newColor;
    } else{  // if not, then random it and store the 10% brightness
      // paint
      element.classList.add('randomed');
      // choose color and save 10% of each component
      const color = chooseColor();
      element.style.backgroundColor = color;
    }
  }
  ));
  return;
}

// ----------------------------- INITIALIZATION ----------------------------
// generate initial grid
gridGenerator(16);
// displaygrid
displayGridBool = false;

// enable size change
const gridSize = document.querySelector('#size');
gridSize.addEventListener('click', () => {
  changeGridSize();
  // bubble function
});

// enable buttons functionality
document.querySelector('#paint-black').addEventListener('click', paintBlack);
document.querySelector('#erase').addEventListener('click', eraser);
document.querySelector('#clear').addEventListener('click', changeGridSize);
document.querySelector('#display-grid').addEventListener('click', () => 
    displayGridBool = displayGrid (displayGridBool));
document.querySelector('#random').addEventListener('click', randomColor);
// ----------------------------------------------------------


