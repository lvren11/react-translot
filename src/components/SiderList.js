

import React from 'react';
import { List, Icon,Avatar } from 'antd';
import Link from 'umi/link';
import UserAvatar from '@/components/UserAvatar';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

const SiderList = props => (
  <List
    dataSource={props.dataSource}
    bordered={props.bordered}
    split={props.split}
    style={{ width: 250}}
    renderItem={item => (
      <List.Item
        actions={[
          <IconText type="eye"    text={item.view_count} key="list-vertical-message" />,
        ]}
      >
        <UserAvatar size='small' src={item.user && item.user.avatar}/>
        <Link to={`/article/${item.id}`} style={{ color: '#000000a6' }} target="_block">{item.title}</Link>
      </List.Item>
    )}
  />
);

export default SiderList;
