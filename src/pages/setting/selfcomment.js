import { List,Avatar } from 'antd';
import React from 'react';
import Commentput from './Commentput';
import moment from 'moment';
import '../../pages/direct/direct.less';
import UserAvatar from '@/components/UserAvatar';

class selfcomment extends React.Component {

  render() {
    return(
      <div className="item">
        <List
          // itemLayout="vertical"
          size="large"
          pagination={{
            pageSize:5,
          }}
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[]}
              extra={
                <div>
                  <Commentput data={item}/>
                </div>
              }
            >
              <List.Item.Meta
                avatar={<UserAvatar src={item.user.avatar}/>}
                title={moment(item.created_at).fromNow()}
                description={item.content}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}



export default selfcomment;
