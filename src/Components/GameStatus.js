import React, { Component } from 'react';

class GameStatus extends Component {
	render() {
		let title;
		if (!this.props.finished) {
			title = <h5 className="card-title">{`${this.props.playerNames[this.props.currentPlayer]}: Go!`}</h5>
		} else {
			// Check which player has the most points
			let winner = this.props.playerPoints[0] > this.props.playerPoints[1] ? 0 : 1;
			// Check whether it was a draw
			winner = this.props.playerPoints[0] === this.props.playerPoints[1] ? null : winner;
			// Announce the results
			if (winner === null) {
				title = <h5 className="card-title">Game finished with a draw!</h5>
			} else {
				title = <h5 className="card-title">{`Game finished, winner is ${this.props.playerNames[winner]}`}</h5>
			}
			
		}
		return <div className="container d-flex justify-content-center">
			<div className="card status-card text-center mt-3 mb-1">
				<div className="card-body">
					{title}
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