import React from 'react';
import {Badge} from 'antd';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { connect } from 'dva';
@connect(({ accept_user }) => ({
  accept_user,
}))

class ConfirmationDialogRaw extends React.Component {
  constructor(props) {
    super(props);
    //分配给实例属性
    this.RadioGroupRef = React.createRef(null);
    this.state={
      value:'',
      disable:false,
    }
  };
  setvalue =(string)=>{
    this.setState({value:string});
  }
  componentDidMount() {
    const { value: valueProp, open } = this.props;
    if (!open) {
      this.setvalue(valueProp);
    }
  };

  handleEntering = () => {
    if (this.RadioGroupRef.current != null) {this.RadioGroupRef.current.focus();}
  };
  handleCancel = () => {
    const {onClose} = this.props;
    onClose();
  };

  handleOk = () => {
    const {onClose,dispatch} = this.props;
    dispatch({
      type:'accept_user/postprogress',
      payload:{
        id:parseInt(this.state.value),
        progress:10,
      },
      callback:(res) =>{
        if(res.status === 0){
          this.setState({disable:true});
        }
      },
    });
    onClose(this.state.value);
  };

  handleChange = (event) => {
    this.setvalue(event.target.value);
  };
  render(){
    const { data, onClose, value, open, ...other } = this.props;
    const {disable}=this.state;
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">指定接受人</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            ref={this.RadioGroupRef}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            { data ? (data.map((accept) => (
              <div>
                <FormControlLabel value={String(accept.id)} key={accept.id} control={<Radio/>}
                                  label={accept.user.nickname}/>
                <Badge color="#2db7f5" text={"已接受 : "+accept.user.score} />
              </div>
            ))):(<div >尚未有人接受</div>)}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={this.handleCancel} color="primary">
            取消
          </Button>
          <Button onClick={this.handleOk} color="primary" disabled={disable}>
            确定
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default ConfirmationDialogRaw;
