import { List,Avatar } from 'antd';
import React from 'react';
import Articleput from './Articleput';

import '../../pages/direct/direct.less';
import Link from 'umi/link';
import UserAvatar from '@/components/UserAvatar';
class selfArticle extends React.Component {

  render() {
    return(
      <div className="item">
        <List
          // itemLayout="vertical"
          size="large"
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[]}
              extra={
                <div>
                  <Articleput data={item}/>
                </div>
              }
            >
              <List.Item.Meta
                avatar={<UserAvatar src={item.user.avatar}/>}
                title={<Link to={`/article/${item.id}`} target="_block">{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}



export default selfArticle;
