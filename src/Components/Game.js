import React, { Component } from 'react';
import Board from './Board';
import GameSettings from './GameSettings';
import GameStatus from './GameStatus';
import {getMemoryImages, shuffle, preload} from './../services/helper';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Settings for the game
			settings: null,
			// Wether game should render the Board or the settings page
			initializing: true,
			// Contains the urls for the images
			images: [],
			// Keeps track of which cards are flipped permanently
			permanentlyFlipped: Array(16).fill(false),
			// Keeps track of which cards that are flipped temporarily (only 2 maximum)
			temporaryFlipped: null,
			// Blocks everything from being clicked
			blockAll: false,
		}
	}

	// Start the game loading the images, and settings correct states
	gameStart(settings) {
		// Get 8 random images
		let imagesURL = getMemoryImages(8);
		// Preloads the images so that the games feels smoother
		preload(imagesURL);
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

	// Set specific card to temporary flipped
	setTemporaryFlipped(i) {
		// Check whether another card is flipped
		if (this.state.temporaryFlipped === null) {
			// If this is the first of the pair that is flipped, set it to flipped
			this.setState({
				temporaryFlipped: i,
			})
		} else {
			// Else check if the urls match, i.e, is the same image
			if (this.state.images[this.state.temporaryFlipped] === this.state.images[i]) {
				this.setPermanentlyFlipped(this.state.temporaryFlipped, i);
			}
			this.flipBack();
		}
	}

	// Set cards to permantently flipped
	setPermanentlyFlipped(i, j) {
		const tempArr = this.state.permanentlyFlipped.slice();
		tempArr[i] = true;
		tempArr[j] = true;
		this.setState({
			permanentlyFlipped: tempArr,
		});
	}

	// Flip back the two cards as they were no match
	flipBack() {
		this.setState({
			temporaryFlipped: null,
		})
	}

	render() {
		console.log(this.state.permanentlyFlipped);
		console.log(this.state.temporaryFlipped);
		if (this.state.initializing) {
			return <GameSettings 
				whenDone = {settings => this.gameStart(settings)}/>
		} else {
			return <div>
				<GameStatus />
				<Board 
					settings = {this.state.settings} 
					images = {this.state.images}
					reportClicked = {i =>this.setTemporaryFlipped(i)}
					permanentlyFlipped = {this.state.permanentlyFlipped}
					temporaryFlipped = {this.state.temporaryFlipped} />
			</div>
		}
	}
}

export default Game;