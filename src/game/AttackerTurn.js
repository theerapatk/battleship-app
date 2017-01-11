import React, { Component } from 'react';
import AttackerBoard from './AttackerBoard';
import TextFormControl from '../control-component/TextFormControl';
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
    this.handleTextFormChange = this.handleTextFormChange.bind(this);
    this.handleAttackClick = this.handleAttackClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
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

  	if (defenderGameBoards[row][column] === 1) {
  		attackerGameBoards[row][column] = 1;
  	} else {
  		attackerGameBoards[row][column] = 0;
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
    const { attackResultText, shipSunkNumber, isGameOver, movesCount } = this.props;
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
				  <TextFormControl
				  	label="Enter row: "
				  	id={'row'}
				  	disabled={isGameOver}
				  	onChange={this.handleTextFormChange} />
				  <TextFormControl
				  	label="Enter column: "
				  	id={'column'}
				  	disabled={isGameOver}
				  	onChange={this.handleTextFormChange} />
				  <Button
				  	disabled={diableAttackButton}
				  	onClick={this.handleAttackClick}>Attack!</Button>
				  <StaticFormControl label="Attack result: " value={attackResultText} />
				  <StaticFormControl label="Ship sank: " value={shipSunkNumber} />
				  <StaticFormControl label="Ship remain: " value={10 - shipSunkNumber} />
				  {isGameOver ? (
				  	<StaticFormControl label="Game Over: " value={`Win!  You completed the game in ${movesCount} moves.`} />
				  ) : null}
				  <Button onClick={this.handleResetClick}>Reset board</Button>
			</div>
    );
  }
}

export default AttackerTurn;