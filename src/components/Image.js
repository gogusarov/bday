import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './Image.css';
import { EFFECTS } from "../constants";

const imageBlock = 'b-day-image-block';

export default class Img extends PureComponent {
  state = {
  	counter: 0,
		...EFFECTS[0]
	};

  constructor(props) {
  	super(props);

  	this.sound = null;
  	this.onImgClick = this.onImgClick.bind(this);
	}

	componentDidMount() {
  	EFFECTS.forEach(item => {
  		if (item.pic) {
  			const img = new Image();

				img.src = item.pic;
			}
		});
	}

	componentWillUnmount() {
  	this.clearSound();
	}

	onImgClick() {
		this.applyEffects((this.state.counter + 1) % 4);
	}

	applyEffects(counter) {
		const effect = EFFECTS[counter];

  	this.clearSound();

		if (effect.sound) {
			this.playSound(effect.sound);
		}

		this.setState({
			counter,
			...effect
		});
	}

	playSound(sound) {
  	this.sound = new Audio(sound);
  	this.sound.play();
	}

	clearSound() {
  	if (this.sound) {
			this.sound.src = '';
			this.sound.currentTime = 0;
			this.sound.load();
		}
	}

  render() {
  	const { pic, animation = '' } = this.state;

    return (
			<img
				src={pic}
				className={classNames(imageBlock, animation)}
				onClick={this.onImgClick}/>
    );
  }
}