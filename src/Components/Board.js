import React, { Component } from 'react';
import Card from './Card'

class Board extends Component {
	createCard(i) {
		return <Card 
			key = {i}
			id = {i}
			onClick = {(j) => this.handleClick(j)} 
			imageURL = {this.props.images[i]}
			flipped = {this.props.permanentlyFlipped[i] || (i === this.props.temporaryFlipped)}/>
	}

	createGrid() {
		let grid = [];
		for (let i = 0; i < 4; i++) {
			let row = [];
			for (let j = 0; j < 4; j++) {
				row.push(this.createCard(i*4 + j))
			}
			grid.push(<div key={i} className="row flex-nowrap">{row}</div>);
		}
		return grid;
	}

	handleClick(i) {
		this.props.reportClicked(i);
	}

	render() {
		return <div className="container d-flex justify-content-center flex-nowrap">
			<div>
				{this.createGrid()}
			</div>
		</div>
	}
}

export default Board;