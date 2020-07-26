import React from 'react';
import { Steps, Button, message} from 'antd';
import {connect} from 'dva';
import './Step_accept.less';
const { Step } = Steps;


const steps = [
  {
    title: '发布',
  },
  {
    title: '接受',
  },
  {
    title: '成功',
  },
];

@connect(({ user,accept_user }) => ({
  user,accept_user
}))

class Step_accept extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      disable:this.props.disable,
    };
  }
  next() {
    const current = this.state.current + 1;
    const {dispatch,post_id}=this.props;
    this.setState({ current});
    dispatch({
          type:'accept_user/postaccept',
          payload:{
            post_id:post_id,
          },
          callback:(res) =>{
            if(res.status === 0)
            {
                dispatch({
                  type:'accept_user/postmessage',
                  payload:{
                    accept_id:res.data.accept.id,
                    message:"我接受了你的需求",
                  }
                })
            }
            if(res.status === 4) {
              this.setState({ current: this.state.current-1});
              this.setState({ disable: true});
              message.error("你已经接受过了");
            }
            if(res.status === 2){
              this.setState({ current: this.state.current-1});
              this.setState({ disable: true});
              message.error("该需求已经被确认了")
            }
          }
    });
  }


  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} disabled={this.state.disable}/>
          ))}
        </Steps>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()} disabled={this.state.disable}>
              Accept
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('接受成功，请到接受界面沟通')}>
              Done
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default Step_accept;
