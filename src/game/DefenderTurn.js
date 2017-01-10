import React, { Component } from 'react';
import Board from './Board';
import TextFormControl from '../component/TextFormControl';
import SelectFormControl from '../component/SelectFormControl';
import AlertDialog from '../dialog/AlertDialog';
import { Button } from 'react-bootstrap';

class DefenderTurn extends Component {
	constructor(props) {
    super(props);
    this.state = {
    	row: null,
    	column: null,
      selectedShip: {
        name: 'Battleship',
        value: 'battleship',
        size: 4,
        amount: 1
      },
      selectedDirection: 'horizontal',
      isDialogActive: false,
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
      directions: [{
        name: 'Horizontal',
        value: 'horizontal'
      }, {
        name: 'Vertical',
        value: 'vertical'
      }]
    };
    this.checkIfCanPlaceShip = this.checkIfCanPlaceShip.bind(this);
    this.handleTextFormChange = this.handleTextFormChange.bind(this);
    this.handleSelectShipChange = this.handleSelectShipChange.bind(this);
    this.handleSelectDirectionsChange = this.handleSelectDirectionsChange.bind(this);
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleTextFormChange(id, value) {
  	if (id === 'row') {
  		this.setState({row: value});
  	} else if (id === 'column') {
  		this.setState({column: value});
    }
  }

  handleSelectShipChange(e) {
    for (let i = 0; i < this.state.ships.length; i++) {
      let ship = this.state.ships[i];
      if (e.target.value === ship.value) {
        this.setState({selectedShip: ship});
        break;
      }
    }
  }

  handleSelectDirectionsChange(e) {
    this.setState({selectedDirection: e.target.value});
  }

  checkIfCanPlaceShip() {
    const gameBoardsLength = this.props.gameBoards.length;
    const shipSize = this.state.selectedShip.size;
    if (this.state.selectedDirection === 'horizontal') {
      if (this.state.column + shipSize > gameBoardsLength) {
        return false;
      }
    } else if (this.state.selectedDirection === 'vertical') {
      if (this.state.row + shipSize > gameBoardsLength) {
        return false;
      }
    }

    return true;
  }

  handlePlaceShipClick() {
    if (this.checkIfCanPlaceShip() === false) {
      this.setState({isDialogActive: true});
      return;
    }

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

    this.props.onPlaceShipClick(this.state.row,
                                this.state.column,
                                this.state.selectedShip,
                                this.state.selectedDirection);
  }

  handleResetClick() {
    window.location.reload();
  }

  handleConfirmClick() {
    this.props.onConfirmClick();
  }

  handleCloseDialog() {
    this.setState({isDialogActive: false});
  }

  render() {
  	var diablePlaceButton = true;
  	if (this.state.row != null && this.state.column != null &&
      (this.state.selectedShip && this.state.selectedShip.amount !== 0)) {
  		diablePlaceButton = false;
  	}

    var diableConfirmButton = false;
    for (let i = 0; i < this.state.ships.length; i++) {
      var ship = this.state.ships[i];
      if (ship.amount !== 0) {
         diableConfirmButton = true;
         break;
      }
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
          id={'shipType'}
          items={this.state.ships}
          onChange={this.handleSelectShipChange}/>
        <SelectFormControl
          label="Ship direction: "
          id={'shipDirection'}
          items={this.state.directions}
          onChange={this.handleSelectDirectionsChange}/>
			  <div className='btn-group'>
			  	<Button disabled={diablePlaceButton} onClick={this.handlePlaceShipClick}>Place ship</Button>
			    <Button onClick={this.handleResetClick}>Reset board</Button>
			    <Button disabled={diableConfirmButton} onClick={this.handleConfirmClick}>Confirm board</Button>
			  </div>
        <AlertDialog
          isDialogActive={this.state.isDialogActive}
          title={'Alert'}
          content={'Cannot place a ship, please modify the criteria.'}
          onCloseDialog={this.handleCloseDialog} />
			</div>
    );
  }
}

export default DefenderTurn;