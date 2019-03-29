import React, { Component } from 'react';

import './index.css';

class Item extends Component {
	render() {

		const grade = () => {
			let arr =  this.props.item.grade.split(';');
			if(arr.length === 1) {
				return arr[0];
			}
			if(arr.length > 1) {
				let res = `${arr[0]} - ${arr[arr.length-1]}`;
				return res;
			}

		}

		return (
			<React.Fragment>
				<div className="sci-figure">
					<img src={`https://www.imumk.ru/svc/coursecover/${this.props.item.courseId}`} />
				</div>
				<div className="sci-info">
					<p className="sci-title">{this.props.item.title}</p>
					<p className="sci-grade">{grade()} класс</p>
					<p className="sci-genre">{this.props.item.genre}</p>
					<p className="sci-meta">
						<a href={`https://www.imumk.ru/offer/${this.props.item.courseId}`}>Подробнее</a>
					</p>
					<p className="sci-controls">
						<a href="#" className="pure-button pure-button-primary btn-fluid">{this.props.cheked ? this.props.item.priceBonus : this.props.item.price}</a>
					</p>
				</div>
			</React.Fragment>
		)
	}
}

export default Item;