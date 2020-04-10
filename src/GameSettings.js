import React, { Component } from 'react';

class GameSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: {
				rows: 1,
				columns: 1,
			}
		}
	}

	render() {
		return <button onClick={() => this.props.whenDone(this.state.settings)}>Click on me</button>
	}
}

export default GameSettings;