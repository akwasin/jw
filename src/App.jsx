import React, { Component } from 'react';
import Button from './Button';
import Strings from './strings'
import './App.css';

/**
 * App running component
 */
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
      inputError: false,
      currentDirection: 'W',
      autoRunValue: ''
    };
  }

  componentDidMount() {
    this.robot = document.getElementById('robot');
    this.currentPosition = document.getElementById('currentPosition');
  }

  /**
   * Function for running robot based on input
   */
  autoRun() {
    if (!this.state.autoRunValue) {
      this.setState({inputError: true})
      return;
    }
    let autoPilot = this.state.autoRunValue.toUpperCase().split('');
    autoPilot.forEach(autoNav => this.move(autoNav, this.state.autoRunValue.length));
    this.setState({autoRunValue: ''})
  }

  /**
   * Moves robot forward
   */
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

  /**
   * Rotates robot right using css
   */
  turnRight() {
    this.newDegree = this.currentDegree + 90;
    this.robot.style.transform = 'rotate(' + this.newDegree + 'deg)';
    this.currentDegree = this.newDegree;
    this.position = this.position + 1;
    this.position = this.position % this.directions.length;
    this.setState({ currentDirection: this.directions[this.position] });
    return this.directions[this.position];
  }

  /**
   * Rotates robot left using css
   */
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

  /**
   * Runs function dependent on current direction
   * @param {string} direction Current direction robot is facing
   * @param {number} turns amount of direction calls
   */
  move(direction, turns) {
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

  /**
   * Renders UI
   */
  render() {
    return (
      <div>
          <div className="control-box">
            <Button
              classes="control"
              id='moveUp'
              onClick={() => this.move('F')}
              buttonText={Strings.buttons.moveForward}
            />
            <Button
              classes="control"
              id='moveLeft'
              onClick={() => this.move('L')}
              buttonText={Strings.buttons.turnLeft}
            />
            <Button
              classes="control"
              id='moveUp'
              onClick={() => this.move('R')}
              buttonText={Strings.buttons.turnRight}
            />
          <input
            id="autoRunInput"
            ref={this.autoRunInput}
            type="text"
            placeholder={Strings.labels.autoRunInputPlacerholder}
            onChange={e => {
              this.setState({
                autoRunValue: e.target.value,
                inputError: false,
              })
            }}
            value={this.state.autoRunValue}
          />
          <Button
            classes="control"
            id='input'
            onClick={() => this.autoRun(this.state.autoRunValue)}
            buttonText={Strings.buttons.autoRun}
          />
          <div className="error-message">
            {this.state.inputError ? 'There is an error. Check input' : ''}
          </div>
        </div>
          <div className="output">
            <div>{Strings.labels.currentDirection} <span id="currDir" />{this.state.currentDirection}</div>
            <div>{Strings.labels.currentPosition} <span>x:{this.hori} , y:{this.vert}</span>
            </div>
          </div>
          <div id="playground">
            <div id='robot'/>
          </div>
        </div>
  );
  }
}

export default App;
