import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState, forwardRef } from 'react';
import {
  Form,
  Select,
  Tag,
  Input,
  Button,
  Upload,
  Icon,
  Row,
  Col, Card, Avatar, message, Modal,
} from 'antd';
import '../../pages/publish/publish.less';

import moment from 'moment';
import { connect } from 'dva';

import router from 'umi/router';
import UserAvatar from '@/components/UserAvatar';



const { CheckableTag } = Tag;
const { Option } = Select;
const { Meta } = Card;
const mdParser = new MarkdownIt(/* Markdown-it options */);

function PriceInput({ size, value = {}, onChange }, ref) {
  const [num, setNum] = useState(value.number || 0);
  const [currency, setCurrency] = useState(value.currency || "rmb");

  function triggerChange(changedValue) {
    if (onChange) {
      onChange(Object.assign({}, { number: num, currency }, changedValue));
    }
  }

  return (
    <span ref={ref}>
      <Input
        type="text"
        size={size}
        value={"number" in value ? value.number : num}
        onChange={({ target: { value: val } }) => {
          const number = parseInt(val || 0, 10);
          if (Number.isNaN(number)) {
            return;
          }

          setNum(val);
          triggerChange({ number: val });
        }}
        style={{ width: "65%", marginRight: "3%" }}
      />
      <Select
        value={"currency" in value ? value.currency : currency}
        size={size}
        style={{ width: "32%" }}
        onChange={currency => {
          setCurrency(currency);
          triggerChange({ currency });
        }}
      >
        <Option value="rmb">RMB</Option>
      </Select>
    </span>
  );
}

PriceInput = forwardRef(PriceInput);
@connect(({ user,article }) => ({
  user,article
}))

class Article_do extends React.Component {
  constructor() {
    super();
    this.state = {
      html:'',
      selectedTags: [],
      files:[],
      visible: false,
    };
  }
  handleCancel = () => {
    this.setState({ visible: false });
  };
  showdialogue = () => {
    this.setState({
      visible: true,
    });
  };
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, {id:tag}] : selectedTags.filter(t => t.id !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags});
  };
  customRequest = (option)=> {
    console.log(option)
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
  }

  handleSubmit = e => {
    e.preventDefault();
    const {dispatch,data} = this.props;
    let price=0;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.price.currency === 'dollar')
          price=parseInt(values.price.number)*7.0813
        else {price=parseInt(values.price.number)}
        dispatch({
          type: "article/doarticle",
          payload: {
            id:data.id,
            article: {
              title: values.title,
              description: values.desc,
              content: this.state.html,
              files: this.state.files,
              priority: 1,
              price: price,
              tags: this.state.selectedTags,//注意是整数
            }
          },
          callback: (res) => {
            if (res.status === 200) {
              this.setState({ visible: false });
            }
          },
        });
      }
    });
  };
  checkPrice = (rule, value, callback) => {
    if (value.number >= 0) {
      return callback();
    }
    callback('价格必须大于等于0');
  };
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  handleEditorChange=({html, text}) => {
    this.setState({html:html})
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedTags,visible } = this.state;
    const { user: { user },loading,article:{categorys},data} = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div>
      <Button onClick={this.showdialogue} type="link" block>
        修改
      </Button>
      <Modal
      visible={visible}
      title="article"
      onCancel={this.handleCancel}
      footer={[]}
      >
      <div style={{ marginTop: '1.5rem' }}>
        <Row type="flex" justify="center">
          <Col md={24} sm={24} xs={24}>
            <Row type="flex" justify="space-around">
              <Col lg={24} sm={24} xs={24}>
                <Card
                  bordered={false}
                  loading={loading}
                  style={{ padding: '1rem' }}
                >
                  <div className="article-content-main">
                    <div className="py-3">
                      <div className="mmb-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}>
                          {  user && user.avatar
                          && <UserAvatar src={user.avatar} />
                          }
                          <div className="pl-3">
                            <h4 style={{ marginBottom: 0, fontWeight: 700 }}>
                              { user && user.nickname}
                            </h4>
                            <small>
                              {moment().format('LL')}
                            </small>
                          </div>
                        </div>
                      </div>
                      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="标题">
                          {getFieldDecorator('title', {
                            rules: [{ required: true, message: '标题不能为空' }],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="简要描述">
                          {getFieldDecorator('desc', {
                            rules: [{ required: true, message: '要求有简要描述' }],
                          })(<Input />)}
                        </Form.Item>
                        <Form.Item label="需求内容">
                          <MdEditor
                            value=""
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                          />
                        </Form.Item>
                        <Form.Item label="标签">
                          {categorys.map(item => (
                            <CheckableTag
                              key={item.id}
                              checked={JSON.stringify(selectedTags).indexOf(JSON.stringify({id:item.id})) > -1}
                              onChange={checked => this.handleChange(item.id, checked)}
                            >
                              {item.tag_name}
                            </CheckableTag>
                          ))}
                        </Form.Item>
                        <Form.Item label="设定价格">
                          {getFieldDecorator('price', {
                            initialValue: { number: 0, currency: 'rmb' },
                            rules: [{ validator: this.checkPrice }],
                          })(<PriceInput />)}
                        </Form.Item>
                        <Form.Item label="上传文件" extra="">
                          {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                          })(
                            <Upload name="file" customRequest={this.customRequest} onChange={this.onChange} multiple={true} showUploadList={{showRemoveIcon:false}}>
                              <Button>
                                <Icon type="upload" /> 点击上传文件
                              </Button>
                            </Upload>,
                          )}
                        </Form.Item>
                        <Form.Item label="拖曳上传">
                          {getFieldDecorator('dragger', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                          })(
                            <Upload.Dragger name="file" customRequest={this.customRequest} onChange={this.onChange} multiple={true} showUploadList={{showRemoveIcon:false}}>
                              <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                              </p>
                              <p className="ant-upload-text">点击上传文件</p>
                              <p className="ant-upload-hint">支持单次或批量上传。</p>
                            </Upload.Dragger>,
                          )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                          <Button type="primary" htmlType="submit">
                            提交修改
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      </Modal>
        </div>
    );
  }
}

const Articleput = Form.create({ name: 'validate_other' })(Article_do);
export default Articleput;

