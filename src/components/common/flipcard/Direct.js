import React, { Component } from 'react';
import './flipcard.less';

import Background1 from '../../../assets/images/back1.jpg';
import Background2 from '../../../assets/images/back3.jpg';


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

class DFlipcard extends Component {
  render() {
    return (
      <div>
        <div className="flip flip-vertical">
          <div className="front" style={sectionStyle1}>
            <h1 className="text-shadow">正确的选择</h1>
          </div>
          <div className="back">
            <h2>接受者</h2>
            <p>人生处处有选择,选择正确的道路永远比跑的快更重要</p>
            <p>选择最合适的接受者，能让你的任务完成得更完美</p>
          </div>
        </div>
        <div className="flip ">
          <div className="front" style={sectionStyle2}>
            <h1 className="text-shadow">聊天的艺术</h1>
          </div>
          <div className="back">
            <h2>取得别人的信任</h2>
            <p> 当你的会聊天话语中充满着对对方真诚的欣赏和赞美之辞的时候，你的语言便已经像是润物细无声的春雨渗入到了他人的心灵深处，对方在悄然地感动中也会慢慢地接纳你。俗话话:你发掘了清泉，泉水也会反过来滋润你干涸的心田。  </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DFlipcard;
