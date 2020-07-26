import React, { Component } from 'react';
import { Form, Input, Button, message, Divider, Col, Row } from 'antd';
import imgsrc from '../../assets/images/change.png';
import { connect } from 'dva';

import router from 'umi/router';

@connect(({ center }) => ({
  center,
}))
@Form.create()
class changepassword extends Component {
  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'user/register',
          payload: {
            old:values.old,
            new:values.new,
          },
          callback: (res) => {
            if (res) {
              message.success('修改成功,请重新登录');
              router.push({ pathname: '/user/login'});
            } else {
              message.error('修改失败，请输入正确密码');
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
    const { form } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const passwordValidator = (rule, value, callback) => {
      if (value && value !== getFieldValue('new')) {
        callback('两次输入不一致！');
      }
      callback();
    };
    return (
      <div>
        <Row type="flex" justify="space-between">
          <Col lg={8} md={10} sm={18} xs={24}>
        <div style={{ padding: '15px', background: '#fff' }}>
          <Divider orientation="left">修改密码</Divider>
          <Form
            layout="vertical"
            onSubmit={this.handleSubmit}
          >
            <Form.Item>
              {getFieldDecorator('old', {
                rules: [
                  {
                    required: true,
                    message: '请输入旧密码(8-20位)',
                  },
                  {
                    min: 8,
                    message: '密码至少8位',
                  },
                  {
                    max: 20,
                    message: '密码最多20位',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_.@#$^&*]+$/,
                    message: '密码只能由字母、数字、下划线、特殊字符（比如@#$.^&*）组成',
                  },
                  {
                    whitespace: true,
                    message: '不能输入空格',
                  },
                ],
              })(
                <Input.Password placeholder="请输入旧密码" />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('new', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码',
                  },
                  {
                    min: 8,
                    message: '密码至少8位',
                  },
                  {
                    max: 20,
                    message: '密码最多20位',
                  },
                  {
                    pattern: /^[a-zA-Z0-9_.@#$^&*]+$/,
                    message: '密码只能由字母、数字、下划线、特殊字符（比如@#$.^&*）组成',
                  },
                  {
                    whitespace: true,
                    message: '不能输入空格',
                  },
                ],
              })(
                <Input.Password placeholder="请输入新密码" />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password2', {
                rules: [
                  {
                    required: true,
                    message: '再次输入密码',
                  },
                  {
                    validator: passwordValidator,
                  },
                ],
              })(
                <Input.Password placeholder="再次输入密码" />,
              )}
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
