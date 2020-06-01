import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

export default class Summary extends Component {

	handleClick = () => {
		this.props.handleClickPlay(true);
	};

	render() {
		return (
			<Card body inverse style={{ backgroundColor: '#333333' }}>
				<CardHeader>Snake Game</CardHeader>
				<CardBody>
					<CardTitle>Menu</CardTitle>
					<CardText>{`Number of snake's food: ${this.props.numberOfFood}`}</CardText>
					{this.props.activPlayButton ? (
						<Button color="danger" onClick={this.handleClick}>
							Play
						</Button>
					) : (
						<Button disabled color="danger">
							Play
						</Button>
					)}
				</CardBody>
				<CardFooter>Enjoy!!</CardFooter>
			</Card>
		);
	}
}
