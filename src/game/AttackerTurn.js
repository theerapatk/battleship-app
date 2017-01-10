import React, { Component } from 'react';
import Board from './Board';

class AttackerTurn extends Component {
  render() {
    return (
      <div>
				<h1> Attacker turn </h1>
					<Board isDefenderTurn={this.props.isDefenderTurn} />
				  <div>Enter row: <input type="text" /> </div>
				  <div>Enter column: <input type="text" /> </div>
				  <div>
				  	<button>Attack</button>
				  </div>
				  <div>Attack result: </div>
				    <div>Ship sank: </div>
				<div>Ship remain: </div>
			</div>
    );
  }
}

export default AttackerTurn;