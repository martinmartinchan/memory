import React, { Component } from 'react';

function Card (props) {
	return (
		<div className="card memory-card">
		</div>
	)
}


class Board extends Component {
	render() {
		return <div className="container d-flex justify-content-center">
				<div>
				<div className="row">
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
			<div className="row">
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
			<div className="row">
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
			<div className="row">
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
				</div>
		</div>
	}
}

export default Board;