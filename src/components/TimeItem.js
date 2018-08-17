import React, { PureComponent } from 'react';
import { BEMNormalize } from '../utils';
import './TimeItem.css';

const timeBlock = 'b-day-time-block';

export default class TimeItem extends PureComponent {

  render() {
    const { value, label } = this.props;

    return (
      <div className={timeBlock}>
        <span className={BEMNormalize(timeBlock, 'val')}>{value}</span>
        <span className={BEMNormalize(timeBlock, 'label')}>{label.toUpperCase()}</span>
      </div>
    );
  }
}