import React, { Component } from 'react';
import { Button, Modal,Form,Input } from 'antd';
import { connect } from 'dva';

@connect(({ article }) => ({
  article
}))

class Comment extends Component {
  state={
    visible: false,
  };
  showdialogue = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    const {dispatch,data} =this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:'article/docomment',
          payload:{
            id:data.id,
            comment:{
              content: values.content,
              post_id: data.post_id,
              parent_id: data.parent_id,
            }
          }
        })
      }
    });
  };
  render() {
    const { visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {data} =this.props;
    return (
      <div>
          <Button onClick={this.showdialogue} type="link" block>
            修改
          </Button>
          <Modal
            visible={visible}
            title="comment"
            onCancel={this.handleCancel}
            footer={[]}
          >
            <Form layout="inline" onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('content', {initialValue: data.content},{
                })(
                  <Input placeholder="请修改你的评论"/>,
                )}
              </Form.Item>
              <Button type="primary" htmlType="submit">提交</Button>
            </Form>
          </Modal>
      </div>
    );
  }
}
const Commentput = Form.create()(Comment);
export default Commentput;
