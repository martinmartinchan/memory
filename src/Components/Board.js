import React, { Component } from 'react';

function Card (props) {
	return (
		<div className="card memory-card d-flex justify-content-center align-items-center">
			<img className="memory-image" src={props.imageURL} />
		</div>
	)
}


class Board extends Component {
	render() {
		return <div className="container d-flex justify-content-center">
				<div>
				<div className="row">
				<Card imageURL={this.props.images[0]}/>
				<Card imageURL={this.props.images[1]}/>
				<Card imageURL={this.props.images[2]}/>
				<Card imageURL={this.props.images[3]}/>
			</div>
			<div className="row">
				<Card imageURL={this.props.images[4]}/>
				<Card imageURL={this.props.images[5]}/>
				<Card imageURL={this.props.images[6]}/>
				<Card imageURL={this.props.images[7]}/>
			</div>
			<div className="row">
				<Card imageURL={this.props.images[8]}/>
				<Card imageURL={this.props.images[9]}/>
				<Card imageURL={this.props.images[10]}/>
				<Card imageURL={this.props.images[11]}/>
			</div>
			<div className="row">
				<Card imageURL={this.props.images[12]}/>
				<Card imageURL={this.props.images[13]}/>
				<Card imageURL={this.props.images[14]}/>
				<Card imageURL={this.props.images[15]}/>
			</div>
				</div>
		</div>
	}
}

export default Board;