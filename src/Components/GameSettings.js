import React, { Component } from 'react';

// Nav bar inte settings card
function Navbar (props) {
	const navItems = [];
	if (props.botActive) {
		navItems.push(<div key="botNav" className="p-3 col-6 text-center settings-nav border-right" onClick={() => props.navBot()}>Play Against Bot</div>);
		navItems.push(<div key="twoPlayerNav" className="p-3 col-6 text-center settings-nav bg-light border-bottom" onClick={() => props.navTwoPlayer()}>Two Players</div>);
	} else {
		navItems.push(<div key="botNav" className="p-3 col-6 text-center settings-nav bg-light border-right border-bottom" onClick={() => props.navBot()}>Play Against Bot</div>);
		navItems.push(<div key="twoPlayerNav" className="p-3 col-6 text-center settings-nav" onClick={() => props.navTwoPlayer()}>Two Players</div>);
	}

	return <div className="row ml-0 mr-0 mt-0">
		{navItems}
	</div>;
}

function Settingsform (props) {
	// Player name or bot input
	const playerInputs = [];
	if (props.botActive) {
		playerInputs.push(<div key="player" className="col-6">
				<label htmlFor="player">Player</label>
    		<input type="text" id="player" className="form-control" />
			</div>);
		playerInputs.push(<div key="bot" className="col-6">
				<label htmlFor="bot">Bot</label>
				<select id="bot" className="custom-select" required>
      		<option value="stupid">stupid</option>
      		<option value="smart">smart</option>
      		<option value="genius">genius</option>
    		</select>
			</div>);
	} else {
		playerInputs.push(<div key="player1" className="col-6">
				<label htmlFor="player1">Player 1</label>
    		<input type="text" id="player1" className="form-control" />
			</div>);
		playerInputs.push(<div key="player2" className="col-6">
				<label htmlFor="player2">Player 2</label>
				<input type="text" id="player2" className="form-control" />
			</div>);
	}

	// Difficulty options
	const difficulty = <div className="d-flex justify-content-center flex-nowrap mt-3">
		<legend className="col-form-label col-2">Difficulty:</legend>
			<div className="form-check form-check-inline">
				<input className="form-check-input" type="radio" name="difficulty" id="diff-easy" value="easy" defaultChecked="checked" />
				<label className="form-check-label" htmlFor="diff-easy">Easy</label>
			</div>
			<div className="form-check form-check-inline">
				<input className="form-check-input" type="radio" name="difficulty" id="diff-medium" value="medium" />
				<label className="form-check-label" htmlFor="diff-medium">Medium</label>
			</div>
			<div className="form-check form-check-inline">
				<input className="form-check-input" type="radio" name="difficulty" id="diff-hard" value="hard" />
				<label className="form-check-label" htmlFor="diff-hard">Hard</label>
			</div>
		</div>

	// Return the form
	return <div className="form-group">
			<div className="row ml-0 mr-0 mt-3">
				{playerInputs}
			</div>
			{difficulty}
		</div>
}

// GameSettings component that gathers all settings set by the player
class GameSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			botActive: true,
		}
	}

	renderBotOptions() {
		this.setState({
			botActive: true,
		});
	}

	renderTwoPlayerOptions() {
		this.setState({
			botActive: false,
		});
	}

	submitSettings() {
		let playerName1;
		let playerName2;
		let timeoutTime;
		let botIQ = 'stupid';
		// Player settings
		if (this.state.botActive) {
			// Set player name 1 to value of input or player if it is empty
			playerName1 = document.getElementById('player').value ? document.getElementById('player').value : 'Player';
			playerName2 = 'Bot';
			// Set how smart the bot is
			botIQ = document.getElementById('bot').value
		} else {
			// Set player name 1 to value of input or player 1 if it is empty
			playerName1 = document.getElementById('player1').value ? document.getElementById('player1').value : 'Player 1';
			playerName2 = document.getElementById('player2').value ? document.getElementById('player2').value : 'Player 2';
		}
		// Set the difficulty, this is actually only the timeout time
		if (document.getElementById('diff-easy').checked) {
			timeoutTime = 1500;
		}
		if (document.getElementById('diff-medium').checked) {
			timeoutTime = 1000;
		}
		if (document.getElementById('diff-hard').checked) {
			timeoutTime = 500;
		}
		// Create the settings object
		let settings = {
			timeoutTime: timeoutTime,
			playerName1: playerName1,
			playerName2: playerName2,
			botActive: this.state.botActive,
			botIQ: botIQ,
		};
		console.log(settings);
		this.props.submitSettings(settings);
	}

	render() {
		return <div className="container d-flex align-items-center justify-content-center vh-100">
			<div className="card settings-card">
				<Navbar 
					botActive = {this.state.botActive}
					navTwoPlayer = {() => this.renderTwoPlayerOptions()}
					navBot = {() => this.renderBotOptions()}
				/>
				<Settingsform
					botActive = {this.state.botActive}
				/>
				<div className="d-flex justify-content-center">
					<button className="btn btn-primary mt-3 mb-3" onClick = {() => this.submitSettings()}>Start game</button>
				</div>
			</div>
		</div>
	}
}

export default GameSettings;