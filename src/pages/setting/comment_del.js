import { List,Avatar,Button,Popconfirm} from 'antd';
import React from 'react';


import '../../pages/direct/direct.less';
import { connect } from 'dva';
import moment from 'moment';
import UserAvatar from '@/components/UserAvatar';

@connect(({ article }) => ({
  article
}))

class Comment_del extends React.Component {
  confirm =(id,event)=>{
    this.props.dispatch({
      type:'article/deletecomment',
      payload:id,
    })
  };
  cancel(e) {
    console.log(e);
  }

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
                  <Popconfirm
                    title="你确定要删除这条评论吗？"
                    onConfirm={this.confirm.bind(this,item.id)}
                    onCancel={this.cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" block>
                      删除
                    </Button>
                  </Popconfirm>
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



export default Comment_del;
