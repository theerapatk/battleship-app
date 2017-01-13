import React, { Component } from 'react';
import Board from './Board';
import DigitFormControl from '../control-component/DigitFormControl';
import StaticFormControl from '../control-component/StaticFormControl';
import { Button } from 'react-bootstrap';

class AttackerTurn extends Component {
	constructor(props) {
    super(props);
    var attackerGameBoards = new Array(10).fill(null);
    for (let i = 0; i < attackerGameBoards.length; i++) {
      attackerGameBoards[i] = new Array(10).fill(null);
    }
    this.state = {
    	attackerGameBoards: attackerGameBoards,
    	row: null,
    	column: null
    };
    this.handleDigitFormChange = this.handleDigitFormChange.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleDigitFormChange(id, value) {
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

  	if (defenderGameBoards[row][column] === 1) {
  		attackerGameBoards[row][column] = 1;
  	} else {
  		attackerGameBoards[row][column] = 2;
  	}

		this.setState({
			attackerGameBoards: attackerGameBoards,
		});

		this.props.onAttackClick(row, column);
  }

  handleResetClick() {
    window.location.reload();
  }

  render() {
    const { attackerGameBoards, row, column } = this.state;
    const { attackResultText, shipSunkNumber, isGameOver, movesCount, missedCount } = this.props;
  	var diableAttackButton = true;
  	if (row != null && column != null) {
  		if (attackerGameBoards[row][column] == null) {
  			diableAttackButton = false;
  		}
  	}

    return (
      <div>
				<h1>Attacker turn</h1>
					<Board
						boardId="AttackerBoard"
						gameBoards={attackerGameBoards} />
				  <DigitFormControl
				  	label="Enter row: "
				  	id={'row'}
				  	disabled={isGameOver}
				  	onChange={this.handleDigitFormChange} />
				  <DigitFormControl
				  	label="Enter column: "
				  	id={'column'}
				  	disabled={isGameOver}
				  	onChange={this.handleDigitFormChange} />
				  <Button
				  	disabled={diableAttackButton}
				  	onClick={this.handleAttackClick}>Attack!</Button>
				  <StaticFormControl label="Attack result: " value={attackResultText} />
				  <StaticFormControl label="Ship sank: " value={shipSunkNumber} />
				  <StaticFormControl label="Ship remain: " value={10 - shipSunkNumber} />
				  {isGameOver ? (
				  	<StaticFormControl
				  		label="Game Over: "
				  		value={`Win! You completed the game in ${movesCount} moves with ${missedCount} missed shot(s).`} />
				  ) : null}
				  <Button onClick={this.handleResetClick}>Reset board</Button>
			</div>
    );
  }
}

export default AttackerTurn;