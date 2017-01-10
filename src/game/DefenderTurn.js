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
      selectedShip: null,
      ships: [{
        name: 'Battleship',
        value: 'battleship',
        size: 4,
        amount: 1
      }, {
        name: 'Cruiser',
        value: 'cruiser',
        size: 3,
        amount: 2
      }, {
        name: 'Destroyer',
        value: 'destroyer',
        size: 2,
        amount: 3
      }, {
        name: 'Submarine',
        value: 'submarine',
        size: 1,
        amount: 4
      }],
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
  }

  handleSelectFormChange(e) {
    var selectedShip = null;
    if (e.target.value === 'select') {
      this.setState({selectedShip: selectedShip});
    } else {
      for (let i = 0; i < this.state.ships.length; i++) {
        let ship = this.state.ships[i];
        if (e.target.value === ship.value) {
          this.setState({selectedShip: ship});
          break;
        }
      }
    }
  }

  handlePlaceShipClick() {
    var selectedShip = null;
    var ships = this.state.ships.slice();
    for (let i = 0; i < ships.length; i++) {
      let ship = ships[i];
      if (this.state.selectedShip.value === ship.value) {
        ship.amount--;
        selectedShip = ship;
        break;
      }
    }

    this.setState({
      selectedShip: selectedShip,
      ships: ships,
    });

    this.props.onPlaceShipClick(this.state.row, this.state.column);
  }

  handleResetClick() {
  	window.location.reload();
  }

  handleConfirmClick() {
  	this.props.onConfirmClick();
  }

  render() {
  	var diablePlaceButton = true;
  	if (this.state.row && this.state.column && (this.state.selectedShip && this.state.selectedShip.amount !== 0)) {
  		diablePlaceButton = false;
  	}

    return (
      <div>
				<h1>Defender turn</h1>
				<Board
          gameBoards={this.props.gameBoards}
          isDefenderTurn={this.props.isDefenderTurn} />
			  <TextFormControl label="Enter row: " id={'row'} onChange={this.handleTextFormChange}/>
			  <TextFormControl label="Enter column: " id={'column'} onChange={this.handleTextFormChange}/>
			  <SelectFormControl
          label="Ship type: "
          ships={this.state.ships}
          onChange={this.handleSelectFormChange}/>
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