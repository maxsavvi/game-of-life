import React from 'react';
import './Board.css';
import Square from './Square';


class Board extends React.Component {

  renderRow(i) {
    let row = [];
    for (let j = 0; j < this.props.cols; j++) {
      let index = i * this.props.cols + j;
      row.push(
        <Square
          key={""+i+j}
          alive={this.props.gameArray[index]}
          isLocked={this.props.isLocked}
          onClick={() => this.props.onSquareClick(i, j)}
         />
      )
    }
    return (
      <div className="board-row" key={''+i}>
        {row}
      </div>
    );
  }


  render() {
    let board = [];
    for (let i = 0; i < this.props.rows; i++) {
      board.push(this.renderRow(i));
    }

    return (
      <div className="board">
        {board}
      </div>
    );
  }
}

export default Board;
