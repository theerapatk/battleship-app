import React, { Component } from 'react';
import Board from './Board';
import TextFormControl from '../component/TextFormControl';
import SelectFormControl from '../component/SelectFormControl';
import { Button } from 'react-bootstrap';

class DefenderTurn extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	row: null,
    	column: null,
    	ship: null,
      shouldBoardUpdate: false
    };
    this.handleTextFormChange = this.handleTextFormChange.bind(this);
    this.handleSelectFormChange = this.handleSelectFormChange.bind(this);
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
  }

  handleTextFormChange(e) {
  	if (e.target.id === 'row') {
  		this.setState({row: +e.target.value});
  	} else if (e.target.id === 'column') {
  		this.setState({column: +e.target.value});
  	}
    this.setState({shouldBoardUpdate: false});
  }

  handleSelectFormChange(e) {
    if (e.target.value === 'select') {
      this.setState({ship: null});
    } else {
      this.setState({ship: e.target.value});
    }
    this.setState({shouldBoardUpdate: false});
  }

  handlePlaceShipClick() {
    this.props.onPlaceShipClick(this.state.row, this.state.column);
    this.setState({shouldBoardUpdate: true});
  }

  handleResetClick() {
  	window.location.reload();
  }

  handleConfirmClick() {
  	this.props.onConfirmClick();
  }

  render() {
  	var diablePlaceButton = true;
  	if (this.state.row && this.state.column && this.state.ship) {
  		diablePlaceButton = false;
  	}

    return (
      <div>
				<h1>Defender turn</h1>
				<Board
          gameBoards={this.props.gameBoards}
          isDefenderTurn={this.props.isDefenderTurn}
          shouldBoardUpdate={this.state.shouldBoardUpdate} />
			  <TextFormControl label="Enter row: " id={'row'} onChange={this.handleTextFormChange}/>
			  <TextFormControl label="Enter column: " id={'column'} onChange={this.handleTextFormChange}/>
			  <SelectFormControl label="Ship type: " onChange={this.handleSelectFormChange}/>
			  <div className='btn-group'>
			  	<Button disabled={diablePlaceButton} onClick={this.handlePlaceShipClick}>Place ship</Button>
			    <Button onClick={this.handleResetClick}>Reset board</Button>
			    <Button onClick={this.handleConfirmClick}>Confirm board</Button>
			  </div>
			</div>
    );
  }
}

export default DefenderTurn;