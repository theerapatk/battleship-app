import React, { Component } from 'react';
import Board from './Board';
import DigitFormControl from '../control-component/DigitFormControl';
import SelectFormControl from '../control-component/SelectFormControl';
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
    this.handleDigitFormChange = this.handleDigitFormChange.bind(this);
    this.handleSelectShipChange = this.handleSelectShipChange.bind(this);
    this.handleSelectDirectionsChange = this.handleSelectDirectionsChange.bind(this);
    this.handlePlaceShipClick = this.handlePlaceShipClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleDigitFormChange(id, value) {
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
    const { gameBoards } = this.props;
    const { row, column, selectedShip, selectedDirection } = this.state;

    if (selectedDirection === 'horizontal') {
      if (column + selectedShip.size > gameBoards.length) {
        return false;
      }
    } else if (selectedDirection === 'vertical') {
      if (row + selectedShip.size > gameBoards.length) {
        return false;
      }
    }

    if (gameBoards[row][column] != null) {
      return false;
    }

    return true;
  }

  updateShipAndSelectedShipState() {
    var ships = this.state.ships.slice();
    for (let i = 0; i < ships.length; i++) {
      let ship = ships[i];
      if (this.state.selectedShip.value === ship.value) {
        ship.amount--;
        this.setState({
          selectedShip: ship,
          ships: ships,
        });
      }
    }
  }

  handlePlaceShipClick() {
    if (this.checkIfCanPlaceShip() === false) {
      this.setState({isDialogActive: true});
      return;
    }

    this.updateShipAndSelectedShipState();
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

  checkIfAllInputFieldsAreValid() {
    if (this.state.row != null && this.state.column != null &&
      (this.state.selectedShip && this.state.selectedShip.amount !== 0)) {
      return true;
    }
    return false;
  }
  
  checkIfAllShipsArePlaced() {
    for (let i = 0; i < this.state.ships.length; i++) {
      var ship = this.state.ships[i];
      if (ship.amount !== 0) {
         return false;
      }
    }
    return true;
  }

  render() {
    const disablePlacShipButton = !this.checkIfAllInputFieldsAreValid();
    const disableConfirmButton = !this.checkIfAllShipsArePlaced();

    const { ships, directions, isDialogActive } = this.state;

    return (
      <div>
				<h1>Defender turn</h1>
				<Board
          boardId="DefenderBoard"
          gameBoards={this.props.gameBoards} />
			  <DigitFormControl label="Enter row: " id={'row'} onChange={this.handleDigitFormChange} />
			  <DigitFormControl label="Enter column: " id={'column'} onChange={this.handleDigitFormChange} />
			  <SelectFormControl
          label="Ship type: "
          id={'shipType'}
          items={ships}
          controlWidth={5}
          onChange={this.handleSelectShipChange} />
        <SelectFormControl
          label="Ship direction: "
          id={'shipDirection'}
          items={directions}
          controlWidth={3}
          onChange={this.handleSelectDirectionsChange} />
			  <div className='btn-group'>
			  	<Button disabled={disablePlacShipButton} onClick={this.handlePlaceShipClick}>Place ship</Button>
			    <Button onClick={this.handleResetClick}>Reset board</Button>
			    <Button disabled={disableConfirmButton} onClick={this.handleConfirmClick}>Confirm board</Button>
			  </div>
        <AlertDialog
          isDialogActive={isDialogActive}
          title={'Alert'}
          content={'Cannot place a ship, please modify the criteria.'}
          onCloseDialog={this.handleCloseDialog} />
			</div>
    );
  }
}

export default DefenderTurn;