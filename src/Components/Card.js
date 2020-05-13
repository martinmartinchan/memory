import React, { Component } from 'react';

class Card extends Component {
	notifyClick(e) {
		// Notify Board about the click if images is NOT flipped
		if (!this.props.flipped && !this.props.blocked) {
			this.props.onClick(this.props.id);
		}
		e.preventDefault();
	}

	render() {
		if (this.props.flipped) {
			return (
			<div onClick={e => this.notifyClick(e)} className="card memory-card d-flex justify-content-center align-items-center">
				<img className="front-image" src={this.props.imageURL} />
			</div>
		)
		} else {
			return (
				<div onClick={e => this.notifyClick(e)} className="card memory-card memory-card-back d-flex justify-content-center align-items-center">
					<img className="back-image" src='/pokeball.png' alt="pokeball"/>
				</div>
			)
		}
	}
}

export default Card;