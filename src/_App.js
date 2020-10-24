import React from 'react';
import logo from './logo.svg';
import './App.css';

let gridCount = 5;
let currentDegree = 0;
let newDegree = 0;
let directions = ['W', 'N', 'E', 'S'];
let vertical = ['1', '2', '3', '4', '5', '6', '7', '8'];
let horizontal = ['1', '2', '3', '4', '5', '6', '7', '8'];
let position = 0;
let minGrid = 1;
let maxGrid = 10;
let hori = 5;
let vert = 5;
const robot = document.getElementById('robot');
let currentPosition = document.getElementById('currentPosition');
let currentDirection = document.getElementById('currDir');
const autoRunInput = document.getElementById('autoRunInput');
currentDirection.innerHTML = 'W';
currentPosition.innerHTML = `x:${hori} , y:${vert}`;

function autoRun() {
  if (!autoRunInput.value) {
    console.log('Check input');
    return;
  }
  let autoPilot = autoRunInput.value.toUpperCase().split('');
  autoPilot.forEach(autoNav => move(autoNav));
}

function moveForward() {
  switch (directions[position]) {
    case 'W':
      if (hori === minGrid) {
        return;
      }
      hori = hori - 1;
      currentPosition.innerHTML = `x:${hori} , y:${vert}`;
      robot.style.marginLeft = (parseInt((robot.style.marginLeft) || parseInt(window.getComputedStyle(robot).marginLeft))) - 40 + 'px';
      break;
    case 'S':
      if (vert === maxGrid) {
        return;
      }
      vert = vert + 1;
      currentPosition.innerHTML = `x:${hori} , y:${vert}`;
      robot.style.marginBottom = (parseInt((robot.style.marginBottom) || parseInt(window.getComputedStyle(robot).marginBottom))) - 40 + 'px';
      break;
    case 'E':
      if (hori === maxGrid) {
        return;
      }
      hori = hori + 1;
      currentPosition.innerHTML = `x:${hori} , y:${vert}`;
      robot.style.marginRight = (parseInt((robot.style.marginRight) || parseInt(window.getComputedStyle(robot).marginRight))) - 40 + 'px';
      break;
    case 'N':
      if (vert === minGrid) {
        return;
      }
      vert = vert - 1;
      currentPosition.innerHTML = `x:${hori} , y:${vert}`;
      robot.style.marginTop = (parseInt((robot.style.marginTop) || parseInt(window.getComputedStyle(robot).marginTop))) - 40 + 'px';
      break;
    default:
  }
}

function turnRight() {
  newDegree = currentDegree + 90;
  robot.style.transform = 'rotate(' + newDegree + 'deg)';
  currentDegree = newDegree;
  position = position + 1;
  position = position % directions.length;
  currentDirection.innerHTML = directions[position];
  return directions[position];
}

function turnLeft() {
  newDegree = currentDegree - 90;
  robot.style.transform = 'rotate(' + newDegree + 'deg)';
  currentDegree = newDegree;
  if (position === 0) {
    position = directions.length;
  }
  position = position - 1;
  currentDirection.innerHTML = directions[position];
  return directions[position];
}

function move(direction) {
  switch (direction) {
    case 'F':
      moveForward();
      break;
    case 'R':
      turnRight()
      break;
    case 'L':
      turnLeft();
      break;
    default:
  }
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div class="control-box">
        <button onclick="move('F')" id="moveUp" class="control">forward</button>
        <button onclick="move('L')" id="moveLeft" class="control">turn left</button>
        <button onclick="move('R')" id="moveRight" class="control">turn right</button>
        <input id ="autoRunInput" type="text" onkeypress="return /[FRL]/i.test(event.key)" placeholder="Ex: FLRLFLLFFRR"/><button onclick="autoRun()" id="input" class="control">Go</button>
      </div>
      <br class="none" />
      <div id="output">
        <div>Current direction: <span id="currDir" /></div>
        <div>Current position:
        <span id="currentPosition" />
      </div>
  </div>
  <br class="none" />
  <div id="playground">
  <div id="robot" />
  </div>
    </div>
  );
}

export default App;
