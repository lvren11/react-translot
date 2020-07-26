import React, { Component } from 'react';
import moment from 'moment';
import './clock.less';
class Clock extends Component {
  constructor(clock) {
    super(clock);
    this.state={
      day:moment().format("dd"),
      hours:moment().format("k"),
      minutes:moment().format("mm"),
      seconds:moment().format("ss")
    }
  }
  componentDidMount(){
    this.timeID = setInterval(
      () =>this.tick(),
      1000
    )
  }
  componentWillUnmount(){
    clearInterval(this.timeID)
  }
  tick(){
    this.setState({
      day:moment().format("dd"),
      hours:moment().format("k"),
      minutes:moment().format("mm"),
      seconds:moment().format("ss")
    })
  }
  render() {
    return (
      <div className="box">
      <div className="clock-container">
        <div className="clock-col">
          <p className="clock-day clock-timer">{this.state.day}
          </p>
          <p className="clock-label">
            Day
          </p>
        </div>
        <div className="clock-col">
          <p className="clock-hours clock-timer">{this.state.hours}
          </p>
          <p className="clock-label">
            Hours
          </p>
        </div>
        <div className="clock-col">
          <p className="clock-minutes clock-timer">{this.state.minutes}
          </p>
          <p className="clock-label">
            Minutes
          </p>
        </div>
        <div className="clock-col">
          <p className="clock-seconds clock-timer">{this.state.seconds}
          </p>
          <p className="clock-label">
            Seconds
          </p>
        </div>
      </div>
      </div>
    );
  }
}

export default Clock;
