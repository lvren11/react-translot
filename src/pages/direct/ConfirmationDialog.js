import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './direct.less';


class Confirmation extends React.Component{

  render() {

    return (
      <div className="root">
        <List component="div" role="list">
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="Designated recipient"
            role="listitem"
          >
            <ListItemText primary="已确定接受人选" secondary={this.props.data[0].user.nickname} />
          </ListItem>
        </List>
      </div>
    );
  }
}

export default Confirmation;
