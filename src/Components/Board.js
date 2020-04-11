import React, { Component } from 'react';
import Card from './Card'

class Board extends Component {
	handleClick(i) {
		console.log(i);
	}

	render() {
		return <div className="container d-flex justify-content-center">
				<div>
				<div className="row">
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[0]} id={0}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[1]} id={1}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[2]} id={2}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[3]} id={3}/>
			</div>
			<div className="row">
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[4]} id={4}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[5]} id={5}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[6]} id={6}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[7]} id={7}/>
			</div>
			<div className="row">
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[8]} id={8}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[9]} id={9}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[10]} id={10}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[11]} id={11}/>
			</div>
			<div className="row">
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[12]} id={12}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[13]} id={13}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[14]} id={14}/>
				<Card onClick={(i) => this.handleClick(i)} imageURL={this.props.images[15]} id={15}/>
			</div>
				</div>
		</div>
	}
}

export default Board;