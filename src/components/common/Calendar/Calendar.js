import React, { Component } from 'react';
import { Calendar } from 'antd';
import cback from '../../../assets/images/cback.jpg';

var sectionStyle = {

  backgroundImage: `url(${cback})`
};
class Calendarcard extends Component {
   onPanelChange(value, mode) {
    console.log(value, mode);
  }
  render() {
    return (
      <div style={{ width: 300, border: '1px solid #d9d9d9', borderRadius: 4,background:"white" }}>
        <Calendar style={sectionStyle} fullscreen={false} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

export default Calendarcard;

