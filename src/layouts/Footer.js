import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ChatIcon from '@material-ui/icons/Chat';
import CropPortraitIcon from '@material-ui/icons/CropPortrait';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import Link from 'umi/link';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:'fixed',
    bottom:'0px',
  },
});

export default function Footer(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <Link to='/' replace><BottomNavigationAction label="CropPortrait" value="cropPortrait" icon={<CropPortraitIcon />} /></Link>
      <Link to='/publish' replace><BottomNavigationAction label="Border" value="border" icon={<BorderColorIcon />} /></Link>
      <Link to={`/direct/${props.userid}` } replace><BottomNavigationAction label="YoutubeSearchedFor" value="youtubeSearchedFor" icon={<YoutubeSearchedForIcon />} /></Link>
      <Link to={`/accept_article/${props.userid}`} replace><BottomNavigationAction label="Chat" value="chat" icon={<ChatIcon />} /></Link>
    </BottomNavigation>
  );
}
