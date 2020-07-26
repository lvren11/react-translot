import { List,Avatar,Button,Popconfirm} from 'antd';
import React from 'react';


import '../../pages/direct/direct.less';
import Link from 'umi/link';
import { connect } from 'dva';
import UserAvatar from '@/components/UserAvatar';

@connect(({ article }) => ({
 article
}))

class selfArticle extends React.Component {
  confirm =(id,event)=>{
  this.props.dispatch({
    type:'article/deletearticle',
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
          dataSource={this.props.data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[]}
              extra={
                <div>
                  <Popconfirm
                    title="你确定要删除这个需求吗？"
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
                title={<Link to={`/article/${item.id}`} target="_block">{item.title}</Link>}
                description={item.description}
              />
              {item.abstract}
            </List.Item>
          )}
        />
      </div>
    );
  }
}



export default selfArticle;
