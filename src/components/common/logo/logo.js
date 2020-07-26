import React, { Component } from 'react';
import './logo.less';
class Logo extends Component {
  constructor(props){
    super(props);
    this.state = {
      full:false
    };
  }
   fill(){
    this.setState({
      full:!this.state.full
    });
    document.getElementById("logocontainer").style.backgroundColor=this.state.full?"#3ebffa":"transparent";
  }
 render() {
    return (
      <div>
        <div id="logocontainer" onClick={(event)=>{this.fill()}} >
          <div id="pelogo">TL</div>
          <div class="left_1"/>
          <div class="top_1"/>
          <div class="right_1"/>
          <div class="bottom_1"/>
        </div>
      </div>
    );
  }
}

export default Logo;
