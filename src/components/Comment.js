
import React, { Component } from 'react';
import { Comment, Input, Button, Tooltip, List,Avatar } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';


import './styles/Comment.less';
import Actions from '@/components/Actions';


moment.locale('zh-cn');
const Content = ({ content }) => (
  <p>
    {content}
  </p>
);

const Datetime = ({ time }) => {
  return (
    <Tooltip
      title={time}
    >
      <span>
        {moment(time).fromNow()}
      </span>
    </Tooltip>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <div style={{ marginBottom: 10 }}>
      <Input.TextArea rows={2} onChange={onChange} value={value} />
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ opacity: 0 }}><span>表情</span></div>
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
class AddComment extends Component {
  state = {
    content: '',
  }

  componentDidMount() {
    const { dispatch, articleId } = this.props;
    if (articleId) {
      dispatch({
        type: 'article/commentList',
        payload: {
          pid:articleId,
        },
      });
    }
  }

  handleChange=(e) => {
    this.setState({
      content: e.target.value,
    });
  }

  handleSubmit=() => {
    const { dispatch, articleId,user:{user} } = this.props;
    if (this.state.content) {
      dispatch({
        type: 'article/comment',
        payload: {
          content: this.state.content,
          post_id:parseInt(articleId),
        },
        callback: (res) => {
          if (res.status === 0) {
            let a=res.data.comment;
            a.user=user;
            dispatch({
              type: 'article/commentHandle',
              payload: a,
            });
            this.setState({ content: '' });
          }
        },
      });
    }
  }

  render() {
    const { content } = this.state;
    const { user: { user }, article: { comments } } = this.props;
    return (
      <>
        <Comment
          avatar={
            user && user.id && <Avatar src={user.avatar} />}
          content={
            user && user.id
              ? (
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  value={content}
                />
              )
              : (
                <Link to="/user/login">登录后可评论</Link>
              )
          }
        />
        <List
          className="comment-list"
          itemLayout="horizontal"
          split={false}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5,
          }}
          dataSource={comments}
          renderItem={item => (
            <List.Item extra={item.parent_id === null ? <Actions id={item.id} articleId={this.props.articleId}/> : null}>
              {item.parent_id === null ?
                      (<Comment
                        author={item.user && item.user.nickname}
                        avatar={item.user && item.user.avatar}
                        content={<Content content={item.content}/>}
                        datetime={<Datetime time={item.created_at}/>}
                      >
                        {comments.map((ciji) =>(
                          ciji.parent_id === item.id ? (
                            <Comment
                              author={ciji.user && ciji.user.nickname}
                              avatar={ciji.user && ciji.user.avatar}
                              content={<Content content={ciji.content}/>}
                              datetime={<Datetime time={ciji.created_at}/>}
                            />
                          ):null
                        ))
                        }
                      </Comment>) : null
                    }
            </List.Item>
          )}
        />,
      </>
    );
  }
}

export default AddComment;
