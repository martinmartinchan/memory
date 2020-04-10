import React, { Component } from 'react';
import Board from './Board';
import GameSettings from './GameSettings';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: null,
			initializing: true,
		}
	}

	gameStart(settings) {
		this.setState({
			settings: settings,
			initializing: false,
		});
	}

	render() {
		if (this.state.initializing) {
			return <GameSettings whenDone={settings => this.gameStart(settings)}/>
		} else {
			return <Board settings={this.state.settings}/>
		}
	}
}

export default Game;