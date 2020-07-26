import React, { Component } from 'react';
import './flipcard.less';
import Background from '../../../assets/images/div1.jpg';
import Background1 from '../../../assets/images/div2.jpg';
import Background2 from '../../../assets/images/div3.jpg';
var sectionStyle = {
  width: "100%",
// makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background})`
};

var sectionStyle1 = {
  width: "100%",
// makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background1})`
};

var sectionStyle2 = {
  width: "100%",
// makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background2})`
};

class AFlipcard extends Component {
  render() {
    return (
      <div>
        <div className="flip flip-vertical">
          <div className="front" style={sectionStyle}>
            <h1 className="text-shadow">我是什么卡？</h1>
          </div>
          <div className="back">
            <h2>帮助卡</h2>
            <p>只要心情是晴朗的，人生就没有雨天。给自己一个微笑，无论你过去做了什么，将来即将做什么，生活中依旧有许多值得感恩的，给自己一个微笑，是对自己的一个肯定，也是对未来的一份期许。</p>
          </div>
        </div>
        <div className="flip flip-vertical">
          <div className="front" style={sectionStyle1}>
            <h1 className="text-shadow">那我呢？</h1>
          </div>
          <div className="back">
            <h2>珍惜卡</h2>
            <p>时间是公平的，珍惜它的人能创造价值，挥霍它的人只能一无所获。时间是可以计算的，分清轻重缓急，然后有计划地朝着目标持续前行，不慌不忙，聚沙成塔，终会在某一天厚积薄发。“算计”时间，赚得到当下，也赢得了未来。</p>
          </div>
        </div>
        <div className="flip flip-vertical">
          <div className="front" style={sectionStyle2}>
            <h1 className="text-shadow">你猜？</h1>
          </div>
          <div className="back">
            <h2>治愈卡</h2>
            <p>难过的时候，就把自己当成另一个人，当初怎么安慰别人，现在就怎么安慰自己。</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AFlipcard;
