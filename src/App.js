import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';
import Summary from './Summary';

const getRandomCoordiantes = () => {
	let min = 1;
	let max = 98;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [ x, y ];
};

const initialSate = {
	direction: 'RIGHT',
	speed: 100,
	food: getRandomCoordiantes(),
	snakeDots: [  [ 2, 0 ] ],
	eatFood: 0,
	clickPlay: true,
	activPlayButton: true
};

export default class App extends Component {
	state = initialSate;

	componentDidMount() {
		document.onkeydown = this.onkeydown;
	}

	componentDidUpdate() {
		this.checkIfOutOfBorders();
		this.checkIfCollapse();
		this.checkIfEat();
	}

	onkeydown = (e) => {
		e = e || window.event;
		switch (e.keyCode) {
			case 38:
				this.setState({ direction: 'UP' });
				break;
			case 40:
				this.setState({ direction: 'DOWN' });
				break;
			case 37:
				this.setState({ direction: 'LEFT' });
				break;
			case 39:
				this.setState({ direction: 'RIGHT' });
				break;
			default:
		}
	};

	moveSnake = () => {
		if (this.state.clickPlay) {
			let dots = [...this.state.snakeDots];
			let head = dots[dots.length - 1];

			switch (this.state.direction) {
				case 'RIGHT':
					head = [ head[0] + 2, head[1] ];
					break;
				case 'LEFT':
					head = [ head[0] - 2, head[1] ];
					break;
				case 'DOWN':
					head = [ head[0], head[1] + 2 ];
					break;
				case 'UP':
					head = [ head[0], head[1] - 2 ];
					break;
				default:
			}
			dots.push(head);
			dots.shift();
			this.setState({
				snakeDots: dots
			});
		}
	};

	checkIfOutOfBorders() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
			this.onGameOver();
		}
	}

	checkIfCollapse() {
		let snake = [ ...this.state.snakeDots ];
		let head = snake[snake.length - 1];
		snake.pop();
		snake.forEach((dot) => {
			if (head[0] === dot[0] && head[1] === dot[1]) {
				this.onGameOver();
			}
		});
	}

	checkIfEat() {
		let head = this.state.snakeDots[this.state.snakeDots.length - 1];
		let food = this.state.food;
		if (head[0] === food[0] && head[1] === food[1]) {
			this.setState({
				food: getRandomCoordiantes(),
				eatFood: this.state.eatFood + 1
			});
			this.enLargeSnake();
			this.increaseSpeed();
		}
	}

	enLargeSnake() {
		let newSnate = [ ...this.state.snakeDots ];
		newSnate.unshift([]);
		this.setState({ snakeDots: newSnate });
	}

	increaseSpeed() {
		if (this.state.speed > 10) {
			this.setState({ speed: this.state.speed - 10 });
		}
	}

	onGameOver() {
		this.setState(initialSate);
		this.setState({ clickPlay: false, activPlayButton: true });
	}

	start = () => {
		if (this.state.clickPlay) {
			setInterval(this.moveSnake, this.state.speed);
		}
	};

	handleClickPlay = (play) => {
		if (play) {
			this.setState({ clickPlay: true, activPlayButton: false });
			this.start();
		}
	};

	render() {
		return (
			<div className="screen">
				<div className="menu">
					<Summary
						numberOfFood={this.state.eatFood}
						handleClickPlay={this.handleClickPlay}
						activPlayButton={this.state.activPlayButton}
					/>
				</div>
				<div className="game-area">
					<Snake snakeDots={this.state.snakeDots} clickPlay={this.state.clickPlay} />
					<Food dot={this.state.food} />
				</div>
			</div>
		);
	}
}
