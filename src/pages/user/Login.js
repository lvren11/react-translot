import React, { Component } from 'react';
import { Button, Row, Form, Input, Checkbox, message } from 'antd';
import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import storageHelper from '../../utils/storage';
import './Login.less';

@connect(({ user }) => ({
  user,
}))
@Form.create()
class Login extends Component {
  componentDidMount() {
    // 获取用户信息
    const userInfos = storageHelper.get('web_user');
    if (userInfos && userInfos.id) {
      router.push('/');
    }
  }

  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'user/login',
          payload: {
            ...values,
          },
          callback: (res) => {
            if (res.status === 0) {
              message.success('登录成功');
              storageHelper.set('web_user', res.data.user);
              storageHelper.set('x-auth-token', res.data.token);
                router.push('/');
            } else {
              message.error('登录失败，请重新登录');
              router.push('/user/login');
            }
          },
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
          <div className="login-main">
            <Form layout="vertical" onSubmit={this.handleSubmit}>
              <Form.Item>
                {getFieldDecorator('user', {
                  rules: [
                    {
                      required: true,
                      message: '必须输入用户名(邮箱)',
                    },
                  ],
                })(
                  <Input placeholder="请输入邮箱或者用户名" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码',
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
                  ],
                })(
                  <Input.Password placeholder="请输入密码" />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>自动登陆</Checkbox>)}
                <a className="login-form-forgot fr" href="/">
                    忘记密码？
                </a>
                <Button type="primary" htmlType="submit" block className="mt-20">
                    登陆
                </Button>
              </Form.Item>
              <Link to="/user/register">
                注册账户
              </Link>
            </Form>
          </div>
      </div>
    );
  }
}

export default Login;
