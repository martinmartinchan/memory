import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showing: false,
		}
	}

	flip(e) {
		// Flip the image
		this.setState({
			showing: !this.state.showing,
		});

		// Notify Board about the click
		this.props.onClick(this.props.id);
		e.preventDefault();
	}

	render() {
		if (this.state.showing) {
			return (
			<div onClick={e => this.flip(e)} className="card memory-card d-flex justify-content-center align-items-center">
				<img className="memory-image" src={this.props.imageURL} />
			</div>
		)
		} else {
			return (
				<div onClick={e => this.flip(e)} className="card memory-card memory-card-back d-flex justify-content-center align-items-center">
					<img className="back-image" src={window.location.origin + '/pokeball.png'} />
				</div>
			)
		}
	}
}

export default Card;