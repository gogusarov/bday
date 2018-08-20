import React, { PureComponent } from 'react';
import classNames from 'classnames';
import './Image.css';
import { EFFECTS } from '../constants';
import loading from '../assets/loading.gif';

const imageBlock = 'b-day-image-block';

export default class Img extends PureComponent {
  state = {
    loaded: false,
    counter: 0,
    ...EFFECTS[0]
  };

  constructor(props) {
    super(props);

    this.sound = null;
    this.onImgClick = this.onImgClick.bind(this);
  }

  componentDidMount() {
    let assetPromises = [];

    EFFECTS.forEach(item => {
      if (item.pic) {
        let res;
        const img = new Image();
        const p = new Promise(r => res = r);

        img.onload = res;
        assetPromises.push(p);
        img.src = item.pic;
      }

      if (item.sound) {
        let res;
        const sound = new Audio();
        const p = new Promise(r => res = r);

        sound.oncanplaythrough = res;
        assetPromises.push(p);
        sound.src = item.sound;
        sound.load();
      }
    });

    Promise.all(assetPromises)
      .then(() => {
        this.setState({
          loaded: true
        });
      })
      .catch((err) => {
        console.warn('Unable to load assets: ', err);
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
    const { pic, animation = '', loaded } = this.state;

    return (
      loaded
        ? <img
          src={pic}
          className={classNames(imageBlock, animation)}
          onClick={this.onImgClick}/>
        : <img src={loading}/>
    );
  }
}