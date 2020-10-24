import React, { Component } from 'react';
import Button from './Button';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.gridCount = 5;
    this.currentPosition = '';
    this.currentDegree = 0;

    this.newDegree = 0;
    this.directions = ['W', 'N', 'E', 'S'];
    this.position = 0;
    this.minGrid = 1;
    this.maxGrid = 10;
    this.hori = 5;
    this.vert = 5;

    this.state = {
      currentDirection: 'W',
      autoRunValue: ''
    };
  }

  autoRun() {
    if (!this.state.autoRunValue) {
      console.log('Check input');
      return;
    }
    let autoPilot = this.state.autoRunValue.toUpperCase().split('');
    autoPilot.forEach(autoNav => this.move(autoNav));
    this.setState({autoRunValue: ''})
  }

  componentDidMount() {
    this.robot = React.createRef();
    this.robot = document.getElementById('robot');
    this.currentPosition = document.getElementById('currentPosition');
    this.inputField = document.getElementById('autoRunInput').addEventListener('keypress', e => console.log(e.key));
  }

  moveForward() {
    switch (this.directions[this.position]) {
      case 'W':
        if (this.hori === this.minGrid) {
          return;
        }
        this.hori = this.hori - 1;
        this.currentPosition = `x:${this.hori} , y:${this.vert}`;
        this.robot.style.marginLeft = (parseInt((this.robot.style.marginLeft) || parseInt(window.getComputedStyle(this.robot).marginLeft))) - 40 + 'px';
        break;
      case 'S':
        if (this.vert === this.maxGrid) {
          return;
        }
        this.vert = this.vert + 1;
        this.currentPosition = `x:${this.hori} , y:${this.vert}`;
        this.robot.style.marginBottom = (parseInt((this.robot.style.marginBottom) || parseInt(window.getComputedStyle(this.robot).marginBottom))) - 40 + 'px';
        break;
      case 'E':
        if (this.hori === this.maxGrid) {
          return;
        }
        this.hori = this.hori + 1;
        this.currentPosition = `x:${this.hori} , y:${this.vert}`;
        this.robot.style.marginRight = (parseInt((this.robot.style.marginRight) || parseInt(window.getComputedStyle(this.robot).marginRight))) - 40 + 'px';
        break;
      case 'N':
        if (this.vert === this.minGrid) {
          return;
        }
        this.vert = this.vert - 1;
        this.currentPosition = `x:${this.hori} , y:${this.vert}`;
        this.robot.style.marginTop = (parseInt((this.robot.style.marginTop) || parseInt(window.getComputedStyle(this.robot).marginTop))) - 40 + 'px';
        break;
      default:
    }
    this.setState({ currentDirection: this.directions[this.position] });
  }

  turnRight() {
    this.newDegree = this.currentDegree + 90;
    this.robot.style.transform = 'rotate(' + this.newDegree + 'deg)';
    this.currentDegree = this.newDegree;
    this.position = this.position + 1;
    this.position = this.position % this.directions.length;
    this.setState({ currentDirection: this.directions[this.position] });
    return this.directions[this.position];
  }

  turnLeft() {
    this.newDegree = this.currentDegree - 90;
    this.robot.style.transform = 'rotate(' + this.newDegree + 'deg)';
    this.currentDegree = this.newDegree;
    if (this.position === 0) {
      this.position = this.directions.length;
    }
    this.position = this.position - 1;
    this.setState({ currentDirection: this.directions[this.position] });
    return this.directions[this.position];
  }

  move(direction) {
    switch (direction) {
      case 'F':
        this.moveForward();
        break;
      case 'R':
        this.turnRight()
        break;
      case 'L':
        this.turnLeft();
        break;
      default:
    }
  }

  render() {
    return (
      <div>
          <div className="control-box">
            <Button
              classes="control"
              id='moveUp'
              onClick={() => this.move('F')}
              buttonText="Forward"
            />
            <Button
                classes="control"
                id='moveLeft'
                onClick={() => this.move('L')}
                buttonText="Turn left"
            />
            <Button
                classes="control"
                id='moveUp'
                onClick={() => this.move('R')}
                buttonText="Turn right"
            />
          <input
            id="autoRunInput"
            ref={this.autoRunInput}
            type="text"
            // onKeyPress={(e) => /[FRL]/i.test(e.key)}
            placeholder="Ex: FLRLFLLFFRR"
            onChange={e => {
              this.setState({ autoRunValue: e.target.value })
            }}
            value={this.state.autoRunValue} />
          <Button
                classes="control"
                id='input'
                onClick={() => this.autoRun(this.state.autoRunValue)}
                buttonText="Go"
            />
        </div>
          <br className="none" />
          <div id="output">
            <div>Current direction: <span id="currDir" />{this.state.currentDirection}</div>
            <div>Current position: <span>x:{this.hori} , y:{this.vert}</span>
            </div>
          </div>
          <br className="none" />
          <div id="playground">
            <div id='robot'/>
          </div>
        </div>
  );
  }
}

export default App;
