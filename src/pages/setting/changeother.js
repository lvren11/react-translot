import React, { Component } from 'react';
import { Form, Input, Button, message, Divider, Col, Row, Radio, DatePicker, Select } from 'antd';
import imgsrc from '../../assets/images/other.png';
import { connect } from 'dva';
import storageHelper from '@/utils/storage';


@connect(({ center,user }) => ({
  center,user
}))
@Form.create()
class changepassword extends Component {
  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch,user:{user} } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'center/changeother',
          payload: {
            id:user.id,
            user:values,
          },
          callback: (res) => {
            if (res.status === 0) {
              storageHelper.set('web_user', res.data.user);
            }
          },
        });
      }
    });
  };
  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    const { form,user:{user} } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col lg={8} md={10} sm={18} xs={24}>
            <div style={{ padding: '15px', background: '#fff' }}>
              <Divider orientation="left">修改其他信息</Divider>
              <Form
                layout="vertical"
                onSubmit={this.handleSubmit}
              >
                <Form.Item >
                  {getFieldDecorator('username',  {initialValue: user.username},)}
                </Form.Item>
                <Form.Item >
                  {getFieldDecorator('nickname',  {initialValue: user.nickname},{
                    rules: [
                      {
                        required: true,
                        message: '必须输入昵称',
                      },
                      {
                        min: 2,
                        message: '昵称至少2位字符',
                      },
                      {
                        max: 10,
                        message: '昵称最多10位字符',
                      },
                      {
                        whitespace: true,
                        message: '不能输入空格',
                      },
                    ],
                  })(
                    <Input placeholder="请更换昵称(2-10字符)" />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('sex', {initialValue: user.sex})(
                    <Radio.Group>
                      <Radio value="m">男</Radio>
                      <Radio value="f">女</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('birth')(
                    <DatePicker onChange={this.onChange} />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('email',{initialValue: user.email}, {
                    rules: [
                      {
                        required: true,
                        message: '必须输入邮箱',
                      },
                      {
                        max: 64,
                        message: '邮箱不合法',
                      },
                      {
                        pattern: /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/,
                        message: '邮箱不合法',
                      },
                      {
                        whitespace: true,
                        message: '不能输入空格',
                      },
                    ],
                  })(
                    <Input placeholder="请更换合法邮箱" />,
                  )}
                </Form.Item >
                <Form.Item>
                  {getFieldDecorator('hobbies',{initialValue: user.hobbies},
                  )(
                    <Input placeholder="请更换爱好" />,
                  )}
                </Form.Item >
                <Form.Item>
                  {getFieldDecorator('phone',  {initialValue: user.phone},{
                    rules: [
                      { required: true,
                        message: '请输入你的手机号码'
                      },
                      {
                        pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
                        message: '手机号码不合法',
                      },
                      {
                        whitespace: true,
                        message: '不能输入空格',
                      }
                    ],
                  })(<Input style={{ width: '100%' }} placeholder="请更新手机号码" />)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block className="mt-10">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col lg={16} md={12} sm={0} xs={0}>
            <img src={imgsrc}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default changepassword;
