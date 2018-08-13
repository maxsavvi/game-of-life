import React, { Component } from 'react';
import './App.css';
import Board from './Board';


class App extends Component {

  constructor(props) {
    super(props);
    let rows = 15;
    let cols = 15;
    let gameArray = Array(rows * cols).fill(0);
    this.state = {
      gameArray: gameArray,
      rows: rows,
      cols: cols,
      isLocked: false,
    }
  }

  start() {
    this.setState({
      isLocked: true,
    })
    this.interval = setInterval(() => this.tick(), 1000);
  }

  getIndex(i,j) {
    return i * this.state.cols + j;
  }

  handleClick(i, j) {
    let index = this.getIndex(i,j);
    let gameArray = this.state.gameArray.slice();
    gameArray[index] = (gameArray[index]) === 1 ? 0 : 1;
    this.setState({
      gameArray: gameArray,
    });
  }


  alive(ii, jj) {
    let adjAlive = 0;
    let alive = this.state.gameArray[this.getIndex(ii,jj)];
    for (let i = Math.max(ii-1, 0); i <= Math.min(ii+1, this.state.rows-1); i++) {
      for (let j = Math.max(jj-1, 0); j <= Math.min(jj+1, this.state.cols-1); j++) {
        if (ii === i && jj === j) continue;
        adjAlive += this.state.gameArray[this.getIndex(i,j)];
      }
    }
    if (alive) return (adjAlive > 1 && adjAlive < 4);
    else return adjAlive === 3;
  }


  tick() {
    let newGameArray = Array(this.state.rows * this.state.cols).fill(0);
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.cols; j++) {
        newGameArray[this.getIndex(i,j)] = this.alive(i,j) ? 1 : 0;
      }
    }
    this.setState({
      gameArray: newGameArray
    })
  }

  reset() {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      gameArray: Array(this.state.rows * this.state.cols).fill(0),
      isLocked: false,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Conway's Game of Life</h1>
        </header>
        <Board
          rows={this.state.rows}
          cols={this.state.cols}
          gameArray={this.state.gameArray}
          isLocked={this.state.isLocked}
          onSquareClick={(i,j) => this.handleClick(i,j)} />
          <button disabled={this.state.isLocked} onClick={() => this.start()}>
            start
          </button>
          <button onClick={() => this.reset()}>
            stop/reset
          </button>
      </div>
    );
  }
}

export default App;
