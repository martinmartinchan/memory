import React, { Component } from 'react';
import Board from './Board';
import GameSettings from './GameSettings';
import GameStatus from './GameStatus';
import {getMemoryImages, shuffle} from './../services/helper';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: null,
			initializing: true,
			images: [],
		}
	}

	gameStart(settings) {
		// Get 8 random images
		let imagesURL = getMemoryImages(8);
		// Repeat the 8 random images
		imagesURL = imagesURL.concat(imagesURL);
		// Shuffle the image array
		imagesURL = shuffle(imagesURL);

		this.setState({
			settings: settings,
			initializing: false,
			images: imagesURL,
		});
	}

	render() {
		if (this.state.initializing) {
			return <GameSettings whenDone={settings => this.gameStart(settings)}/>
		} else {
			return <div>
				<GameStatus />
				<Board settings={this.state.settings} images={this.state.images}/>
			</div>
		}
	}
}

export default Game;