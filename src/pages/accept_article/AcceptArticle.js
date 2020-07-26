import { List,Avatar } from 'antd';
import React from 'react';
import Dialogue from '@/pages/accept_article/dialogue';
import UserAvatar from '@/components/UserAvatar';

class selfArticle extends React.Component {

  render() {
    return(
      <div className="item">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.props.data}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[]}
              extra={
                <div>
                  <Dialogue  aid={item.id} />
                </div>
              }
            >
              <List.Item.Meta
                avatar={<UserAvatar src={item.post && item.post.user.avatar}/>}
                title={item.post && item.post.title}
                description={item.post && item.post.description}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}



export default selfArticle;
