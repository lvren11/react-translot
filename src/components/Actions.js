import React, { Component } from 'react';
import { Button, Icon, Input, Tooltip } from 'antd';
import { connect } from 'dva';
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <div style={{ marginBottom: 10 }}>
      <Input.TextArea rows={2} onChange={onChange} value={value} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <div>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          评论
        </Button>
      </div>
    </div>
  </div>
);

@connect(({ article, user }) => ({
  article,
  user,
}))

class Actions extends Component {
  state={
    coontent:'',
    action:false,
  };
  handleChange=(e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit=() => {
    const { dispatch, articleId,id,user:{user}} = this.props;
    if (this.state.content) {
      dispatch({
        type: 'article/comment',
        payload: {
          content: this.state.content,
          post_id:parseInt(articleId),
          parent_id:id,
        },
        callback: (res) => {
          if (res.status === 0) {
            let a=res.data.comment;
            a.user=user;
            dispatch({
              type: 'article/commentHandle',
              payload:a,
            });
            this.setState({ content: '' });
          }
        },
      });
    }
  };
  reply = () => {
    this.setState({
      action: true,
    });
  };

  render() {
    const {content,action} =this.state;
    return (
      <div>
        <span key="comment-basic-reply-to">
        <Tooltip title="评论">
        <Icon type="message"
              theme={action === true ? 'filled' : 'outlined'}
              onClick={this.reply}
              style={{fontSize: 20}}
        />
          {
            action === true ? ( <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              value={content}
            />):(<div />)
          }
        </Tooltip>
      </span>
      </div>
    );
  }
}

export default Actions;
