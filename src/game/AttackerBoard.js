import React, { Component } from 'react';

class AttackerBoard extends Component {
  renderRow(props, boardId, rowIndex) {
    const { gameBoards } = this.props;

    var tdList = [];
    for (let columnIndex = 0; columnIndex < gameBoards.length; columnIndex++) {
      var className = '';
      if (gameBoards[rowIndex][columnIndex] === 1) {
        className = 'Board-blackcell';
      } else if (gameBoards[rowIndex][columnIndex] === 0) {
        className = 'Board-adjacentcell';
      }

      tdList.push(<td
                    key={columnIndex}
                    id={boardId + "-td" + rowIndex + columnIndex} 
                    className={className} />
      );
    }

    return (
      <tr key={rowIndex} id={boardId + "-tr" + rowIndex}>
        {tdList}
      </tr>
    )
  }
  
  render() {
    const { gameBoards } = this.props;
    const boardId = 'AttackerBoard';

    var trList = [];
    for (let rowIndex = 0; rowIndex < gameBoards.length; rowIndex++) {
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

export default AttackerBoard;