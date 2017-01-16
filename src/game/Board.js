import React, { Component } from 'react';

class Board extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(rowIndex, columnIndex) {
    this.props.onCellClick(rowIndex, columnIndex);
  }

  renderRow(rowIndex) {
    const { gameBoards, boardId } = this.props;

    var tdList = [];
    for (let columnIndex = 0; columnIndex < gameBoards.length; columnIndex++) {
      var className = '';
      if (gameBoards[rowIndex][columnIndex] === 1) {
        className = 'Board-blackcell';
      } else if (gameBoards[rowIndex][columnIndex] === 2) {
        className = 'Board-adjacentcell';
      }

      tdList.push(
        <td
          key={columnIndex}
          id={boardId + "-td" + rowIndex + columnIndex} 
          className={className}
          onClick={() => this.handleClick(rowIndex, columnIndex)} />
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

    var trList = [];
    for (let rowIndex = 0; rowIndex < gameBoards.length; rowIndex++) {
      trList.push(this.renderRow(rowIndex));
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