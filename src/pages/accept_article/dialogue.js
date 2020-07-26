import React, { Component } from 'react';
import { Button, Modal, Input, Form, Upload, message, Icon, Alert,Avatar } from 'antd';
import './dialogue.less';
import { connect } from 'dva';

import './dialogue.less';
import storageHelper from '../../utils/storage';

@connect(({ user,accept_user }) => ({
  user,accept_user
}))
@Form.create()
class Dialogue extends Component {
  state = {
    visible: false,
    files:[],
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  showdialogue = () => {
    this.setState({
      visible: true,
    });
    const {dispatch,aid} = this.props;
    dispatch({
      type:'accept_user/getmessage',
      payload:aid,
    })
  };
  customRequest = (option)=> {
    const formData = new FormData();
    formData.append('file',option.file);
    this.props.dispatch({
        type: "article/upload",
        payload: formData,
        callback: (res) => {
          if (res.status === 0) {
            const { files } = this.state;
            const file = [...files,{"id":res.data.upload.id}];
            option.onSuccess(res, option.file);
            // onUploadProgress: ({ total, loaded }) => {
            //   option.onProgress({ percent: Math.round(loaded / total * 100).toFixed(2) }, option.file);
            // }
            this.setState({
              files: file,
            });
          }
          else{
            message.error("文件上传失败！");
          }
        },
      }
    )
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  download =(e,event) =>{

  };
  handleSubmit=(e) => {
    e.preventDefault();
    const { form, dispatch,aid } = this.props;
    form.validateFields({ force: true }, (err, values) => {
      if (!err) {
        dispatch({
          type: 'accept_user/postmessage',
          payload: {
            accept_id:aid,
            message:values.message,
            files: this.state.files,
          },
          callback: (res) => {
            if (res.status === 0) {
              const {dispatch,aid} = this.props;
              dispatch({
                type:'accept_user/getmessage',
                payload:aid,
              });
              this.props.form.resetFields();
            }
          }
        })
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    const {accept_user:{dialogues},user:{user}} =this.props;
    return (
      <div>
        <Button type="default" onClick={this.showdialogue}>
          私聊
        </Button>
        <Modal
          visible={visible}
          title="聊天界面"
          onCancel={this.handleCancel}
          footer={[
          ]}
        >
          <div className="container1">
            <div className="phone">
              <div className="content1">
                <div className="start">
                  <Alert message="注意上传须有信息提交" banner />
                </div>
                <div className="con">
                <ul className="List">
                {
                  dialogues && dialogues.map((item)=>(
                  <li className={(item.sender_id !== user.id) ? "Item Item--left":"Item Item--right"} key={item.id}>
                    <div className="Message">
                      <div className="Message-inner">
                        {item.message}
                      </div>
                    </div>
                      {
                        item.files.length !== 0 ? (
                          <div className="Message">
                            <div className="Message-inner">
                              {item.files.map((a)=>(
                                <a href={`api/upload/${a.id}?access_token=${storageHelper.get("x-auth-token")}`} >{a.filename}</a>
                              ))
                              }
                            </div>
                          </div>
                        ):(<div />)
                      }
                  </li>
                    )
                  )
                }
                </ul>
                </div>
                <Form layout="inline" onSubmit={this.handleSubmit} >
                  <Form.Item>
                    {getFieldDecorator('message', {
                      rules: [{ required: true, message: '不能为空' }],
                    })(
                      <Input.TextArea onPressEnter={this.handleSubmit} style={{'resize':'none',marginLeft:'5px'}}/>
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('upload', {
                      valuePropName: 'fileList',
                      getValueFromEvent: this.normFile,
                    })(
                      <Upload name="file" customRequest={this.customRequest} onChange={this.onChange} multiple={true} showUploadList={false}>
                        <Button>
                          <Icon type="upload" />
                        </Button>
                      </Upload>,
                    )}
                  </Form.Item>
                  <Button type="primary" htmlType="submit" disabled={false} style={{marginLeft:'5px'}}>发送</Button>
                </Form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Dialogue;
