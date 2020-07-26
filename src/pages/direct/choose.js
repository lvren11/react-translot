import React from 'react';
import PropTypes from 'prop-types';
import classes from './direct.less';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Badge } from 'antd';
import { connect } from 'dva';

@connect(({ accept_user }) => ({
  accept_user,
}))
class  ConfirmationDialogRaw extends React.Component {
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
        <DialogTitle id="confirmation-dialog-title">Designated recipient</DialogTitle>
        <DialogContent dividers>
          <RadioGroup
            ref={this.RadioGroupRef}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            { data.length !== 0 ? (data.map((accept) => (
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
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary" disabled={disable}>
            Ok
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

@connect(({ accept_user }) => ({
  accept_user,
}))

class ConfirmationDialog extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      open:false,
      value:'',
    }
  };

  setOpen=(e)=>{
    this.setState({open:e})
  };
  setValue=(e)=>{
    this.setState({value:e})
  };
  componentDidMount() {
    const { data,dispatch } = this.props;
    dispatch({
      type:'accept_user/querensave',
      payload:data,
    })
  }
  render()
  {
    const {value,open} = this.state;
    const handleClickListItem = () => {
        this.setOpen(true);
    };

    const handleClose = (newValue) => {
      this.setOpen(false);

      if (newValue) {
        const {dispatch} =this.props;
        dispatch({
          type:'accept_user/queren',
          payload:parseInt(newValue),
          callback:(res)=>{
            this.setValue(res.data.accept.user.nickname);
          }
        });
      }
    };
    const {data} = this.props;
    return (
      <div className={classes.root}>
        <List component="div" role="list">
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="phone ringtone"
            onClick={handleClickListItem}
            role="listitem"
          >
            <ListItemText primary="点击查看接受人" secondary={value}/>
          </ListItem>
          <ConfirmationDialogRaw
            classes={{
              paper: classes.paper,
            }}
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            value={value}
            data={data}
          />
        </List>
      </div>
    );
  }
}

export default ConfirmationDialog;
