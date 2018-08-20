import React, { Component } from 'react';
import './App.css';
import { getDays, getHours, getMinutes, getSeconds, BEMNormalize } from './utils';
import { DAY, HOUR, MINUTE, SECOND } from './constants';
import TimeItem from './components/TimeItem';
import Image from './components/Image';

const BDAY = new Date(2019, 6, 23, 0, 0, 0, 0);

const bDayBlock = 'b-day-block';

class App extends Component {
  state = {
    isCounting: true,
  };

  timer = null;

  constructor(props) {
    super(props);

    this.updateTime = this.updateTime.bind(this);
  }

  componentDidMount() {
    this.updateTime()
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  updateTime() {
    const diff = BDAY - Date.now();

    if (diff > 0) {
      const days = getDays(diff);
      const hours = getHours(diff) - DAY * days;
      const minutes = getMinutes(diff) - DAY * HOUR * days - HOUR * hours;
      const seconds = getSeconds(diff) - DAY * HOUR * MINUTE * days - HOUR * MINUTE * hours - MINUTE * minutes;

      this.setState({
        days,
        hours,
        minutes,
        seconds
      });

      this.timer = setTimeout(this.updateTime, SECOND);
    } else {
      clearTimeout(this.timer);

      this.setState({
        isCounting: false
      });
    }
  }

  get contentBlock() {
    const { days, hours, minutes, seconds } = this.state;

    return (
      <React.Fragment>
        <Image/>
        <div className={BEMNormalize(bDayBlock, 'time')}>
          <TimeItem value={days} label="days"/>
          <TimeItem value={hours} label="hours"/>
          <TimeItem value={minutes} label="minutes"/>
          <TimeItem value={seconds} label="seconds"/>
        </div>
      </React.Fragment>
    );
  }

  get videoBlock() {
    return (
      <iframe style={{width: '100vw', height: '100vh'}}
              src="https://www.youtube.com/embed/Smwrw4sNCxE?start=33&end=72&autoplay=1&showinfo=0&controls=0"
              frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
    );
  }


  render() {
    const { isCounting } = this.state;

    return (
      <React.Fragment>
        {isCounting ? this.contentBlock : this.videoBlock}
      </React.Fragment>
    );
  }
}

export default App;
