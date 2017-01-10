import React, { Component } from 'react';

class Board extends Component {
  renderRow(boardId, rowIndex) {
    return (
      <tr id={boardId + "-tr" + rowIndex}>
        <td id={boardId + "-td" + rowIndex + "0"} />
        <td id={boardId + "-td" + rowIndex + "1"} />
        <td id={boardId + "-td" + rowIndex + "2"} />
        <td id={boardId + "-td" + rowIndex + "3"} />
        <td id={boardId + "-td" + rowIndex + "4"} />
        <td id={boardId + "-td" + rowIndex + "5"} />
        <td id={boardId + "-td" + rowIndex + "6"} />
        <td id={boardId + "-td" + rowIndex + "7"} />
        <td id={boardId + "-td" + rowIndex + "8"} />
        <td id={boardId + "-td" + rowIndex + "9"} />
      </tr>
    )
  }
  
  render() {
    const { isDefenderTurn } = this.props;
    const boardId = isDefenderTurn ? 'DefenderTurn' : 'AttackerTurn';
    return (
      <table className="Board-table">
        <tbody>
          {this.renderRow(boardId, 0)}
          {this.renderRow(boardId, 1)}
          {this.renderRow(boardId, 2)}
          {this.renderRow(boardId, 3)}
          {this.renderRow(boardId, 4)}
          {this.renderRow(boardId, 5)}
          {this.renderRow(boardId, 6)}
          {this.renderRow(boardId, 7)}
          {this.renderRow(boardId, 8)}
          {this.renderRow(boardId, 9)}
        </tbody>
      </table>
    )
  }
}

export default Board;