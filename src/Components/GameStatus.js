import React, { Component } from 'react';

class GameStatus extends Component {
	render() {
		return <div className="container d-flex justify-content-center">
			<div className="card text-center mt-3 mb-1">
				<div className="card-body">
    			<h5 className="card-title">{`${this.props.playerNames[this.props.currentPlayer]}: Your turn`}</h5>
					<h5 className="card-title">Points</h5>
					<div className="row">
						<div className="col-6">{`${this.props.playerNames[0]}: ${this.props.playerPoints[0]}`}</div>
						<div className="col-6">{`${this.props.playerNames[1]}: ${this.props.playerPoints[1]}`}</div>
					</div>
  			</div>
			</div>
		</div>
	}
}

export default GameStatus;