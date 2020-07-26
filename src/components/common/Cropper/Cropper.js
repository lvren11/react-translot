import React, {Component} from 'react'
import { Button } from 'antd'
import Cropper from 'react-cropper'
import 'Cropperjs/dist/cropper.css'
class CropperDemo extends Component {
  _crop() {
  }

  handleOk = () => {
    //将裁剪的图片转成blob对象
    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      this.props.onOk(blob);
    }, "image/png");
  }

  render() {
    const { src } = this.props;
    return (
      <div className="cropper-wrap">
        <Cropper
          ref='cropper'
          src={src}
          style={{ height: 400, width: '100%' }}
          aspectRatio={4 / 3}
          guides={false}
          crop={this._crop.bind(this)}
        />
        <Button onClick={this.handleOk}>确认</Button>
      </div>
    );
  }
}
export default CropperDemo;
