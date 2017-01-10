import React, { Component } from 'react';
import DefenderTurn from './DefenderTurn';
import AttackerTurn from './AttackerTurn';

class BattleshipApp extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isDefenderTurn: true
    };
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handlePlaceShipClick() {
  }
  
  handleConfirmClick() {
  	this.setState({isDefenderTurn: !this.state.isDefenderTurn});
  }

  render() {
    return (
    	<div className="BattleshipApp-container">
      {this.state.isDefenderTurn ?
      	<DefenderTurn
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