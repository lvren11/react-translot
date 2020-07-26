import React from 'react';
import { Avatar } from 'antd';


const UserAvatar = props => (
      <Avatar
        size={props.size}
        src={"https://translot.krmo.net/"+props.src}
        // style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      />
);

export default UserAvatar;
