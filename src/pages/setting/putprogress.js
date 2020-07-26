import React, { Component } from 'react';
import { Button, Progress } from 'antd';
import { connect } from 'dva';
const ButtonGroup = Button.Group;

@connect(({ accept_user }) => ({
  accept_user
}))

class Putprogress extends Component {
  increase = (id,percent,event) => {
    let percent_new = percent + 10;
    if (percent_new > 100) {
      percent_new = 100;
    }
    this.props.dispatch({
      type:'accept_user/putprogress',
      payload:{progress:percent_new,id:id},
    });
  };

  decline = (id,percent,event,) => {
    let percent_new = percent - 10;
    if (percent_new < 10) {
      percent_new = 10;
    }
    this.props.dispatch({
      type:'accept_user/putprogress',
      payload:{progress:percent_new,id:id},
    });
  };
  render() {
  const {accept_user:{progress},data}=this.props;
  let percent=progress.find(item=>item.id === data.id);
  if (!percent){ percent=data; }
    console.log(progress)
    console.log(percent)
    return (
      <div>
          <Progress type="circle" percent={percent.progress} strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}/>
          <ButtonGroup>
            <Button onClick={this.decline.bind(this,data.id,percent.progress)} icon="minus"/>
            <Button onClick={this.increase.bind(this,data.id,percent.progress)} icon="plus"/>
          </ButtonGroup>
      </div>
    );
  }
}

export default Putprogress;
