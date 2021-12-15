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

  function insertDiv(parentNode) {
    const div = document.createElement('div');
    div.classList.add('cell');
    parentNode.appendChild(div);
    return;
  }
  
  function createRow(numGrid, parentNode) {
    for (let i=0; i<numGrid; i++) insertDiv(parentNode);
    return;
  }

  const container = document.querySelector('#container');
  for (let i=0; i<numGrids; i++) {
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

  const gridSize = document.querySelector('#size').value
  gridGenerator(gridSize);

  // show new gridSize
  document.querySelector('output').textContent = gridSize + 'x' + gridSize;
}

// ---------------------------- BUTTONS FUNCTIONS ------------------------------
function paintBlack() {
  // this function enables the painting black when the mouse pass over the cell
  const cellArray = Array.from(document.querySelectorAll('.cell'));
  cellArray.forEach(element => element.addEventListener('mouseover', () => {
    //element.classList.remove('erase');
    element.classList.add('paint-black');
    }
  ));
}

function eraser() {
  // this function enables the painting white or "eraser" when passing over a cell
  const cellArray = Array.from(document.querySelectorAll('.cell'));
  cellArray.forEach(element => element.addEventListener('mouseover', () => {
    element.classList.remove('paint-black');
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

  const chooseColor = () => {
    // creates a random color
    const h = Math.floor(Math.random() * 360);
    const s =  Math.floor(Math.random() * 100);
    const l =  Math.floor(Math.random() * 100);
    return `hsl(${h}deg, ${s}%, ${l}%)`;
  }

  const cellArray = Array.from(document.querySelectorAll('.cell'));
  cellArray.forEach(element => element.addEventListener('mouseover', () => {
    // check if the cell is already randomed
    if (element.classList.contains('randomed')) {
      // reduce s by 10%
      console.log(element.style.backgroundColor);
    } else{  // if not, then random it
      element.classList.remove('paint-black');
      element.classList.add('randomed');
      const color = chooseColor();
      element.style.backgroundColor = color;
      //console.log(color);
    }
  }
  ));
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


