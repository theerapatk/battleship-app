import React, { Component } from 'react';
import AttackerBoard from './AttackerBoard';
import TextFormControl from '../control-component/TextFormControl';
import StaticFormControl from '../control-component/StaticFormControl';
import AlertDialog from '../dialog/AlertDialog';
import { Button } from 'react-bootstrap';

class AttackerTurn extends Component {
	constructor(props) {
    super(props);
    var attackerGameBoards = new Array(10).fill(null);
    for (let i = 0; i < 10; i++) {
      attackerGameBoards[i] = new Array(10).fill(null);
    }
    this.state = {
    	attackerGameBoards: attackerGameBoards,
    	row: null,
    	column: null,
    	isHit: false,
    	moveCount: 0
    };
    this.handleTextFormChange = this.handleTextFormChange.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
  }

  handleTextFormChange(id, value) {
  	if (id === 'row') {
  		this.setState({row: value});
  	} else if (id === 'column') {
  		this.setState({column: value});
    }
  }

  handleAttackClick() {
  	const { defenderGameBoards } = this.props;
  	const { row, column } = this.state;
  	var attackerGameBoards = this.state.attackerGameBoards.slice();
		var isHit = false;

  	if (defenderGameBoards[row][column] === 1) {
  		attackerGameBoards[row][column] = 1;
			isHit = true;
  	} else {
  		attackerGameBoards[row][column] = 0;
  	}

		this.setState({
			attackerGameBoards: attackerGameBoards,
  		moveCount: this.state.moveCount + 1,
			isHit: isHit
		});
  }

  render() {
    const { attackerGameBoards, row, column, isHit } = this.state;
  	var diableAttackButton = true;
  	if (row != null && column != null) {
  		if (attackerGameBoards[row][column] == null) {
  			diableAttackButton = false;
  		}
  	}

    return (
      <div>
				<h1>Attacker turn</h1>
					<AttackerBoard
						gameBoards={attackerGameBoards} />
				  <TextFormControl label="Enter row: " id={'row'} onChange={this.handleTextFormChange} />
				  <TextFormControl label="Enter column: " id={'column'} onChange={this.handleTextFormChange} />
				  <Button disabled={diableAttackButton} onClick={this.handleAttackClick}>Attack!</Button>
				  <StaticFormControl label="Attack result: " value={isHit ? "Hit!" : "Miss!"} />
				  <StaticFormControl label="Ship sank: " value="" />
				  <StaticFormControl label="Ship remain: " value="" />
			</div>
    );
  }
}

export default AttackerTurn;