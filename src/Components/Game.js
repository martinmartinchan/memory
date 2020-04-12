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
			// Keeps track of whether the game is finished
			finished: false,
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
				// Set the matched cards to permanently flipped
				this.setPermanentlyFlipped(this.state.temporaryFlipped[0], i);
				this.flipBack();
				// Give points to current player
				const tempPoints = this.state.playerPoints.slice();
				tempPoints[this.state.currentPlayer] = tempPoints[this.state.currentPlayer] + 1;
				this.setState({
					playerPoints: tempPoints,
				});
			} else {
				// Wrong cards have been flipped. Set temporary flipped for both and wait some time before flipping back
				setTimeout(() => {
					// Switch the current player
					const newCurrentPlayer = this.state.currentPlayer ? 0 : 1;
					this.setState({
						currentPlayer: newCurrentPlayer,
					})
					this.flipBack();
					}, this.state.timeoutTime);
				// While we are in timeout, set both cards to show and block all clicks
				const tempArr = this.state.temporaryFlipped.slice();
				tempArr.push(i);
				this.setState({
					temporaryFlipped: tempArr,
					blockAll: true,
				});
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
		// Check if all cards have been flipped. Then we have a winner (or a draw)
		if (tempArr.every((flipped) => {return flipped})) {
			this.setState({
				finished: true,
			})
		}
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
				submitSettings = {settings => this.gameStart(settings)}/>
		} else {
			return <div>
				<GameStatus 
					currentPlayer = {this.state.currentPlayer}
					playerNames = {this.state.playerNames}
					playerPoints = {this.state.playerPoints}
					finished = {this.state.finished}
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