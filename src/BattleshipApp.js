import React, { Component } from 'react';
import DefenderTurn from './game/DefenderTurn';
import AttackerTurn from './game/AttackerTurn';

class BattleshipApp extends Component {
  constructor(props) {
    super(props);
    var gameBoards = new Array(10).fill(null);
    for (let i = 0; i < gameBoards.length; i++) {
      gameBoards[i] = new Array(10).fill(null);
    }
    this.state = {
      gameBoards: gameBoards,
      isDefenderTurn: true,
      attackResultMessage: '',
      shipSunkNumber: 0,
      movesCount: 0
    };
    this.placedShips = [];
    this.cooridnateMap = {};
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
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
    var placedShip = {
      name: ship.name,
      value: ship.value,
      id: Date.now(),
      size: ship.size,
      hit: 0,
      sunk: false
    };

    if (direction === 'horizontal') {
      for (let i = 0; i < shipSize; i++) {
        let shipColumn = column + i;
        gameBoards[row][shipColumn] = 1;
        this.cooridnateMap[row + '' + shipColumn] = placedShip.id;
        this.fillAdjacentCell(row, shipColumn, gameBoards, adjacentValue);
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < shipSize; i++) {
        let shipRow = row + i;
        gameBoards[shipRow][column] = 1;
        this.cooridnateMap[shipRow + '' + column] = placedShip.id;
        this.fillAdjacentCell(shipRow, column, gameBoards, adjacentValue);
      }
    }

    this.placedShips.push(placedShip);

    this.setState({
      gameBoards: gameBoards
    });
  }

  handleConfirmClick() {
    this.setState({isDefenderTurn: !this.state.isDefenderTurn});
  }

  handleAttackClick(row, column) {
    var idFromCoordianate = this.cooridnateMap[row + '' + column];

    if (idFromCoordianate != null) {
      for (let i = 0; i < this.placedShips.length; i++) {
        var placedShip = this.placedShips[i];
        if (placedShip.id === idFromCoordianate) {
          placedShip.hit++;
          this.setState({
            attackResultText: 'Hit!',
            movesCount: this.state.movesCount + 1
          });
          if (placedShip.hit === placedShip.size) {
            placedShip.sunk = true;
            this.setState({
              attackResultText: `You just sank the ${placedShip.name}`,
              shipSunkNumber: this.state.shipSunkNumber + 1
            });
          }
        }
      }
    } else {
      this.setState({
        attackResultText: 'Miss!',
        movesCount: this.state.movesCount + 1
      });
    }
  }

  checkIfGameIsOver() {
    for (let i = 0; i < this.placedShips.length; i++) {
      var placedShip = this.placedShips[i];
      if (placedShip.sunk === false) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { isDefenderTurn, gameBoards, attackResultText, shipSunkNumber, movesCount } = this.state;

    var isGameOver = this.checkIfGameIsOver();

    return (
    	<div className="BattleshipApp-container">
      {isDefenderTurn ? (
      	<DefenderTurn
          gameBoards={gameBoards}
          onPlaceShipClick={this.handlePlaceShipClick}
          onConfirmClick={this.handleConfirmClick} />
      ) : (
        <AttackerTurn
          defenderGameBoards={gameBoards}
          onAttackClick={this.handleAttackClick}
          attackResultText={attackResultText}
          shipSunkNumber={shipSunkNumber}
          isGameOver={isGameOver} 
          movesCount={movesCount} />
      )}
      </div>
    );
  }
}

export default BattleshipApp;