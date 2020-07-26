import React, { Component } from 'react';
import { Row, Form, Input, Button, message,Select,Radio,DatePicker } from 'antd';

import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
const Option = Select.Option;
@connect(({ user }) => ({
  user,
}))
@Form.create()
class Register extends Component {
  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'user/register',
          payload: {
            ...values,
            nickname:values.username,
          },
          callback: (res) => {
            if (res) {
              message.success('注册成功,请登录');
              router.push({ pathname: '/user/login'});
            } else {
              message.error('注册失败，请重新注册');
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
    const { form,dispatch } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const passwordValidator = (rule, value, callback) => {
      if (value && value !== getFieldValue('password')) {
        callback('两次输入不一致！');
      }
      callback();
    };
    const checkValidator = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
          dispatch({
            type:'user/check',
            payload: {
              username:value,
            },
            callback: (res) => {
              if (res.status === 2) {
                callback('用户名重复');
              }else{
                callback();
              }
            },
          });
      }
    };
    const checkemailValidator = (rule, value, callback) => {
      if (!value) {
        callback();
      } else {
        dispatch({
          type:'user/check',
          payload: {
            email:value,
          },
          callback: (res) => {
            if (res.status === 2) {
              callback('邮箱重复');
            }else{
              callback();
            }
          },
        });
      }
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>,
    );
    return (
      <div>
          <div style={{ padding: '40px', background: '#fff' }}>
            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
            >
              <Form.Item >
                {getFieldDecorator('username', {
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
                    {
                      validator: checkValidator,
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder="请输入用户名(2-10字符)" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('email', {
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
                    {
                      validator: checkemailValidator,
                    }
                  ],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder="请输入合法邮箱" />,
                )}
              </Form.Item >
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码(8-20位)',
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
                  <Input.Password placeholder="请输入密码" />,
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
                {getFieldDecorator('sex', {initialValue: 'm'})(
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
                {getFieldDecorator('phone', {
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
                })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="请输入手机号码" />)}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block className="mt-10">
										注册
                </Button>
              </Form.Item>
              <Link to="/user/login">
							登陆账户
              </Link>
            </Form>
          </div>
      </div>
    );
  }
}

export default Register;
