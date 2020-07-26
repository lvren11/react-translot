import React from 'react';
import { Row, Col, List, Divider,Avatar } from 'antd';
import { connect } from 'dva';

import Dialogue from '@/pages/accept_article/dialogue';
import UserAvatar from '@/components/UserAvatar';

@connect(({ user,center }) => ({
  center,user
}))

class inform extends React.Component{
  componentDidMount() {
    const { dispatch} = this.props;
    dispatch({
      type: 'center/inform',
    });
  }
  render(){
    const {center:{selfinform},user:{user}}=this.props;
    return(
      <div>
        <Row type="flex" justify="space-between">
          <Col lg={18} md={20} sm={24} xs={24}>
            <div style={{ padding: '15px', background: '#fff' }}>
              <Divider orientation="left">用户通知</Divider>
            <List
              itemLayout="horizontal"
              dataSource={selfinform}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 4,
              }}
              renderItem={item => (
                <List.Item
                  // actions={this.props.dispatch({type:'center/getuser',payload:item.send_id})}
                  extra={
                    <div>
                      <Dialogue  aid={item.accept_id} />
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={<UserAvatar src={user.avatar} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                  />
                  {item.content}
                </List.Item>
              )}
            />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
export default inform;
