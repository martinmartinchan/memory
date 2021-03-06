import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './Board';
import GameSettings from './GameSettings';
import GameStatus from './GameStatus';
import {getMemoryImagesURL, shuffle, preload, stupidFlip, smartFlip, geniusFlip} from './../services/helper';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Whether game should render the Board or the settings page
			initializing: true,
			// Contains the images
			images: [],
			// Contains the images urls
			imagesURL: [],
			// Keeps track of which cards are flipped permanently
			permanentlyFlipped: Array(16).fill(false),
			// Keeps track of which cards that are flipped temporarily (only 2 maximum)
			temporaryFlipped: [],
			// Keeps track of which cards that has ever been flipped, only for the bot
			onceFlipped: Array(16).fill(false),
			// Timeout time for the flip back when incorrect cards are guessed
			timeoutTime: null,
			// How long time the bot waits between card flips
			botWaitTime: 500,
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
			// Keeps track of all timeout IDs in order to clear them
			timeOutIDs: [],
		}
	}

	// Start the game loading the images, and settings correct states
	gameStart(settings) {
		// Get 8 random images
		let imagesURLTemp = getMemoryImagesURL(8);
		// Repeat the 8 random images
		imagesURLTemp = imagesURLTemp.concat(imagesURLTemp);
		// Shuffle the image array
		imagesURLTemp = shuffle(imagesURLTemp);
		// Preloads the images so that the games feels smoother
		const imagesTemp = preload(imagesURLTemp);

		this.setState({
			timeoutTime: settings.timeoutTime,
			initializing: false,
			imagesURL: imagesURLTemp,
			images: imagesTemp,
			playerNames: [settings.playerName1, settings.playerName2],
			botActive: settings.botActive,
			botDifficulty: settings.botDifficulty,
			permanentlyFlipped: Array(16).fill(false),
			temporaryFlipped: [],
			onceFlipped: Array(16).fill(false),
			currentPlayer: 0,
			blockAll: false,
			playerPoints: [0, 0],
		});
	}

	gameRestart() {
		const settings = {
			timeoutTime: this.state.timeoutTime,
			playerName1: this.state.playerNames[0],
			playerName2: this.state.playerNames[1],
			botActive: this.state.botActive,
			botDifficulty: this.state.botDifficulty,
		}
		this.state.timeOutIDs.forEach(id => clearTimeout(id));
		this.gameStart(settings);
	}

	// Set specific card to temporary flipped
	setTemporaryFlipped(i) {
		// Prepare the once flipped array to be set later
		const tempArrOnceFlipped = this.state.onceFlipped.slice();
		tempArrOnceFlipped[i] = true;	
		// Check whether another card is flipped
		if (this.state.temporaryFlipped.length === 0) {
			// If this is the first of the pair that is flipped, set it to flipped
			// Also set the once flipped array
			this.setState({
				temporaryFlipped: [i],
				onceFlipped: tempArrOnceFlipped,
			}, 
			// Then we call the botFlip
			() => {
				if (this.state.botActive && this.state.currentPlayer === 1) {
					this.state.timeOutIDs.push(setTimeout(() => {
						this.botFlip();
					}, this.state.botWaitTime));
				}
			});
		} else {
			// Else check if the urls match, i.e, is the same image
			if (this.state.imagesURL[this.state.temporaryFlipped[0]] === this.state.imagesURL[i]) {
				// Set the matched cards to permanently flipped
				const tempArrPermFlipped = this.state.permanentlyFlipped.slice();
				tempArrPermFlipped[i] = true;
				tempArrPermFlipped[this.state.temporaryFlipped[0]] = true;
				// Give points to current player
				const tempPoints = this.state.playerPoints.slice();
				tempPoints[this.state.currentPlayer] = tempPoints[this.state.currentPlayer] + 1;
				// Check if all cards have been flipped. Then we have a winner (or a draw)
				const tempFinished = tempArrPermFlipped.every((flipped) => {return flipped})
				// Also set the once flipped array
				const tempBlockAll = this.state.currentPlayer && this.state.botActive;
				this.setState({
					permanentlyFlipped: tempArrPermFlipped,
					playerPoints: tempPoints,
					onceFlipped: tempArrOnceFlipped,
					blockAll: tempBlockAll,
					temporaryFlipped: [],
					finished: tempFinished,
				},
				// Then we call the botFlip
				() => {
					if (this.state.botActive && this.state.currentPlayer === 1 && !this.state.finished) {
						this.state.timeOutIDs.push(setTimeout(() => {
							this.botFlip();
						}, this.state.botWaitTime));
					}
				});
			} else {
				// Wrong cards have been flipped. Set temporary flipped for both and wait some time before flipping back
				this.state.timeOutIDs.push(setTimeout(() => {
					// Switch the current player
					// Also set the once flipped array here
					const newCurrentPlayer = this.state.currentPlayer ? 0 : 1;
					// block All if new current player is bot
					const tempBlockAll = newCurrentPlayer && this.state.botActive;
					this.setState({
						currentPlayer: newCurrentPlayer,
						onceFlipped: tempArrOnceFlipped,
						blockAll: tempBlockAll,
						temporaryFlipped: [],
					},
					// Then we call the botFlip
					() => {
						if (this.state.botActive && this.state.currentPlayer === 1) {
							this.state.timeOutIDs.push(setTimeout(() => {
								this.botFlip();
							}, this.state.botWaitTime));
						}
					});
					}, this.state.timeoutTime));
				// While we are in timeout, set both cards to show and block all clicks
				const tempArrTempFlipped = this.state.temporaryFlipped.slice();
				tempArrTempFlipped.push(i);
				this.setState({
					temporaryFlipped: tempArrTempFlipped,
					blockAll: true,
				});
			}
		}
	}

	// Function for the bot flip
	botFlip() {
		if (this.state.botDifficulty === 'easy') {
			// Stupid Bot
			// The Stupid Bot flips a card that is not permanently flipped randomly
			const cardToFlip = stupidFlip(this.state.temporaryFlipped, this.state.permanentlyFlipped);
			this.setTemporaryFlipped(cardToFlip);
		} else if (this.state.botDifficulty === 'medium') {
			// Smart Bot
			// The Smart Bot flips cards that have been revealed before to match them
			// Else it flips a new card to get information
			// It remembers all cards that have ever been flipped
			const cardToFlip = smartFlip(this.state.temporaryFlipped, this.state.permanentlyFlipped, this.state.onceFlipped, this.state.imagesURL);
			this.setTemporaryFlipped(cardToFlip);
		} else if (this.state.botDifficulty === 'hard') {
			// Genius Bot
			// The genius bot knows all cards even though they never been flipped.
			// If human is not incredibly lucky, the genius bot will always win.
			const cardToFlip = geniusFlip(this.state.temporaryFlipped, this.state.permanentlyFlipped, this.state.imagesURL);
			this.setTemporaryFlipped(cardToFlip);
		}
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
					restartGame = {() => this.gameRestart()} 
				/>
				<Board 
					imagesURL = {this.state.imagesURL}
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