import React, { Component } from 'react';

class Board extends Component {
  renderRow(props, boardId, rowIndex) {
    const { gameBoards, shouldBoardUpdate } = this.props;

    var tdList = [];
    for (let columnIndex = 0; columnIndex < 10; columnIndex++) {
      tdList.push(<td
                    key={columnIndex}
                    id={boardId + "-td" + rowIndex + columnIndex}
                    className={gameBoards[rowIndex][columnIndex] ? "Board-blackcell" : ""} />
      );
    }

    return (
      <tr key={rowIndex} id={boardId + "-tr" + rowIndex}>
        {tdList}
      </tr>
    )
  }
  
  render() {
    const { isDefenderTurn } = this.props;
    const boardId = isDefenderTurn ? 'DefenderTurn' : 'AttackerTurn';

    var trList = [];
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      trList.push(this.renderRow(this.props, boardId, rowIndex));
    }

    return (
      <table className="Board-table">
        <tbody>
          {trList}
        </tbody>
      </table>
    )
  }
}

export default Board;