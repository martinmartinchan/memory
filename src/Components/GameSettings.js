import React, { Component } from 'react';

class GameSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: {
			}
		}
	}

	render() {
		return <div className="container d-flex align-items-center justify-content-center vh-100">
				<button className="btn btn-primary" onClick={() => this.props.whenDone(this.state.settings)}>Start game</button>
		</div>
	}
}

export default GameSettings;