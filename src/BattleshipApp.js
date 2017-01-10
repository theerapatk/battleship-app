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

  handlePlaceShipClick(row, column) {
    var gameBoards = this.state.gameBoards.slice();
    gameBoards[row][column] = 1;
    this.setState({gameBoards: gameBoards});
  }

  handleConfirmClick() {
  	this.setState({isDefenderTurn: !this.state.isDefenderTurn});
  }

  render() {
    return (
    	<div className="BattleshipApp-container">
      {this.state.isDefenderTurn ?
      	<DefenderTurn
          gameBoards={this.state.gameBoards}
      		isDefenderTurn={this.state.isDefenderTurn}
      		onPlaceShipClick={this.handlePlaceShipClick}
      		onConfirmClick={this.handleConfirmClick} />
      	:
      	<AttackerTurn
      		isDefenderTurn={this.state.isDefenderTurn} />}
      </div>
    );
  }
}

export default BattleshipApp;