import React, { Component } from 'react';
import Board from './Board';
import GameSettings from './GameSettings';
import GameStatus from './GameStatus';

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
			return <div>
				<GameStatus />
				<Board settings={this.state.settings}/>
			</div>
		}
	}
}

export default Game;