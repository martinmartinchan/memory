import React, { Component } from 'react';
import Board from './Board';
import GameSettings from './GameSettings';
import GameStatus from './GameStatus';
import {getMemoryImages, shuffle, preload} from './../services/helper';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Wether game should render the Board or the settings page
			initializing: true,
			// Contains the urls for the images
			images: [],
			// Keeps track of which cards are flipped permanently
			permanentlyFlipped: Array(16).fill(false),
			// Keeps track of which cards that are flipped temporarily (only 2 maximum)
			temporaryFlipped: [],
			// Timeout time for the flip back when incorrect cards are guessed
			timeoutTime: null,
			// Blocks everything from being clicked
			blockAll: false,
			// Player points
			playerPoints: [0, 0],
			// Player Names in string
			playerNames: [null, null],
			// Current Player
			currentPlayer: 0,
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
			timeoutTime: settings.timeoutTime,
			initializing: false,
			images: imagesURL,
			playerNames: [settings.playerName1, settings.playerName2],
		});
	}

	// Set specific card to temporary flipped
	setTemporaryFlipped(i) {
		// Check whether another card is flipped
		if (this.state.temporaryFlipped.length === 0) {
			// If this is the first of the pair that is flipped, set it to flipped
			this.setState({
				temporaryFlipped: [i],
			})
		} else {
			// Else check if the urls match, i.e, is the same image
			if (this.state.images[this.state.temporaryFlipped[0]] === this.state.images[i]) {
				this.setPermanentlyFlipped(this.state.temporaryFlipped[0], i);
				this.flipBack();
			} else {
				// Wrong cards have been flipped. Set temporary flipped for both and wait some time before flipping back
				setTimeout(() => this.flipBack(), this.state.timeoutTime);
				// While we are in timeout, set both cards to show and block all clicks
				const tempArr = this.state.temporaryFlipped.slice();
				tempArr.push(i);
				this.setState({
					temporaryFlipped: tempArr,
					blockAll: true,
				})
			}
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
			blockAll: false,
			temporaryFlipped: [],
		})
	}

	render() {
		if (this.state.initializing) {
			return <GameSettings 
				whenDone = {settings => this.gameStart(settings)}/>
		} else {
			return <div>
				<GameStatus 
					currentPlayer = {this.state.currentPlayer}
					playerNames = {this.state.playerNames}
					playerPoints = {this.state.playerPoints}
				/>
				<Board 
					images = {this.state.images}
					reportClicked = {i =>this.setTemporaryFlipped(i)}
					permanentlyFlipped = {this.state.permanentlyFlipped}
					temporaryFlipped = {this.state.temporaryFlipped}
					blockAll = {this.state.blockAll} 
				/>
			</div>
		}
	}
}

export default Game;