import { List } from 'antd';
import React from 'react';
import accept_img from '../../assets/images/accepted.png';
import ConfirmationDialog from './choose';
import UserAvatar from '@/components/UserAvatar';
import Confirmation from './ConfirmationDialog';
import loading from '../../assets/images/loading.png'
import './direct.less';
import Link from 'umi/link';

class selfArticle extends React.Component {
  render() {
    return(
      <div className="item">
        <List
          // itemLayout="vertical"
          size="large"
          pagination={{pageSize:5}}
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[]}
              extra={<div>
                <img src={item.display ? accept_img:loading} />
                {item.accepts.length === 0 ? (<ConfirmationDialog data={item.accepts}/>):(
                    item.accepts.filter((item) => item.progress >0).length ===0 ? (<ConfirmationDialog data={item.accepts}/>):
                (<Confirmation data={item.accepts.filter((item) => item.progress >0)}/>)
                )}
              </div>
              }
            >
              <List.Item.Meta
                avatar={<UserAvatar src={item.user && item.user.avatar}/>}
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
