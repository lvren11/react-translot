import React from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import CropperDemo from '@/components/common/Cropper/Cropper';
import {connect} from 'dva';
import storageHelper from '@/utils/storage';
import './ClassCropperModal.less';
import defaultimg from '../../../assets/images/AVATAR.png';
@connect(({ user,center }) => ({
  user,center
}))

class ClassCropperModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable:false,
      cropSrc:'',
      cropVisible:false,
      blob:'',
      fileList: [
        {
          uid: '-1',
          name: 'avatar',
          status: 'done',
          url: defaultimg,
        },
      ],
    };
  }


  handleCancel = () => this.setState({ cropVisible: false });

  handleChange = ({ fileList }) => this.setState({ fileList });
  handleRemove =(res) =>{};
  beforeUpload = (file) => {
    let imageType = ['image/jpeg','image/png','image/jpg','image/gif'];
    let isImage = imageType.findIndex(o => o === file.type) !== -1;
    if (!isImage) {
      message.error('请选择正确的图片类型!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M!');
      return false;
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);
    let _this = this;
    reader.onload = (e) => {
      _this.setState({
        cropSrc: e.target.result,
        cropVisible: true,
      })
    };
    return new Promise((resolve, reject) => {
      let index = setInterval(() => {
        if(this.blob){  // 监听裁剪是否完成
          window.clearInterval(index);
          this.blob.uid = file.uid;   // 需要给裁剪后的blob对象设置uid，否则会报错！！！
          resolve(this.blob);   // 执行后续的上传操作
        }
      },100);
    });
  };
  handleOk = (dataUrl) => {
    this.setState({
      cropVisible: false
    });
    this.blob= dataUrl;   //  this.blob既是裁剪后的图片，也可以作为裁剪结束的标志
  };
  customRequest = (option)=> {
    console.log(option);
    const {dispatch,user:{user}} =this.props;
    const formData = new FormData();
    formData.append('avatar',option.file);
    dispatch({
        type: "user/avatar",
        payload: formData,
        callback: (res) => {
          if (res.status === 0) {
            option.onSuccess(res, option.file);
            this.setState({disable:true});
            dispatch({
              type: "center/getuser",
              payload:user.id,
              callback:(res) =>{
                if(res.status === 0)
                {
                  storageHelper.set('web_user', res.data.user);
                  dispatch({
                    type: 'user/saveUser',
                    payload: {
                      user: res.data.user,
                    },
                  });
                }
              }
            })
          }
          else{
            option.onError(res, option.file);
          }
        },
      }
    )
  };
  render() {
    const { cropSrc,cropVisible, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          customRequest={this.customRequest}
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          disabled={this.state.disable}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={cropVisible} footer={null} onCancel={this.handleCancel}>
          <CropperDemo src={cropSrc} onOk={this.handleOk} />
        </Modal>
      </div>
    );
  }
}

export default ClassCropperModal;
