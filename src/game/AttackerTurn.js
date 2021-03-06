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
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  handleDigitFormChange(id, value) {
  	if (id === 'row') {
  		this.setState({row: value});
  	} else if (id === 'column') {
  		this.setState({column: value});
    }
  }

  handleCellClick(row, column) {
    const { attackerGameBoards } = this.state;
    const { isGameOver } = this.props;
    if (attackerGameBoards[row][column] || isGameOver) {
      return;
    }

    this.setState({
      row: row,
      column: column
    }, () => this.handleAttackClick());
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

  checkIfCanPlaceAttack() {
    const { attackerGameBoards, row, column } = this.state;
    
  	if (row != null && column != null && 
        attackerGameBoards[row][column] == null) {
  		return true;
  	}
    return false;
  }

  render() {
    const { attackerGameBoards } = this.state;
    const { attackResultText, shipSunkNumber, isGameOver, movesCount, missedCount } = this.props;
    const disableAttackButton = !this.checkIfCanPlaceAttack();

    return (
      <div>
				<h1>Attacker turn</h1>
					<Board
						boardId="AttackerBoard"
						gameBoards={attackerGameBoards}
            onCellClick={this.handleCellClick} />
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
				  	disabled={disableAttackButton}
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