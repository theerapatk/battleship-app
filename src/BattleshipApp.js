import React, { Component } from 'react';
import DefenderTurn from './game/DefenderTurn';
import AttackerTurn from './game/AttackerTurn';

class BattleshipApp extends Component {
	constructor(props) {
    super(props);
    var gameBoards = new Array(10).fill(null);
    for (let i = 0; i < 10; i++) {
      gameBoards[i] = new Array(10).fill(null);
    }
    this.state = {
      gameBoards: gameBoards,
      isDefenderTurn: true
    };
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  fillAdjacentCell(row, column, gameBoards, adjacentValue) {
    var gameBoardsLength = gameBoards.length;
    for (let rowIndex = row - 1; rowIndex < row + 2; rowIndex++) {
      for (let columnIndex = column - 1; columnIndex < column + 2; columnIndex++) {
        if (-1 < rowIndex && rowIndex < gameBoardsLength &&
            -1 < columnIndex && columnIndex < gameBoardsLength &&
            (rowIndex !== row || columnIndex !== column)) {
          if (gameBoards[rowIndex][columnIndex] == null) {
            gameBoards[rowIndex][columnIndex] = adjacentValue;
          }
        }
      }
    }
  }

  handlePlaceShipClick(row, column, ship, direction) {
    var gameBoards = this.state.gameBoards.slice();
    var shipSize = ship.size;
    var adjacentValue = 2;
    if (direction === 'horizontal') {
      for (let i = 0; i < shipSize; i++) {
        gameBoards[row][column + i] = 1;
        this.fillAdjacentCell(row, column + i, gameBoards, adjacentValue);
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < shipSize; i++) {
        gameBoards[row + i][column] = 1;
        this.fillAdjacentCell(row + i, column, gameBoards, adjacentValue);
      }
    }
    this.setState({gameBoards: gameBoards});
  }

  handleConfirmClick() {
  	this.setState({isDefenderTurn: !this.state.isDefenderTurn});
  }

  render() {
    return (
    	<div className="BattleshipApp-container">
      {this.state.isDefenderTurn ? (
      	<DefenderTurn
          gameBoards={this.state.gameBoards}
          isDefenderTurn={this.state.isDefenderTurn}
          onPlaceShipClick={this.handlePlaceShipClick}
          onConfirmClick={this.handleConfirmClick} />
      ) : (
        <AttackerTurn
          gameBoards={this.state.gameBoards}
      		isDefenderTurn={this.state.isDefenderTurn} />
      )}
      </div>
    );
  }
}

export default BattleshipApp;